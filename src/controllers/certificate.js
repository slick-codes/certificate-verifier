const Certificate = require("./../models/Certificate")
const uuid = require("uuid")
const qr = require("qr-image")

module.exports.createCert = async function (req, res, next) {
    try {
        console.log("got here")
        const uniqueId = uuid.v1()
        const qrSvg = qr.imageSync(`/preview/${uniqueId}`, { type: "SVG" })
        const certificate = await Certificate.create({
            ...req.body,
            uniqueId,
            qrCode: String(qrSvg),
            certUrl: `/files/${req.file.filename}`
        })
        console.log("redirecting....")
        res.redirect(`/dashboard?id=${certificate.uniqueId}&&success=true`)
    } catch (error) {
        // handle error
    }
}
