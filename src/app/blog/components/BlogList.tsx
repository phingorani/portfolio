'use client';

import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { Post } from '@/lib/posts';

interface BlogListProps {
  posts: Post[];
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <Grid container spacing={4} sx={{ mt: 4 }}>
      {posts.map((post: Post) => (
        <Grid item xs={12} key={post.slug}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                <Link href={`/blog/${post.slug}`} passHref>
                  {post.title}
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                {new Date(post.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                {post.excerpt}
              </Typography>
              <Button component={Link} href={`/blog/${post.slug}`} size="small" sx={{ mt: 2 }}>
                Read More
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
