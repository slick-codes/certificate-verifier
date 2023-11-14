const Certificate = require("../models/Certificate")
const jwt = require("jsonwebtoken")

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

    if (!cert) return res.redirect("/404?message=This Certificate Is Not Registered Wtih Us")

    return res.render("preview", { cert })
}

module.exports.page404 = async function (req, res, next) {
    const message = req.query.message ?? "Page Not Found!"
    res.render("404", { message })
}


module.exports.login = async function (req, res, next) {
    try {
        const accessToken = req.cookies.accessToken
        const verifiedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        if (verifiedToken.password === process.env.ADMIN_PASSWORD && verifiedToken.email === process.env.ADMIN_EMAIL)
            return res.redirect("/dashboard")

        return res.render("login", { message: "", body: {}, ...req.query })

    } catch (error) {
        return res.render("login", { message: "", body: {}, ...req.query })
    }
}
