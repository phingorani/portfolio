import { createTheme, PaletteMode } from '@mui/material';
import { amber, orange, grey } from '@mui/material/colors';

const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: orange,
          divider: 'rgba(255, 255, 255, 0.12)',
          background: {
            default: 'transparent', // Let the global gradient show through
            paper: 'rgba(30, 30, 30, 0.7)', // Semi-transparent
          },
          text: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
          },
        }),
  },
  typography: {
    fontFamily: 'var(--font-inter)', // Use Inter for body copy
    h1: {
      fontFamily: 'var(--font-geist-mono)',
    },
    h2: {
      fontFamily: 'var(--font-geist-mono)',
    },
    h3: {
      fontFamily: 'var(--font-geist-mono)',
    },
    h4: {
      fontFamily: 'var(--font-geist-mono)',
    },
    h5: {
      fontFamily: 'var(--font-geist-mono)',
    },
    h6: {
      fontFamily: 'var(--font-geist-mono)',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 16, // More rounded modern look
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)' 
            : '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          backdropFilter: 'blur(12px)',
          border: theme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid rgba(255, 255, 255, 0.4)',
          backgroundImage: 'none', // Remove default MUI gradient in dark mode
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none', // Modernize buttons
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(18, 18, 18, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: theme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: 'none',
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(18, 18, 18, 0.85)' 
            : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          borderRight: theme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid rgba(0, 0, 0, 0.05)',
        }),
      },
    },
  },
});

export default getTheme;
