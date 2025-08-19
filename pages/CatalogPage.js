import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  InputAdornment,
  MenuItem,
  Divider,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Données simulées pour le catalogue
const catalogData = [
  {
    id: 1,
    name: 'Carrelage Céramique Blanc',
    category: 'carrelage',
    price: 25.99,
    unit: 'm²',
    description: 'Carrelage céramique blanc, idéal pour salles de bain et cuisines. Résistant à l\'eau et facile à nettoyer.',
    image: 'https://source.unsplash.com/random?tile',
  },
  {
    id: 2,
    name: 'Colle à Carrelage Flex',
    category: 'adhesif',
    price: 15.50,
    unit: 'sac',
    description: 'Colle à carrelage flexible pour tous types de supports. Sac de 25kg, rendement moyen de 5m² par sac.',
    image: 'https://source.unsplash.com/random?glue',
  },
  {
    id: 3,
    name: 'Ciment Portland',
    category: 'maconnerie',
    price: 9.99,
    unit: 'sac',
    description: 'Ciment Portland standard pour travaux de maçonnerie générale. Sac de 35kg.',
    image: 'https://source.unsplash.com/random?cement',
  },
  {
    id: 4,
    name: 'Peinture Acrylique Blanche',
    category: 'peinture',
    price: 45.00,
    unit: 'pot',
    description: 'Peinture acrylique blanche mate pour murs intérieurs. Pot de 10L, rendement de 10m² par litre.',
    image: 'https://source.unsplash.com/random?paint',
  },
  {
    id: 5,
    name: 'Tuyau PVC 40mm',
    category: 'plomberie',
    price: 3.99,
    unit: 'm',
    description: 'Tuyau PVC diamètre 40mm pour évacuation. Vendu au mètre linéaire.',
    image: 'https://source.unsplash.com/random?pipe',
  },
  {
    id: 6,
    name: 'Sable de Construction',
    category: 'maconnerie',
    price: 40.00,
    unit: 'tonne',
    description: 'Sable de construction lavé pour béton et mortier. Vendu à la tonne.',
    image: 'https://source.unsplash.com/random?sand',
  },
  {
    id: 7,
    name: 'Gravier Concassé',
    category: 'maconnerie',
    price: 35.00,
    unit: 'tonne',
    description: 'Gravier concassé 20/40mm pour fondations et drainage. Vendu à la tonne.',
    image: 'https://source.unsplash.com/random?gravel',
  },
  {
    id: 8,
    name: 'Joint pour Carrelage Gris',
    category: 'adhesif',
    price: 8.50,
    unit: 'kg',
    description: 'Joint pour carrelage couleur gris. Sac de 5kg, rendement variable selon largeur des joints.',
    image: 'https://source.unsplash.com/random?grout',
  },
];

const categories = [
  { value: 'all', label: 'Toutes les catégories' },
  { value: 'carrelage', label: 'Carrelage' },
  { value: 'adhesif', label: 'Adhésifs et joints' },
  { value: 'maconnerie', label: 'Maçonnerie' },
  { value: 'peinture', label: 'Peinture' },
  { value: 'plomberie', label: 'Plomberie' },
];

function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const filteredProducts = catalogData.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Catalogue de produits
      </Typography>
      <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
        Consultez notre sélection de matériaux de construction de qualité
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              select
              label="Catégorie"
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 4 }}>
        <Chip label={`${filteredProducts.length} produits`} />
      </Divider>

      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    {product.price.toFixed(2)} € / {product.unit}
                  </Typography>
                  <Chip
                    label={categories.find(cat => cat.value === product.category)?.label || product.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Aucun produit ne correspond à votre recherche
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default CatalogPage;
