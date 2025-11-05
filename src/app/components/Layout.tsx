'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme, Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School'; // Icon for education
import { useColorMode } from '../ThemeRegistry';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { experiences } from '@/lib/experience';
import { educations } from '@/lib/education'; // Import educations
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';
import BusinessIcon from '@mui/icons-material/Business';

const drawerWidth = 240;

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false); // State for education
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProjectsClick = () => {
    setProjectsOpen(!projectsOpen);
  };

  const handleExperienceClick = () => {
    setExperienceOpen(!experienceOpen);
  };

  const handleEducationClick = () => { // Handler for education
    setEducationOpen(!educationOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/about">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="About Me" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleProjectsClick}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
            {projectsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={projectsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {projects.map((project) => (
              <ListItem key={project.slug} disablePadding>
                <ListItemButton component={Link} href={`/projects/${project.slug}`} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText primary={project.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
        {/* Experience Menu Item */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleExperienceClick}>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Experience" />
            {experienceOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={experienceOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {experiences.map((experience) => (
              <ListItem key={experience.slug} disablePadding>
                <ListItemButton component={Link} href={`/experience/${experience.slug}`} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText primary={experience.company} secondary={experience.date} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
        {/* Education Menu Item */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleEducationClick}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Education" />
            {educationOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={educationOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {educations.map((education) => (
              <ListItem key={education.slug} disablePadding>
                <ListItemButton component={Link} href={`/education/${education.slug}`} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText primary={education.university} secondary={education.date} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Pratik Hingorani
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, backgroundColor: theme.palette.background.default }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
