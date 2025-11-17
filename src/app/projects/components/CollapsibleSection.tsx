'use client';

import { PropsWithChildren } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface CollapsibleSectionProps {
  title: string;
  defaultExpanded?: boolean;
}

export function CollapsibleSection({ title, defaultExpanded = false, children }: PropsWithChildren<CollapsibleSectionProps>) {
  return (
    <Accordion defaultExpanded={defaultExpanded} sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${title}-content`} id={`${title}-header`}>
        <Typography variant="h5">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}
