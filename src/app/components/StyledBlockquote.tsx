'use client';

import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import React from 'react';

export function StyledBlockquote({ ...props }) {
    const theme = useTheme();

    const sx = {
        m: 0,
        p: 2,
        borderLeft: `4px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
        borderRadius: 1,
        '& .MuiTypography-root': {
            color: 'text.secondary',
        }
    };

    return <Box component="blockquote" sx={sx} {...props} />;
}
