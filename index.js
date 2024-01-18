const exp = require("express");
const dotenv = require("dotenv");
const router = require("./router/index")
const app = exp();
dotenv.config()
const PORT = process.env.PORT

function start(){
    app.use(exp.json()) //Приложение крашится здесь
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
