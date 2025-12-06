import { Container, Typography } from '@mui/material';
import { getSortedPostsData } from '@/lib/posts';
import { BlogList } from './components/BlogList';

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 8 }}>
      <Typography component="h1" variant="h2" gutterBottom align="center">
        Blog
      </Typography>
      <BlogList posts={allPostsData} />
    </Container>
  );
}
