import { Container, Typography, Box } from '@mui/material';
import { getPostData, getAllPostSlugs, Post } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { MarkdownMUI } from '@/app/projects/components/MarkdownMUI';

interface BlogPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const paths = getAllPostSlugs();
    return paths.map(p => ({ slug: p.params.slug }));
}

export default async function PostPage({ params }: BlogPageProps) {
  const slug = (await params).slug;
  const postData: Post = getPostData(slug);

  if (!postData) {
    return notFound();
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
    </Container>
  );
}
