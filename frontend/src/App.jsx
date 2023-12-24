import { useState } from "react"
import "./index.css"
import { LoginComponent } from "./components/LoginComponent"
import PreGameComponent from "./components/PreGameComponent"
import Leaderboards from "./components/Leaderboards"
import loginService from "./services/login"
import userService from "./services/users"

function App() {
	const [playerScore, setPlayerScore] = useState(0)
	const [user, setUser] = useState(false)
	const [gameStart, setGameStart] = useState(false)
	const [genre, setGenre] = useState("get from database")
	const [year, setYear] = useState("???")
	const [director, setDirector] = useState("???")
	const [cast, setCast] = useState("???")

	const handleHints = () => {
		if(year === "???") {
			setYear(1999)
		} else if (director === "???") {
			setDirector("Nolan")
		} else if (cast === "???") {
			setCast("JGL, Chris Evans")
		}
	}

	const scoreCalculator = () => {
		if(year === "???") {
			const score = 10 * 5 * 3 * 2
			const currentScore = playerScore + score
			setPlayerScore(currentScore)
		} else if (director === "???") {
			const score = 10 * 3 * 2
			const currentScore = playerScore + score
			setPlayerScore(currentScore)
		} else if (cast === "???") {
			const score = 10 * 2
			const currentScore = playerScore + score
			setPlayerScore(currentScore)
		}
	}

	async function userLogin(userCredentials) {
		try {
			const user = await loginService.login(userCredentials)
			userService.setToken(user.token)
			setUser(user)
			window.localStorage.setItem("loggedInUser", JSON.stringify(user))
		} catch (error) {
			console.log(error)
		}
	}

	if (!user) {
		return <LoginComponent loginUser={userLogin} />
	}
	
	if (!gameStart) {
		return <PreGameComponent startTheGame={setGameStart} />
	}

	return (
		<div id="home-container" >
			<div id="game-container">
				<h1>Game Start!</h1>
			
				<ul>
					<li>Genre: {genre}</li>
					<li>Year: {year}</li>
					<li>Director: {director}</li>
					<li>Main cast: {cast}</li>
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
