/* const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger') */
/* const fs = require('fs'); */
/* const express = require("express")
const sqlite3 = require('sqlite3') */
const app = require('./app')

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
