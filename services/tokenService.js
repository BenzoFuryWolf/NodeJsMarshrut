const jwt = require("jsonwebtoken")
const tokenModels = require("../models/tokensModels")
const dotenv = require("dotenv")
class TokenService{
    createTokens(id,payload){
        const accessTime = "1h";
        let accessToken = jwt.sign({id: id, payload:payload}, process.env.JWT_ACCESS_SECRET, {expiresIn: accessTime})
        let refreshToken = jwt.sign({id: id, payload:payload}, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"})
        function userFabric(id, token){
            return {
                id: id,
                refreshToken: token,
            }
        }
        function addTokens(id, refreshToken){
            console.log(userFabric(id, refreshToken))// Выводит объект в консоль для проверки ошибок в сервере
            tokenModels.push(userFabric(id, refreshToken));
        }
        addTokens(id, refreshToken)
        return accessToken
    }
}

module.exports = new TokenService();