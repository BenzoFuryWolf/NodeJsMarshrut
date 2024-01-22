
const UserService = require('../services/userService')
class UserController{
    async reg(req, res){
        let myUser = req.body
        try {
            // let us =await UserService.reg(myUser.email, myUser.password)
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
            res.cookie('refresh_token', us.tokens.refresh_token, {maxAge: 30*24*60*60*1000, httpOnly: true})
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