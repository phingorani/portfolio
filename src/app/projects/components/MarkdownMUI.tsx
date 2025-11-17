'use client';

import { Box, Link, Typography } from '@mui/material';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownMUIProps {
  text: string;
}

// Client-side Markdown renderer that maps common markdown elements to MUI Typography
// This avoids passing function-based renderers from Server Components across client boundaries.
export function MarkdownMUI({ text }: MarkdownMUIProps) {
  const components: Components = {
    p: ({ ...props }) => (
      <Typography variant="body1" paragraph {...props} sx={{ marginBottom: '1em', textAlign: 'left' }} />
    ),
    h1: ({ ...props }) => <Typography variant="h4" gutterBottom {...props} sx={{ textAlign: 'left' }} />,
    h2: ({ ...props }) => <Typography variant="h5" gutterBottom {...props} sx={{ textAlign: 'left' }} />,
    h3: ({ ...props }) => <Typography variant="h6" gutterBottom {...props} sx={{ textAlign: 'left' }} />,
    // Ensure level-4 headings (e.g., "#### Reflection") render bold and left-aligned
    h4: ({ ...props }) => (
      <Typography
        variant="h6"
        gutterBottom
        {...props}
        sx={{ textAlign: 'left', fontWeight: 'bold' }}
      />
    ),
    li: ({ ...props }) => (
      <li style={{ marginBottom: '8px' }}>
        <Typography variant="body1" component="span" {...props} sx={{ textAlign: 'left' }} />
      </li>
    ),
    a: ({ ...props }) => <Link {...props} />,
    img: ({ src, ...props }) => {
      if (!src || typeof src !== 'string') return null;
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <img
          src={src}
          alt={props.alt || ''}
          style={{ maxWidth: '100%', height: 'auto', borderRadius: 8, border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginBottom: '1em' }}
          {...props}
        />
      );
    },
  };

  return (
    <Box sx={{ textAlign: 'left' }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {text}
      </ReactMarkdown>
    </Box>
  );
}
