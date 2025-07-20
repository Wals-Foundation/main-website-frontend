import axios from "axios"
import { Config } from "@/core/data/config"

const axiosInstance = axios.create({
  baseURL: Config.strapi.serverUrl,
})

export const axiosFetcher = async <T>(url: string, p0: { signal: AbortSignal }): Promise<T> => {
  const response = await axiosInstance.get<T>(url)
  return response.data
}


export default axiosInstance
