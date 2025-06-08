// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#b71c1c', // vermelho escuro
      contrastText: '#fff', // texto branco nos botões primários
    },
    secondary: {
      main: '#ffffff', // branco
      contrastText: '#b71c1c', // texto vermelho nos botões secundários
    },
    background: {
      default: '#fff', // fundo branco
      paper: '#fff',
    },
    text: {
      primary: '#222', // texto principal escuro
      secondary: '#b71c1c', // texto secundário vermelho
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;