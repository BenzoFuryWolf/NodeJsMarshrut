const jwt = require("jsonwebtoken")
const db = require("../db")
const {Tokens} = require("../models/UserModels")
const dotenv = require("dotenv")
const {query} = require("express");
class TokenService{
    refreshTokens(payload){
        const refreshTime = "30d";
        return jwt.sign({id: payload.id, email:payload.email}, process.env.JWT_REFRESH_SECRET, {expiresIn: refreshTime})
    }
    accessToken(payload){
        const accessTime = "1h";
        return jwt.sign({id: payload.id, email:payload.email}, process.env.JWT_ACCESS_SECRET, {expiresIn: accessTime})
    }
    async createTokens(payload){
        let wasCreated = Tokens.findOne({where: {user_Id: payload.id}})
        async function addTokens(id, refreshToken){
            let myQuery = `INSERT INTO tokens (refresh_token, "user_Id")VALUES ('${refreshToken}',${id})`
            let token = await db.query(myQuery)
            console.log(token)// Выводит объект в консоль для проверки ошибок в сервере
        }
        if(wasCreated == null){
            let accessToken = this.accessToken(payload)
            let refreshToken = this.refreshTokens(payload)

            await addTokens(payload.id, refreshToken)
            return {access_token:accessToken,refresh_token:refreshToken}
        }else{
            let accessToken = this.accessToken(payload)//Перезапись токена
            let refreshToken = this.refreshTokens(payload)
            wasCreated.refresh_token = refreshToken
            return {access_token:accessToken,refresh_token:refreshToken}
        }

    }
    validateAccessToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        }catch (e) {
            return null
        }
    }
    validateRefreshToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        }catch (e) {
            return null
        }
    }
}

module.exports = new TokenService();