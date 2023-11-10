const Certificate = require("../models/Certificate")


module.exports.home = async function (req, res, next) {
    return res.render("index", {})
}


module.exports.dashboard = async function (req, res, next) {
    const certificates = await Certificate.findAll()
    return res.render("dashboard", { certificates, query: req.query, cert: req.query.id ? await Certificate.findOne({ where: { uniqueId: req.query.id } }) : null })
}


module.exports.preview = async function (req, res, next) {
    const id = req.params.id
    const cert = await Certificate.findOne({ where: { uniqueId: id } })
    return res.render("preview", { cert })
}


module.exports.login = async function (req, res, next) {
    return res.render("login", { message: "" })
}
