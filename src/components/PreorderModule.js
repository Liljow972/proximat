import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  IconButton,
  Divider,
  Badge,
  Stepper,
  Step,
  StepLabel,
  Fade,
  Slide,
  Avatar,
  Collapse,
  Zoom,
  Grow,
  LinearProgress,
  Skeleton,
  ButtonGroup,
  useMediaQuery,
  useTheme,
  Container,
  Stack,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  LocalShipping as ShippingIcon,
  Person as PersonIcon,
  Inventory as InventoryIcon,
  ArrowForward as ArrowForwardIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  LocalOffer as LocalOfferIcon,
  Visibility as VisibilityIcon,
  Schedule as ScheduleIcon,
  Security as SecurityIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

function PreorderModule() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [cart, setCart] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [orderForm, setOrderForm] = useState({
    quantity: 1,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: '',
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    comments: '',
  });

  // Données des produits organisées par catégories
  const productCategories = {
    granulaires: {
      name: 'Matériaux granulaires',
      color: '#FF6B35',
      icon: '🏗️',
      products: [
        { id: 1, name: 'Tout venant', price: 45, unit: 'm³', available: true, popular: true },
        { id: 2, name: 'Sable enduit', price: 55, unit: 'm³', available: true },
        { id: 3, name: 'Sable béton', price: 60, unit: 'm³', available: true, popular: true },
        { id: 4, name: 'Gravillon', price: 65, unit: 'm³', available: true },
        { id: 5, name: 'Sable concassé', price: 58, unit: 'm³', available: true },
        { id: 6, name: 'Gravier pouzzolane', price: 75, unit: 'm³', available: true },
        { id: 7, name: 'Gravillon 0/31.5', price: 70, unit: 'm³', available: true },
      ]
    },
    ciments: {
      name: 'Ciments & Liants',
      color: '#4ECDC4',
      icon: '🧱',
      products: [
        { id: 8, name: 'Ciment classique (35 kg)', price: 8.5, unit: 'sac', available: true, popular: true },
        { id: 9, name: 'Cimabat', price: 12, unit: 'sac', available: true },
        { id: 10, name: 'Ciment Classic', price: 9, unit: 'sac', available: true },
        { id: 11, name: 'Ciment colle avec résine', price: 15, unit: 'sac', available: true },
      ]
    },
    ferraillage: {
      name: 'Ferraillage',
      color: '#45B7D1',
      icon: '⚙️',
      products: [
        { id: 12, name: 'Fer Ø6', price: 1.2, unit: 'kg', available: true },
        { id: 13, name: 'Fer Ø8', price: 1.3, unit: 'kg', available: true },
      ]
    },
    blocs: {
      name: 'Blocs & Parpaings',
      color: '#96CEB4',
      icon: '🧱',
      products: [
        { id: 14, name: 'Parpaings 15x25x50', price: 2.1, unit: 'pièce', available: true, popular: true },
        { id: 15, name: 'Parpaings 10x25x50', price: 1.8, unit: 'pièce', available: true },
        { id: 16, name: 'Bloc à bancher 21x25x50', price: 3.2, unit: 'pièce', available: true },
      ]
    }
  };

  const steps = ['Sélection produits', 'Panier', 'Informations client'];

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setOrderForm({ ...orderForm, quantity: 1 });
    setOpenDialog(true);
  };

  const handleAddToCart = () => {
    if (selectedProduct && orderForm.quantity > 0) {
      const existingItem = cart.find(item => item.id === selectedProduct.id);
      
      if (existingItem) {
        setCart(cart.map(item => 
          item.id === selectedProduct.id 
            ? { ...item, quantity: item.quantity + parseFloat(orderForm.quantity) }
            : item
        ));
      } else {
        setCart([...cart, { 
          ...selectedProduct, 
          quantity: parseFloat(orderForm.quantity) 
        }]);
      }
      
      setOpenDialog(false);
      setSelectedProduct(null);
      setOrderForm({ ...orderForm, quantity: 1 });
    }
  };

  const handleRemoveFromCart = useCallback((itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  }, []);

  const handleQuantityChange = useCallback((itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    } else {
      setCart(prevCart => prevCart.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  }, []);

  const getTotalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  }, [cart]);

  const isFormValid = useMemo(() => {
    return customerInfo.firstName.trim() !== '' &&
           customerInfo.lastName.trim() !== '' &&
           customerInfo.email.trim() !== '' &&
           customerInfo.phone.trim() !== '' &&
           customerInfo.address.trim() !== '' &&
           customerInfo.zipCode.trim() !== '' &&
           customerInfo.city.trim() !== '' &&
           cart.length > 0;
  }, [customerInfo, cart]);

  const handleSubmitOrder = useCallback(() => {
    if (!isFormValid) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Simulation de l'envoi de la commande
    console.log('Commande envoyée:', {
      cart,
      customer: customerInfo,
      total: getTotalPrice
    });

    setOrderSubmitted(true);
    
    // Reset après 5 secondes pour la démo
    setTimeout(() => {
      setOrderSubmitted(false);
      setCart([]);
      setActiveStep(0);
      setOrderForm({
        quantity: 1,
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        notes: '',
      });
    }, 5000);
  }, [isFormValid, cart, customerInfo, getTotalPrice]);

  if (orderSubmitted) {
    return (
      <Fade in={orderSubmitted}>
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 4,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
          }
        }}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <CheckCircleIcon sx={{ fontSize: 100, mb: 3, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }} />
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, mb: 2 }}>
              Précommande confirmée !
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
              Votre précommande a été envoyée avec succès.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
              Vous recevrez un email de confirmation sous peu.
            </Typography>
            <Alert 
              severity="info" 
              sx={{ 
                mt: 4, 
                maxWidth: 600, 
                mx: 'auto',
                bgcolor: 'rgba(255,255,255,0.95)',
                color: 'text.primary',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ShippingIcon color="info" />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Retrait sur place uniquement
                  </Typography>
                  <Typography variant="body2">
                    Nos équipes vous contacteront pour organiser le retrait de votre commande.
                  </Typography>
                </Box>
              </Box>
            </Alert>
          </Box>
        </Box>
      </Fade>
    );
  }

  return (
    <Box>
      {/* Enhanced Hero Section */}
      <Fade in timeout={800}>
        <Box sx={{ 
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          borderRadius: { xs: 2, md: 4 },
          p: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 2, md: 4 },
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
          }
        }}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              flexDirection: { xs: 'column', md: 'row' },
              textAlign: { xs: 'center', md: 'left' },
              gap: { xs: 3, md: 2 }, 
              mb: { xs: 3, md: 4 } 
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 3 } 
              }}>
                <Zoom in timeout={1000}>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    width: { xs: 60, sm: 70, md: 80 }, 
                    height: { xs: 60, sm: 70, md: 80 },
                    animation: 'float 3s ease-in-out infinite',
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-10px)' },
                    }
                  }}>
                    <ShoppingCartIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 } }} />
                  </Avatar>
                </Zoom>
                <Box>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 800, 
                    mb: 1,
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '3rem' }
                  }}>
                    Configurateur de précommande
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    opacity: 0.9, 
                    mb: 2,
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                  }}>
                    Sélectionnez vos matériaux et organisez votre retrait
                  </Typography>
                </Box>
              </Box>
              <Zoom in timeout={1200}>
                <Badge 
                  badgeContent={cart.length} 
                  color="secondary" 
                  sx={{ 
                    '& .MuiBadge-badge': { 
                      bgcolor: 'white', 
                      color: 'primary.main',
                      animation: cart.length > 0 ? 'bounce 0.6s ease-in-out' : 'none',
                      '@keyframes bounce': {
                        '0%, 20%, 60%, 100%': { transform: 'translateY(0)' },
                        '40%': { transform: 'translateY(-10px)' },
                        '80%': { transform: 'translateY(-5px)' },
                      }
                    } 
                  }}
                >
                  <Avatar sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    width: { xs: 50, sm: 55, md: 60 }, 
                    height: { xs: 50, sm: 55, md: 60 } 
                  }}>
                    <ShoppingCartIcon sx={{ fontSize: { xs: 25, sm: 28, md: 30 } }} />
                  </Avatar>
                </Badge>
              </Zoom>
            </Box>

            {/* Statistics Cards */}
            <Grid container spacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={4} sm={4}>
                <Slide direction="up" in timeout={600}>
                  <Card sx={{ 
                    bgcolor: 'rgba(255,255,255,0.15)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      bgcolor: 'rgba(255,255,255,0.2)',
                    }
                  }}>
                    <CardContent sx={{ textAlign: 'center', py: { xs: 1, sm: 2 } }}>
                      <Typography variant="h4" sx={{ 
                        fontWeight: 800, 
                        mb: 1,
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                      }}>
                        {Object.values(productCategories).reduce((total, cat) => total + cat.products.length, 0)}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        opacity: 0.9,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}>
                        Produits disponibles
                      </Typography>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Slide direction="up" in timeout={800}>
                  <Card sx={{ 
                    bgcolor: 'rgba(255,255,255,0.15)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      bgcolor: 'rgba(255,255,255,0.2)',
                    }
                  }}>
                    <CardContent sx={{ textAlign: 'center', py: { xs: 1, sm: 2 } }}>
                      <Typography variant="h4" sx={{ 
                        fontWeight: 800, 
                        mb: 1,
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                      }}>
                        {Object.keys(productCategories).length}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        opacity: 0.9,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}>
                        Catégories
                      </Typography>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Slide direction="up" in timeout={1000}>
                  <Card sx={{ 
                    bgcolor: 'rgba(255,255,255,0.15)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      bgcolor: 'rgba(255,255,255,0.2)',
                    }
                  }}>
                    <CardContent sx={{ textAlign: 'center', py: { xs: 1, sm: 2 } }}>
                      <Typography variant="h4" sx={{ 
                        fontWeight: 800, 
                        mb: 1,
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                      }}>
                        {cart.length}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        opacity: 0.9,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}>
                        Articles au panier
                      </Typography>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Fade>

      {/* Enhanced Stepper */}
      <Zoom in timeout={1000}>
        <Card sx={{ 
          mb: { xs: 2, md: 4 }, 
          borderRadius: { xs: 2, md: 4 },
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          }
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Stepper 
              activeStep={activeStep} 
              alternativeLabel={!isMobile}
              orientation={isMobile ? 'vertical' : 'horizontal'}
              sx={{
                '& .MuiStepConnector-line': {
                  borderTopWidth: 3,
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                  borderRadius: 1,
                  transition: 'all 0.3s ease',
                },
                '& .MuiStepLabel-label': {
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  color: '#666',
                  '&.Mui-active': {
                    color: '#FF6B35',
                    fontWeight: 800,
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                  },
                  '&.Mui-completed': {
                    color: '#28a745',
                    fontWeight: 700,
                  }
                },
                '& .MuiStepIcon-root': {
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  '&.Mui-active': {
                    color: '#FF6B35',
                    transform: 'scale(1.2)',
                    filter: 'drop-shadow(0 4px 8px rgba(255, 107, 53, 0.3))',
                  },
                  '&.Mui-completed': {
                    color: '#28a745',
                  }
                }
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>
      </Zoom>

      {/* Step Content */}
      {activeStep === 0 && (
        <Fade in timeout={600}>
          <Box>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                textAlign: 'center', 
                mb: 4,
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800,
              }}
            >
              Sélectionnez vos produits
            </Typography>
            
            {Object.entries(productCategories).map(([categoryKey, category], categoryIndex) => (
              <Box key={categoryKey} sx={{ mb: { xs: 4, md: 6 } }}>
                <Slide direction="right" in timeout={400 + categoryIndex * 200}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: { xs: 2, md: 3 }, 
                      fontWeight: 700,
                      color: category.color,
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: { xs: 'column', sm: 'row' },
                      textAlign: { xs: 'center', sm: 'left' },
                      gap: { xs: 1, sm: 2 },
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    }}
                  >
                    <Avatar sx={{ 
                      bgcolor: `${category.color}20`, 
                      color: category.color, 
                      width: { xs: 35, sm: 40 }, 
                      height: { xs: 35, sm: 40 } 
                    }}>
                      <LocalOfferIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                    </Avatar>
                    {category.name}
                  </Typography>
                </Slide>
                
                <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}>
                  {category.products.map((product, productIndex) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                      <Grow in timeout={600 + productIndex * 100}>
                        <Card 
                          sx={{ 
                            cursor: 'pointer',
                            borderRadius: 3,
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '2px solid transparent',
                            '&:hover': {
                              borderColor: category.color,
                              boxShadow: `0 12px 40px ${category.color}30`,
                              transform: 'translateY(-8px) scale(1.02)',
                              '& .product-overlay': {
                                opacity: 1,
                              },
                              '& .product-price': {
                                transform: 'scale(1.1)',
                              },
                              '& .product-icon': {
                                transform: 'rotate(360deg)',
                              }
                            }
                          }}
                          onClick={() => handleProductSelect(product)}
                        >
                          <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 }, position: 'relative' }}>
                            {product.popular && (
                              <Zoom in timeout={800 + productIndex * 100}>
                                <Chip 
                                  label="Populaire" 
                                  size="small" 
                                  sx={{ 
                                    position: 'absolute',
                                    top: { xs: 8, sm: 10, md: 12 },
                                    right: { xs: 8, sm: 10, md: 12 },
                                    bgcolor: '#FFD700',
                                    color: '#000',
                                    fontWeight: 600,
                                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                    animation: 'pulse 2s infinite',
                                    '@keyframes pulse': {
                                      '0%': { transform: 'scale(1)' },
                                      '50%': { transform: 'scale(1.05)' },
                                      '100%': { transform: 'scale(1)' },
                                    }
                                  }} 
                                />
                              </Zoom>
                            )}
                            
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: { xs: 1.5, sm: 2 }, 
                              mb: { xs: 1.5, sm: 2 } 
                            }}>
                              <Avatar sx={{ 
                                bgcolor: `${category.color}20`, 
                                color: category.color,
                                width: { xs: 40, sm: 44, md: 48 },
                                height: { xs: 40, sm: 44, md: 48 },
                              }}>
                                <LocalOfferIcon className="product-icon" sx={{ 
                                  fontSize: { xs: 20, sm: 22, md: 24 },
                                  transition: 'transform 0.5s ease',
                                }} />
                              </Avatar>
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" sx={{ 
                                  fontWeight: 700, 
                                  mb: 0.5,
                                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                                }}>
                                  {product.name}
                                </Typography>
                                <Typography 
                                  variant="h5" 
                                  className="product-price"
                                  sx={{ 
                                    fontWeight: 800,
                                    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    transition: 'transform 0.3s ease',
                                  }}
                                >
                                  {product.price}€ / {product.unit}
                                </Typography>
                              </Box>
                            </Box>
                            
                            {/* Overlay */}
                            <Box 
                              className="product-overlay"
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.9) 0%, rgba(247, 147, 30, 0.9) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                                color: 'white',
                                flexDirection: 'column',
                                gap: 1,
                              }}
                            >
                              <VisibilityIcon sx={{ fontSize: 40 }} />
                              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                Cliquer pour ajouter
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grow>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}

            {/* Enhanced Cart Button */}
            {cart.length > 0 && (
              <Collapse in timeout={800}>
                <Zoom in timeout={1000}>
                  <Box sx={{ textAlign: 'center', mt: 6 }}>
                    <ButtonGroup 
                      variant="contained" 
                      size="large"
                      sx={{
                        '& .MuiButton-root': {
                          borderRadius: 3,
                          px: 4,
                          py: 2,
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          transition: 'all 0.3s ease',
                        }
                      }}
                    >
                      <Button
                        onClick={() => setCart([])}
                        sx={{
                          background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #c82333 0%, #a71e2a 100%)',
                            transform: 'translateY(-2px)',
                          }
                        }}
                        startIcon={<DeleteIcon />}
                      >
                        Vider
                      </Button>
                      <Button
                        onClick={() => setActiveStep(1)}
                        sx={{
                          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #E55A2B 0%, #E8831A 100%)',
                            transform: 'translateY(-2px)',
                          }
                        }}
                        endIcon={<ArrowForwardIcon />}
                      >
                        Voir le panier ({cart.length})
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Zoom>
              </Collapse>
            )}
          </Box>
        </Fade>
      )}

      {/* Step 1: Cart Display */}
      {activeStep === 1 && (
        <Fade in timeout={600}>
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 800, 
                mb: { xs: 3, md: 4 },
                textAlign: 'center',
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              🛒 Votre Panier
            </Typography>

            {cart.length === 0 ? (
              <Zoom in timeout={800}>
                <Card sx={{ 
                  textAlign: 'center', 
                  p: { xs: 3, sm: 4, md: 6 },
                  borderRadius: { xs: 2, sm: 3, md: 4 },
                  background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 100%)',
                  border: '2px dashed rgba(255, 107, 53, 0.3)',
                }}>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(255, 107, 53, 0.1)', 
                    width: { xs: 60, sm: 80 }, 
                    height: { xs: 60, sm: 80 }, 
                    mx: 'auto', 
                    mb: 2 
                  }}>
                    <ShoppingCartIcon sx={{ fontSize: { xs: 30, sm: 40 }, color: '#FF6B35' }} />
                  </Avatar>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 700, 
                    mb: 1,
                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                  }}>
                    Votre panier est vide
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: 'text.secondary', 
                    mb: 3,
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}>
                    Ajoutez des produits pour commencer votre précommande
                  </Typography>
                  <Button 
                    variant="contained" 
                    onClick={() => setActiveStep(0)}
                    startIcon={<ArrowForwardIcon sx={{ transform: 'rotate(180deg)' }} />}
                    sx={{
                      background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                      borderRadius: { xs: 2, sm: 3 },
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1, sm: 1.5 },
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      '&:hover': {
                        background: 'linear-gradient(135deg, #E55A2B 0%, #E8831A 100%)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    Retour aux produits
                  </Button>
                </Card>
              </Zoom>
            ) : (
              <Box>
                {/* Mobile Card Layout */}
                {isMobile ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {cart.map((item, index) => (
                      <Slide key={item.id} direction="up" in timeout={600 + index * 100}>
                        <Card sx={{ 
                          borderRadius: 3,
                          overflow: 'hidden',
                          border: '1px solid rgba(255, 107, 53, 0.2)',
                          '&:hover': {
                            boxShadow: '0 8px 25px rgba(255, 107, 53, 0.15)',
                            transform: 'translateY(-2px)',
                          }
                        }}>
                          <CardContent sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                              <Avatar sx={{ 
                                bgcolor: 'rgba(255, 107, 53, 0.1)', 
                                color: '#FF6B35',
                                width: 40,
                                height: 40,
                              }}>
                                <LocalOfferIcon />
                              </Avatar>
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" sx={{ 
                                  fontWeight: 700,
                                  fontSize: '1rem',
                                  mb: 0.5,
                                }}>
                                  {item.name}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  color: 'text.secondary',
                                  fontSize: '0.875rem',
                                }}>
                                  {item.price}€ / {item.unit}
                                </Typography>
                              </Box>
                              <IconButton 
                                onClick={() => handleRemoveFromCart(item.id)}
                                sx={{ 
                                  color: '#dc3545',
                                  '&:hover': { bgcolor: 'rgba(220, 53, 69, 0.1)' }
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IconButton 
                                  size="small"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - (item.unit === 'pièce' ? 1 : 0.1))}
                                  sx={{ 
                                    bgcolor: 'rgba(255, 107, 53, 0.1)',
                                    color: '#FF6B35',
                                    '&:hover': { bgcolor: 'rgba(255, 107, 53, 0.2)' }
                                  }}
                                >
                                  <RemoveIcon />
                                </IconButton>
                                <Typography sx={{ 
                                  minWidth: 60, 
                                  textAlign: 'center',
                                  fontWeight: 600,
                                  fontSize: '1rem',
                                }}>
                                  {item.quantity} {item.unit}
                                </Typography>
                                <IconButton 
                                  size="small"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + (item.unit === 'pièce' ? 1 : 0.1))}
                                  sx={{ 
                                    bgcolor: 'rgba(255, 107, 53, 0.1)',
                                    color: '#FF6B35',
                                    '&:hover': { bgcolor: 'rgba(255, 107, 53, 0.2)' }
                                  }}
                                >
                                  <AddIcon />
                                </IconButton>
                              </Box>
                              <Typography variant="h6" sx={{ 
                                fontWeight: 800,
                                color: '#FF6B35',
                                fontSize: '1.1rem',
                              }}>
                                {(item.price * item.quantity).toFixed(2)}€
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Slide>
                    ))}
                  </Box>
                ) : (
                  /* Desktop Table Layout */
                  <Zoom in timeout={800}>
                    <TableContainer 
                      component={Paper} 
                      sx={{ 
                        borderRadius: 3,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 107, 53, 0.2)',
                      }}
                    >
                      <Table>
                        <TableHead sx={{ 
                          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                        }}>
                          <TableRow>
                            <TableCell sx={{ 
                              color: 'white', 
                              fontWeight: 700,
                              fontSize: '1rem',
                            }}>
                              Produit
                            </TableCell>
                            <TableCell align="center" sx={{ 
                              color: 'white', 
                              fontWeight: 700,
                              fontSize: '1rem',
                            }}>
                              Prix unitaire
                            </TableCell>
                            <TableCell align="center" sx={{ 
                              color: 'white', 
                              fontWeight: 700,
                              fontSize: '1rem',
                            }}>
                              Quantité
                            </TableCell>
                            <TableCell align="center" sx={{ 
                              color: 'white', 
                              fontWeight: 700,
                              fontSize: '1rem',
                            }}>
                              Total
                            </TableCell>
                            <TableCell align="center" sx={{ 
                              color: 'white', 
                              fontWeight: 700,
                              fontSize: '1rem',
                            }}>
                              Actions
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {cart.map((item, index) => (
                            <Slide key={item.id} direction="up" in timeout={600 + index * 100}>
                              <TableRow sx={{ 
                                '&:hover': { 
                                  bgcolor: 'rgba(255, 107, 53, 0.05)',
                                  transform: 'scale(1.01)',
                                },
                                transition: 'all 0.2s ease',
                              }}>
                                <TableCell>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar sx={{ 
                                      bgcolor: 'rgba(255, 107, 53, 0.1)', 
                                      color: '#FF6B35',
                                      width: 40,
                                      height: 40,
                                    }}>
                                      <LocalOfferIcon />
                                    </Avatar>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                      {item.name}
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  <Typography sx={{ fontWeight: 600 }}>
                                    {item.price}€ / {item.unit}
                                  </Typography>
                                </TableCell>
                                <TableCell align="center">
                                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                    <IconButton 
                                      size="small"
                                      onClick={() => handleQuantityChange(item.id, item.quantity - (item.unit === 'pièce' ? 1 : 0.1))}
                                      sx={{ 
                                        bgcolor: 'rgba(255, 107, 53, 0.1)',
                                        color: '#FF6B35',
                                        '&:hover': { bgcolor: 'rgba(255, 107, 53, 0.2)' }
                                      }}
                                    >
                                      <RemoveIcon />
                                    </IconButton>
                                    <Typography sx={{ 
                                      minWidth: 80, 
                                      textAlign: 'center',
                                      fontWeight: 600,
                                      px: 1,
                                    }}>
                                      {item.quantity} {item.unit}
                                    </Typography>
                                    <IconButton 
                                      size="small"
                                      onClick={() => handleQuantityChange(item.id, item.quantity + (item.unit === 'pièce' ? 1 : 0.1))}
                                      sx={{ 
                                        bgcolor: 'rgba(255, 107, 53, 0.1)',
                                        color: '#FF6B35',
                                        '&:hover': { bgcolor: 'rgba(255, 107, 53, 0.2)' }
                                      }}
                                    >
                                      <AddIcon />
                                    </IconButton>
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  <Typography variant="h6" sx={{ 
                                    fontWeight: 800,
                                    color: '#FF6B35',
                                  }}>
                                    {(item.price * item.quantity).toFixed(2)}€
                                  </Typography>
                                </TableCell>
                                <TableCell align="center">
                                  <IconButton 
                                    onClick={() => handleRemoveFromCart(item.id)}
                                    sx={{ 
                                      color: '#dc3545',
                                      '&:hover': { 
                                        bgcolor: 'rgba(220, 53, 69, 0.1)',
                                        transform: 'scale(1.1)',
                                      }
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            </Slide>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Zoom>
                )}

                {/* Total and Actions */}
                <Box sx={{ mt: { xs: 3, md: 4 } }}>
                  <Zoom in timeout={1000}>
                    <Card sx={{ 
                      background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                      color: 'white',
                      borderRadius: { xs: 2, sm: 3 },
                      mb: { xs: 2, md: 3 },
                    }}>
                      <CardContent sx={{ 
                        textAlign: 'center',
                        p: { xs: 2, sm: 3 },
                      }}>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 900,
                          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                        }}>
                          Total : {getTotalPrice}€
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          opacity: 0.9,
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                        }}>
                          Prix HT - Retrait en magasin
                        </Typography>
                      </CardContent>
                    </Card>
                  </Zoom>

                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 3 },
                    justifyContent: 'center',
                  }}>
                    <Button 
                      variant="outlined" 
                      onClick={() => setActiveStep(0)}
                      startIcon={<ArrowForwardIcon sx={{ transform: 'rotate(180deg)' }} />}
                      size={isMobile ? "medium" : "large"}
                      fullWidth={isMobile}
                      sx={{
                        borderColor: '#FF6B35',
                        color: '#FF6B35',
                        borderRadius: { xs: 2, sm: 3 },
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.25, sm: 1.5 },
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        fontWeight: 600,
                        '&:hover': {
                          borderColor: '#E55A2B',
                          bgcolor: 'rgba(255, 107, 53, 0.1)',
                          transform: 'translateY(-2px)',
                        }
                      }}
                    >
                      Continuer les achats
                    </Button>
                    <Button 
                      variant="contained" 
                      onClick={() => setActiveStep(2)}
                      endIcon={<ArrowForwardIcon />}
                      size={isMobile ? "medium" : "large"}
                      fullWidth={isMobile}
                      sx={{
                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                        borderRadius: { xs: 2, sm: 3 },
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.25, sm: 1.5 },
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        fontWeight: 700,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #E55A2B 0%, #E8831A 100%)',
                          transform: 'translateY(-2px)',
                        }
                      }}
                    >
                      Finaliser la commande
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Fade>
      )}

      {/* Step 2: Customer Information Form */}
      {activeStep === 2 && (
        <Fade in timeout={600}>
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 800, 
                mb: { xs: 3, md: 4 },
                textAlign: 'center',
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              📋 Informations de livraison
            </Typography>

            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {/* Customer Information Form */}
              <Grid item xs={12} md={8}>
                <Zoom in timeout={800}>
                  <Card sx={{ 
                    borderRadius: { xs: 2, sm: 3, md: 4 },
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 107, 53, 0.2)',
                  }}>
                    <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: { xs: 2, md: 3 } }}>
                        <Avatar sx={{ 
                          bgcolor: 'rgba(255, 107, 53, 0.1)', 
                          color: '#FF6B35',
                          width: { xs: 40, sm: 50 },
                          height: { xs: 40, sm: 50 },
                        }}>
                          <PersonIcon sx={{ fontSize: { xs: 20, sm: 25 } }} />
                        </Avatar>
                        <Typography variant="h5" sx={{ 
                          fontWeight: 700,
                          fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        }}>
                          Informations personnelles
                        </Typography>
                      </Box>

                      <Grid container spacing={{ xs: 2, sm: 3 }}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Prénom *"
                            variant="outlined"
                            value={customerInfo.firstName}
                            onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: { xs: 2, sm: 3 },
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                '&:hover fieldset': {
                                  borderColor: '#FF6B35',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#FF6B35',
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: '#FF6B35',
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Nom *"
                            variant="outlined"
                            value={customerInfo.lastName}
                            onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: { xs: 2, sm: 3 },
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                '&:hover fieldset': {
                                  borderColor: '#FF6B35',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#FF6B35',
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: '#FF6B35',
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Email *"
                            type="email"
                            variant="outlined"
                            value={customerInfo.email}
                            onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: { xs: 2, sm: 3 },
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                '&:hover fieldset': {
                                  borderColor: '#FF6B35',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#FF6B35',
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: '#FF6B35',
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Téléphone *"
                            variant="outlined"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: { xs: 2, sm: 3 },
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                '&:hover fieldset': {
                                  borderColor: '#FF6B35',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#FF6B35',
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: '#FF6B35',
                              },
                            }}
                          />
                        </Grid>
                      </Grid>

                      <Divider sx={{ my: { xs: 2, md: 3 } }} />

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: { xs: 2, md: 3 } }}>
                        <Avatar sx={{ 
                          bgcolor: 'rgba(255, 107, 53, 0.1)', 
                          color: '#FF6B35',
                          width: { xs: 40, sm: 50 },
                          height: { xs: 40, sm: 50 },
                        }}>
                          <ShippingIcon sx={{ fontSize: { xs: 20, sm: 25 } }} />
                        </Avatar>
                        <Typography variant="h5" sx={{ 
                          fontWeight: 700,
                          fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        }}>
                          Adresse de livraison
                        </Typography>
                      </Box>

                      <Grid container spacing={{ xs: 2, sm: 3 }}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Adresse *"
                            variant="outlined"
                            value={customerInfo.address}
                            onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: { xs: 2, sm: 3 },
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                '&:hover fieldset': {
                                  borderColor: '#FF6B35',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#FF6B35',
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: '#FF6B35',
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Code postal *"
                            variant="outlined"
                            value={customerInfo.zipCode}
                            onChange={(e) => setCustomerInfo({...customerInfo, zipCode: e.target.value})}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: { xs: 2, sm: 3 },
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                '&:hover fieldset': {
                                  borderColor: '#FF6B35',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#FF6B35',
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: '#FF6B35',
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <TextField
                            fullWidth
                            label="Ville *"
                            variant="outlined"
                            value={customerInfo.city}
                            onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: { xs: 2, sm: 3 },
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                '&:hover fieldset': {
                                  borderColor: '#FF6B35',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#FF6B35',
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: '#FF6B35',
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Commentaires (optionnel)"
                            multiline
                            rows={3}
                            variant="outlined"
                            value={customerInfo.comments}
                            onChange={(e) => setCustomerInfo({...customerInfo, comments: e.target.value})}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: { xs: 2, sm: 3 },
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                '&:hover fieldset': {
                                  borderColor: '#FF6B35',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#FF6B35',
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: '#FF6B35',
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>

              {/* Order Summary */}
              <Grid item xs={12} md={4}>
                <Slide direction="left" in timeout={1000}>
                  <Card sx={{ 
                    borderRadius: { xs: 2, sm: 3, md: 4 },
                    background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 100%)',
                    border: '2px solid rgba(255, 107, 53, 0.2)',
                    position: 'sticky',
                    top: { md: 20 },
                  }}>
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: { xs: 2, md: 3 } }}>
                        <Avatar sx={{ 
                          bgcolor: '#FF6B35', 
                          color: 'white',
                          width: { xs: 40, sm: 50 },
                          height: { xs: 40, sm: 50 },
                        }}>
                          <ShoppingCartIcon sx={{ fontSize: { xs: 20, sm: 25 } }} />
                        </Avatar>
                        <Typography variant="h5" sx={{ 
                          fontWeight: 700,
                          fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        }}>
                          Récapitulatif
                        </Typography>
                      </Box>

                      <Box sx={{ mb: { xs: 2, md: 3 } }}>
                        {cart.map((item, index) => (
                          <Box key={item.id} sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            py: 1,
                            borderBottom: index < cart.length - 1 ? '1px solid rgba(255, 107, 53, 0.2)' : 'none',
                          }}>
                            <Box>
                              <Typography variant="body2" sx={{ 
                                fontWeight: 600,
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                              }}>
                                {item.name}
                              </Typography>
                              <Typography variant="caption" sx={{ 
                                color: 'text.secondary',
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                              }}>
                                {item.quantity} {item.unit} × {item.price}€
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ 
                              fontWeight: 700,
                              color: '#FF6B35',
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                            }}>
                              {(item.price * item.quantity).toFixed(2)}€
                            </Typography>
                          </Box>
                        ))}
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mb: { xs: 2, md: 3 },
                      }}>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 800,
                          fontSize: { xs: '1.1rem', sm: '1.25rem' },
                        }}>
                          Total HT
                        </Typography>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 900,
                          color: '#FF6B35',
                          fontSize: { xs: '1.1rem', sm: '1.25rem' },
                        }}>
                          {getTotalPrice}€
                        </Typography>
                      </Box>

                      <Alert 
                        severity="info" 
                        sx={{ 
                          mb: { xs: 2, md: 3 },
                          borderRadius: { xs: 2, sm: 3 },
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        }}
                      >
                        Retrait en magasin uniquement
                      </Alert>

                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row', md: 'column' },
                        gap: { xs: 2, sm: 2 },
                      }}>
                        <Button 
                          variant="outlined" 
                          onClick={() => setActiveStep(1)}
                          startIcon={<ArrowForwardIcon sx={{ transform: 'rotate(180deg)' }} />}
                          size={isMobile ? "medium" : "large"}
                          fullWidth
                          sx={{
                            borderColor: '#FF6B35',
                            color: '#FF6B35',
                            borderRadius: { xs: 2, sm: 3 },
                            px: { xs: 3, sm: 4 },
                            py: { xs: 1.25, sm: 1.5 },
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                            fontWeight: 600,
                            '&:hover': {
                              borderColor: '#E55A2B',
                              bgcolor: 'rgba(255, 107, 53, 0.1)',
                              transform: 'translateY(-2px)',
                            }
                          }}
                        >
                          Retour au panier
                        </Button>
                        <Button 
                          variant="contained" 
                          onClick={handleSubmitOrder}
                          endIcon={<CheckCircleIcon />}
                          size={isMobile ? "medium" : "large"}
                          fullWidth
                          disabled={!isFormValid}
                          sx={{
                            background: isFormValid 
                              ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
                              : 'linear-gradient(135deg, #6c757d 0%, #adb5bd 100%)',
                            borderRadius: { xs: 2, sm: 3 },
                            px: { xs: 3, sm: 4 },
                            py: { xs: 1.25, sm: 1.5 },
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                            fontWeight: 700,
                            '&:hover': {
                              background: isFormValid 
                                ? 'linear-gradient(135deg, #218838 0%, #1e7e34 100%)'
                                : 'linear-gradient(135deg, #6c757d 0%, #adb5bd 100%)',
                              transform: isFormValid ? 'translateY(-2px)' : 'none',
                            }
                          }}
                        >
                          Confirmer la commande
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      )}

      {/* Enhanced Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="sm" 
        fullWidth
        fullScreen={isMobile}
        TransitionComponent={Zoom}
        TransitionProps={{ timeout: 600 }}
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, sm: 4 },
            boxShadow: '0 32px 64px rgba(0, 0, 0, 0.2)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            m: { xs: 0, sm: 2 },
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          color: 'white',
          fontWeight: 800,
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
          p: { xs: 2, sm: 3 },
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1.5, sm: 2 },
        }}>
          <Avatar sx={{ 
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            width: { xs: 40, sm: 48 },
            height: { xs: 40, sm: 48 },
          }}>
            <ShoppingCartIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
          </Avatar>
          Ajouter au panier
        </DialogTitle>
        
        <DialogContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          {selectedProduct && (
            <Fade in timeout={800}>
              <Box sx={{ pt: 1 }}>
                <Slide direction="down" in timeout={600}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'center', sm: 'center' },
                    textAlign: { xs: 'center', sm: 'left' },
                    gap: { xs: 2, sm: 3 }, 
                    mb: { xs: 3, sm: 4 },
                    p: { xs: 2, sm: 3 },
                    borderRadius: { xs: 2, sm: 3 },
                    background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 100%)',
                    border: '1px solid rgba(255, 107, 53, 0.2)',
                  }}>
                    <Avatar sx={{ 
                      bgcolor: `${Object.values(productCategories).find(cat => 
                        cat.products.some(p => p.id === selectedProduct.id)
                      )?.color || '#FF6B35'}20`,
                      color: Object.values(productCategories).find(cat => 
                        cat.products.some(p => p.id === selectedProduct.id)
                      )?.color || '#FF6B35',
                      width: { xs: 56, sm: 64 },
                      height: { xs: 56, sm: 64 },
                    }}>
                      <LocalOfferIcon sx={{ 
                        color: 'white',
                        fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
                      }} />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 700,
                          mb: 1,
                          fontSize: { xs: '1.25rem', sm: '1.5rem' }
                        }}
                      >
                        {selectedProduct.name}
                      </Typography>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: 'primary.main',
                          fontWeight: 600,
                          fontSize: { xs: '1rem', sm: '1.25rem' }
                        }}
                      >
                        {selectedProduct.price}€ / {selectedProduct.unit}
                      </Typography>
                    </Box>
                  </Box>
                </Slide>
                
                <Slide direction="up" in timeout={800}>
                  <TextField
                    fullWidth
                    label={`Quantité (${selectedProduct.unit})`}
                    type="number"
                    value={orderForm.quantity}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, quantity: e.target.value }))}
                    inputProps={{ 
                      min: selectedProduct.unit === 'pièce' ? 1 : 0.1, 
                      step: selectedProduct.unit === 'pièce' ? 1 : 0.1 
                    }}
                    sx={{ 
                      mb: { xs: 2, sm: 3 },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: { xs: 2, sm: 3 },
                        fontSize: { xs: '1rem', sm: '1.2rem' },
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(255, 107, 53, 0.15)',
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(255, 107, 53, 0.25)',
                        }
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#FF6B35',
                      },
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FF6B35',
                        borderWidth: 2,
                      }
                    }}
                  />
                </Slide>
                
                {orderForm.quantity > 0 && (
                  <Zoom in timeout={1000}>
                    <Box sx={{ 
                      p: { xs: 2, sm: 3 }, 
                      borderRadius: { xs: 2, sm: 3 },
                      background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                      color: 'white',
                      textAlign: 'center',
                      boxShadow: '0 8px 32px rgba(40, 167, 69, 0.3)',
                    }}>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 900,
                          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                        }}
                      >
                        Total : {(selectedProduct.price * parseFloat(orderForm.quantity || 0)).toFixed(2)}€
                      </Typography>
                    </Box>
                  </Zoom>
                )}
              </Box>
            </Fade>
          )}
        </DialogContent>
        
        <DialogActions sx={{ 
          p: { xs: 2, sm: 3, md: 4 }, 
          gap: { xs: 1, sm: 2 },
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Slide direction="right" in timeout={1000}>
            <Button 
              onClick={() => setOpenDialog(false)}
              size={isMobile ? "medium" : "large"}
              fullWidth={isMobile}
              sx={{ 
                borderRadius: { xs: 2, sm: 3 },
                px: { xs: 3, sm: 4 },
                py: { xs: 1.25, sm: 1.5 },
                fontWeight: 600,
                color: '#6c757d',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                '&:hover': {
                  backgroundColor: 'rgba(108, 117, 125, 0.1)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Annuler
            </Button>
          </Slide>
          <Slide direction="left" in timeout={1100}>
            <Button 
              variant="contained" 
              onClick={handleAddToCart}
              size={isMobile ? "medium" : "large"}
              fullWidth={isMobile}
              startIcon={<InventoryIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />}
              disabled={!orderForm.quantity || orderForm.quantity <= 0}
              sx={{ 
                borderRadius: { xs: 2, sm: 3 },
                px: { xs: 3, sm: 4 },
                py: { xs: 1.25, sm: 1.5 },
                fontWeight: 700,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                boxShadow: '0 8px 32px rgba(255, 107, 53, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #E55A2B 0%, #E8831A 100%)',
                  boxShadow: '0 12px 40px rgba(255, 107, 53, 0.4)',
                  transform: 'translateY(-2px)',
                },
                '&:disabled': {
                  background: 'linear-gradient(135deg, #ccc 0%, #999 100%)',
                  boxShadow: 'none',
                }
              }}
            >
              Ajouter au panier
            </Button>
          </Slide>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default React.memo(PreorderModule);