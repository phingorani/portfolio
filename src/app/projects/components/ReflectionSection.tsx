'use client';

import React from 'react';
import { Chip, List, ListItem, ListItemText, Typography } from '@mui/material';

const ReflectionItem = ({ text }: { text: string }) => {
    const phrasesToHighlight = [
        "Customization for the Audience:",
        "Lessons Learned:",
        "Feedback and Revisions:",
    ];

    let content: React.ReactNode = text;

    for (const phrase of phrasesToHighlight) {
        if (text.startsWith(phrase)) {
            content = (
                <>
                    <Chip
                        color="primary"
                        label={phrase}
                        size="small"
                        sx={{ mb: 1, mr: 1, mt:1 }}
                    />
                    <br />
                    {text.substring(phrase.length).trim()}
                </>
            );
            break;
        }
    }

    return <ListItemText primary={content} sx={{ '& .MuiListItemText-primary': { fontSize: '1.1rem', lineHeight: 1.7, color: 'text.primary' } }} />;
}


export const ReflectionSection = ({ text }: { text: string }) => {
    // Split the intro from the list
    const parts = text.split('\n\n- ');
    const introWithHeader = parts.shift() || '';
    const intro = introWithHeader.split('\n\n').slice(1).join('\n\n'); // remove the '###' title
    const listItems = parts.map(item => item.replace(/\*\*/g, '')); // remove bold markers

    return (
        <div>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                {intro}
            </Typography>
            <List sx={{ pl: 0, mb: 2 }}>
                {listItems.map((item, index) => (
                    <ListItem key={index} sx={{ display: 'list-item', p: 0, mb: 1, listStyleType: 'none' }}>
                        <ReflectionItem text={item} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};
