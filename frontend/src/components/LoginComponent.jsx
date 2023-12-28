import { useState } from "react"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import loginService from "../services/login"


export function LoginComponent ({ loginUser, registerUser }) {

	const [open, setOpen] = useState(false)
	const [registerUsername, setRegisterUsername] = useState("")
	const [registerPassword, setRegisterPassword] = useState("")
	const [loginUsername, setLoginUsername] = useState("")
	const [loginPassword, setLoginPassword] = useState("")

	function handleOpen (event) {
		event.preventDefault()
		setOpen(true)
	}

	function handleClose (event) {
		event.preventDefault()
		setOpen(false)
	}

	async function handleLogin(event) {
		event.preventDefault()
		await loginUser({ username: loginUsername, password: loginPassword })
		setLoginUsername("")
		setLoginPassword("")
	}

	async function handleRegister(event) {
		event.preventDefault()
		await registerUser({ username: registerUsername, password: registerPassword })
		setRegisterUsername("")
		setRegisterPassword("")
	}


	return (
		<div id="login-box">
			<div id="login-content">
				<h2>Greetings!</h2>
				<h3>Please login or register to continue.</h3>
				<form id="login-form" onSubmit={handleLogin}>
					<div>
						<label>Username </label> <input onChange={({ target }) => setLoginUsername(target.value) } type="text" /> 
					</div>
					<div>
						<label>Password </label> <input onChange={({ target }) => setLoginPassword(target.value) } type="text" />
					</div>

					<div id="button-container">
						<button id="login-button">Login</button>
						<button id="register-button" onClick={handleOpen}>Register</button>
					</div>
				</form>

				<Modal 
					open={open} 
					onClose={handleClose}         
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box 
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",}}
						component="form"
						onSubmit={handleRegister}

					>
						<div>
							<label>Username </label> <input onChange={({ target }) => setRegisterUsername(target.value) }type="text" /> 
						</div>
						<div>
							<label>Password </label> <input onChange={({ target }) => setRegisterPassword(target.value) } type="password" />
						</div>
						<button id="register-button" type="submit">Register</button>

					</Box>
				</Modal>
				<span>Note: You only need an username and a password to create an account!</span>	
			</div>
		</div>
	)
    
}