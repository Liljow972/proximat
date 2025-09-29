import React from 'react';
import { Box, Container, Typography, Link, Grid, IconButton, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ConstructionIcon from '@mui/icons-material/Construction';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: '#2E4053',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ConstructionIcon sx={{ mr: 1, color: 'primary.main', fontSize: 30 }} />
              <Typography variant="h5" fontWeight="bold">
                PROXIMAT 224
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.7)' }}>
              Votre partenaire de confiance pour tous vos projets de construction et rénovation. Nous fournissons des matériaux de qualité et des services professionnels depuis plus de 15 ans.
            </Typography>
            <Box>
              <IconButton color="primary" aria-label="facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="primary" aria-label="linkedin">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Navigation
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Accueil
            </Link>
            <Link component={RouterLink} to="/estimator" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Estimateur
            </Link>
            <Link component={RouterLink} to="/catalog" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Catalogue
            </Link>
            <Link component={RouterLink} to="/quote" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Devis
            </Link>
            <Link component={RouterLink} to="/company" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Notre Entreprise
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Matériaux
            </Typography>
            <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Ciment et béton
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Sable et gravier
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Briques et blocs
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Bois de construction
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Carrelage et revêtements
            </Link>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Contact
            </Typography>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                123 Avenue de la Construction, 75001 Paris
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <PhoneIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                +33 1 23 45 67 89
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                contact@proximat224.fr
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
        
        <Typography variant="body2" align="center" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          {'© '}
          {new Date().getFullYear()}
          {' '}
          <Link color="primary" href="/">
            Proximat 224
          </Link>
          {' - Tous droits réservés'}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
