import React, { useState, Suspense, memo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  Box, 
  Container, 
  Tabs, 
  Tab, 
  AppBar, 
  Toolbar, 
  Typography,
  CircularProgress,
  Fade
} from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Lazy loading des composants
const EstimatorModule = React.lazy(() => import('./components/EstimatorModule'));
const CatalogModule = React.lazy(() => import('./components/CatalogModule'));
const PreorderModule = React.lazy(() => import('./components/PreorderModule'));

// Theme configuration - Design Premium SaaS
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B00', // Orange accent premium
      light: '#FF8A33',
      dark: '#E55A00',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2C2C2C', // Gris foncé élégant
      light: '#4A4A4A',
      dark: '#1A1A1A',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FEFEFE', // Blanc cassé premium
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A', // Noir profond
      secondary: '#6B6B6B', // Gris moyen
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
    },
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontWeight: 800, // Extra bold pour les titres
      fontSize: '3rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.875rem',
      lineHeight: 1.25,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      fontWeight: 400, // Texte fin et léger
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      fontWeight: 300, // Très léger
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
      fontSize: '0.875rem',
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 20, // Coins arrondis XL
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50, // Pill-shaped (arrondis complet)
          padding: '14px 32px',
          fontWeight: 500,
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0px 8px 25px rgba(255, 107, 0, 0.25)',
            transform: 'translateY(-2px)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #FF6B00 0%, #FF8533 50%, #FF6B00 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #E55A00 0%, #FF6B00 50%, #E55A00 100%)',
            boxShadow: '0px 12px 35px rgba(255, 107, 0, 0.4)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderRadius: 50,
          '&:hover': {
            borderWidth: '2px',
            backgroundColor: 'rgba(255, 107, 0, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24, // Coins arrondis XL
          boxShadow: '0px 8px 40px rgba(0, 0, 0, 0.06)', // Ombres très douces
          border: '1px solid rgba(0, 0, 0, 0.04)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: '#FFFFFF',
          '&:hover': {
            boxShadow: '0px 16px 60px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-4px)',
            borderColor: 'rgba(255, 107, 0, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0px 8px 40px rgba(0, 0, 0, 0.06)',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            backgroundColor: '#FAFAFA',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#F8F8F8',
              borderColor: 'rgba(255, 107, 0, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 107, 0, 0.3)',
            },
            '&.Mui-focused': {
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 4px 20px rgba(255, 107, 0, 0.15)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF6B00',
              borderWidth: '2px',
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
          minHeight: 72,
          padding: '16px 24px',
          margin: '0 8px',
          borderRadius: 16,
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 107, 0, 0.04)',
            transform: 'translateY(-1px)',
          },
          '&.Mui-selected': {
            color: '#FF6B00',
            backgroundColor: 'rgba(255, 107, 0, 0.08)',
            fontWeight: 600,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTabs-indicator': {
            display: 'none', // Masquer l'indicateur par défaut
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          fontWeight: 500,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
});

// Composant de chargement optimisé
const LoadingSpinner = memo(() => (
  <Fade in timeout={300}>
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="400px"
      flexDirection="column"
      gap={2}
    >
      <CircularProgress 
        size={48} 
        thickness={4}
        sx={{ 
          color: 'primary.main',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          }
        }} 
      />
      <Typography variant="body2" color="text.secondary">
        Chargement en cours...
      </Typography>
    </Box>
  </Fade>
));

// TabPanel optimisé avec memoization
const TabPanel = memo(({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ 
          py: 6,
          px: 2,
        }}>
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </Box>
      )}
    </div>
  );
});

// Composant App principal optimisé
function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        flexGrow: 1, 
        bgcolor: 'background.default', 
        minHeight: '100vh',
        position: 'relative'
      }}>
        {/* Navigation sticky transparente */}
        <AppBar 
          position="sticky" 
          elevation={0} 
          sx={{ 
            bgcolor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
            transition: 'all 0.3s ease',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ py: 1 }}>
              <Typography 
                variant="h4" 
                component="div" 
                sx={{ 
                  flexGrow: 1, 
                  color: 'text.primary', 
                  fontWeight: 800,
                  letterSpacing: '-0.02em'
                }}
              >
                <Box component="span" sx={{ color: 'primary.main' }}>Proximat</Box>
                <Box component="span" sx={{ fontWeight: 300, ml: 1 }}>SaaS</Box>
              </Typography>
              
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                aria-label="navigation tabs"
                sx={{
                  '& .MuiTab-root': {
                    color: 'text.secondary',
                    minHeight: 48,
                    fontSize: '0.95rem',
                  }
                }}
              >
                <Tab 
                  icon={<CalculateIcon sx={{ fontSize: 20 }} />} 
                  label="Estimation" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<InventoryIcon sx={{ fontSize: 20 }} />} 
                  label="Catalogue" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<ShoppingCartIcon sx={{ fontSize: 20 }} />} 
                  label="Précommande" 
                  iconPosition="start"
                />
              </Tabs>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Content avec lazy loading */}
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <TabPanel value={tabValue} index={0}>
            <EstimatorModule />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <CatalogModule />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <PreorderModule />
          </TabPanel>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default memo(App);
