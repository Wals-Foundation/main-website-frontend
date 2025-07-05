export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://wals-admins-test.onrender.com/api"
export const IMAGE_URL = (process.env.NEXT_PUBLIC_SERVER_URL || "").replace(/\/api\/?$/, "")
export const ENVIRONMENT = process.env.NODE_ENV
export const isDev = ENVIRONMENT === "development"
