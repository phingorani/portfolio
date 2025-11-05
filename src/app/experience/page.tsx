import { Box, Typography, Container, Paper, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { experiences } from '@/lib/experience';
import Link from 'next/link';

export default function ExperiencePage() {
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
          Experience
        </Typography>
        <List sx={{ width: '100%' }}>
          {experiences.map((experience) => (
            <Link key={experience.slug} href={`/experience/${experience.slug}`} passHref>
              <ListItem key={experience.slug} disablePadding>
                <ListItemButton>
                  <ListItemText primary={experience.company} secondary={experience.title} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
