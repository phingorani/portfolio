'use client';

import { Container, Typography, Box } from '@mui/material';
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
            <NewsletterSignup />
        </Container>
    );
}
