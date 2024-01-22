const Sequelize = require("sequelize")
const { DataTypes} = require("sequelize")
const db = require("../db")

const User = db.define(
    "users",{
    id: {
        type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
    },
    email:{
        type: DataTypes.STRING(255),
            notNull: true,
        unique: true
    },
    password_hash:{
        type: DataTypes.STRING(255),
            notNull: true
    },
    salt:{
        type: DataTypes.STRING(255),
            notNull: true
    }
}, {
        timestamps: false
    })

const Tokens = db.define("tokens",{
    refresh_token: {
        type: DataTypes.STRING(255),
        notNull: true,
    }}, { timestamps: false})

Tokens.belongsTo(User, {
    foreignKey: {
        name: "user_Id",
        allowNull: false
    }
})
User.hasOne(Tokens, {
    foreignKey: {
        name:"user_Id",
        type: DataTypes.INTEGER,
        allowNull: false
    },onDelete: "cascade"})

module.exports = {User, Tokens}