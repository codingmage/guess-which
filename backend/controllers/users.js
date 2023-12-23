const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const sqlite3 = require('sqlite3')

let db = new sqlite3.Database('./db/users.db');

usersRouter.post("/", async (request, response) => {
	const { username, password } = request.body

 	if (username.length < 5) {
		return response.status(400).json({ error: "User validation failed: Invalid username" })
	}

	if (password.length < 3) {
		return response.status(400).json({ error: "User validation failed: Invalid password" })
	}

	const saltRounds = 11

	const passwordHash = await bcrypt.hash(password, saltRounds)

	await new Promise((resolve, reject) => {
		db.serialize(() => {
			db.get("SELECT * FROM users WHERE username = ?", username, (err, row) => {
				if (err) {
					throw err;
				}

				if(row){
					response.status(400).json("Sorry, username already taken")
					reject("Username already taken")
				}
			})})
				.run("INSERT INTO users (username, password) VALUES(?, ?)", username, passwordHash, function(err) {
					if(err) {
						reject(err)
					}
					resolve()
		})	
	})

	response.status(201).json("User created")
})

usersRouter.get("/", async (request, response) => {

	const users = await new Promise((resolve, reject) => {
		db.all("SELECT id, username, score FROM users", (err, rows) => {
			if (err) {
				reject(err)
			}
			resolve(rows)
		})
	})
	response.json(users)
})

module.exports = usersRouter