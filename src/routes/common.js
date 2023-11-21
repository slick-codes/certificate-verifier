const router = require("express").Router()
const { auth } = require("../middlewares/auth")
const controllers = require("./../controllers/common")


router.get("/", controllers.home)

router.get("/dashboard", auth, controllers.dashboard)

router.get("/preview/:id", controllers.preview)

router.get("/login", controllers.login)




module.exports = router 