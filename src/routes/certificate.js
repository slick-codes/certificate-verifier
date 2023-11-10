const router = require("express").Router()
const controllers = require("./../controllers/certificate")
const multer = require("multer")
const path = require("path")

// configure multer
let storage = multer.diskStorage({
    destination: path.join(__dirname, "../static/files"),
    filename: (req, file, callback) => {
        const ext = file.mimetype.split("/")[1];
        callback(null, `document-${file.fieldname}-${Date.now()}.${ext}`)
    }
})

const upload = multer({ storage: storage })

router.post("/create/cert", upload.single("pdf_file"), controllers.createCert)


module.exports = router