import { useState } from "react"
import "./index.css"
import { LoginComponent } from "./components/LoginComponent"
import PreGameComponent from "./components/PreGameComponent"
import Leaderboards from "./components/Leaderboards"
import loginService from "./services/login"
import userService from "./services/users"
import scoreMultiplier from "./utils/scoreMultiplier"

function App() {
	const [playerScore, setPlayerScore] = useState(0)
	const [user, setUser] = useState(false)
	const [gameStart, setGameStart] = useState(false)
	const [film, setFilm] = useState({
		genre: "???",
		year: "???",
		director: "???",
		cast: "???"
	})
	/* 	const [genre, setGenre] = useState("get from database")
	const [year, setYear] = useState("???")
	const [director, setDirector] = useState("???")
	const [cast, setCast] = useState("???") */

	function handleHints () {
		if(film.year === "???") {
			setFilm({...film, year: 1999})
		} else if (film.director === "???") {
			setFilm({...film, director: "Nolan"})
		} else if (film.cast === "???") {
			setFilm({...film, cast: "JGL, Chris Evans"})
		}
	}

	/* 	function scoreCalculator () {
		if(year === "???") {
			const score = scoreMultiplier(3, playerScore)
			setPlayerScore(score)
		} else if (director === "???") {
			const score = scoreMultiplier(2, playerScore)
			setPlayerScore(score)
		} else if (cast === "???") {
			const score = scoreMultiplier(1, playerScore)
			setPlayerScore(score)
		} else {
			const score = playerScore + 10
			setPlayerScore(score)
		}
	} */

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


	if (!user) {
		return <LoginComponent loginUser={userLogin} registerUser={userRegister} />
	}
	
	if (!gameStart) {
		return <PreGameComponent startTheGame={setGameStart} />
	}

	return (
		<div id="home-container" >
			<div id="game-container">
				<h1>Game Start!</h1>
			
				<ul>
					<li>Genre: {film.genre}</li>
					<li>Year: {film.year}</li>
					<li>Director: {film.director}</li>
					<li>Main cast: {film.cast}</li>
				</ul>

				<span>
					<input type="text" placeholder="And the movie is...?" /> <button>Guess</button>
					<button onClick={handleHints}>Hint</button>
				</span>
				
				<div>
					<button onClick={() => setGameStart(false)}>Restart the game</button>
				</div>

				<div>Current score: 1000</div>
				
			</div>

			<footer>
				<button>info</button>
			</footer>

			{/* <Leaderboards /> */}
		</div>
	)
}

export default App
