'use client';
import { Box, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import { AnimateOnScroll } from "@/app/components/AnimateOnScroll";

interface Section {
    id: string;
    title: string;
    imageUrl: string;
}

interface ImageNavigationProps {
    sections: Section[];
}

export const ImageNavigation = ({ sections }: ImageNavigationProps) => {
    const handleScroll = (event: React.MouseEvent<HTMLDivElement>, sectionId: string) => {
        event.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <AnimateOnScroll>
            <Box sx={{
                display: 'flex',
                gap: 2,
                p: 2,
                mb: 4,
                overflowX: 'auto',
                justifyContent: 'center'
            }}>
                {sections.map((section) => (
                    <Paper
                        key={section.id}
                        elevation={4}
                        sx={{
                            cursor: 'pointer',
                            overflow: 'hidden',
                            borderRadius: 2,
                            flexShrink: 0,
                            transition: 'transform 0.3s ease-in-out, filter 0.3s ease-in-out',
                            filter: 'grayscale(100%)',
                            '&:hover': {
                                transform: 'scale(1.2)',
                                filter: 'grayscale(0%)',
                            },
                        }}
                        onClick={(e) => handleScroll(e, section.id)}
                    >
                        <Box sx={{ position: 'relative', width: 150, height: 100 }}>
                            <Image
                                src={section.imageUrl}
                                alt={section.title}
                                layout="fill"
                                objectFit="cover"
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                    color: 'white',
                                    p: 1,
                                    textAlign: 'center',
                                }}
                            >
                                <Typography variant="caption" component="div">
                                    {section.title}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </AnimateOnScroll>
    );
};
