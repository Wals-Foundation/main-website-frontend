import axios from "axios"
import { SERVER_URL } from "./url"

const axiosInstance = axios.create({
  baseURL: SERVER_URL, // Add your actual base URL
})

export default axiosInstance
