import { Box, Typography, Container, Grid, Card, CardContent, CardActions, Chip } from '@mui/material';
import { projects } from '../../lib/projects';
import { ProjectCardActions } from './components/ProjectCardActions';

export default function ProjectsPage() {
  return (
    <Container component="main" maxWidth="lg">
      <Typography component="h1" variant="h2" gutterBottom align="center" sx={{ mt: 8 }}>
        Projects
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {projects.map((project) => (
          <Grid key={project.slug} size={{xs:12 , sm:6,  md:4}}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {project.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  {project.shortDescription}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {project.techStack?.slice(0, 4).map((tech) => (
                    <Chip key={tech.name} label={tech.name} size="small" />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <ProjectCardActions slug={project.slug} title={project.title} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
