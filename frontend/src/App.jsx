import { useState } from "react"
import "./index.css"
import { LoginComponent } from "./components/LoginComponent"
import PreGameComponent from "./components/PreGameComponent"
import Leaderboards from "./components/Leaderboards"

function App() {
	const [count, setCount] = useState(0)
	const [user, setUser] = useState(true)
	const [gameStart, setGameStart] = useState(false)


	if (!user) {
		return <LoginComponent />
	}

	if (!gameStart) {
		return <PreGameComponent startTheGame={setGameStart} />
	}

	return (
		<div>
			<h1>Game Start!</h1>



			<button onClick={() => setGameStart(false)}>Restart the game</button>


			<Leaderboards />
		</div>
	)
}

export default App
