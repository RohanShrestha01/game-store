import { createTheme } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    common: {
      black: {
        light: '#202029',
        dark: '#16181e',
      },
      white: '#f5f5f5',
    },
    primary: {
      main: '#2189ff',
      dark: '#006bea',
    },
    grey: {
      main: '#363636',
      dark: '#252525',
      text: '#86868a',
    },
    red: '#fe2c4e',
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    fontWeightMedium: 400,
  },
  components: {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        TransitionComponent: Zoom,
      },
    },
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#202029',
        },
      },
    },
  },
});
