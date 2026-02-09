'use client';

import React, { useState, useEffect } from 'react';
import { Box, TextField, Chip, FormControl, InputLabel, Select, MenuItem, Button, Skeleton, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/projects';

interface ProjectFilterProps {
  projects: Project[];
  onFilterChange: (filteredProjects: Project[]) => void;
}

export const ProjectFilter = ({ projects, onFilterChange }: ProjectFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Extract all unique technologies and categories
  const [allTechnologies, setAllTechnologies] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Extract unique technologies and categories
      const techSet = new Set<string>();
      const categorySet = new Set<string>();
      
      projects.forEach(project => {
        if (project.techStack) {
          project.techStack.forEach(tech => {
            techSet.add(tech.name);
          });
        }
        // For simplicity, we'll use a fixed list of categories since they're not consistently used in the data
        // In a real app, you'd want to derive categories from the projects
      });
      
      setAllTechnologies(Array.from(techSet));
      setCategories(['Web App', 'AI/ML', 'Data Science', 'Mobile', 'Desktop']);
    }, 500);

    return () => clearTimeout(timer);
  }, [projects]);

  // Apply filters
  useEffect(() => {
    if (isLoading) return;

    let filtered = [...projects];

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.techStack && project.techStack.some(tech => tech.name.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    // Apply technology filter
    if (selectedTech.length > 0) {
      filtered = filtered.filter(project =>
        project.techStack && project.techStack.some(tech => selectedTech.includes(tech.name))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      // For demo purposes, we don't implement actual category filtering
      // In a real application, you'd have consistent category fields
    }

    onFilterChange(filtered);
  }, [searchTerm, selectedTech, selectedCategory, projects, isLoading, onFilterChange]);

  const handleTechToggle = (tech: string) => {
    setSelectedTech(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTech([]);
    setSelectedCategory('all');
  };

  if (isLoading) {
    return (
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={40} />
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      {/* Search */}
      <TextField
        fullWidth
        label="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Technology Tags */}
      <Typography variant="subtitle2" gutterBottom>
        Technologies:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {allTechnologies.map(tech => (
          <Chip
            key={tech}
            label={tech}
            onClick={() => handleTechToggle(tech)}
            color={selectedTech.includes(tech) ? 'primary' : 'default'}
            variant={selectedTech.includes(tech) ? 'filled' : 'outlined'}
            size="small"
          />
        ))}
      </Box>

      {/* Active Filters */}
      {selectedTech.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {selectedTech.map(tech => (
            <Chip
              key={tech}
              label={`Technology: ${tech}`}
              onDelete={() => handleTechToggle(tech)}
              size="small"
            />
          ))}
        </Box>
      )}

      {/* Clear Filters Button */}
      {(searchTerm || selectedTech.length > 0) && (
        <Button 
          onClick={clearFilters} 
          size="small"
          variant="outlined"
          color="secondary"
        >
          Clear Filters
        </Button>
      )}
    </Box>
  );
};