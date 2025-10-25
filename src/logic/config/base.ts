/* eslint-disable @typescript-eslint/no-explicit-any */

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

export const postFetcher = async <T>(
  url: string,
  body?: any,
  options?: RequestInit & {
    [key: string]: any
  }
): Promise<T> => {
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;
  const defaultHeaders: Record<string, string> = {
    Accept: "application/json",
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  const response = await fetch(`${Config.strapi.serverUrl}/${url}`, {
    method: "POST",
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
    body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Fetch error ${response.status}: ${response.statusText} - ${errorBody}`
    );
  }

  const contentType = response.headers.get("content-type") || "";

  if (response.status === 204) {
    return undefined as unknown as T;
  }

  if (contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  const text = await response.text();
  return text as unknown as T;
};
