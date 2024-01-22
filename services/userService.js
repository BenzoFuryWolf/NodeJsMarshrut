
const bcrypt = require("bcrypt")

const {User, Tokens} = require("../models/UserModels")
const tokenService = require("./tokenService")
const {where} = require("sequelize");
const myUsers = require("../models/UserModels");
class HashPassword{
    genPasswordHash (password){ //Для регистрации
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds)

        let password_hash = bcrypt.hashSync(password, salt);

        return {
            pass_hash:password_hash,
            salt: salt
        }
    }
    genPassHash(password, salt){// Для авторизации

        let password_hash =  bcrypt.hashSync(password, salt);

        return password_hash
    }
}

class UserService{
    async reg (email, password){
        async function findEmail(email){
           let user =  await User.findOne({where: {email: email}})
            return user
        }
        async function addUser (email, password){//Добавляет нового пользователя в БД
            const {pass_hash, salt} = HashPassword.prototype.genPasswordHash(password)
            if((email !=null)&&(pass_hash != null)&&(salt != null)) {
                let wasCreate = await findEmail(email)
                if (wasCreate == null) {
                    let user = await User.create({email: email, password_hash: pass_hash, salt: salt})

                    return user
                }
                return {
                    msg: "Ошибка пользователь с таким email уже существует"
                }
                console.log(wasCreate)
                return {
                    msg: wasCreate
                }
            }

        }
        let newUser = addUser(email, password);
        return newUser;
    }

    async auth (email, password){
        let a =await myUsers.User.findOne({where: {email: email}})
        let user = a.dataValues
        let passHash = HashPassword.prototype.genPassHash(password, user.salt)
        if(a != null){
            if(passHash === a.password_hash){
                let acc_tok =await tokenService.createTokens({id: user.id,email:user.email})
                return {
                    tokens:acc_tok,
                    msg: "Авторизация прошла успешно"
                }
            }else {
                return {
                    msg:"Пароль или почта не верна"
                }
            }
        }
    }
}

module.exports = new UserService();