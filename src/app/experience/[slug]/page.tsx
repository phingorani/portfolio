import { Box, Typography, Container, Paper, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { experiences } from '@/lib/experience';
import { notFound } from 'next/navigation';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import StarIcon from '@mui/icons-material/Star';
import { HyattIcon } from '../../components/icons/HyattIcon';
import { JPMorganIcon } from '../../components/icons/JPMorganIcon';

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          {experience.slug.includes('hyatt') && <HyattIcon width={200} height={200} />}
          {experience.slug.includes('jpmorgan') && <JPMorganIcon width={230} height={230} />}
        </Box>
        <Typography component="h2" variant="h5" color="text.secondary" gutterBottom>
          {experience.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {experience.date}
        </Typography>
        <Box sx={{ mt: 4, width: '100%' }}>
          <List>
            {experience.description.map((point, index) => (
              <ListItem key={index} sx={{
                backgroundColor: point.keyAchievement ? 'primary.main' : 'transparent',
                color: point.keyAchievement ? 'primary.contrastText' : 'inherit',
                borderRadius: 1,
                mb: 1,
              }}>
                <ListItemIcon>
                  {point.keyAchievement ? <StarIcon sx={{ color: 'common.white' }} /> : <ArrowRightIcon />}
                </ListItemIcon>
                <ListItemText primary={point.text} />
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
