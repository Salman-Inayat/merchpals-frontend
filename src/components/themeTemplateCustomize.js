import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import palette from '../theme/palette';
import shape from '../theme/shape';
import typography from '../theme/typography';
import shadows, { customShadows } from '../theme/shadows';
import ComponentsOverrides from '../theme/overrides';
import { alpha } from '@mui/material/styles';
// ----------------------------------------------------------------------
function pxToRem(value) {
  return `${value / 16}rem`;
}
ThemeTemplateCustomise.propTypes = {
  children: PropTypes.node,
};
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};
export default function ThemeTemplateCustomise({ children, colors }) {
  const themeOptions = useMemo(() => {
    switch (colors) {
      case 'WHITE':
        return {
          palette: {
            text: {
              primary: '#fff',
              secondary: '#fff',
              disabled: '#fff',
            },
            background: { paper: '#fff', default: '#fff', neutral: '#fff' },
          },
          shape,
          typography,
          shadows,
          customShadows,
        };
      case 'TONIGHT':
        return {
          palette: {
            text: {
              primary: '#000',
              secondary: '#000',
              disabled: '#000',
            },
            background: {
              paper: '#4f68dc',
              default: '#fff',
              neutral: '#b06ab',
            },
          },
          shape,
          typography,
          shadows,
          customShadows,
        };
      case 'BOURBON':
        return {
          palette: {
            text: {
              primary: '#fff',
              secondary: '#fff',
              disabled: '#fff',
            },
            background: {
              paper: '#ec6f66',
              default: '#fff',
              neutral: '#f3a183',
            },
          },
          shape,
          typography,
          shadows,
          customShadows,
        };
      case 'BANG':
        return {
          palette: {
            text: {
              primary: '#000',
              secondary: '#000',
              disabled: '#000',
            },
            background: {
              paper: '#007991',
              default: '#fff',
              neutral: '#78ffd6',
            },
          },
          shape,
          typography,
          shadows,
          customShadows,
        };
      default:
        return {
          palette,
          shape,
          typography,
          shadows,
          customShadows,
        };
    }
  }, [colors]);
  const theme = createTheme(themeOptions);
  theme.components = ComponentsOverrides(theme);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
