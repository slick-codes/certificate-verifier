const { io, server } = require('./app')


const PORT = process.env.PORT || 8000;

const listener = server.listen(PORT, () => {
    console.error()
    console.error("-------------------------------------")
    console.error(`App is running on port ${PORT}`)
})

process.on("uncaughtException", error => {
    console.error("UNCAUGHT EXCEPTION! Shutting down...")
    console.error(error.name, error.message)
    console.error(error)
})

process.on("unhandledRejection", error => {
    console.error("UNHANDLED REJECTION! Shutting down...")
    console.error(error)
    console.error(error.name, error.message)

    listener.close(_ => {
        process.exit(1)
    })
}) 