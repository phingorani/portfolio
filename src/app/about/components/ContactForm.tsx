'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      setStatus('success');
      setFeedbackMessage('Your message has been sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      const errorData = await response.json();
      setStatus('error');
      setFeedbackMessage(errorData.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Send a Message
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Message"
        variant="outlined"
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        disabled={status === 'loading'}
        sx={{
          position: 'relative',
        }}
      >
        Send Message
        {status === 'loading' && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Button>
      {status === 'success' && (
        <Alert severity="success">{feedbackMessage}</Alert>
      )}
      {status === 'error' && (
        <Alert severity="error">{feedbackMessage}</Alert>
      )}
    </Box>
  );
}
