import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessIcon from '@mui/icons-material/Business';

function HomePage() {
  const features = [
    {
      title: 'Estimateur de matériaux',
      description: 'Calculez rapidement les quantités de matériaux nécessaires pour votre chantier.',
      icon: <CalculateIcon sx={{ fontSize: 60 }} />,
      link: '/estimator',
    },
    {
      title: 'Catalogue de produits',
      description: 'Consultez notre catalogue complet de matériaux de construction.',
      icon: <CategoryIcon sx={{ fontSize: 60 }} />,
      link: '/catalog',
    },
    {
      title: 'Génération de devis',
      description: 'Créez et envoyez des devis professionnels en quelques clics.',
      icon: <DescriptionIcon sx={{ fontSize: 60 }} />,
      link: '/quote',
    },
    {
      title: 'Notre entreprise',
      description: 'Découvrez notre entreprise et contactez-nous pour plus d\'informations.',
      icon: <BusinessIcon sx={{ fontSize: 60 }} />,
      link: '/company',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://source.unsplash.com/random?construction)',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
          }}
        />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Proximat
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            Votre solution complète pour l'estimation de matériaux de chantier
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/estimator"
            sx={{ mt: 2 }}
          >
            Commencer l'estimation
          </Button>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          Nos services
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item key={feature.title} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 3,
                    color: 'primary.main',
                  }}
                >
                  {feature.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3" align="center">
                    {feature.title}
                  </Typography>
                  <Typography align="center">{feature.description}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={feature.link}
                    variant="outlined"
                  >
                    En savoir plus
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;
