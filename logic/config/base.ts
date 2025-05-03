import axios from "axios"
import url from "./url"

const axiosInstance = axios.create({
  baseURL: url.environment === "development" ? url.users_local : url.users_live, // Add your actual base URL
})

export default axiosInstance
