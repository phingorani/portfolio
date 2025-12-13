import { Container, Typography, Box } from '@mui/material';
import { getSortedPostsData } from '@/lib/posts';
import { BlogList } from './components/BlogList';
import { NewsletterSignup } from '../components/NewsletterSignup';

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 8 }}>
      <Typography component="h1" variant="h2" gutterBottom align="center">
        Blog
      </Typography>
      <Box sx={{ mt: 4 }}>
        <BlogList posts={allPostsData} />
        <NewsletterSignup />
      </Box>
    </Container>
  );
}
