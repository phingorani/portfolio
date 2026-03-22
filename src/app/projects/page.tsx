'use client';

import { useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardActions, Chip, Button, IconButton } from '@mui/material';
import { projects } from '@/lib/projects';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from 'next/link';

const allTags = Array.from(new Set(projects.flatMap((p) => p.techStack?.map((t) => t.name) || [])));
const categories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));

const statusColors: Record<string, string> = {
  live: '#22c55e',
  active: '#3b82f6',
  stable: '#a855f7',
};

const categoryColors: Record<string, string> = {
  Infrastructure: '#f59e0b',
  'AI/ML': '#ec4899',
  'Full Stack': '#06b6d4',
};

export default function ProjectsPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory((prev) => (prev === cat ? null : cat));
  };

  const filteredProjects = projects.filter((project) => {
    const matchesTags = selectedTags.length === 0 || project.techStack?.some((tech) => selectedTags.includes(tech.name));
    const matchesCategory = !selectedCategory || project.category === selectedCategory;
    return matchesTags && matchesCategory;
  });

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ mt: 8, mb: 2, textAlign: 'center' }}>
        <Typography
          component="h1"
          variant="h2"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Projects
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
          Infrastructure, AI, and full-stack projects running on a self-hosted homelab — Kubernetes clusters, LLM routers, real-time threat maps, and more.
        </Typography>
      </Box>

      {/* Category filters */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 2 }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            onClick={() => handleCategoryClick(cat!)}
            sx={{
              fontWeight: 600,
              borderColor: categoryColors[cat!] || '#888',
              color: selectedCategory === cat ? '#fff' : undefined,
              backgroundColor: selectedCategory === cat ? categoryColors[cat!] : undefined,
              '&:hover': {
                backgroundColor: selectedCategory === cat ? categoryColors[cat!] : undefined,
                opacity: 0.9,
              },
            }}
            variant={selectedCategory === cat ? 'filled' : 'outlined'}
            clickable
          />
        ))}
      </Box>

      {/* Tech tag filters */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.5, mb: 4 }}>
        {allTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => handleTagClick(tag)}
            color={selectedTags.includes(tag) ? 'primary' : 'default'}
            size="small"
            clickable
          />
        ))}
      </Box>

      <Grid container spacing={3}>
        {filteredProjects.map((project, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={project.slug}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              style={{ height: '100%' }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) =>
                      theme.palette.mode === 'dark'
                        ? '0 12px 40px rgba(0,0,0,0.5)'
                        : '0 12px 40px rgba(31,38,135,0.2)',
                  },
                }}
              >
                {/* Status + category badges */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 3, pt: 2.5 }}>
                  {project.status && (
                    <Chip
                      label={project.status}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        height: 22,
                        backgroundColor: `${statusColors[project.status]}18`,
                        color: statusColors[project.status],
                        border: `1px solid ${statusColors[project.status]}40`,
                      }}
                    />
                  )}
                  {project.category && (
                    <Chip
                      label={project.category}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.65rem',
                        height: 22,
                        backgroundColor: `${categoryColors[project.category] || '#888'}18`,
                        color: categoryColors[project.category] || '#888',
                        border: `1px solid ${categoryColors[project.category] || '#888'}40`,
                      }}
                    />
                  )}
                  {project.highlight && (
                    <Typography
                      variant="caption"
                      sx={{
                        ml: 'auto',
                        fontFamily: 'var(--font-geist-mono)',
                        color: 'text.secondary',
                        fontSize: '0.7rem',
                      }}
                    >
                      {project.highlight}
                    </Typography>
                  )}
                </Box>

                <CardContent sx={{ flex: 1, px: 3, pt: 1.5 }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: 700, mb: 1, lineHeight: 1.3 }}
                  >
                    {project.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, lineHeight: 1.6 }}
                  >
                    {project.shortDescription}
                  </Typography>

                  {/* Tech stack */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {project.techStack?.map((tech) => (
                      <Chip
                        key={tech.name}
                        label={tech.name}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontSize: '0.7rem',
                          height: 24,
                          borderColor: 'divider',
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>

                <CardActions sx={{ px: 3, pb: 2, pt: 0, gap: 1 }}>
                  <Button
                    component={Link}
                    href={`/projects/${project.slug}`}
                    size="small"
                    variant="text"
                    sx={{ fontWeight: 600, fontSize: '0.8rem' }}
                  >
                    View Details
                  </Button>
                  <Box sx={{ ml: 'auto', display: 'flex', gap: 0.5 }}>
                    {project.demoUrl && (
                      <IconButton
                        component="a"
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        color="primary"
                        title="Live Demo"
                      >
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton
                      component="a"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      title="GitHub"
                    >
                      <GitHubIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
