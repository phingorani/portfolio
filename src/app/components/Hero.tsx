'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChatIcon from '@mui/icons-material/Chat';

const roles = [
  'Full Stack Software Engineer',
  'AI Enthusiast',
  'Cloud Architect',
  'Problem Solver',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(
          currentRole.substring(0, isDeleting ? displayText.length - 1 : displayText.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          py: 8,
        }}
      >
        {/* Animated Background Shapes */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            opacity: 0.4,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -50, 100, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                position: 'absolute',
                width: 300 + i * 100,
                height: 300 + i * 100,
                borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                background: `linear-gradient(45deg, ${theme.palette.primary.main}22, ${theme.palette.secondary?.main || theme.palette.primary.dark}22)`,
                top: `${20 * i}%`,
                left: `${30 * i}%`,
                filter: 'blur(60px)',
              }}
            />
          ))}
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '3rem', md: '5rem' },
              mb: 2,
              letterSpacing: '-0.02em',
              background: `linear-gradient(45deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Hi, I'm Pratik.
          </Typography>

          <Box sx={{ minHeight: '4rem', mb: 3 }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: { xs: '1.5rem', md: '2.5rem' },
                color: theme.palette.primary.main,
              }}
            >
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ borderLeft: `3px solid ${theme.palette.primary.main}`, marginLeft: '4px' }}
              />
            </Typography>
          </Box>

          <Typography
            variant="h6"
            sx={{
              maxWidth: '600px',
              mb: 5,
              color: theme.palette.text.secondary,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            I build scalable distributed systems, high-performance web applications, 
            and explore the frontiers of AI integration.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              component={Link}
              href="/projects"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                boxShadow: `0 8px 20px ${theme.palette.primary.main}44`,
              }}
            >
              View Projects
            </Button>
            <Button
              component={Link}
              href="/chatbot"
              variant="outlined"
              size="large"
              startIcon={<ChatIcon />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                backdropFilter: 'blur(10px)',
              }}
            >
              Chat with AI
            </Button>
          </Stack>
        </motion.div>
      </Box>
    </Container>
  );
}
