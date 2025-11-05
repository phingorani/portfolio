'use client';
import { createTheme, PaletteMode } from '@mui/material';

const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#007BFF',
            light: '#3395FF',
            dark: '#0056B3',
          },
          secondary: {
            main: '#E91E63',
            light: '#ED4B82',
            dark: '#A31545',
          },
          background: {
            default: '#f4f6f8',
            paper: '#ffffff',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#007BFF',
            light: '#3395FF',
            dark: '#0056B3',
          },
          secondary: {
            main: '#E91E63',
            light: '#ED4B82',
            dark: '#A31545',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
        }),
  },
});

export default getTheme;