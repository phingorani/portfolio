'use client';
import React, { useRef, useState } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { AppBar as MuiAppBar, Toolbar, IconButton, Typography, Box, Drawer as MuiDrawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme, Collapse, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import { useColorMode } from '../ThemeRegistry';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { experiences } from '@/lib/experience';
import { educations } from '@/lib/education';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';
import BusinessIcon from '@mui/icons-material/Business';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

const drawerWidth = 340;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const NavMenuItem = ({
  open,
  handleNavClick,
  icon,
  text,
  href,
  items,
  itemKey,
  itemText,
  itemSecondaryText,
}: {
  open: boolean;
  handleNavClick: (href?: string) => void;
  icon: React.ReactNode;
  text: string;
  href: string;
  items: any[];
  itemKey: string;
  itemText: string;
  itemSecondaryText?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          onClick={() => handleNavClick(href)}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          aria-label={text}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        {open && (
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </ListItem>
      <Collapse in={isOpen && open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item) => (
            <ListItem key={item[itemKey]} disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={Link} href={`${href}/${item[itemKey]}`} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary={item[itemText]} secondary={itemSecondaryText ? item[itemSecondaryText] : undefined} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export function Layout({ children }: { children: React.ReactNode }) {
  // "open" represents the pinned state (manual toggle via click)
  const [open, setOpen] = useState(false);
  // Hover state temporarily expands the nav when not pinned
  const [hovering, setHovering] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const pathname = usePathname();
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Effective open state: pinned open OR currently hovering
  const effectiveOpen = open || hovering;

  const handleMouseEnter = () => {
    // Cancel pending close and set hovering true for immediate expansion
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHovering(true);
  };

  const handleMouseLeave = () => {
    // Small delay to prevent flicker when cursor briefly leaves the drawer
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setHovering(false);
      hoverTimeoutRef.current = null;
    }, 150);
  };

  const handleNavClick = (href?: string) => {
    if (!effectiveOpen) {
      // If collapsed, first interaction pins it open
      handleDrawerOpen();
    } else if (href) {
      // If already open, navigate
      router.push(href);
    }
  };

  const drawerContent = (
    <div>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose} aria-label="close drawer">
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={() => handleNavClick('/about')}
            sx={{
              minHeight: 48,
              justifyContent: effectiveOpen ? 'initial' : 'center',
              px: 2.5,
            }}
            aria-label="About Me"
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: effectiveOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <Avatar
                alt="Pratik Hingorani"
                src="/img.png"
                sx={{ width: 24, height: 24 }}
              />
            </ListItemIcon>
            <ListItemText primary="About Me" sx={{ opacity: effectiveOpen ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <NavMenuItem
          open={effectiveOpen}
          handleNavClick={handleNavClick}
          icon={<WorkIcon />}
          text="Projects"
          href="/projects"
          items={projects}
          itemKey="slug"
          itemText="title"
        />
        <NavMenuItem
          open={effectiveOpen}
          handleNavClick={handleNavClick}
          icon={<BusinessIcon />}
          text="Experience"
          href="/experience"
          items={experiences}
          itemKey="slug"
          itemText="company"
          itemSecondaryText="date"
        />
        <NavMenuItem
          open={effectiveOpen}
          handleNavClick={handleNavClick}
          icon={<SchoolIcon />}
          text="Education"
          href="/education"
          items={educations}
          itemKey="slug"
          itemText="university"
          itemSecondaryText="date"
        />
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                onClick={() => handleNavClick('/blog')}
                sx={{
                    minHeight: 48,
                    justifyContent: effectiveOpen ? 'initial' : 'center',
                    px: 2.5,
                }}
                aria-label="Blog"
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: effectiveOpen ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Blog" sx={{ opacity: effectiveOpen ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" open={effectiveOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(effectiveOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Pratik Hingorani
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit" aria-label="toggle light and dark mode">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={effectiveOpen}
        PaperProps={{
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
        }}
      >
        {drawerContent}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: theme.palette.background.default }}>
        <DrawerHeader />
        <AnimatePresence>
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
