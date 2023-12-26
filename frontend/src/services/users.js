import axios from "axios"
const baseUrl = "http://localhost:3001/api/users"

let token = null

function setToken (newToken) {
	token = `Bearer ${newToken}`
}

async function registerUser (credentials) {
	const response = await axios.post(baseUrl, credentials)
	return response.data
}

async function getAllUsers () {
	const request = await axios.get(baseUrl)
	return request.then((response) => response.data)
}

export default { getAllUsers, setToken, registerUser }
