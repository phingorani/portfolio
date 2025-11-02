'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  FormControlLabel,
  Checkbox,
  Link,
  Grid
} from '@mui/material'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        // Show specific error based on the error type
        if (result.error === 'CredentialsSignin') {
          setError('Invalid username or password')
        } else {
          setError('Authentication failed')
        }
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }
