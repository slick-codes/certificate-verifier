const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const path = require("path")
const session = require("cookie-session");
const cookieParser = require('cookie-parser');
const socket = require("socket.io")
const http = require("http")

const app = express()

const server = http.createServer(app)
const io = new socket.Server(server)


// setup environment variable
require("dotenv").config()
// start redis server
require("./config/redis-config")
// setup database 
require("./config/database").startDB()


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

// create a basurl filed containing the request http protocol & url in the request object
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

// setup socketio middleware
app.use(function (req, res, next) {
    req.io = req.app.get("io")
    next()
})

module.exports = {
    server, io
}

