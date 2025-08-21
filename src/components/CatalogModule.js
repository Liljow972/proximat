import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Chip,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Badge,
  Container,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  FilterList as FilterIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import ProductImage from './common/ProductImage';

// Base de données des produits avec images locales
const products = [
  {
    id: 1,
    name: 'Tout venant',
    category: 'Granulats',
    price: 45,
    unit: 'm³',
    description: 'Mélange de sable et gravier pour remblais et fondations',
    image: '/assets/images/granulats/tout-venant.jpg',
    available: true,
  },
  {
    id: 2,
    name: 'Sable enduit',
    category: 'Sables',
    price: 55,
    unit: 'm³',
    description: 'Sable fin spécialement sélectionné pour enduits et crépis',
    image: '/assets/images/sables/sable-enduit.jpg',
    available: true,
  },
  {
    id: 3,
    name: 'Sable béton',
    category: 'Sables',
    price: 60,
    unit: 'm³',
    description: 'Sable calibré pour la fabrication de béton de qualité',
    image: '/assets/images/sables/sable-beton.jpg',
    available: true,
  },
  {
    id: 4,
    name: 'Gravillon',
    category: 'Granulats',
    price: 65,
    unit: 'm³',
    description: 'Gravillon concassé pour béton et drainage',
    image: '/assets/images/granulats/gravillon.jpg',
    available: true,
  },
  {
    id: 5,
    name: 'Gravier 5/15',
    category: 'Granulats',
    price: 70,
    unit: 'm³',
    description: 'Gravier calibré 5-15mm pour béton et allées',
    image: '/assets/images/granulats/gravier-5-15.jpg',
    available: true,
  },
  {
    id: 6,
    name: 'Gravier 15/25',
    category: 'Granulats',
    price: 75,
    unit: 'm³',
    description: 'Gravier calibré 15-25mm pour gros béton',
    image: '/assets/images/granulats/gravier-15-25.jpg',
    available: true,
  },
  {
    id: 7,
    name: 'Sable fin',
    category: 'Sables',
    price: 50,
    unit: 'm³',
    description: 'Sable fin pour mortier et jointoiement',
    image: '/assets/images/sables/sable-fin.jpg',
    available: true,
  },
  {
    id: 8,
    name: 'Ciment gris',
    category: 'Liants',
    price: 8.5,
    unit: 'sac 35kg',
    description: 'Ciment Portland gris CEM II 32.5',
    image: '/assets/images/liants/ciment-gris.jpg',
    available: true,
  },
  {
    id: 9,
    name: 'Ciment blanc',
    category: 'Liants',
    price: 12,
    unit: 'sac 35kg',
    description: 'Ciment blanc pour enduits décoratifs',
    image: '/assets/images/liants/ciment-blanc.jpg',
    available: true,
  },
  {
    id: 10,
    name: 'Chaux hydraulique',
    category: 'Liants',
    price: 9.5,
    unit: 'sac 35kg',
    description: 'Chaux hydraulique NHL 3.5 pour enduits traditionnels',
    image: '/assets/images/liants/chaux-hydraulique.jpg',
    available: true,
  },
  {
    id: 11,
    name: 'Mortier colle',
    category: 'Liants',
    price: 15,
    unit: 'sac 25kg',
    description: 'Mortier colle pour carrelage et faïence',
    image: '/assets/images/liants/mortier-colle.jpg',
    available: true,
  },
  {
    id: 12,
    name: 'Fer Ø6',
    category: 'Ferraillage',
    price: 1.2,
    unit: 'ml',
    description: 'Barre de fer à béton diamètre 6mm',
    image: '/assets/images/ferraillage/fer-6.jpg',
    available: true,
  },
  {
    id: 13,
    name: 'Fer Ø8',
    category: 'Ferraillage',
    price: 1.8,
    unit: 'ml',
    description: 'Barre de fer à béton diamètre 8mm',
    image: '/assets/images/ferraillage/fer-8.jpg',
    available: true,
  },
  {
    id: 14,
    name: 'Fer Ø10',
    category: 'Ferraillage',
    price: 2.5,
    unit: 'ml',
    description: 'Barre de fer à béton diamètre 10mm',
    image: '/assets/images/ferraillage/fer-10.jpg',
    available: true,
  },
  {
    id: 15,
    name: 'Treillis soudé',
    category: 'Ferraillage',
    price: 25,
    unit: 'm²',
    description: 'Treillis soudé ST25 pour dalles',
    image: '/assets/images/ferraillage/treillis-soude.jpg',
    available: true,
  },
  {
    id: 16,
    name: 'Parpaings 20x25x50',
    category: 'Blocs',
    price: 2.5,
    unit: 'pièce',
    description: 'Parpaing creux 20x25x50 cm pour murs porteurs',
    image: '/assets/images/blocs/parpaings-20.jpg',
    available: true,
  },
  {
    id: 17,
    name: 'Parpaings 15x25x50',
    category: 'Blocs',
    price: 2.2,
    unit: 'pièce',
    description: 'Parpaing creux 15x25x50 cm pour cloisons',
    image: '/assets/images/blocs/parpaings-15.jpg',
    available: true,
  },
  {
    id: 18,
    name: 'Parpaings 10x25x50',
    category: 'Blocs',
    price: 1.8,
    unit: 'pièce',
    description: 'Parpaing creux 10x25x50 cm pour cloisons légères',
    image: '/assets/images/blocs/parpaings-10.jpg',
    available: true,
  },
  {
    id: 19,
    name: 'Bloc à bancher 21x25x50',
    category: 'Blocs',
    price: 3.2,
    unit: 'pièce',
    description: 'Bloc à bancher pour murs de soutènement',
    image: '/assets/images/blocs/bloc-bancher.jpg',
    available: true,
  },
  {
    id: 20,
    name: 'Produits sur commande',
    category: 'Sur commande',
    price: 0,
    unit: 'Sur demande',
    description: 'Produits spéciaux disponibles sur commande uniquement',
    image: '/assets/images/divers/sur-commande.jpg',
    available: false,
  },
];

const categories = ['Tous', ...Array.from(new Set(products.map(p => p.category)))];

// Couleurs pour les catégories
const categoryColors = {
  'Granulats': '#FF6B35',
  'Sables': '#F7931E',
  'Liants': '#FFD23F',
  'Ferraillage': '#06D6A0',
  'Blocs': '#FF8A33', // Changé de #118AB2 (bleu) vers orange
  'Sur commande': '#E55A00', // Changé de #073B4C (bleu foncé) vers orange foncé
};

function CatalogModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [cart, setCart] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Catalogue Premium
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'text.secondary', 
              fontWeight: 300,
              maxWidth: '600px',
              mx: 'auto',
              mb: 4
            }}
          >
            Découvrez notre sélection de matériaux de construction de haute qualité
          </Typography>
          
          {/* Cart Badge with Premium Styling */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Badge 
              badgeContent={getCartItemCount()} 
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  minWidth: '24px',
                  height: '24px'
                }
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={() => alert('Panier : ' + cart.length + ' produits')}
                sx={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 8px 32px rgba(255, 107, 53, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #E55A2B 0%, #E8851A 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(255, 107, 53, 0.4)',
                  }
                }}
              >
                Mon Panier
              </Button>
            </Badge>
          </Box>
        </Box>

        {/* Enhanced Search and Filter Card */}
        <Card 
          sx={{ 
            mb: 6,
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '16px',
                      background: 'rgba(248, 250, 252, 0.8)',
                      '&:hover': {
                        background: 'rgba(248, 250, 252, 1)',
                      },
                      '&.Mui-focused': {
                        background: 'white',
                        boxShadow: '0 0 0 3px rgba(255, 107, 53, 0.1)',
                      }
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#FF6B35' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Catégorie</InputLabel>
                  <Select
                    value={selectedCategory}
                    label="Catégorie"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    sx={{
                      borderRadius: '16px',
                      background: 'rgba(248, 250, 252, 0.8)',
                      '&:hover': {
                        background: 'rgba(248, 250, 252, 1)',
                      },
                      '&.Mui-focused': {
                        background: 'white',
                        boxShadow: '0 0 0 3px rgba(255, 107, 53, 0.1)',
                      }
                    }}
                    startAdornment={<FilterIcon sx={{ mr: 1, color: '#FF6B35' }} />}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {category !== 'Tous' && (
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: categoryColors[category] || '#64748b'
                              }}
                            />
                          )}
                          {category}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#FF6B35' }}>
                    {filteredProducts.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    produit(s)
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Premium Product Grid */}
        <Grid container spacing={4}>
          {filteredProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Fade in={true} timeout={300 + index * 100}>
                <Card 
                  onMouseEnter={() => setHoveredCard(product.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    position: 'relative',
                    borderRadius: '24px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                      '& .product-image': {
                        transform: 'scale(1.1)',
                      },
                      '& .product-overlay': {
                        opacity: 1,
                      }
                    }
                  }}
                >
                  {/* Color-coded Category Badge */}
                  <Chip
                    label={product.category}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      zIndex: 2,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: categoryColors[product.category] || '#64748b',
                      color: 'white',
                      borderRadius: '12px',
                      '&:hover': {
                        backgroundColor: categoryColors[product.category] || '#64748b',
                      }
                    }}
                  />

                  {/* Image with Hover Overlay */}
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      height={240}
                      className="product-image"
                      sx={{ 
                        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    />
                  
                    {/* Gradient Overlay with Icon */}
                    <Box
                      className="product-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.8) 0%, rgba(247, 147, 30, 0.8) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                      }}
                    >
                    <VisibilityIcon sx={{ color: 'white', fontSize: '3rem' }} />
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 700, 
                      lineHeight: 1.3,
                      color: '#1e293b',
                      mb: 2
                    }}
                  >
                    {product.name}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 3, 
                      flexGrow: 1,
                      lineHeight: 1.6
                    }}
                  >
                    {product.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {product.price > 0 ? `${product.price.toFixed(2)} €` : 'Sur demande'}
                    </Typography>
                    <Chip 
                      label={product.unit} 
                      size="small" 
                      variant="outlined"
                      sx={{ 
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        borderColor: '#FF6B35',
                        color: '#FF6B35',
                        borderRadius: '12px'
                      }}
                    />
                  </Box>
                  
                  <Button
                    variant={product.available ? "contained" : "outlined"}
                    fullWidth
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => product.available ? addToCart(product) : alert('Produit disponible sur commande uniquement')}
                    disabled={!product.available && product.unit === 'Sur demande'}
                    sx={{ 
                      mt: 'auto',
                      borderRadius: '16px', // Déjà correct
                      py: 1.5,
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      ...(product.available ? {
                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                        boxShadow: '0 4px 20px rgba(255, 107, 53, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #E55A2B 0%, #E8851A 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 30px rgba(255, 107, 53, 0.4)',
                        }
                      } : {
                        borderColor: '#64748b',
                        color: '#64748b',
                        '&:hover': {
                          borderColor: '#475569',
                          backgroundColor: 'rgba(100, 116, 139, 0.1)'
                        }
                      })
                    }}
                  >
                    {product.available ? 'Précommander' : 'Sur demande'}
                  </Button>
                </CardContent>
              </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Enhanced Empty State */}
        {filteredProducts.length === 0 && (
          <Zoom in={true}>
            <Box sx={{ textAlign: 'center', py: 12 }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: '#64748b',
                  mb: 2
                }}
              >
                Aucun produit trouvé
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#94a3b8',
                  fontWeight: 300,
                  mb: 4
                }}
              >
                Essayez de modifier vos critères de recherche
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Tous');
                }}
                sx={{
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  borderColor: '#FF6B35',
                  color: '#FF6B35',
                  '&:hover': {
                    borderColor: '#E55A2B',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)'
                  }
                }}
              >
                Réinitialiser les filtres
              </Button>
            </Box>
          </Zoom>
        )}
      </Container>
    </Box>
  );
}

export default CatalogModule;