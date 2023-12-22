const moviesRouter = require("express").Router()
const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('./db/imdb.db', sqlite3.OPEN_READONLY, (err) => {
    if(err) {
        console.log(err)
    }
    console.log("Connected to imdb database")
})

const usedIds = []

moviesRouter.get('/game', async (reqquest, response) => {

    const query = "SELECT * FROM titles ORDER BY RANDOM() LIMIT 1;"

    /* const query = "SELECT * FROM titles WHERE title_id NOT IN ORDER BY RANDOM() LIMIT 1;" */

    // https://stackoverflow.com/questions/34349199/node-js-sqlite3-in-operator

    db.get(query, (err, row) => {
        if (err) {
            throw err;
        }

        return row
            ? (usedIds.push(row.title_id), response.json(row))
            : console.log("There was a problem getting the movie.")
    })

    console.log(usedIds)
})

moviesRouter.get('/names', async (reqquest, response) => {

    let names = []

    const query = "SELECT primary_title FROM titles"

    db.all(query, (err, rows) => {
        if (err) {
            throw err;
        }

        rows.forEach((row) => {
            names.push(row.primary_title)
        })

        response.json(names)
    })

    
})

module.exports = moviesRouter