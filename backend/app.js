const express = require("express")
const app = express()
const cors = require('cors')
require('express-async-errors')

const moviesRouter = require('./controllers/movies')
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

app.use(cors())
app.use(express.json())

app.use('/api/movies', moviesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app