export function LoginComponent () {
	return (
		<div id="login-box">
			<div id="login-content">
				<h2>Greetings!</h2>
				<h3>Please login or register to continue.</h3>
				<form id="login-form">
					<div>
						<label>Username </label> <input type="text" /> 
					</div>
					<div>
						<label>Password </label> <input type="text" />
					</div>

					<div id="button-container">
						<button id="login-button">Login</button>
						<button id="register-button">Register</button>
					</div>
				</form>
				<span>Note: You only need an username and a password to create an account!</span>	
			</div>
		</div>
	)
    
}