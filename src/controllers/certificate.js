const Certificate = require("./../models/Certificate")
const uuid = require("uuid")
const qr = require("qr-image")

module.exports.createCert = async function (req, res, next) {
    try {
        const uniqueId = uuid.v1()
        const qrSvg = qr.imageSync(`${req.baseurl}/preview/${uniqueId}`, { type: "SVG" })

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
        console.log("something went wrong", error)
    }
}
