import { useEffect, useState } from "react"
import "./index.css"
import { LoginComponent } from "./components/LoginComponent"
import PreGameComponent from "./components/PreGameComponent"
import Leaderboards from "./components/Leaderboards"
import loginService from "./services/login"
import userService from "./services/users"
import moviesService from "./services/movies"
import { Autocomplete, Box, TextField } from "@mui/material"
import "ldrs/dotWave"

function App() {
	const [playerScore, setPlayerScore] = useState(0)
	const [user, setUser] = useState(false)
	const [gameStart, setGameStart] = useState(false)
	const [names, setNames] = useState(["loading..."])
	const [round, setRound] = useState(0)
	const [answer, setAnswer] = useState(null)
	const [film, setFilm] = useState({
		genre: "???",
		year: "???",
		director: "???",
		rating: "???",
		firstLetter: "???",
		titleLength: "???",
	})
	const [value, setValue] = useState("")
	const [inputValue, setInputValue] = useState("")
	const [isLoading, setIsLoading] = useState()
	const [lives, setLives] = useState(3)

	useEffect(() => {
		setIsLoading(true)
		moviesService.getGame().then(movie => {

			if(movie) {
				setAnswer({
					title: movie.primary_title,
					genre: movie.genres,
					year: movie.premiered,
					runtime: movie.runtime_minutes,
					rating: movie.rating,
					director: movie.name,
					firstLetter: movie.primary_title.charAt(0),
					titleLength: movie.primary_title.length
				})

				setFilm({
					genre: "???",
					year: "???",
					director: "???",
					rating: "???",
					firstLetter: "???",
					titleLength: "???",
				})

				setIsLoading(false)

			} else {
				alert("No movies left! Thank you for playing. Refresh the page if you wish to play again.")
			}

		})

	}, [round])

	useEffect(() => { 
		moviesService.getNames().then((names) => {
			const sortedNames = names.sort((a, b) => a.name > b.name)
			const uniqueNames = [...new Set(sortedNames)]
			setNames(uniqueNames)
		})
	}, [])

	useEffect(() => {
		const userIsLoggedInJSON = window.localStorage.getItem("loggedInUser")
		if (userIsLoggedInJSON) {
			const user = JSON.parse(userIsLoggedInJSON)
			userService.setToken(user.token)
			setUser(user)
		}
	}, [])

	async function handleHints () {
		if (film.genre === "???") {
			setFilm({...film, genre: answer.genre})
		} else if(film.year === "???") {
			setFilm({...film, year: answer.year})
		} else if (film.director === "???") {
			setFilm({...film, director: answer.director})
		} else if (film.rating === "???") {
			setFilm({...film, rating: answer.rating})
		} else if (film.firstLetter === "???") {
			setFilm({...film, firstLetter: answer.firstLetter})
		} else if(film.titleLength === "???") {
			setFilm({...film, titleLength: answer.titleLength})
		}

	}

	function scoreCalculator () {
		if(film.year === "???") {
			const score = playerScore + 10 * 10
			setPlayerScore(score)
		} else if (film.director === "???") {
			const score = playerScore + 10 * 8
			setPlayerScore(score)
		} else if (film.rating === "???") {
			const score = playerScore + 10 * 6
			setPlayerScore(score)
		} else if(film.firstLetter === "???") {
			const score = playerScore + 10 * 4
			setPlayerScore(score)
		} else if (film.titleLength === "???") {
			const score = playerScore + 10 * 2
			setPlayerScore(score)
		} else {
			const score = playerScore + 10
			setPlayerScore(score)
		}
	}

	async function userLogin(userCredentials) {
		try {
			const user = await loginService.login(userCredentials)
			userService.setToken(user.token)
			setUser(user)
			window.localStorage.setItem("loggedInUser", JSON.stringify(user))
		} catch (error) {
			window.alert("Wrong username or password")
			console.log(error)
		}
	}

	async function userRegister(userCredentials) {
		try {
			await userService.registerUser(userCredentials)
			window.alert("User created! Click ok and you will login shortly.")
			const user = await loginService.login(userCredentials)
			userService.setToken(user.token)
			setUser(user)
			window.localStorage.setItem("loggedInUser", JSON.stringify(user))
		} catch (error) {
			console.log(error)
		}
	}

	async function handleGuess() {
		if(value === answer.title)
		{
			alert("Correct!")
			scoreCalculator()
			const nextRound = round + 1
			setRound(nextRound)
			setValue("")
			if(lives < 3) {
				const newLife = lives + 1
				setLives(newLife)
			}
		} else {
			alert("Incorrect!")
			const loseLife = lives - 1
			if(loseLife === 0) {
				alert(`You're out of lives! Your final score was ${playerScore}. Thanks for playing.`)
				await userService.updateUserScore(user.id, playerScore)
				setPlayerScore(0)
				setLives(3)
				setRound(0)
				setGameStart(false)
			} else {
				setLives(loseLife)
			}
		}
	}

	function handleGameStart() {
		setGameStart(true)
		setRound(1)
	}

	function handleRestart() {
		setRound(0)
		setGameStart(false)
	}

	function handleLogout() {
		window.localStorage.clear()
		setUser(null)
		window.location.reload()
	}

	if (!user) {
		return <LoginComponent loginUser={userLogin} registerUser={userRegister} />
	}
	
	if (!gameStart) {
		return <PreGameComponent startTheGame={handleGameStart} />
	}

	return (
		<div id="home-container" >
			<div id="game-container">
				<h1>Game Start!</h1>
				
				<Box>

					{isLoading? 
						<div className="loading-content">
							<h3>Loading </h3>
							<l-dot-wave size="50" color={"white"}/>
						</div> 
						: 
						<div> 					
						
							<h3>Current round: {round}</h3>
			
							<ul>
								<li>Genre: {film.genre}</li>
								<li>Year: {film.year}</li>
								<li>Director: {film.director}</li>
								<li>Movie Rating: {film.rating}</li>
								<li>First letter: {film.firstLetter}</li>
								<li>Title length: {film.titleLength}</li>
							</ul>
							<span>
								<Autocomplete 
									options={names.sort()}
									onChange={(event, newValue) => {
										setValue(newValue)
									}}
									inputValue={inputValue}
									onInputChange={(event, newInputValue) => {
										setInputValue(newInputValue)
									}}
									/* clearOnBlur={false} */
									fullWidth
									disablePortal
									id="combo-box-demo"
									sx={{ width: 400 }}
									renderInput={(params) => <TextField {...params} size="medium" label="Movie" />}
			
								/>
			
								<button onClick={handleGuess} disabled={isLoading}>Guess</button>
								<button onClick={handleHints} disabled={isLoading}>Hint</button>
							</span>

							<div>Current answer: {value}</div>

							<div>
								<button onClick={handleRestart} disabled={isLoading} >Restart the game</button>
							</div>
						</div>
					}

					<div>Current score: {playerScore}</div>

				</Box>
				
			</div>

			<footer>
				<button>info</button>
				<button onClick={handleLogout}>Logout</button>
			</footer>

			{/* <Leaderboards /> */}
		</div>
	)
}

export default App
