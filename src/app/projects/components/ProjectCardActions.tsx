'use client';

import { Button } from '@mui/material';
import Link from 'next/link';

interface ProjectCardActionsProps {
  slug: string;
  title: string;
}

export function ProjectCardActions({ slug, title }: ProjectCardActionsProps) {
  return (
    <Button
      component={Link}
      href={`/projects/${slug}`}
      size="small"
      aria-label={`Learn more about ${title}`}
      sx={{
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      Learn More
    </Button>
  );
}
