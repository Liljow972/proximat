import { createTheme } from '@mui/material/styles';

// Palette de couleurs moderne et professionnelle
const colors = {
  primary: {
    50: '#FFF4F1',
    100: '#FFE6DC',
    200: '#FFCCBA',
    300: '#FFB199',
    400: '#FF8A66',
    500: '#FF6B35', // Couleur principale
    600: '#E55A2B',
    700: '#CC4A21',
    800: '#B23A17',
    900: '#992A0D',
  },
  secondary: {
    50: '#F8F9FA',
    100: '#E9ECEF',
    200: '#DEE2E6',
    300: '#CED4DA',
    400: '#ADB5BD',
    500: '#6C757D',
    600: '#495057',
    700: '#343A40',
    800: '#212529',
    900: '#1A1D20',
  },
  accent: {
    blue: '#4A90E2',
    green: '#7ED321',
    purple: '#9013FE',
    teal: '#00BCD4',
  },
  neutral: {
    50: '#FAFBFC',
    100: '#F4F6F8',
    200: '#E4E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  }
};

// Thème principal amélioré
export const modernTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary[500],
      light: colors.primary[300],
      dark: colors.primary[700],
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: colors.secondary[700],
      light: colors.secondary[400],
      dark: colors.secondary[900],
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FAFBFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: colors.neutral[800],
      secondary: colors.neutral[600],
    },
    grey: colors.neutral,
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    warning: {
      main: '#F59E0B',
      light: '#FCD34D',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    info: {
      main: colors.accent.blue,
      light: '#60A5FA',
      dark: '#2563EB',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
      fontSize: '0.875rem',
      letterSpacing: '0.01em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
      fontWeight: 400,
      color: colors.neutral[500],
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.05)',
    '0px 4px 6px rgba(0, 0, 0, 0.05)',
    '0px 10px 15px rgba(0, 0, 0, 0.1)',
    '0px 20px 25px rgba(0, 0, 0, 0.1)',
    '0px 25px 50px rgba(0, 0, 0, 0.15)',
    // ... autres ombres
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontWeight: 500,
          fontSize: '0.875rem',
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%)`,
            boxShadow: `0px 8px 25px rgba(${parseInt(colors.primary[500].slice(1, 3), 16)}, ${parseInt(colors.primary[500].slice(3, 5), 16)}, ${parseInt(colors.primary[500].slice(5, 7), 16)}, 0.3)`,
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            backgroundColor: `${colors.primary[500]}08`,
          },
        },
        text: {
          '&:hover': {
            backgroundColor: `${colors.primary[500]}08`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          border: `1px solid ${colors.neutral[200]}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: '#FFFFFF',
          '&:hover': {
            boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-4px)',
            borderColor: colors.primary[200],
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: '#FFFFFF',
          border: `1px solid ${colors.neutral[200]}`,
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#FFFFFF',
            transition: 'all 0.2s ease',
            '& fieldset': {
              borderColor: colors.neutral[300],
              borderWidth: '1.5px',
            },
            '&:hover': {
              '& fieldset': {
                borderColor: colors.primary[400],
              },
            },
            '&.Mui-focused': {
              '& fieldset': {
                borderColor: colors.primary[500],
                borderWidth: '2px',
              },
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '1rem',
          minHeight: 48,
          padding: '12px 20px',
          margin: '0 4px',
          borderRadius: 12,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: `${colors.primary[500]}10`,
            color: colors.primary[600],
          },
          '&.Mui-selected': {
            color: colors.primary[600],
            backgroundColor: `${colors.primary[500]}15`,
            fontWeight: 600,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTabs-indicator': {
            display: 'none',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: '0.75rem',
          height: 28,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        colorPrimary: {
          backgroundColor: `${colors.primary[500]}15`,
          color: colors.primary[700],
          '&:hover': {
            backgroundColor: `${colors.primary[500]}25`,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: colors.neutral[800],
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
          borderBottom: `1px solid ${colors.neutral[200]}`,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: colors.neutral[50],
          fontWeight: 600,
          fontSize: '0.875rem',
          color: colors.neutral[700],
        },
        body: {
          fontSize: '0.875rem',
        },
      },
    },
  },
});

// Thème sombre (optionnel)
export const darkTheme = createTheme({
  ...modernTheme,
  palette: {
    ...modernTheme.palette,
    mode: 'dark',
    background: {
      default: colors.neutral[900],
      paper: colors.neutral[800],
    },
    text: {
      primary: colors.neutral[100],
      secondary: colors.neutral[400],
    },
  },
});

export default modernTheme;