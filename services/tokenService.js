const jwt = require("jsonwebtoken")
const tokenModels = require("../models/tokensModels")
const dotenv = require("dotenv")
class TokenService{
    refreshTokens(payload){
        const refreshTime = "30d";
        return jwt.sign({id: payload.id, email:payload.email}, process.env.JWT_REFRESH_SECRET, {expiresIn: refreshTime})
    }
    accessToken(payload){
        const accessTime = "1h";
        return jwt.sign({id: payload.id, email:payload.email}, process.env.JWT_ACCESS_SECRET, {expiresIn: accessTime})
    }
    createTokens(payload){
        let accessToken = this.accessToken(payload)
        let refreshToken = this.refreshTokens(payload)
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
        addTokens(payload.id, refreshToken)
        return {access_token:accessToken,refresh_token:refreshToken}
    }
}

module.exports = new TokenService();