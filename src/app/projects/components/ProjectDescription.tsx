'use client';

import { useState } from 'react';
import { Typography, Collapse, IconButton, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactMarkdown from 'react-markdown';
import { Project } from '@/lib/projects';

import { Components } from 'react-markdown';

interface ProjectDescriptionProps {
  project: Project;
}

const components: Components = {
  img: ({ src, ...props }) => {
    if (!src || typeof src !== 'string') {
      return null;
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={props.alt || ''} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginBottom: '1em' }} {...props} />
    );
  },
  p: (props) => <Typography variant="body1" paragraph {...props} sx={{ marginBottom: '1em', textAlign: 'center' }} />,
};

export function ProjectDescription({ project }: ProjectDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {project.description === project.shortDescription ? (
        <ReactMarkdown components={components}>{project.description}</ReactMarkdown>
      ) : (
        <>
          <ReactMarkdown components={components}>{project.shortDescription}</ReactMarkdown>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <ReactMarkdown components={components}>{project.description}</ReactMarkdown>
          </Collapse>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              sx={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: (theme) => theme.transitions.create('transform', {
                  duration: theme.transitions.duration.shortest,
                }),
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </>
      )}
    </>
  );
}