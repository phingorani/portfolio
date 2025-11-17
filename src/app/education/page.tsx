import { Typography, Container, Paper, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { educations } from '@/lib/education';
import Link from 'next/link';

export default function EducationPage() {
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
          Education
        </Typography>
        <List sx={{ width: '100%' }}>
          {educations.map((education) => (
            <Link key={education.slug} href={`/education/${education.slug}`} passHref>
              <ListItem key={education.slug} disablePadding>
                <ListItemButton>
                  <ListItemText primary={education.university} secondary={education.degree} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
