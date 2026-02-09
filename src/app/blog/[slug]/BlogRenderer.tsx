'use client';

import { Container, Typography, Box, Paper } from '@mui/material';
import { Post } from '@/lib/posts';
import { MarkdownMUI } from '@/app/projects/components/MarkdownMUI';
import { NewsletterSignup } from '@/app/components/NewsletterSignup';

interface BlogRendererProps {
    postData: Post;
}

export default function BlogRenderer({ postData }: BlogRendererProps) {
    if (!postData) {
        return null;
    }

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 8, mb: 8 }}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
                <article>
                    <Typography component="h1" variant="h2" gutterBottom align="center">
                        {postData.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
                        {new Date(postData.date).toLocaleDateString()}
                    </Typography>
                    <Box>
                        <MarkdownMUI text={postData.content} />
                    </Box>
                </article>
            </Paper>
            <NewsletterSignup />
        </Container>
    );
}
