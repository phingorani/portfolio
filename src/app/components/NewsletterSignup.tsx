'use client';

import { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (email && email.includes('@')) {
      console.log('Newsletter signup email:', email);
      // In a real application, you would send this email to your backend/email service.
      setSubmitted(true);
      setEmail(''); // Clear the input field
      setTimeout(() => setSubmitted(false), 3000); // Reset submitted state after 3 seconds
    } else {
      setError('Please enter a valid email address.');
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        mt: 8, 
        py: 4,
        px: 2,
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 2, 
        width: '100%', 
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: 'action.hover'
      }}
    >
      <Typography variant="h6" align="center" gutterBottom sx={{ color: 'text.primary' }}>
        Join My Newsletter!
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 2, maxWidth: 400 }}>
        Get updates on my latest projects and articles directly in your inbox.
      </Typography>
      {isMounted && (
        <>
          <TextField
            label="Email Address"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: '100%', maxWidth: 400 }}
            required
            color="primary"
            error={!!error}
            helperText={error}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ width: '100%', maxWidth: 400 }}>
            Subscribe
          </Button>
          {submitted && (
            <Typography variant="body2" color="success.main" align="center" sx={{ mt: 1 }}>
              Thank you for subscribing!
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}
