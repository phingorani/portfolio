import { SessionProvider, useSession } from 'next-auth/react'
import { ReactNode } from 'react'

export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

export function useAuth() {
  const { data: session, status, update } = useSession()
  const isAuthenticated = status === 'authenticated'
  const isLoading = status === 'loading'

  return {
    session,
    isAuthenticated,
    isLoading,
    update,
  }
}
