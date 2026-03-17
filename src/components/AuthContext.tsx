import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Box, Typography, Alert, LinearProgress } from '@mui/material'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  session: any
  error: Error | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = error instanceof Error ? error.message : String(error)
  return (
    <Box sx={{ p: 3 }}>
      <Alert severity="error">
        <Typography variant="body1">Authentication failed: {message}</Typography>
      </Alert>
    </Box>
  )
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [status])

  const contextValue: AuthContextType = {
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading' || isLoading,
    session,
    error,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      <ErrorBoundary FallbackComponent={AuthErrorFallback}>
        {isLoading && <LinearProgress sx={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1300 }} />}
        {children}
      </ErrorBoundary>
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
