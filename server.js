const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
require('./util/connection')
const route = require('./route/index')
const ErrorHandler = require('./middleware/errorHandler.middleware')

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(route)
app.use(ErrorHandler)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!!`)
})