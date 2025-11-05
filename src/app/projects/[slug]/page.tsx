import { Box, Typography, Container, Paper, Link, Button } from '@mui/material';
import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const slug = (await params).slug;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper 
        elevation={3} 
        sx={{ 
          mt: 8, 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h2" gutterBottom>
          {project.title}
        </Typography>
        <Box sx={{ mt: 4, width: '100%' }}>
          <ReactMarkdown>
            {project.description}
          </ReactMarkdown>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              component="a"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Button>
            {project.slug === 'ai-chatbot' && (
              <Button
                variant="contained"
                color="secondary"
                component="a"
                href="https://chatbot-lnoz14skvy.streamlit.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Demo
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
