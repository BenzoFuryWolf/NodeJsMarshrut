const UserService = require("../services/myService")

class UserController{
    async reg(req, res){
        let myUser = req.body
        try {
            let us =await UserService.reg(myUser.email, myUser.password)
            console.log(us)
            return res.json(us)
        }catch (e) {
            console.log(e)
            return res.json({
                error: e
            })
        }
    }
    async auth(req, res){
        let myUser = req.body
        try {
            let us = await UserService.auth(myUser.email, myUser.password)
            return res.json(us)
        }catch (e) {
            console.log(e)
            return res.json({
                message: e,
            })
        }
    }
}

module.exports = new UserController()