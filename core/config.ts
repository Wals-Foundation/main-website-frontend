export const Config = {
    images: {
        slides: {
            autoPlay: true,
            autoPlayDelay: parseInt(process.env.NEXT_PUBLIC_IMAGE_SLIDES_DELAY || "3000", 10)
        }
    },
    page: {
        cacheMaxAge: parseInt(process.env.NEXT_PUBLIC_CACHE_MAX_AGE_SECONDS || "300", 10),
        reduxCacheMaxAge: parseInt(process.env.NEXT_PUBLIC_REDUX_CACHE_MAX_AGE || "300000", 10)
    },
    isStaticHost: process.env.NEXT_PUBLIC_IS_STATIC_HOST === 'true',
    strapi: {
        contentPageSize: parseInt(process.env.NEXT_PUBLIC_STRAPI_CONTENT_PAGE_SIZE || "100", 10),
        serverUrl: process.env.NEXT_PUBLIC_SERVER_URL || "https://wals-admins-test.onrender.com/api",
    }
}