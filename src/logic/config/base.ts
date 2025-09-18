import axios from "axios"
import { Config } from "@/src/core/config"

export const getFetcher = async <T>(
  url: string,
  options?: RequestInit & {
    [key: string]: any
  }
): Promise<T> => {
  const response = await fetch(`${Config.strapi.serverUrl}/${url}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Fetch error ${response.status}: ${response.statusText} - ${errorBody}`
    );
  }

  return response.json() as Promise<T>;
};


const axiosInstance = axios.create({
  baseURL: Config.strapi.serverUrl,
})

export const axiosFetcher = async <T>(url: string, options?: { signal?: AbortSignal }): Promise<T> => {
  const response = await axiosInstance.get<T>(url)
  return response.data
}


export default axiosInstance
