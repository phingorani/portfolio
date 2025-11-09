import { Box, Typography, Container, Paper, Link, Button, Chip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
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
          {project.techStack && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Tech Stack
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {project.techStack.map((tech) => (
                  <Chip
                    key={tech.name}
                    label={tech.name}
                    component="a"
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    clickable
                  />
                ))}
              </Box>
            </Box>
          )}
          {project.architecture && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Architecture
              </Typography>
              <ReactMarkdown>
                {project.architecture}
              </ReactMarkdown>
            </Box>
          )}
          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              component="a"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
            >
              View on <GitHubIcon sx={{ ml: 1 }} />
            </Button>
            {project.slug === 'ai-chatbot' && (
              <Button
                variant="contained"
                color="secondary"
                component="a"
                href="https://chatbot-lnoz14skvy.streamlit.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View a demo of ${project.title}`}
              >
                View Demo
              </Button>
            )}
            {project.slug === 'image-recognition' && (
              <Button
                variant="contained"
                color="secondary"
                component="a"
                href="https://image-rec.streamlit.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View a demo of ${project.title}`}
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
