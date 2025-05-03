import axios from "axios"
import url from "./url"

const axiosInstance = axios.create({
  baseURL: url.server, // Add your actual base URL
})

export default axiosInstance
