'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Avatar,
  CircularProgress,
  useTheme,
  Chip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useChat } from '@ai-sdk/react';

export default function ChatbotPage() {
  const theme = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [attachedText, setAttachedText] = useState<string | null>(null);
  const [attachedFilename, setAttachedFilename] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { messages, status } = useChat();

  const isLoading = status === 'streaming' || status === 'submitted' || isExtracting;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to extract text');

      const data = await response.json();
      setAttachedText(data.text);
      setAttachedFilename(data.filename);
    } catch (error) {
      console.error('File upload error:', error);
      alert('Failed to extract text from file.');
    } finally {
      setIsExtracting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeAttachment = () => {
    setAttachedText(null);
    setAttachedFilename(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('message') as HTMLInputElement;
    
    if (!input.value.trim() && !attachedText) return;

    let finalInput = input.value;
    if (attachedText) {
        finalInput = `[File Attached: ${attachedFilename}]\n\nContext from file:\n${attachedText}\n\nUser Question: ${input.value}`;
    }

    await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, { role: 'user', content: finalInput }] }),
    });
    
    input.value = '';
    setAttachedText(null);
    setAttachedFilename(null);
  };

  const renderMessageContent = (msg: { id: string; role: string; content?: string }) => {
    return msg.content || '';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 120px)',
        maxWidth: '800px',
        mx: 'auto',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        AI Chat Assistant
      </Typography>

      <Paper
        elevation={3}
        sx={{
          flexGrow: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            mb: 2,
            pr: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-start',
                gap: 1,
              }}
            >
              {msg.role === 'assistant' && (
                <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32 }}>
                  <SmartToyIcon fontSize="small" />
                </Avatar>
              )}
              
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  maxWidth: '70%',
                  borderRadius: 2,
                  bgcolor:
                    msg.role === 'user'
                      ? theme.palette.primary.main
                      : theme.palette.mode === 'light'
                      ? 'grey.200'
                      : 'grey.800',
                  color:
                    msg.role === 'user'
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                  wordBreak: 'break-word',
                  '& p': { m: 0 },
                  '& a': { color: 'inherit', textDecoration: 'underline' },
                  '& code': { 
                      bgcolor: 'rgba(0,0,0,0.1)', 
                      p: 0.5, 
                      borderRadius: 1,
                      fontFamily: 'monospace'
                  },
                  '& pre': {
                      bgcolor: 'rgba(0,0,0,0.2)',
                      p: 1,
                      borderRadius: 1,
                      overflowX: 'auto'
                  }
                }}
              >
                {msg.role === 'assistant' ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {renderMessageContent(msg)}
                  </ReactMarkdown>
                ) : (
                  <Typography variant="body1">{renderMessageContent(msg)}</Typography>
                )}
              </Paper>

              {msg.role === 'user' && (
                <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 32, height: 32 }}>
                  <PersonIcon fontSize="small" />
                </Avatar>
              )}
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {attachedFilename && (
            <Box sx={{ display: 'flex', mb: 1 }}>
              <Chip
                label={attachedFilename}
                onDelete={removeAttachment}
                deleteIcon={<CloseIcon />}
                color="primary"
                variant="outlined"
              />
            </Box>
          )}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
                accept=".pdf,.txt,.md"
            />
            <IconButton
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                color="primary"
                sx={{ borderRadius: 2 }}
            >
                <AttachFileIcon />
            </IconButton>
            <TextField
                name="message"
                fullWidth
                placeholder={attachedText ? "Ask about the file..." : "Type your message..."}
                multiline
                maxRows={4}
                disabled={isLoading}
                variant="outlined"
                size="medium"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                    }
                }}
            />
            <IconButton
                type="submit"
                color="primary"
                disabled={isLoading}
                sx={{ 
                    height: 56, 
                    width: 56,
                    borderRadius: 2,
                    bgcolor: isLoading ? 'action.disabledBackground' : 'primary.main',
                    color: isLoading ? 'action.disabled' : 'primary.contrastText',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    }
                }}
            >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
