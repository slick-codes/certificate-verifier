const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const path = require("path")
const session = require("cookie-session");
const cookieParser = require('cookie-parser');
const socket = require("socket.io")
const http = require("http")
const jwt = require("jsonwebtoken")

// setup environment variable
require("dotenv").config()
// import router 

const app = express()

const server = http.createServer(app)
const io = new socket.Server(server)


const commonRoutes = require("./routes/common")
const certificateRoutes = require("./routes/certificate");
const { access } = require("fs");
// setup database 
require("./config/database").startDB()
// start redis server
// require("./config/redis-config")


// Middleware to parse request bodies

// SETUP EJS TEMPLATE

// Middleware for session management
app.use(session({
    secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false
}));
app.use(cookieParser()); // Initialize cookie parser


// setup body parser 
app.set("io", io)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// create a baseurl field containing the request http protocol & url) in the request object
app.use(function (req, res, next) {
    req.baseurl = `${req.protocol}://${req.headers['host']}`
    next()
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "templates"))
// static directory 
app.use(express.static(path.join(__dirname, "static")))
app.use("/", express.static(path.join(__dirname, "..", "static")))
app.use(cors())
app.use(morgan("dev"))


// setup common route
app.use(commonRoutes)
app.use(certificateRoutes)


// login 
app.post("/login", function (req, res, next) {
    try {

        if (req.body.password !== process.env.ADMIN_PASSWORD || req.body.email !== process.env.ADMIN_EMAIL)
            return res.render("login", { message: "Invalid Cerdentials", body: req.body })

        // generate access token 
        const accessToken = jwt.sign({
            email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD
        }, process.env.ACCESS_TOKEN_SECRET)

        // store access token to cookie
        res.cookie("accessToken", accessToken, {
            maxAge: 30000000 * 24
        })

        res.redirect("/dashboard")

    } catch (error) {
        // handle error
    }
})

app.post("/logout", function (req, res, next) {
    res.clearCookie("accessToken")
    res.redirect("/login")
})


// setup socketio middleware
app.use(function (req, res, next) {
    req.io = req.app.get("io")
    next()
})

module.exports = {
    server, io
}

