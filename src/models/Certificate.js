const { STRING, BOOLEAN, INTEGER, TEXT } = require("sequelize")
const { sequelize } = require("./../config/database")


const CertificateSchema = {
    uniqueId: {
        type: STRING,
        allowNull: false
    },
    firstName: {
        type: STRING,
        allowNull: false
    },
    qrCode: {
        type: TEXT,
        allowNull: false
    },
    lastName: {
        type: STRING,
        allowNull: false
    },
    middleName: {
        type: STRING,
        allowNull: false
    },
    registrationNumber: {
        type: STRING,
        allowNull: false
    },
    school: {
        type: STRING,
        allowNull: false
    },
    department: {
        type: STRING,
        allowNull: false
    },
    graduationYear: {
        type: STRING,
        allowNull: false
    },
    certUrl: {
        type: STRING,
        allowNull: false
    }
}


const Certificate = sequelize.define("Certificate", CertificateSchema, {
    timestamps: true, hooks: {

    }
})

Certificate.sync({ alter: true })
    .then(d => console.log("Cert synced successfully"))
    .catch(e => console.log("cert syned failed!"))

module.exports = Certificate