'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button, TextField, Typography, Container, Box, Divider, Grid, Paper } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'

export default function SignIn() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingGithub, setLoadingGithub] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('email', {
        email,
        callbackUrl,
        redirect: false,
      })

      if (result?.error) {
        setError('Failed to send login link. Please check your email.')
      } else {
        setError('Check your email for the login link.')
        setEmail('')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGithubSubmit = async () => {
    setError('')
    setLoadingGithub(true)

    try {
      await signIn('github', {
        callbackUrl,
        redirect: false,
      })
    } catch (err) {
      setError('Failed to sign in with GitHub. Please try again.')
    } finally {
      setLoadingGithub(false)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          padding: 3,
         mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleEmailSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Login Link'}
          </Button>
        </Box>

        {error && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Divider sx={{ my: 3, width: '100%' }}>OR</Divider>

        <Box sx={{ mt: 1, width: '100%' }}>
          <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
            onClick={handleGithubSubmit}
            disabled={loadingGithub}
            fullWidth
          >
            Sign in with GitHub
          </Button>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <Link href="/auth/signup" passHref>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
