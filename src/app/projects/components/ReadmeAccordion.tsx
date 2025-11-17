'use client';

import { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, CircularProgress, Box, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ReadmeAccordionProps {
  url: string;
}

export function ReadmeAccordion({ url }: ReadmeAccordionProps) {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const text = await response.text();
          setContent(text);
        }
      } catch (error) {
        console.error('Error fetching README:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadme();
  }, [url]);

  const getImageUrl = (src: string) => {
    if (src.startsWith('http')) {
      return src;
    }
    // Construct the base URL from the README URL
    const baseUrl = url.substring(0, url.lastIndexOf('/') + 1);
    return `${baseUrl}${src.replace(/^\.\//, '')}`;
  };

  const components: Components = {
    p: ({ ...props }) => (
      <Typography
        variant="body1"
        paragraph
        {...props}
        sx={{ marginBottom: '1em', textAlign: 'left' }}
      />
    ),
    h1: ({ ...props }) => (
      <Typography variant="h4" gutterBottom {...props} sx={{ textAlign: 'left' }} />
    ),
    h2: ({ ...props }) => (
      <Typography variant="h5" gutterBottom {...props} sx={{ textAlign: 'left' }} />
    ),
    h3: ({ ...props }) => (
      <Typography variant="h6" gutterBottom {...props} sx={{ textAlign: 'left' }} />
    ),
    li: ({ ...props }) => (
      <li style={{ marginBottom: '8px' }}>
        <Typography variant="body1" component="span" {...props} sx={{ textAlign: 'left' }} />
      </li>
    ),
    a: ({ ...props }) => <Link {...props} />,
    img: ({ src, ...props }) => {
      if (!src || typeof src !== 'string') {
        return null;
      }
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={getImageUrl(src)} alt={props.alt || ''} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginBottom: '1em' }} {...props} />
      );
    },
  };

  return (
    <Accordion sx={{ mt: 4 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="readme-content"
        id="readme-header"
      >
        <Typography variant="h6">README.md</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ textAlign: 'left' }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={components}
            >
              {content || 'Could not load README.'}
            </ReactMarkdown>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
