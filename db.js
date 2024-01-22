const {Client} = require("pg")
const {Sequelize} = require("sequelize")
const dotenv = require("dotenv")

dotenv.config()

const Config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: false
}

module.exports = new Sequelize(Config.database, Config.user,Config.password, {
    dialect: "postgres",
    host: Config.host,
    port: Config.port
})

