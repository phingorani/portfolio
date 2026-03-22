import { createTheme, PaletteMode } from '@mui/material';
import { amber, orange, grey } from '@mui/material/colors';

const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: amber,
          divider: amber[200],
          background: {
            default: 'transparent',
            paper: 'rgba(255, 255, 255, 0.75)',
          },
          text: {
            primary: grey[900],
            secondary: grey[700],
          },
        }
      : {
          primary: orange,
          divider: 'rgba(255, 255, 255, 0.12)',
          background: {
            default: 'transparent',
            paper: 'rgba(30, 30, 30, 0.7)',
          },
          text: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
          },
        }),
  },
  typography: {
    fontFamily: 'var(--font-inter)',
    h1: { fontFamily: 'var(--font-geist-mono)', ...(mode === 'dark' && { color: '#f1f5f9' }) },
    h2: { fontFamily: 'var(--font-geist-mono)', ...(mode === 'dark' && { color: '#f1f5f9' }) },
    h3: { fontFamily: 'var(--font-geist-mono)', ...(mode === 'dark' && { color: '#e2e8f0' }) },
    h4: { fontFamily: 'var(--font-geist-mono)', ...(mode === 'dark' && { color: '#e2e8f0' }) },
    h5: { fontFamily: 'var(--font-geist-mono)', ...(mode === 'dark' && { color: '#cbd5e1' }) },
    h6: { fontFamily: 'var(--font-geist-mono)', ...(mode === 'dark' && { color: '#cbd5e1' }) },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 16,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            : '0 4px 24px 0 rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(12px)',
          border: theme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundImage: 'none',
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(30, 30, 30, 0.7)'
            : 'rgba(255, 255, 255, 0.8)',
          border: theme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid rgba(0, 0, 0, 0.08)',
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
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
