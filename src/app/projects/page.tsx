import { Box, Typography, Container, Paper, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { projects } from '@/lib/projects';
import Link from 'next/link';

export default function ProjectsPage() {
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
          Projects
        </Typography>
        <List sx={{ width: '100%' }}>
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} passHref>
              <ListItem key={project.slug} disablePadding>
                <ListItemButton>
                  <ListItemText primary={project.title} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
