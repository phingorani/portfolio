'use client';

import { Button } from '@mui/material';
import Link from 'next/link';

interface ProjectCardActionsProps {
  slug: string;
  title: string;
}

export function ProjectCardActions({ slug, title }: ProjectCardActionsProps) {
  return (
    <Button component={Link} href={`/projects/${slug}`} size="small" aria-label={`Learn more about ${title}`}>
      Learn More
    </Button>
  );
}
