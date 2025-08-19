import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Divider,
  IconButton,
  Tooltip,
  FormHelperText,
  ListSubheader,
  Stack,
  Avatar,
  Fade,
  Zoom,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import {
  Calculate as CalculateIcon,
  PictureAsPdf as PdfIcon,
  Email as EmailIcon,
  Info as InfoIcon,
  Clear as ClearIcon,
  Warning as WarningIcon,
  Architecture as ArchitectureIcon,
  Receipt as ReceiptIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

// Services
import PDFService from '../services/pdfService';
import EmailService from '../services/emailService';

// Liste complète des matériaux avec catégories et propriétés strictes
const materials = [
  // GRANULAIRES (calcul auto sur base du volume)
  { 
    id: 1, 
    name: 'Tout venant', 
    category: 'granulaire', 
    unit_m3: 'm³', 
    unit_seau: 'seau',
    price_m3: 45, 
    price_seau: 2.5
  },
  { 
    id: 2, 
    name: 'Sable enduit', 
    category: 'granulaire', 
    unit_m3: 'm³', 
    unit_seau: 'seau',
    price_m3: 55, 
    price_seau: 3.0 
  },
  { 
    id: 3, 
    name: 'Sable béton', 
    category: 'granulaire', 
    unit_m3: 'm³', 
    unit_seau: 'seau',
    price_m3: 60, 
    price_seau: 3.2 
  },
  { 
    id: 4, 
    name: 'Gravillon', 
    category: 'granulaire', 
    unit_m3: 'm³', 
    unit_seau: 'seau',
    price_m3: 65, 
    price_seau: 3.5 
  },
  { 
    id: 5, 
    name: 'Sable concassé', 
    category: 'granulaire', 
    unit_m3: 'm³', 
    unit_seau: 'seau',
    price_m3: 58, 
    price_seau: 3.1 
  },
  { 
    id: 6, 
    name: 'Gravier pouzzolane', 
    category: 'granulaire', 
    unit_m3: 'm³', 
    unit_seau: 'seau',
    price_m3: 75, 
    price_seau: 4.0 
  },
  { 
    id: 7, 
    name: 'Gravillon 0/31.5 (chemins/emblais)', 
    category: 'granulaire', 
    unit_m3: 'm³', 
    unit_seau: 'seau',
    price_m3: 70, 
    price_seau: 3.8 
  },

  // CIMENTS
  { 
    id: 8, 
    name: 'Ciment classique', 
    category: 'ciment', 
    dosage_kg_m3: 350, 
    poids_sac_kg: 35, 
    price_sac: 8.5 
  },
  { 
    id: 9, 
    name: 'Cimabat', 
    category: 'ciment', 
    dosage_kg_m3: 300, 
    poids_sac_kg: 35, 
    price_sac: 12.0 
  },
  { 
    id: 10, 
    name: 'Ciment ragréage', 
    category: 'ciment', 
    dosage_kg_m3: 400, 
    poids_sac_kg: 35, 
    price_sac: 15.0 
  },
  { 
    id: 11, 
    name: 'Ciment colle avec résine', 
    category: 'ciment', 
    dosage_kg_m3: 450, 
    poids_sac_kg: 35, 
    price_sac: 18.0 
  },

  // UNITAIRES
  { 
    id: 12, 
    name: 'Fer Ø6', 
    category: 'unitaire', 
    unit: 'kg', 
    price_unit: 1.2 
  },
  { 
    id: 13, 
    name: 'Fer Ø8', 
    category: 'unitaire', 
    unit: 'kg', 
    price_unit: 1.3 
  },
  { 
    id: 14, 
    name: 'Parpaings 15x25x50', 
    category: 'unitaire', 
    unit: 'pièce', 
    price_unit: 2.1 
  },
  { 
    id: 15, 
    name: 'Parpaings 10x25x50', 
    category: 'unitaire', 
    unit: 'pièce', 
    price_unit: 1.8 
  },
  { 
    id: 16, 
    name: 'Bloc à bancher 21x25x50', 
    category: 'unitaire', 
    unit: 'pièce', 
    price_unit: 3.2 
  },

  // SUR COMMANDE
  { 
    id: 17, 
    name: 'Produits sur commande', 
    category: 'sur_commande', 
    unit: 'Sur demande', 
    price_unit: 0 
  },
];

function EstimatorModule() {
  const [formData, setFormData] = useState({
    length: '',
    width: '',
    thickness: '',
    selectedMaterials: [],
  });
  const [manualQuantities, setManualQuantities] = useState({});
  const [results, setResults] = useState(null);
  const [emailData, setEmailData] = useState({
    clientName: '',
    clientEmail: '',
  });
  const [errors, setErrors] = useState({});
  const [selectValue, setSelectValue] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    const newErrors = { ...errors };
    if (value && parseFloat(value) <= 0) {
      newErrors[name] = 'La valeur doit être supérieure à 0';
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMaterialSelect = (materialId) => {
    const material = materials.find(m => m.id === materialId);
    if (material && !formData.selectedMaterials.find(m => m.id === materialId)) {
      setFormData(prev => ({
        ...prev,
        selectedMaterials: [...prev.selectedMaterials, material]
      }));
    }
    setSelectValue('');
  };

  const handleMaterialRemove = (materialId) => {
    setFormData(prev => ({
      ...prev,
      selectedMaterials: prev.selectedMaterials.filter(m => m.id !== materialId)
    }));
    const newManualQuantities = { ...manualQuantities };
    delete newManualQuantities[materialId];
    setManualQuantities(newManualQuantities);
  };

  const handleManualQuantityChange = (materialId, quantity) => {
    setManualQuantities(prev => ({
      ...prev,
      [materialId]: quantity
    }));
  };

  const roundUp = (value, decimals) => {
    const factor = Math.pow(10, decimals);
    return Math.ceil(value * factor) / factor;
  };

  const calculateEstimate = () => {
    const { length, width, thickness, selectedMaterials } = formData;
    
    if (!length || !width || !thickness || selectedMaterials.length === 0) {
      alert('Veuillez remplir tous les champs et sélectionner au moins un matériau.');
      return;
    }

    if (parseFloat(length) <= 0 || parseFloat(width) <= 0 || parseFloat(thickness) <= 0) {
      alert('Toutes les dimensions doivent être supérieures à 0.');
      return;
    }

    const longueur_m = parseFloat(length);
    const largeur_m = parseFloat(width);
    const epaisseur_cm = parseFloat(thickness);
    
    const surface_m2 = longueur_m * largeur_m;
    const epaisseur_m = epaisseur_cm / 100;
    const volume_m3 = surface_m2 * epaisseur_m;

    const calculatedResults = selectedMaterials.map(material => {
      const result = {
        material,
        calculationDetails: '',
        displayUnit: '',
        quantity: 0,
        totalPrice: 0,
        isManual: false,
        isOnQuote: false,
        bucketInfo: null,
        cementInfo: null,
      };

      if (material.category === 'granulaire') {
        result.calculationDetails = `Volume = ${surface_m2.toFixed(2)} m² × ${epaisseur_m.toFixed(3)} m = ${volume_m3.toFixed(3)} m³`;
        
        if (surface_m2 < 0.5) {
          const nb_seaux = Math.ceil((surface_m2 / 0.5) * 35);
          const nb_brouettes = Math.floor(nb_seaux / 5);
          
          result.quantity = nb_seaux;
          result.displayUnit = 'seaux';
          result.totalPrice = nb_seaux * material.price_seau;
          result.bucketInfo = { nb_seaux, nb_brouettes };
        } else {
          const volume_arrondi = roundUp(volume_m3, 2);
          result.quantity = volume_arrondi;
          result.displayUnit = 'm³';
          result.totalPrice = volume_arrondi * material.price_m3;
        }
      } else if (material.category === 'ciment') {
        const kg_totaux = volume_m3 * material.dosage_kg_m3;
        const nb_sacs = Math.ceil(kg_totaux / material.poids_sac_kg);
        
        result.quantity = nb_sacs;
        result.displayUnit = 'sacs';
        result.totalPrice = nb_sacs * material.price_sac;
        result.calculationDetails = `Dosage: ${material.dosage_kg_m3} kg/m³ × ${volume_m3.toFixed(3)} m³ = ${kg_totaux.toFixed(1)} kg`;
        result.cementInfo = {
          dosage_kg_m3: material.dosage_kg_m3,
          kg_totaux: kg_totaux.toFixed(1),
          poids_sac_kg: material.poids_sac_kg
        };
      } else if (material.category === 'unitaire') {
        const manualQty = parseFloat(manualQuantities[material.id] || 0);
        if (manualQty > 0) {
          result.quantity = manualQty;
          result.displayUnit = material.unit;
          result.totalPrice = manualQty * material.price_unit;
          result.isManual = true;
        } else {
          result.quantity = 0;
          result.displayUnit = material.unit;
          result.totalPrice = 0;
          result.isManual = true;
        }
      } else if (material.category === 'sur_commande') {
        result.isOnQuote = true;
        result.displayUnit = 'Sur devis';
      }

      return result;
    });

    const totalPrice = calculatedResults.reduce((sum, item) => sum + item.totalPrice, 0);
    const hasManualItems = calculatedResults.some(item => item.isManual || item.isOnQuote);
    const sellInBuckets = surface_m2 < 0.5;

    setResults({
      surface_m2: surface_m2.toFixed(2),
      epaisseur_m: epaisseur_m.toFixed(3),
      volume_m3: volume_m3.toFixed(3),
      sellInBuckets,
      items: calculatedResults,
      totalPrice,
      hasManualItems
    });
  };

  const resetForm = () => {
    setFormData({
      length: '',
      width: '',
      thickness: '',
      selectedMaterials: [],
    });
    setManualQuantities({});
    setResults(null);
    setEmailData({ clientName: '', clientEmail: '' });
    setErrors({});
    setSelectValue('');
  };

  const getCategoryLabel = (category) => {
    const labels = {
      granulaire: 'Matériaux granulaires',
      ciment: 'Ciments et liants',
      unitaire: 'Produits unitaires',
      sur_commande: 'Sur commande'
    };
    return labels[category] || category;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const generatePDF = async () => {
    if (!results) {
      showNotification('Aucun résultat à exporter en PDF', 'warning');
      return;
    }

    setIsGeneratingPDF(true);
    
    try {
      const pdfService = new PDFService();
      const pdf = pdfService.generateEstimatePDF(results, emailData);
      
      // Génération du nom de fichier
      const fileName = `devis-proximat-${Date.now()}.pdf`;
      
      // Téléchargement du PDF
      pdfService.downloadPDF(fileName);
      
      showNotification('PDF généré et téléchargé avec succès', 'success');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      showNotification('Erreur lors de la génération du PDF', 'error');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const sendEmail = async () => {
    if (!results) {
      showNotification('Aucun résultat à envoyer', 'warning');
      return;
    }

    if (!emailData.clientName || !emailData.clientEmail) {
      showNotification('Veuillez remplir les informations client', 'warning');
      return;
    }

    setIsSendingEmail(true);

    try {
      // Génération du PDF
      const pdfService = new PDFService();
      const pdf = pdfService.generateEstimatePDF(results, emailData);
      const pdfBlob = pdfService.getPDFBlob();

      // Envoi de l'email
      const emailService = new EmailService();
      const emailResult = await emailService.sendEstimateEmail(emailData, results, pdfBlob);

      if (emailResult.success) {
        showNotification(`Email envoyé avec succès à ${emailData.clientEmail}`, 'success');
      } else {
        showNotification(emailResult.message, 'error');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      showNotification('Erreur lors de l\'envoi de l\'email', 'error');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box sx={{ 
      minHeight: '80vh',
      background: 'linear-gradient(135deg, #FEFEFE 0%, #F8F9FA 100%)',
      py: 4
    }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Fade in timeout={800}>
          <Box>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                mx: 'auto', 
                mb: 3,
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF8533 100%)',
                boxShadow: '0px 8px 32px rgba(255, 107, 0, 0.3)'
              }}
            >
              <ArchitectureIcon sx={{ fontSize: 40, color: 'white' }} />
            </Avatar>
            <Typography 
              variant="h2" 
              sx={{ 
                mb: 2,
                background: 'linear-gradient(135deg, #1A1A1A 0%, #4A4A4A 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800
              }}
            >
              Estimateur de Travaux
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 300,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Calculez précisément vos besoins en matériaux avec notre outil professionnel
            </Typography>
          </Box>
        </Fade>
      </Box>

      {/* Layout deux colonnes */}
      <Grid container spacing={4} sx={{ maxWidth: 1400, mx: 'auto', px: 2 }}>
        {/* Colonne gauche - Formulaire */}
        <Grid item xs={12} lg={6}>
          <Zoom in timeout={600}>
            <Card 
              sx={{ 
                height: 'fit-content',
                position: 'sticky',
                top: 100,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
                border: '1px solid rgba(255, 107, 0, 0.1)',
                '&:hover': {
                  borderColor: 'rgba(255, 107, 0, 0.2)',
                  boxShadow: '0px 20px 60px rgba(255, 107, 0, 0.1)'
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar 
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      mr: 2,
                      background: 'linear-gradient(135deg, #FF6B00 0%, #FF8533 100%)'
                    }}
                  >
                    <CalculateIcon sx={{ color: 'white' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                      Configuration
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Définissez les dimensions de votre projet
                    </Typography>
                  </Box>
                </Box>

                {/* Dimensions */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Dimensions du projet
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Longueur"
                        name="length"
                        type="number"
                        value={formData.length}
                        onChange={handleInputChange}
                        placeholder="ex: 5.5"
                        inputProps={{ min: 0, step: 0.01 }}
                        error={!!errors.length}
                        helperText={errors.length || "en mètres (m)"}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover': {
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                                borderWidth: '2px'
                              }
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Largeur"
                        name="width"
                        type="number"
                        value={formData.width}
                        onChange={handleInputChange}
                        placeholder="ex: 3.2"
                        inputProps={{ min: 0, step: 0.01 }}
                        error={!!errors.width}
                        helperText={errors.width || "en mètres (m)"}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover': {
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                                borderWidth: '2px'
                              }
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Épaisseur"
                        name="thickness"
                        type="number"
                        value={formData.thickness}
                        onChange={handleInputChange}
                        placeholder="ex: 15"
                        inputProps={{ min: 0, step: 1 }}
                        error={!!errors.thickness}
                        helperText={errors.thickness || "en centimètres (cm)"}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover': {
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                                borderWidth: '2px'
                              }
                            }
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider sx={{ my: 4, borderColor: 'rgba(255, 107, 0, 0.1)' }} />

                {/* Sélection matériaux */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Sélection des matériaux
                  </Typography>
                  
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Ajouter un matériau</InputLabel>
                    <Select
                      value={selectValue}
                      label="Ajouter un matériau"
                      onChange={(e) => {
                        setSelectValue(e.target.value);
                        if (e.target.value) {
                          handleMaterialSelect(e.target.value);
                        }
                      }}
                      sx={{
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                          borderWidth: '2px'
                        }
                      }}
                    >
                      {['granulaire', 'ciment', 'unitaire', 'sur_commande'].map(category => {
                        const categoryMaterials = materials.filter(material => 
                          material.category === category && 
                          !formData.selectedMaterials.find(m => m.id === material.id)
                        );
                        
                        if (categoryMaterials.length === 0) return null;
                        
                        return [
                          <ListSubheader key={`header-${category}`} sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            {getCategoryLabel(category)}
                          </ListSubheader>,
                          ...categoryMaterials.map((material) => (
                            <MenuItem key={material.id} value={material.id} sx={{ pl: 3 }}>
                              {material.name}
                            </MenuItem>
                          ))
                        ];
                      })}
                    </Select>
                  </FormControl>

                  {/* Tags matériaux sélectionnés */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 3 }}>
                    {formData.selectedMaterials.map((material) => (
                      <Chip
                        key={material.id}
                        label={material.name}
                        onDelete={() => handleMaterialRemove(material.id)}
                        deleteIcon={<ClearIcon />}
                        color={material.category === 'granulaire' ? 'primary' : 
                               material.category === 'ciment' ? 'secondary' : 
                               material.category === 'unitaire' ? 'warning' : 'default'}
                        variant="filled"
                        sx={{
                          fontWeight: 500,
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      />
                    ))}
                  </Box>

                  {/* Quantités manuelles */}
                  {formData.selectedMaterials.filter(m => m.category === 'unitaire').length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom sx={{ color: 'warning.main', fontWeight: 600 }}>
                        Quantités manuelles requises :
                      </Typography>
                      <Stack spacing={2}>
                        {formData.selectedMaterials
                          .filter(m => m.category === 'unitaire')
                          .map((material) => (
                            <TextField
                              key={material.id}
                              fullWidth
                              size="small"
                              label={`${material.name} (${material.unit})`}
                              type="number"
                              value={manualQuantities[material.id] || ''}
                              onChange={(e) => handleManualQuantityChange(material.id, e.target.value)}
                              inputProps={{ min: 0, step: material.unit === 'kg' ? 0.1 : 1 }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '&:hover': {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                      borderColor: 'warning.main',
                                      borderWidth: '2px'
                                    }
                                  }
                                }
                              }}
                            />
                          ))}
                      </Stack>
                    </Box>
                  )}
                </Box>

                {/* Boutons d'action */}
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    onClick={calculateEstimate}
                    startIcon={<CalculateIcon />}
                    fullWidth
                    size="large"
                    disabled={Object.keys(errors).length > 0}
                    sx={{
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #FF6B00 0%, #FF8533 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #E55A00 0%, #FF6B00 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0px 12px 35px rgba(255, 107, 0, 0.4)'
                      }
                    }}
                  >
                    Calculer l'estimation
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={resetForm}
                    size="large"
                    sx={{
                      py: 1.5,
                      minWidth: 120,
                      borderWidth: '2px',
                      '&:hover': {
                        borderWidth: '2px',
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    Reset
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Zoom>
        </Grid>

        {/* Colonne droite - Résultats */}
        <Grid item xs={12} lg={6}>
          {results ? (
            <Fade in timeout={800}>
              <Card 
                sx={{ 
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
                  border: '1px solid rgba(255, 107, 0, 0.1)',
                  '&:hover': {
                    borderColor: 'rgba(255, 107, 0, 0.2)',
                    boxShadow: '0px 20px 60px rgba(255, 107, 0, 0.1)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Avatar 
                      sx={{ 
                        width: 48, 
                        height: 48, 
                        mr: 2,
                        background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)'
                      }}
                    >
                      <ReceiptIcon sx={{ color: 'white' }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        Résultats de l'estimation
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Détail des calculs et prix
                      </Typography>
                    </Box>
                  </Box>

                  {/* Tags résumé */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                    <Chip 
                      icon={<TrendingUpIcon />}
                      label={`Surface: ${results.surface_m2} m²`}
                      color="primary"
                      variant="filled"
                      sx={{ fontWeight: 600 }}
                    />
                    <Chip 
                      icon={<ArchitectureIcon />}
                      label={`Volume: ${results.volume_m3} m³`}
                      color="secondary"
                      variant="filled"
                      sx={{ fontWeight: 600 }}
                    />
                    <Chip 
                      label={results.sellInBuckets ? 'Vente en seaux' : 'Vente en m³'}
                      color={results.sellInBuckets ? 'warning' : 'success'}
                      variant="outlined"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  {/* Tableau des résultats */}
                  <TableContainer 
                    component={Paper} 
                    variant="outlined" 
                    sx={{ 
                      mb: 4,
                      borderRadius: 3,
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                      '& .MuiTableHead-root': {
                        background: 'linear-gradient(135deg, #FF6B00 0%, #FF8533 100%)'
                      },
                      '& .MuiTableHead-root .MuiTableCell-root': {
                        color: 'white',
                        fontWeight: 700
                      }
                    }}
                  >
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Matériau</TableCell>
                          <TableCell align="center">Quantité</TableCell>
                          <TableCell align="center">Unité</TableCell>
                          <TableCell align="right">Prix HT</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {results.items.map((item, index) => (
                          <React.Fragment key={index}>
                            <TableRow 
                              sx={{
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 107, 0, 0.04)'
                                }
                              }}
                            >
                              <TableCell sx={{ fontWeight: 500 }}>
                                {item.material.name}
                                {item.isOnQuote && (
                                  <Chip size="small" label="Sur devis" color="warning" sx={{ ml: 1 }} />
                                )}
                              </TableCell>
                              <TableCell align="center" sx={{ fontWeight: 600 }}>
                                {item.isOnQuote ? '-' : item.quantity}
                              </TableCell>
                              <TableCell align="center">{item.displayUnit}</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 600 }}>
                                {item.isOnQuote ? 'Sur demande' : formatPrice(item.totalPrice)}
                              </TableCell>
                            </TableRow>
                            
                            {/* Détails du calcul */}
                            {item.calculationDetails && (
                              <TableRow>
                                <TableCell colSpan={4} sx={{ bgcolor: 'rgba(255, 107, 0, 0.04)', fontSize: '0.75rem', py: 1 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <InfoIcon sx={{ fontSize: 16, mr: 1, color: 'info.main' }} />
                                    {item.calculationDetails}
                                  </Box>
                                </TableCell>
                              </TableRow>
                            )}
                            
                            {/* Informations seaux */}
                            {item.bucketInfo && (
                              <TableRow>
                                <TableCell colSpan={4} sx={{ bgcolor: 'rgba(255, 193, 7, 0.1)', fontSize: '0.75rem', py: 1 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <WarningIcon sx={{ fontSize: 16, mr: 1, color: 'warning.main' }} />
                                    {item.bucketInfo.nb_seaux} seaux (11L chacun) = {item.bucketInfo.nb_brouettes} brouette(s)
                                  </Box>
                                </TableCell>
                              </TableRow>
                            )}
                            
                            {/* Informations ciment */}
                            {item.cementInfo && (
                              <TableRow>
                                <TableCell colSpan={4} sx={{ bgcolor: 'rgba(55, 71, 79, 0.1)', fontSize: '0.75rem', py: 1 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <InfoIcon sx={{ fontSize: 16, mr: 1, color: 'secondary.main' }} />
                                    Dosage : {item.cementInfo.dosage_kg_m3} kg/m³ = {item.cementInfo.kg_totaux} kg total
                                  </Box>
                                </TableCell>
                              </TableRow>
                            )}
                          </React.Fragment>
                        ))}
                        <TableRow 
                          sx={{ 
                            background: 'linear-gradient(135deg, #FF6B00 0%, #FF8533 100%)',
                            '& td': { color: 'white', fontWeight: 'bold', fontSize: '1rem' }
                          }}
                        >
                          <TableCell colSpan={3}>TOTAL HT</TableCell>
                          <TableCell align="right">{formatPrice(results.totalPrice)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {results.hasManualItems && (
                    <Alert 
                      severity="warning" 
                      sx={{ 
                        mb: 4,
                        borderRadius: 3,
                        '& .MuiAlert-icon': {
                          fontSize: 24
                        }
                      }}
                    >
                      Ce devis contient des produits "sur devis" ou nécessitant une quantité manuelle.
                      Le prix final peut varier.
                    </Alert>
                  )}

                  <Divider sx={{ my: 4, borderColor: 'rgba(255, 107, 0, 0.1)' }} />

                  {/* Section client */}
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                    Informations client & envoi
                  </Typography>
                  
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nom du client"
                        value={emailData.clientName}
                        onChange={(e) => setEmailData(prev => ({ ...prev, clientName: e.target.value }))}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover': {
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                                borderWidth: '2px'
                              }
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email du client"
                        type="email"
                        value={emailData.clientEmail}
                        onChange={(e) => setEmailData(prev => ({ ...prev, clientEmail: e.target.value }))}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover': {
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                                borderWidth: '2px'
                              }
                            }
                          }
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      startIcon={isGeneratingPDF ? <CircularProgress size={20} color="inherit" /> : <PdfIcon />}
                      onClick={generatePDF}
                      disabled={!results || isGeneratingPDF}
                      sx={{
                        background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #388E3C 0%, #4CAF50 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0px 8px 25px rgba(76, 175, 80, 0.4)'
                        },
                        '&:disabled': {
                          background: 'linear-gradient(135deg, #BDBDBD 0%, #E0E0E0 100%)',
                        }
                      }}
                    >
                      {isGeneratingPDF ? 'Génération...' : 'Générer PDF'}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={isSendingEmail ? <CircularProgress size={20} color="inherit" /> : <EmailIcon />}
                      onClick={sendEmail}
                      disabled={!results || !emailData.clientName || !emailData.clientEmail || isSendingEmail}
                      sx={{
                        borderWidth: '2px',
                        '&:hover': {
                          borderWidth: '2px',
                          transform: 'translateY(-1px)'
                        },
                        '&:disabled': {
                          borderColor: '#BDBDBD',
                          color: '#BDBDBD',
                        }
                      }}
                    >
                      {isSendingEmail ? 'Envoi...' : 'Envoyer par email'}
                    </Button>
                  </Stack>

                  {/* Notification Snackbar */}
                  <Snackbar
                    open={notification.open}
                    autoHideDuration={6000}
                    onClose={handleCloseNotification}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  >
                    <Alert 
                      onClose={handleCloseNotification} 
                      severity={notification.severity}
                      sx={{ width: '100%' }}
                      icon={notification.severity === 'success' ? <CheckCircleIcon /> : undefined}
                    >
                      {notification.message}
                    </Alert>
                  </Snackbar>
                </CardContent>
              </Card>
            </Fade>
          ) : (
            <Fade in timeout={600}>
              <Card 
                sx={{ 
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%)',
                  border: '2px dashed rgba(255, 107, 0, 0.2)'
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      mx: 'auto', 
                      mb: 3,
                      background: 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)'
                    }}
                  >
                    <ReceiptIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    Résultats d'estimation
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                    Remplissez le formulaire et cliquez sur "Calculer" pour voir les résultats
                  </Typography>
                </Box>
              </Card>
            </Fade>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default EstimatorModule;