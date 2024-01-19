const exp = require("express");
const dotenv = require("dotenv");
const router = require("./router/index")
const cookieParser = require("cookie-parser")
const app = exp();
dotenv.config()
const PORT = process.env.PORT

function start(){
    app.use(exp.json())
    app.use(cookieParser())
    app.use("/api",router)

    app.post("/", function(req, res){
        let msg = req.body
        res.json(msg)
    })

    app.listen(PORT);
    console.log(`Сервер запущен на ${PORT} порту`)
}

try{
    start();
} catch (e){
    console.log(e)
}
