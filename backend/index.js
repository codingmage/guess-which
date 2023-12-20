/* const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger') */

const express = require("express")
const app = express()

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
