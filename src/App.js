import React, { useState, Suspense, memo } from 'react';
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
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CalculateIcon from '@mui/icons-material/Calculate';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Import du nouveau thème
import modernTheme from './styles/theme';

// Lazy loading des composants
const EstimatorModule = React.lazy(() => import('./components/EstimatorModule'));
const CatalogModule = React.lazy(() => import('./components/CatalogModule'));
const PreorderModule = React.lazy(() => import('./components/PreorderModule'));

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
          <Suspense fallback={
            <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              minHeight="200px"
            >
              <CircularProgress size={40} thickness={4} />
            </Box>
          }>
            {children}
          </Suspense>
        </Box>
      )}
    </div>
  );
});

// Composant App principal optimisé
function App() {
  const [value, setValue] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const tabs = [
    { label: 'Estimateur', icon: <CalculateIcon />, index: 0 },
    { label: 'Catalogue', icon: <InventoryIcon />, index: 1 },
    { label: 'Précommandes', icon: <ShoppingCartIcon />, index: 2 },
  ];

  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <Box sx={{ px: 3, pb: 2 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'primary.main',
            fontWeight: 700,
            textAlign: 'center'
          }}
        >
          Proximat
        </Typography>
      </Box>
      <List>
        {tabs.map((tab) => (
          <ListItem 
            button 
            key={tab.index}
            onClick={() => handleChange(null, tab.index)}
            sx={{
              mx: 2,
              mb: 1,
              borderRadius: 2,
              backgroundColor: value === tab.index ? 'primary.main' : 'transparent',
              color: value === tab.index ? 'white' : 'text.primary',
              '&:hover': {
                backgroundColor: value === tab.index ? 'primary.dark' : 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              {tab.icon}
            </ListItemIcon>
            <ListItemText 
              primary={tab.label} 
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={modernTheme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        backgroundColor: 'background.default'
      }}>
        {/* Header moderne */}
        <AppBar 
          position="sticky" 
          elevation={0}
          sx={{
            backgroundColor: 'background.paper',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
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
              }}
            >
              Proximat
            </Typography>

            {!isMobile && (
              <Tabs 
                value={value} 
                onChange={handleChange}
                sx={{
                  '& .MuiTab-root': {
                    minWidth: 120,
                    fontWeight: 500,
                  }
                }}
              >
                {tabs.map((tab) => (
                  <Tab 
                    key={tab.index}
                    label={tab.label} 
                    icon={tab.icon}
                    iconPosition="start"
                    sx={{
                      textTransform: 'none',
                      fontSize: '0.95rem',
                    }}
                  />
                ))}
              </Tabs>
            )}
          </Toolbar>
        </AppBar>

        {/* Navigation mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 280,
              backgroundColor: 'background.paper',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          {drawer}
        </Drawer>

        {/* Contenu principal */}
        <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
          <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
            <Suspense 
              fallback={
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  alignItems="center" 
                  minHeight="400px"
                >
                  <CircularProgress size={40} thickness={4} />
                </Box>
              }
            >
              <Fade in={true} timeout={300}>
                <Box>
                  <TabPanel value={value} index={0}>
                    <EstimatorModule />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <CatalogModule />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <PreorderModule />
                  </TabPanel>
                </Box>
              </Fade>
            </Suspense>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default memo(App);
