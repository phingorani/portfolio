'use client';

import { Box, Typography, Container, Grid, Card, CardContent, CardActions, Chip } from '@mui/material';
import { projects } from '../../lib/projects';
import { ProjectCardActions } from './components/ProjectCardActions';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ProjectsPage() {
  return (
    <Container component="main" maxWidth="lg">
      <Typography component="h1" variant="h2" gutterBottom align="center" sx={{ mt: 8 }}>
        Projects
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {projects.map((project, index) => (
          <Grid key={project.slug} size={{xs:12, sm:6, md:4}}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -5, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' }}
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              transition={{ delay: index * 0.1 }}
              style={{ height: '100%' }}
            >
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
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
