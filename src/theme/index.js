import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Interstate',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Interstate, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Interstate, sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Interstate, sans-serif',
      fontWeight: 500,
    },
    h4: {
      fontFamily: 'Interstate, sans-serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: 'Interstate, sans-serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: 'Interstate, sans-serif',
      fontWeight: 500,
    },
    subtitle1: {
      fontFamily: 'Interstate, sans-serif',
      fontWeight: 400,
    },
    subtitle2: {
      fontFamily: 'Interstate, sans-serif',
      fontWeight: 400,
    },
    body1: {
      fontFamily: 'Interstate, sans-serif',
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Interstate, sans-serif',
      fontWeight: 400,
    },
    button: {
      fontFamily: 'Interstate, sans-serif',
      fontWeight: 500,
      textTransform: 'none',
    },
    caption: {
      fontFamily: 'Interstate, sans-serif',
      fontWeight: 400,
    },
    overline: {
      fontFamily: 'Interstate, sans-serif',
      fontWeight: 400,
    },
  },
});

export default theme;
