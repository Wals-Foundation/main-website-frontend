# wals-foundation-repo
For client rendering cache with swr
For server rendering cache with fetch

Put use client on top of page to make it work with static server

## Tech Stack
- [Nextjs](https://nextjs.org/docs/app/getting-started) using App Router
- [Redux](https://react-redux.js.org/) for client side global state management
- [Fetch](https://nextjs.org/docs/app/getting-started/fetching-data#with-the-fetch-api) for both server side and client side REST Api integration
- [SWR](https://swr.vercel.app/docs/getting-started) for wrapping client side data fetching to enable caching
- [React Markdown](https://github.com/remarkjs/react-markdown) for displaying markdown
- [Swiper](https://swiperjs.com/get-started) & [Swiper Modules](https://swiperjs.com/swiper-api#modules) for carousels

## Architecture and Decisions
### Breakpoint rendering
All layouts and styles that are dependent on breakpoint are done server side and depend on viewportbreakpoint stored in a redux store in pagedata slice.

### Spacing (specified with [tailwind values](https://v2.tailwindcss.com/docs/customizing-spacing)) 
Between page header and content: 20(mobile), 28(desktop)
Between page sections: 12(mobile), 16(desktop)
Between content: 4(mobile), 6(desktop)

Do not use w-screen

### Server component to client
Mark all pages as use client and adapt [dynamic routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes#in-client-components) and [static exports](https://nextjs.org/docs/app/guides/static-exports)
Move data fetch into useSWR, example in HomeAboutUs.tsx
switch NEXT_PUBLIC_IS_STATIC_HOST

https://react-svgr.com/

### Dark mode

### Todos
Search for todo comments and complete them
[] generate env.example