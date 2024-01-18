const Router = require("express").Router
const UserController = require("../controllers/Mycontroller")
const r = new Router()

r.post("/reg",UserController.reg)
r.post("/auth", UserController.auth)

module.exports = r