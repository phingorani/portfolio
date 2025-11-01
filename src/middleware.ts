import NextAuth from 'next-auth'
import { authOptions } from './lib/auth'

const { auth } = NextAuth(authOptions)

export default auth((req) => {
  // This middleware will protect routes
  // You can add custom logic here if needed
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
