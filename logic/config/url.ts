// eslint-disable-next-line import/no-anonymous-default-export
export default {
  users_live: process.env.NEXT_PUBLIC_SERVER_URL || "",
  users_local: "http://localhost:1337/api/",
  environment: process.env.NODE_ENV,
}
