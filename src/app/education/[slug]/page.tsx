import { Box, Typography, Container, Paper } from '@mui/material';
import { educations } from '@/lib/education';
import { notFound } from 'next/navigation';

interface EducationPageProps {
  params: {
    slug: string;
  };
}

export default async function EducationPage({ params }: EducationPageProps) {
  const slug = (await params).slug;
  const education = educations.find((e) => e.slug === slug);

  if (!education) {
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
          {education.university}
        </Typography>
        <Typography component="h2" variant="h5" color="text.secondary" gutterBottom>
          {education.degree}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {education.date}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {education.location}
        </Typography>
      </Paper>
    </Container>
  );
}

export async function generateStaticParams() {
  return educations.map((e) => ({ slug: e.slug }));
}
