export const Config = {
    page: {
        cacheMaxAge: parseInt(process.env.NEXT_PUBLIC_REDUX_CACHE_MAX_AGE || "300000", 10)
    },
    strapi: {
        contentPageSize: parseInt(process.env.NEXT_PUBLIC_STRAPI_CONTENT_PAGE_SIZE || "100", 10),
        serverUrl: process.env.NEXT_PUBLIC_SERVER_URL || "https://wals-admins-test.onrender.com/api",
    }
}