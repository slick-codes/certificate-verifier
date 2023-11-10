const { Sequelize, STRING } = require('sequelize')

const databasename = process.env.DATABASE_NAME
const username = process.env.DATABASE_USERNAME
const password = process.env.DATABASE_PASSWORD
const hostAddress = process.env.DATABASE_HOSTNAME

// Create the sequelize instance 
const sequelize = new Sequelize(databasename, username, password, {
    host: hostAddress,
    dialect: "mysql",
    logging: false
})

module.exports.startDB = async function () {

    sequelize.sync( /* { alter: true } */)
        .then(() => {
            console.log("app connected to mySQL server 🚀")
        })
        .catch(async error => {
            console.log("Unable to connect to database", "\n -----------------------------")
        })
}

module.exports.sequelize = sequelize