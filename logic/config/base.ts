import axios from "axios"
import { SERVER_URL } from "./url"

const axiosInstance = axios.create({
  baseURL: SERVER_URL, // Add your actual base URL
})

export const axiosFetcher = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.get<T>(url)
  return response.data
}


export default axiosInstance
