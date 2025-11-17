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
          divider: grey[800],
          background: {
            default: grey[900],
            // Make panels (Paper/Card/Accordion) lighter in dark mode for better contrast and airier feel
            // Previously '#1E1E1E' which was darker than the page background; use a lighter grey instead.
            paper: grey[800],
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
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
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default getTheme;
