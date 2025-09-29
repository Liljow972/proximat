import React, { useState, Suspense, memo, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
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
  Fade,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Slide,
  Zoom,
  Backdrop,
  LinearProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CalculateIcon from '@mui/icons-material/Calculate';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';

// Import du nouveau thème
import modernTheme from './styles/theme';

// Lazy loading des composants
const EstimatorModule = React.lazy(() => import('./components/EstimatorModule'));
const CatalogModule = React.lazy(() => import('./components/CatalogModule'));
const PreorderModule = React.lazy(() => import('./components/PreorderModule'));

// Composant de chargement amélioré
const LoadingComponent = memo(() => (
  <Box 
    display="flex" 
    flexDirection="column"
    justifyContent="center" 
    alignItems="center" 
    minHeight="400px"
    gap={3}
  >
    <Zoom in={true} timeout={300}>
      <Box position="relative">
        <CircularProgress 
          size={60} 
          thickness={4} 
          sx={{
            color: 'primary.main',
            animationDuration: '1.5s',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <HomeIcon sx={{ color: 'primary.main', fontSize: 24 }} />
        </Box>
      </Box>
    </Zoom>
    <Fade in={true} timeout={600}>
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        Chargement en cours...
      </Typography>
    </Fade>
  </Box>
));

// TabPanel optimisé avec memoization et animations améliorées
const TabPanel = memo(({ children, value, index, ...other }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (value === index) {
      setMounted(true);
    }
  }, [value, index]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Slide direction="up" in={mounted} timeout={400}>
          <Box sx={{ 
            py: { xs: 4, md: 6 },
            px: { xs: 1, sm: 2 },
          }}>
            <Suspense fallback={<LoadingComponent />}>
              <Fade in={mounted} timeout={600}>
                <div>
                  {children}
                </div>
              </Fade>
            </Suspense>
          </Box>
        </Slide>
      )}
    </div>
  );
});

// Composant App principal optimisé
function App() {
  const [value, setValue] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Simulation du chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const tabs = [
    { 
      label: 'Estimateur', 
      icon: <CalculateIcon />, 
      index: 0,
      description: 'Calculez vos besoins en matériaux'
    },
    { 
      label: 'Catalogue', 
      icon: <InventoryIcon />, 
      index: 1,
      description: 'Découvrez notre gamme complète'
    },
    { 
      label: 'Précommandes', 
      icon: <ShoppingCartIcon />, 
      index: 2,
      description: 'Passez vos commandes facilement'
    },
  ];

  const drawer = (
    <Box sx={{ width: 300, pt: 2 }}>
      <Box sx={{ px: 3, pb: 3 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: 'primary.main',
            fontWeight: 800,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1
          }}
        >
          Proximat 224
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          textAlign="center"
          sx={{ fontWeight: 500 }}
        >
          Votre partenaire construction
        </Typography>
      </Box>
      <List sx={{ px: 2 }}>
        {tabs.map((tab, index) => (
          <Slide 
            key={tab.index} 
            direction="right" 
            in={mobileOpen} 
            timeout={300 + index * 100}
          >
            <ListItem 
              button 
              onClick={() => handleChange(null, tab.index)}
              sx={{
                mb: 1,
                borderRadius: 3,
                backgroundColor: value === tab.index ? 'primary.main' : 'transparent',
                color: value === tab.index ? 'white' : 'text.primary',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: value === tab.index ? 'primary.dark' : 'action.hover',
                  transform: 'translateX(8px)',
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: 'inherit', 
                  minWidth: 48,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }}
              >
                {tab.icon}
              </ListItemIcon>
              <ListItemText 
                primary={tab.label}
                secondary={tab.description}
                primaryTypographyProps={{ 
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
                secondaryTypographyProps={{
                  fontSize: '0.75rem',
                  color: value === tab.index ? 'rgba(255,255,255,0.7)' : 'text.secondary'
                }}
              />
            </ListItem>
          </Slide>
        ))}
      </List>
    </Box>
  );

  if (loading) {
    return (
      <ThemeProvider theme={modernTheme}>
        <CssBaseline />
        <Backdrop open={loading} sx={{ zIndex: 9999, backgroundColor: 'background.default' }}>
          <LoadingComponent />
        </Backdrop>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={modernTheme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        backgroundColor: 'background.default'
      }}>
        {/* Barre de progression pour le chargement */}
        <LinearProgress 
          sx={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            height: 3,
            display: loading ? 'block' : 'none'
          }} 
        />

        {/* Header moderne amélioré */}
        <Slide direction="down" in={!loading} timeout={600}>
          <AppBar 
            position="sticky" 
            elevation={0}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.3s ease',
            }}
          >
            <Toolbar sx={{ px: { xs: 2, sm: 3 }, py: 1 }}>
              {isMobile && (
                <Zoom in={!loading} timeout={400}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ 
                      mr: 2,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        transform: 'scale(1.05)',
                      }
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Zoom>
              )}
              
              <Fade in={!loading} timeout={800}>
                <Typography 
                  variant="h4" 
                  component="div" 
                  sx={{ 
                    flexGrow: 1, 
                    color: 'primary.main',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    }
                  }}
                >
                  Proximat 224
                </Typography>
              </Fade>

              {!isMobile && (
                <Fade in={!loading} timeout={1000}>
                  <Tabs 
                    value={value} 
                    onChange={handleChange}
                    sx={{
                      '& .MuiTab-root': {
                        minWidth: 140,
                        fontWeight: 500,
                        transition: 'all 0.2s ease',
                      }
                    }}
                  >
                    {tabs.map((tab, index) => (
                      <Zoom key={tab.index} in={!loading} timeout={600 + index * 100}>
                        <Tab 
                          label={tab.label} 
                          icon={tab.icon}
                          iconPosition="start"
                          sx={{
                            textTransform: 'none',
                            fontSize: '0.95rem',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                            }
                          }}
                        />
                      </Zoom>
                    ))}
                  </Tabs>
                </Fade>
              )}
            </Toolbar>
          </AppBar>
        </Slide>

        {/* Navigation mobile améliorée */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ 
            keepMounted: true,
            BackdropProps: {
              sx: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
              }
            }
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 300,
              backgroundColor: 'background.paper',
              borderRadius: '0 20px 20px 0',
              boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton 
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'error.main',
                  color: 'white',
                  transform: 'scale(1.05)',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {drawer}
        </Drawer>

        {/* Contenu principal avec animations */}
        <Box component="main" sx={{ flexGrow: 1, py: { xs: 2, md: 3 } }}>
          <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
            <Fade in={!loading} timeout={1200}>
              <Box>
                {tabs.map((tab) => (
                  <TabPanel key={tab.index} value={value} index={tab.index}>
                    {tab.index === 0 && <EstimatorModule />}
                    {tab.index === 1 && <CatalogModule />}
                    {tab.index === 2 && <PreorderModule />}
                  </TabPanel>
                ))}
              </Box>
            </Fade>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default memo(App);
