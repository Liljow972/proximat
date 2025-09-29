import { createTheme } from '@mui/material/styles';

// Palette de couleurs moderne et professionnelle améliorée
const colors = {
  primary: {
    50: '#FFF8F5',
    100: '#FFEDE5',
    200: '#FFD6C2',
    300: '#FFBF9F',
    400: '#FF9966',
    500: '#FF6B35', // Couleur principale
    600: '#E55A2B',
    700: '#CC4A21',
    800: '#B23A17',
    900: '#992A0D',
  },
  secondary: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  accent: {
    blue: '#3B82F6',
    green: '#10B981',
    purple: '#8B5CF6',
    teal: '#14B8A6',
    yellow: '#F59E0B',
    pink: '#EC4899',
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

// Thème principal amélioré avec de nouveaux styles
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
      main: colors.accent.green,
      light: '#34D399',
      dark: '#059669',
    },
    warning: {
      main: colors.accent.yellow,
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
      fontSize: '3.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.015em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.4,
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
    '0px 10px 15px rgba(0, 0, 0, 0.08)',
    '0px 20px 25px rgba(0, 0, 0, 0.1)',
    '0px 25px 50px rgba(0, 0, 0, 0.12)',
    '0px 6px 10px rgba(0, 0, 0, 0.06)',
    '0px 8px 14px rgba(0, 0, 0, 0.07)',
    '0px 12px 17px rgba(0, 0, 0, 0.08)',
    '0px 16px 24px rgba(0, 0, 0, 0.09)',
    '0px 20px 32px rgba(0, 0, 0, 0.1)',
    '0px 24px 38px rgba(0, 0, 0, 0.11)',
    '0px 28px 45px rgba(0, 0, 0, 0.12)',
    '0px 32px 52px rgba(0, 0, 0, 0.13)',
    '0px 36px 58px rgba(0, 0, 0, 0.14)',
    '0px 40px 65px rgba(0, 0, 0, 0.15)',
    '0px 44px 72px rgba(0, 0, 0, 0.16)',
    '0px 48px 78px rgba(0, 0, 0, 0.17)',
    '0px 52px 85px rgba(0, 0, 0, 0.18)',
    '0px 56px 91px rgba(0, 0, 0, 0.19)',
    '0px 60px 98px rgba(0, 0, 0, 0.2)',
    '0px 64px 105px rgba(0, 0, 0, 0.21)',
    '0px 68px 111px rgba(0, 0, 0, 0.22)',
    '0px 72px 118px rgba(0, 0, 0, 0.23)',
    '0px 76px 124px rgba(0, 0, 0, 0.24)',
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
            transform: 'translateY(-2px)',
            boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.15)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%)`,
            boxShadow: `0px 12px 30px rgba(255, 107, 53, 0.4)`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${colors.secondary[600]} 0%, ${colors.secondary[700]} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.secondary[700]} 0%, ${colors.secondary[800]} 100%)`,
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            backgroundColor: `${colors.primary[500]}08`,
            transform: 'translateY(-1px)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: `${colors.primary[500]}08`,
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.06)',
          border: `1px solid ${colors.neutral[200]}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: '0px 16px 50px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-6px)',
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
        elevation3: {
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
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
              borderWidth: '2px',
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
                boxShadow: `0 0 0 3px ${colors.primary[500]}20`,
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
            transform: 'translateY(-1px)',
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
          borderRadius: 10,
          fontWeight: 500,
          fontSize: '0.75rem',
          height: 32,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        colorPrimary: {
          backgroundColor: `${colors.primary[500]}15`,
          color: colors.primary[700],
          border: `1px solid ${colors.primary[200]}`,
          '&:hover': {
            backgroundColor: `${colors.primary[500]}25`,
            borderColor: colors.primary[300],
          },
        },
        colorSecondary: {
          backgroundColor: `${colors.secondary[500]}15`,
          color: colors.secondary[700],
          border: `1px solid ${colors.secondary[200]}`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
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
          borderBottom: `2px solid ${colors.neutral[200]}`,
        },
        body: {
          fontSize: '0.875rem',
          borderBottom: `1px solid ${colors.neutral[100]}`,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: `${colors.primary[500]}10`,
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          boxShadow: '0px 20px 60px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid',
        },
        standardSuccess: {
          backgroundColor: `${colors.accent.green}10`,
          borderColor: `${colors.accent.green}30`,
          color: colors.accent.green,
        },
        standardError: {
          backgroundColor: '#EF444410',
          borderColor: '#EF444430',
          color: '#DC2626',
        },
        standardWarning: {
          backgroundColor: `${colors.accent.yellow}10`,
          borderColor: `${colors.accent.yellow}30`,
          color: '#D97706',
        },
        standardInfo: {
          backgroundColor: `${colors.accent.blue}10`,
          borderColor: `${colors.accent.blue}30`,
          color: colors.accent.blue,
        },
      },
    },
  },
});

// Thème sombre amélioré
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