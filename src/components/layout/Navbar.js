import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  ListItem,
  ListItemText,
  ListItemButton,
  Drawer,
  List,
  Fab,
  Zoom,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ConstructionIcon from '@mui/icons-material/Construction';

const pages = [
  { title: 'Accueil', path: '/' },
  { title: 'Estimateur', path: '/estimator' },
  { title: 'Catalogue', path: '/catalog' },
  { title: 'Devis', path: '/quote' },
  { title: 'Notre Entreprise', path: '/company' },
];

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = document.querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', py: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <ConstructionIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          PROXIMAT 224
        </Typography>
      </Box>
      <List>
        {pages.map((page) => (
          <ListItem key={page.title} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={page.path}
              sx={{
                textAlign: 'center',
                py: 1.5,
                backgroundColor: location.pathname === page.path ? 'rgba(255, 107, 0, 0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 107, 0, 0.1)',
                },
              }}
            >
              <ListItemText 
                primary={page.title} 
                primaryTypographyProps={{
                  fontWeight: location.pathname === page.path ? 600 : 400,
                  color: location.pathname === page.path ? 'primary.main' : 'text.primary',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <div id="back-to-top-anchor" />
      <HideOnScroll>
        <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'white', borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ height: 70 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                <ConstructionIcon sx={{ mr: 1, color: 'primary.main', display: { xs: 'none', md: 'flex' } }} />
                <Typography
                  variant="h6"
                  noWrap
                  component={RouterLink}
                  to="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontWeight: 700,
                    color: 'primary.main',
                    textDecoration: 'none',
                    letterSpacing: '.1rem',
                  }}
                >
                  PROXIMAT 224
                </Typography>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                  sx={{ color: 'text.primary' }}
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true,
                  }}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
                  }}
                >
                  {drawer}
                </Drawer>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                <ConstructionIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography
                  variant="h6"
                  noWrap
                  component={RouterLink}
                  to="/"
                  sx={{
                    fontWeight: 700,
                    color: 'primary.main',
                    textDecoration: 'none',
                  }}
                >
                  PROXIMAT 224
                </Typography>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                {pages.map((page) => (
                  <Button
                    key={page.title}
                    component={RouterLink}
                    to={page.path}
                    sx={{
                      mx: 1,
                      my: 2,
                      color: location.pathname === page.path ? 'primary.main' : 'text.primary',
                      display: 'block',
                      fontWeight: location.pathname === page.path ? 600 : 400,
                      position: 'relative',
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        width: location.pathname === page.path ? '100%' : '0%',
                        height: '3px',
                        bottom: '-3px',
                        left: 0,
                        backgroundColor: 'primary.main',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover': {
                        backgroundColor: 'transparent',
                        '&:after': {
                          width: '100%',
                        },
                      },
                    }}
                  >
                    {page.title}
                  </Button>
                ))}
              </Box>

              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/quote"
                  sx={{
                    borderRadius: '50px',
                    px: 3,
                  }}
                >
                  Demander un devis
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}

export default Navbar;
