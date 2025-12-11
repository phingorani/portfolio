'use client';

import { Box, Link, Typography, List, ListItem } from '@mui/material';

interface Section {
  title: string;
  id: string;
}

interface ProjectAnchorNavProps {
  sections: Section[];
  onLinkClick: (id: string) => void; // Added onLinkClick prop
}

export function ProjectAnchorNav({ sections, onLinkClick }: ProjectAnchorNavProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Prevent default anchor navigation
    onLinkClick(id);
    // Manually scroll to the section if needed, or let the parent component handle it.
    // For now, we rely on the browser's default behavior after state update if we don't
    // explicitly scroll here.
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box sx={{ mb: 4, p: 2, borderLeft: '3px solid', borderColor: 'primary.main', bgcolor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom>
        On This Page
      </Typography>
      <List dense disablePadding>
        {sections.map((section) => (
          <ListItem key={section.id} disablePadding sx={{ py: 0.5 }}>
            <Link
              href={`#${section.id}`}
              underline="hover"
              color="text.secondary"
              onClick={(e) => handleClick(e, section.id)}
            >
              {section.title}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
