import { Box, Typography, Container, Paper, List, ListItem, ListItemText } from '@mui/material';
import { experiences } from '@/lib/experience';
import { notFound } from 'next/navigation';

interface ExperiencePageProps {
  params: {
    slug: string;
  };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const slug = (await params).slug;
  const experience = experiences.find((e) => e.slug === slug);

  if (!experience) {
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
          {experience.company}
        </Typography>
        <Typography component="h2" variant="h5" color="text.secondary" gutterBottom>
          {experience.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {experience.date}
        </Typography>
        <Box sx={{ mt: 4, width: '100%' }}>
          <List dense>
            {experience.description.map((point, index) => (
              <ListItem key={index}>
                <ListItemText primary={point} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Container>
  );
}

export async function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}
