const { sequelize } = require("./../models/User")
const { DataTypes } = require("sequelize")
const { STRING } = DataTypes



const userSchema = {}


const User = sequelize.define("User", userSchema, {
    timestamps: true,
    hooks: {}
})


module.exports = User