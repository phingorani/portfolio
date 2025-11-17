'use client';

import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { MarkdownMUI } from './MarkdownMUI';

interface ValuePropositionExpandableProps {
  shortText: string;
  longText: string;
}

export function ValuePropositionExpandable({ shortText, longText }: ValuePropositionExpandableProps) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded((v) => !v);

  return (
    <Box sx={{ textAlign: 'left' }}>
      {/* Always show the short value proposition */}
      <MarkdownMUI text={shortText} />

      {/* When expanded, also show the long value proposition below */}
      {expanded && (
        <Box sx={{ mt: 1 }}>
          <MarkdownMUI text={longText} />
        </Box>
      )}
      <Button
        size="small"
        onClick={toggle}
        sx={{ mt: 1 }}
        aria-expanded={expanded}
        aria-label={expanded ? 'Show less value proposition details' : 'Show more value proposition details'}
      >
        {expanded ? 'Show less' : 'Show more'}
      </Button>
    </Box>
  );
}
