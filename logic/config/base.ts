import axios from "axios"
import url from "./url"

export const getRefreshToken = async () => localStorage.getItem("refreshToken") || ""

const NO_RETRY_HEADER = "x-no-retry"

export const axiosInstance = axios.create({
  baseURL: url.environment === "development" ? url.users_local : url.users_live, // Add your actual base URL
})

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status === 401) {
      if (error.config.headers && error.config.headers[NO_RETRY_HEADER]) {
        return Promise.reject(error)
      }
      error.config.headers ||= {}
      error.config.headers[NO_RETRY_HEADER] = "true"
      const refreshToken = await getRefreshToken()
      const response = await axiosInstance.post("/create-new-token", { refreshToken })
      const { accessToken } = response.data
      axios.defaults.headers.common["Authorization"] = accessToken
      error.config.headers["Authorization"] = accessToken
      return axios(error.config)
    }
  }
)

export default axiosInstance
