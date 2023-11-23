const Certificate = require("./../models/Certificate")
const uuid = require("uuid")
const qr = require("qr-image")
const fs = require("fs")
const path = require("path")


module.exports.createCert = async function (req, res, next) {
    try {
        const uniqueId = uuid.v1()
        const qrSvg = qr.imageSync(`${req.baseurl}/preview/${uniqueId}`, { type: "SVG" })

        let qrlink = String(Date.now() + '.svg')
        await fs.promises.writeFile(path.join(__dirname, "..", "static", "files", qrlink), qrSvg)
        console.log(req.files)
        const certificate = await Certificate.create({
            ...req.body,
            uniqueId,
            qrCode: String(qrSvg),
            certUrl: `/files/${req.files.cert_passport[0].filename}`,
            qrUrl: `/files/${qrlink}`,
            passport: `/files/${req.files.passport[0].filename}`
        })
        console.log(certificate.dataValues)
        console.log("redirecting....")
        res.redirect(`/dashboard?id=${certificate.uniqueId}&&success=true`)
    } catch (error) {
        // handle error
        console.log("something went wrong", error)
    }
}
