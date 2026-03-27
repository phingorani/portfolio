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
import { Project } from '@/lib/projects';
import { Experience } from '@/lib/experience';
import { Education } from '@/lib/education';
import { projects } from '@/lib/projects';
import { experiences } from '@/lib/experience';
import { educations } from '@/lib/education';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';
import BusinessIcon from '@mui/icons-material/Business';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MapIcon from '@mui/icons-material/Map';
import TranslateIcon from '@mui/icons-material/Translate';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import HolidaySwitcher from './HolidaySwitcher';
import HolidayProvider from './HolidayProvider';
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
    whiteSpace: open ? 'normal' : 'nowrap', // Conditionally apply whiteSpace
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

// Generic NavMenuItem component
const NavMenuItem = <T extends { slug: string; title?: string; company?: string; university?: string }>({
  open,
  handleNavClick,
  icon,
  text,
  href,
  items,
  itemKey,
  itemText,
  itemSecondaryText,
  pathname,
}: {
  open: boolean;
  handleNavClick: (href?: string) => void;
  icon: React.ReactNode;
  text: string;
  href: string;
  items: T[];
  itemKey: keyof T;
  itemText: keyof T;
  itemSecondaryText?: keyof T;
  pathname: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          onClick={() => handleNavClick(href)}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            ...(isActive && {
              backgroundColor: 'rgba(255, 152, 0, 0.08)',
              borderLeft: '3px solid',
              borderLeftColor: 'primary.main',
              '& .MuiListItemIcon-root': { color: 'primary.main' },
            }),
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
            <ListItem key={item[itemKey] as string} disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={Link} href={`${href}/${item.slug}`} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={item[itemText] as string}
                  secondary={itemSecondaryText ? (item[itemSecondaryText] as string) : undefined}
                />
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
  const [holidayOverride, setHolidayOverride] = useState('auto');

  const handleHolidayChange = (holidayName: string) => {
    setHolidayOverride(holidayName);
  };

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
              ...((pathname === '/about' || pathname.startsWith('/about/')) && {
                backgroundColor: 'rgba(255, 152, 0, 0.08)',
                borderLeft: '3px solid',
                borderLeftColor: 'primary.main',
                '& .MuiListItemIcon-root': { color: 'primary.main' },
              }),
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
              <Image
                alt="Pratik Hingorani"
                src="/img.png"
                width={24}
                height={24}
                priority
              />
            </ListItemIcon>
            <ListItemText primary="About Me" sx={{ opacity: effectiveOpen ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <NavMenuItem<Project>
          open={effectiveOpen}
          handleNavClick={handleNavClick}
          icon={<WorkIcon />}
          text="Projects"
          href="/projects"
          items={projects}
          itemKey="slug"
          itemText="title"
          pathname={pathname}
        />
        <NavMenuItem<Experience>
          open={effectiveOpen}
          handleNavClick={handleNavClick}
          icon={<BusinessIcon />}
          text="Experience"
          href="/experience"
          items={experiences}
          itemKey="slug"
          itemText="company"
          itemSecondaryText="date"
          pathname={pathname}
        />
        <NavMenuItem<Education>
          open={effectiveOpen}
          handleNavClick={handleNavClick}
          icon={<SchoolIcon />}
          text="Education"
          href="/education"
          items={educations}
          itemKey="slug"
          itemText="university"
          itemSecondaryText="date"
          pathname={pathname}
        />
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                onClick={() => handleNavClick('/blog')}
                sx={{
                    minHeight: 48,
                    justifyContent: effectiveOpen ? 'initial' : 'center',
                    px: 2.5,
                    ...((pathname === '/blog' || pathname.startsWith('/blog/')) && {
                      backgroundColor: 'rgba(255, 152, 0, 0.08)',
                      borderLeft: '3px solid',
                      borderLeftColor: 'primary.main',
                      '& .MuiListItemIcon-root': { color: 'primary.main' },
                    }),
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
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                component="a"
                href="https://threats.pratikhingorani.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    minHeight: 48,
                    justifyContent: effectiveOpen ? 'initial' : 'center',
                    px: 2.5,
                }}
                aria-label="Travel Warnings"
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: effectiveOpen ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    <MapIcon />
                </ListItemIcon>
                <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Travel Warnings
                        {effectiveOpen && <OpenInNewIcon sx={{ fontSize: 12 }} />}
                      </Box>
                    }
                    sx={{ opacity: effectiveOpen ? 1 : 0 }}
                />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                component="a"
                href="https://chat.pratikhingorani.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    minHeight: 48,
                    justifyContent: effectiveOpen ? 'initial' : 'center',
                    px: 2.5,
                }}
                aria-label="Chat"
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: effectiveOpen ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    <ChatIcon />
                </ListItemIcon>
                <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Chat
                        {effectiveOpen && <OpenInNewIcon sx={{ fontSize: 12 }} />}
                      </Box>
                    }
                    sx={{ opacity: effectiveOpen ? 1 : 0 }}
                />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                component="a"
                href="https://translate.pratikhingorani.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    minHeight: 48,
                    justifyContent: effectiveOpen ? 'initial' : 'center',
                    px: 2.5,
                }}
                aria-label="Translate"
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: effectiveOpen ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    <TranslateIcon />
                </ListItemIcon>
                <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Translate
                        {effectiveOpen && <OpenInNewIcon sx={{ fontSize: 12 }} />}
                      </Box>
                    }
                    sx={{ opacity: effectiveOpen ? 1 : 0 }}
                />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                component="a"
                href="https://search.pratikhingorani.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    minHeight: 48,
                    justifyContent: effectiveOpen ? 'initial' : 'center',
                    px: 2.5,
                }}
                aria-label="Search"
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: effectiveOpen ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    <SearchIcon />
                </ListItemIcon>
                <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Search
                        {effectiveOpen && <OpenInNewIcon sx={{ fontSize: 12 }} />}
                      </Box>
                    }
                    sx={{ opacity: effectiveOpen ? 1 : 0 }}
                />
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
                    <HolidaySwitcher onHolidayChange={handleHolidayChange} />
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
                <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'transparent' }}>
                  <HolidayProvider override={holidayOverride} />
                  <DrawerHeader />
                  <AnimatePresence>
                    <motion.main
                      key={pathname}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ backgroundColor: 'transparent' }}
                    >
                      {children}
                    </motion.main>
                  </AnimatePresence>
                </Box>
              </Box>
            );
          }
          