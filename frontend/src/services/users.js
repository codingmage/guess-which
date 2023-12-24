import axios from "axios"
const baseUrl = "http://localhost:3001/api/users"

let token = null

const setToken = (newToken) => {
	token = `Bearer ${newToken}`
}

const getAllUsers = () => {
	const request = axios.get(baseUrl)
	return request.then((response) => response.data)
}

export default { getAllUsers, setToken }
