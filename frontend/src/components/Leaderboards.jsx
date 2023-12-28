const Leaderboards = ({users}) => {

	return (
		<div id="leaderboard-container">
			<h3>Top 5 scores</h3>

			<ul>
				{users.map(user => (
					<li key={user.id}>{user.username} - {user.score}</li>
				))}
			</ul>
		</div>
	)
}

export default Leaderboards