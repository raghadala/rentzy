export { default } from "next-auth/middleware"

export const config = { 
  matcher: [
    "/rentals",
    "/reservations",
    "/listings",
    "/favourites"
  ]
};