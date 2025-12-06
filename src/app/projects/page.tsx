'use client';

import { useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardActions, Chip } from '@mui/material';
import { projects } from '@/lib/projects';
import { ProjectCardActions } from './components/ProjectCardActions';
import { ProjectDescription } from './components/ProjectDescription';
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

const allTags = Array.from(new Set(projects.flatMap((p) => p.techStack?.map((t) => t.name) || [])));

export default function ProjectsPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProjects = selectedTags.length
    ? projects.filter((project) =>
        project.techStack?.some((tech) => selectedTags.includes(tech.name))
      )
    : projects;

  return (
    <Container component="main" maxWidth="lg">
      <Typography component="h1" variant="h2" gutterBottom align="center" sx={{ mt: 8 }}>
        Projects
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 4 }}>
        {allTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => handleTagClick(tag)}
            color={selectedTags.includes(tag) ? 'primary' : 'default'}
            clickable
          />
        ))}
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {filteredProjects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={project.slug}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' }}
              transition={{ duration: 0.5 }}
              style={{ height: '100%' }}
            >
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {project.title}
                  </Typography>
                  <ProjectDescription project={project} />
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
