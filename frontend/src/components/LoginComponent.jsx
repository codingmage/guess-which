import { useState } from "react"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"

export function LoginComponent () {

	const [open, setOpen] = useState(false)

	const handleOpen = (event) => {
		event.preventDefault()
		setOpen(true)
	}
	const handleClose = (event) => {
		event.preventDefault()
		setOpen(false)
	}


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
						<button id="register-button" onClick={handleOpen}>Register</button>
					</div>
				</form>

				<form>
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
						>
							<div>
								<label>Username </label> <input type="text" /> 
							</div>
							<div>
								<label>Password </label> <input type="text" />
							</div>
							<button id="login-button">Login</button>

						</Box>
					</Modal>
				</form>
				<span>Note: You only need an username and a password to create an account!</span>	
			</div>
		</div>
	)
    
}