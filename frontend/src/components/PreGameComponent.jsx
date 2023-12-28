const PreGameComponent = ({startTheGame, logUserOut}) => {

	return (
		<div>
			<h1>Guess the movie!</h1>
			<p>Can you guess which popular* movie it is based on the hints you get? Click on the button to start.</p>

			<p>You must select the movie from among the entries in the provided list. You can search for it, but for your answer to be recorded you must select the item in the dropdown menu!</p>
			<p>For each hint you ask for, your score multiplier will decrease. The genre hint is the first one and it is free! You get no extra points for blindly guessing though.</p>
			<p>You have 3 lives. If you guess wrong, one life will be taken away. Your score will be reset if you guess wrong and have no lives left.</p>

			<button onClick={startTheGame}>Start the game!</button>

			<button onClick={logUserOut}>Log out</button>
		</div>

	)
}

export default PreGameComponent