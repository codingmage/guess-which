const PreGameComponent = ({startTheGame}) => {

	/* 	const handleGameStart = () => {
		startTheGame()
	} */

	return (
		<div>
			<h1>Guess the movie!</h1>
			<p>Can you guess which popular* movie it is based on the hints you get? Click on the button to start.</p>

			<p>For each hint you ask for, your score multiplier will decrease.</p>
			<p>You have 3 lives. If you guess wrong, one life will be taken away. Your score will be reset if you guess wrong and have no lifes left.</p>

			<button onClick={() => startTheGame(true)}>Start the game!</button>
		</div>

	)
}

export default PreGameComponent