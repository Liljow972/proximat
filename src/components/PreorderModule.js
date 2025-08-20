import React, { useState } from 'react';
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
} from '@mui/icons-material';

function PreorderModule() {
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

  // Produits disponibles pour précommande avec catégories
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
    setOrderForm(prev => ({ ...prev, quantity: 1 }));
    setOpenDialog(true);
  };

  const handleAddToCart = () => {
    if (!orderForm.quantity || orderForm.quantity <= 0) {
      alert('Veuillez saisir une quantité valide');
      return;
    }

    const cartItem = {
      id: Date.now(),
      product: selectedProduct,
      quantity: parseFloat(orderForm.quantity),
      totalPrice: selectedProduct.price * parseFloat(orderForm.quantity),
    };

    setCart(prev => [...prev, cartItem]);
    setOpenDialog(false);
    setOrderForm(prev => ({ ...prev, quantity: 1 }));
    
    // Auto-advance to cart step if first item
    if (cart.length === 0) {
      setActiveStep(1);
    }
  };

  const handleRemoveFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }

    setCart(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            quantity: newQuantity,
            totalPrice: item.product.price * newQuantity
          }
        : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handleSubmitOrder = () => {
    if (!orderForm.customerName || !orderForm.customerEmail || !orderForm.customerPhone) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (cart.length === 0) {
      alert('Votre panier est vide');
      return;
    }

    console.log('Commande soumise:', {
      cart,
      customer: {
        name: orderForm.customerName,
        email: orderForm.customerEmail,
        phone: orderForm.customerPhone,
        notes: orderForm.notes,
      },
      total: getTotalPrice(),
    });

    setOrderSubmitted(true);
    
    setTimeout(() => {
      setCart([]);
      setOrderForm({
        quantity: 1,
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        notes: '',
      });
      setOrderSubmitted(false);
      setActiveStep(0);
    }, 3000);
  };

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
      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
        borderRadius: 4,
        p: 4,
        mb: 4,
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                Configurateur de précommande
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                Sélectionnez vos matériaux et organisez votre retrait
              </Typography>
            </Box>
            <Badge badgeContent={cart.length} color="secondary" sx={{ '& .MuiBadge-badge': { bgcolor: 'white', color: 'primary.main' } }}>
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 60, height: 60 }}>
                <ShoppingCartIcon sx={{ fontSize: 30 }} />
              </Avatar>
            </Badge>
          </Box>
        </Box>
      </Box>

      {/* Stepper */}
      <Card sx={{ mb: 4, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel 
                  sx={{
                    '& .MuiStepLabel-label': {
                      fontWeight: activeStep === index ? 600 : 400,
                      color: activeStep === index ? 'primary.main' : 'text.secondary',
                    }
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Step Content */}
      {activeStep === 0 && (
        <Fade in={activeStep === 0}>
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <InventoryIcon color="primary" />
              Sélection des produits
            </Typography>

            {Object.entries(productCategories).map(([categoryKey, category]) => (
              <Card key={categoryKey} sx={{ mb: 4, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar sx={{ bgcolor: category.color, width: 48, height: 48, fontSize: '1.5rem' }}>
                      {category.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: category.color }}>
                      {category.name}
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    {category.products.map((product) => (
                      <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card 
                          variant="outlined" 
                          sx={{ 
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: 2,
                            '&:hover': {
                              borderColor: category.color,
                              boxShadow: `0 12px 40px ${category.color}20`,
                              transform: 'translateY(-4px)',
                            },
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              height: 4,
                              background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                              transform: 'scaleX(0)',
                              transformOrigin: 'left',
                              transition: 'transform 0.3s ease',
                            },
                            '&:hover::before': {
                              transform: 'scaleX(1)',
                            }
                          }}
                          onClick={() => handleProductSelect(product)}
                        >
                          <CardContent sx={{ p: 2.5, position: 'relative' }}>
                            {product.popular && (
                              <Chip 
                                icon={<StarIcon />}
                                label="Populaire" 
                                size="small" 
                                sx={{ 
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
                                  bgcolor: category.color,
                                  color: 'white',
                                  fontSize: '0.7rem',
                                  height: 24,
                                }}
                              />
                            )}
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, pr: product.popular ? 8 : 0 }}>
                              {product.name}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="h6" sx={{ color: category.color, fontWeight: 700 }}>
                                {product.price.toFixed(2)} €
                              </Typography>
                              <Chip 
                                label={product.unit} 
                                size="small" 
                                variant="outlined" 
                                sx={{ 
                                  borderColor: category.color,
                                  color: category.color,
                                  fontWeight: 500,
                                }}
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            ))}

            {cart.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => setActiveStep(1)}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                    boxShadow: '0 8px 32px rgba(255, 107, 53, 0.3)',
                    '&:hover': {
                      boxShadow: '0 12px 40px rgba(255, 107, 53, 0.4)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Voir le panier ({cart.length})
                </Button>
              </Box>
            )}
          </Box>
        </Fade>
      )}

      {activeStep === 1 && (
        <Slide direction="left" in={activeStep === 1}>
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShoppingCartIcon color="primary" />
              Votre panier ({cart.length} article{cart.length !== 1 ? 's' : ''})
            </Typography>

            {cart.length === 0 ? (
              <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ textAlign: 'center', py: 8 }}>
                  <ShoppingCartIcon sx={{ fontSize: 80, color: 'grey.300', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Votre panier est vide
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Sélectionnez des produits pour commencer
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => setActiveStep(0)}
                    sx={{ borderRadius: 3 }}
                  >
                    Retour à la sélection
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: 0 }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ 
                          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                          '& th': { 
                            color: 'white', 
                            fontWeight: 700,
                            borderBottom: 'none',
                            py: 2,
                          }
                        }}>
                          <TableCell>Produit</TableCell>
                          <TableCell align="center">Quantité</TableCell>
                          <TableCell align="right">Prix</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cart.map((item, index) => (
                          <TableRow 
                            key={item.id}
                            sx={{ 
                              '&:nth-of-type(odd)': { bgcolor: 'grey.50' },
                              '&:hover': { bgcolor: 'primary.50' },
                              transition: 'background-color 0.2s ease',
                            }}
                          >
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                                  {index + 1}
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    {item.product.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {item.product.price.toFixed(2)} € / {item.product.unit}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  sx={{ 
                                    bgcolor: 'grey.100',
                                    '&:hover': { bgcolor: 'grey.200' }
                                  }}
                                >
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Typography sx={{ 
                                  minWidth: 40, 
                                  textAlign: 'center',
                                  fontWeight: 600,
                                  bgcolor: 'primary.50',
                                  borderRadius: 1,
                                  px: 1,
                                  py: 0.5,
                                }}>
                                  {item.quantity}
                                </Typography>
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  sx={{ 
                                    bgcolor: 'grey.100',
                                    '&:hover': { bgcolor: 'grey.200' }
                                  }}
                                >
                                  <AddIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                {item.totalPrice.toFixed(2)} €
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => handleRemoveFromCart(item.id)}
                                sx={{ 
                                  bgcolor: 'error.50',
                                  '&:hover': { bgcolor: 'error.100' }
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow sx={{ 
                          background: 'linear-gradient(135deg, #2E3440 0%, #3B4252 100%)',
                          '& td': { 
                            color: 'white', 
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            borderBottom: 'none',
                            py: 2,
                          }
                        }}>
                          <TableCell colSpan={2}>TOTAL HT</TableCell>
                          <TableCell align="right">{getTotalPrice().toFixed(2)} €</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box sx={{ p: 3, display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                    <Button
                      variant="outlined"
                      onClick={() => setActiveStep(0)}
                      sx={{ borderRadius: 3 }}
                    >
                      Continuer les achats
                    </Button>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => setActiveStep(2)}
                      sx={{
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                        boxShadow: '0 8px 32px rgba(255, 107, 53, 0.3)',
                        '&:hover': {
                          boxShadow: '0 12px 40px rgba(255, 107, 53, 0.4)',
                          transform: 'translateY(-2px)',
                        }
                      }}
                    >
                      Finaliser la commande
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>
        </Slide>
      )}

      {activeStep === 2 && (
        <Slide direction="left" in={activeStep === 2}>
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon color="primary" />
              Informations client
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Nom complet *"
                          value={orderForm.customerName}
                          onChange={(e) => setOrderForm(prev => ({ ...prev, customerName: e.target.value }))}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover fieldset': {
                                borderColor: 'primary.main',
                              },
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email *"
                          type="email"
                          value={orderForm.customerEmail}
                          onChange={(e) => setOrderForm(prev => ({ ...prev, customerEmail: e.target.value }))}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover fieldset': {
                                borderColor: 'primary.main',
                              },
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Téléphone *"
                          value={orderForm.customerPhone}
                          onChange={(e) => setOrderForm(prev => ({ ...prev, customerPhone: e.target.value }))}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover fieldset': {
                                borderColor: 'primary.main',
                              },
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Notes (optionnel)"
                          multiline
                          rows={4}
                          value={orderForm.notes}
                          onChange={(e) => setOrderForm(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Informations complémentaires, date de retrait souhaitée..."
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover fieldset': {
                                borderColor: 'primary.main',
                              },
                            }
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Alert 
                      severity="warning" 
                      sx={{ 
                        mt: 3, 
                        borderRadius: 2,
                        bgcolor: 'warning.50',
                        border: '1px solid',
                        borderColor: 'warning.200',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ShippingIcon />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            Retrait sur place uniquement
                          </Typography>
                          <Typography variant="body2">
                            Tous les produits doivent être retirés dans nos locaux. 
                            Nous vous contacterons pour organiser le retrait.
                          </Typography>
                        </Box>
                      </Box>
                    </Alert>

                    <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                      <Button
                        variant="outlined"
                        onClick={() => setActiveStep(1)}
                        sx={{ borderRadius: 3, flex: 1 }}
                      >
                        Retour au panier
                      </Button>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<EmailIcon />}
                        onClick={handleSubmitOrder}
                        sx={{ 
                          borderRadius: 3,
                          flex: 2,
                          py: 1.5,
                          background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
                          boxShadow: '0 8px 32px rgba(78, 205, 196, 0.3)',
                          '&:hover': {
                            boxShadow: '0 12px 40px rgba(78, 205, 196, 0.4)',
                            transform: 'translateY(-2px)',
                          }
                        }}
                      >
                        Confirmer la précommande
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                      Récapitulatif
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      {cart.map((item) => (
                        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {item.product.name} × {item.quantity}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {item.totalPrice.toFixed(2)} €
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)', mb: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Total HT
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {getTotalPrice().toFixed(2)} €
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: 'center', opacity: 0.8 }}>
                      <Typography variant="caption">
                        {cart.length} article{cart.length !== 1 ? 's' : ''} dans votre panier
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Slide>
      )}

      {/* Dialog pour ajouter un produit */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 24px 48px rgba(0,0,0,0.15)',
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          color: 'white',
          fontWeight: 700,
        }}>
          Ajouter au panier
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedProduct && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {selectedProduct.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Prix unitaire : {selectedProduct.price.toFixed(2)} € / {selectedProduct.unit}
              </Typography>
              
              <TextField
                fullWidth
                label={`Quantité (${selectedProduct.unit})`}
                type="number"
                value={orderForm.quantity}
                onChange={(e) => setOrderForm(prev => ({ ...prev, quantity: e.target.value }))}
                inputProps={{ min: 0.1, step: selectedProduct.unit === 'pièce' ? 1 : 0.1 }}
                sx={{ 
                  mt: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  }
                }}
              />
              
              {orderForm.quantity > 0 && (
                <Box sx={{ 
                  mt: 3, 
                  p: 2, 
                  bgcolor: 'primary.50', 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'primary.200',
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    Total : {(selectedProduct.price * parseFloat(orderForm.quantity || 0)).toFixed(2)} €
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            sx={{ borderRadius: 2 }}
          >
            Annuler
          </Button>
          <Button 
            variant="contained" 
            onClick={handleAddToCart}
            sx={{ 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
              boxShadow: '0 4px 16px rgba(255, 107, 53, 0.3)',
            }}
          >
            Ajouter au panier
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PreorderModule;