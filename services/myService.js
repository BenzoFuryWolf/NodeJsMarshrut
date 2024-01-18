const bcrypt = require("bcrypt")

myUsers = require("../models/UserModels")
const tokenService = require("./tokenService")
class HashPassword{
    genPasswordHash (password){ //Для регистрации
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds)

        let password_hash =  bcrypt.hashSync(password, salt);

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
    myUsers = require("../models/UserModels")
    async reg (email, password){
        let genId = () => {//Возвращает id для нового пользователя
            return this.myUsers.length-1
        }
        let usersConst = (email, password_hash, salt) => {//Конструктор для объекта пользователя
            return {
                id: genId()+1,
                email:email,
                password_hash: password_hash,
                salt: salt
            }
        };

        let addUser =(email, password)=>{//Добавляет нового пользователя в массив
            const {pass_hash, salt} = HashPassword.prototype.genPasswordHash(password)
            this.myUsers.push(usersConst(email, pass_hash, salt))
            return this.myUsers[genId()]
        }
        let newUser = addUser(email, password);
        return newUser;
    }

    async auth (email, password){
        let a = this.myUsers.find(el => el.email ===  email)
        let passHash = HashPassword.prototype.genPassHash(password, a.salt)
        if(passHash === a.password_hash){
            let acc_tok = tokenService.createTokens(a.id, email)
            return {
                access_token:acc_tok,
                msg: "Авторизация прошла успешно"
            }
        }else {
            return {
                msg:"Пароль или почта не верна"
            }
        }

    }
}

module.exports = new UserService();