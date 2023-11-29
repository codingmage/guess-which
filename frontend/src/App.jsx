import { useState } from "react"
import "./index.css"
import { LoginComponent } from "./components/LoginComponent"

function App() {
	const [count, setCount] = useState(0)
	const [user, setUser] = useState(null)


	if (!user) {
		return <LoginComponent />
	}

	return (
		<div>
			<h1>Guess the movie!</h1>
			<p>Can you guess which popular* movie it is based on the hints you get? Click on the button to start.</p>

			<p>For each hint you ask for, your score multiplier will decrease.</p>
			<p>You have 3 lives. If you get it wrong, one life will be taken away.</p>

		</div>
	)
}

export default App
