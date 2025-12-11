'use client';

import { PropsWithChildren } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface CollapsibleSectionProps {
  title: string;
  expanded: boolean;
  id: string;
  onChange: (id: string, isExpanded: boolean) => void;
}

export function CollapsibleSection({ title, expanded, id, onChange, children }: PropsWithChildren<CollapsibleSectionProps>) {
  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    onChange(id, isExpanded);
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange} sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${id}-content`} id={id}>
        <Typography variant="h5">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}