const jwt = require("jsonwebtoken")


module.exports.auth = function (req, res, next) {
    try {

        const accessToken = req.cookies.accessToken
        const verifiedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        if (verifiedToken.password !== process.env.ADMIN_PASSWORD || verifiedToken.email !== process.env.ADMIN_EMAIL)
            return res.redirect("/login?message=Invalid Access Token")

        next()
    } catch (error) {
        res.redirect("/login?message=Session Expired!")
    }
}