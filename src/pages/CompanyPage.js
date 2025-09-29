import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  CardMedia,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
  Stack,
  InputAdornment,
} from '@mui/material';
import {
  CalculateOutlined,
  InfoOutlined,
  ConstructionOutlined,
  ShoppingCartOutlined,
  AddCircleOutline,
  RemoveCircleOutline,
  Send as SendIcon,
  LocationOn,
  Phone,
  Email,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  ArrowForward,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';

// Définition des matériaux disponibles avec leurs propriétés
const materialsData = [
  // Catégorie: Ciment et béton
  { id: 'ciment_standard', name: 'Ciment standard', category: 'Ciment et béton', unit: 'sac', unitWeight: 35, unitVolume: 0.025, dosage: 350, price: 8.5 },
  { id: 'ciment_prompt', name: 'Ciment prompt', category: 'Ciment et béton', unit: 'sac', unitWeight: 25, unitVolume: 0.018, dosage: 400, price: 12.75 },
  { id: 'beton_pret', name: 'Béton prêt à l\'emploi', category: 'Ciment et béton', unit: 'sac', unitWeight: 30, unitVolume: 0.02, dosage: null, price: 7.9 },
  
  // Catégorie: Sable et gravier
  { id: 'sable_fin', name: 'Sable fin', category: 'Sable et gravier', unit: 'tonne', unitWeight: 1000, unitVolume: 0.6, dosage: null, price: 45 },
  { id: 'sable_gros', name: 'Sable gros', category: 'Sable et gravier', unit: 'tonne', unitWeight: 1000, unitVolume: 0.6, dosage: null, price: 40 },
  { id: 'gravier', name: 'Gravier', category: 'Sable et gravier', unit: 'tonne', unitWeight: 1000, unitVolume: 0.65, dosage: null, price: 55 },
  
  // Catégorie: Briques et blocs
  { id: 'brique_rouge', name: 'Brique rouge', category: 'Briques et blocs', unit: 'pièce', unitWeight: 3.5, unitVolume: 0.002, dosage: null, price: 0.85 },
  { id: 'bloc_beton', name: 'Bloc béton standard', category: 'Briques et blocs', unit: 'pièce', unitWeight: 12, unitVolume: 0.01, dosage: null, price: 1.95 },
  { id: 'parpaing', name: 'Parpaing', category: 'Briques et blocs', unit: 'pièce', unitWeight: 17, unitVolume: 0.015, dosage: null, price: 2.25 },
  
  // Catégorie: Bois de construction
  { id: 'planche_pin', name: 'Planche de pin', category: 'Bois de construction', unit: 'm²', unitWeight: 8, unitVolume: 0.025, dosage: null, price: 15.5 },
  { id: 'poutre_chene', name: 'Poutre de chêne', category: 'Bois de construction', unit: 'm', unitWeight: 25, unitVolume: 0.04, dosage: null, price: 45 },
  
  // Catégorie: Carrelage et revêtements
  { id: 'carrelage_sol', name: 'Carrelage sol', category: 'Carrelage et revêtements', unit: 'm²', unitWeight: 20, unitVolume: 0.01, dosage: null, price: 25 },
  { id: 'carrelage_mural', name: 'Carrelage mural', category: 'Carrelage et revêtements', unit: 'm²', unitWeight: 15, unitVolume: 0.008, dosage: null, price: 22 },
];

// Regrouper les matériaux par catégorie
const materialCategories = Array.from(new Set(materialsData.map(material => material.category)));

function CompanyPage() {
  // États pour le calculateur de matériaux
  const [activeStep, setActiveStep] = useState(0);
  const [dimensions, setDimensions] = useState({ length: '', width: '', thickness: '' });
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [calculationResults, setCalculationResults] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  // États pour le formulaire de contact
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [contactSuccess, setContactSuccess] = useState(false);

  // Gestion des étapes du calculateur
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setDimensions({ length: '', width: '', thickness: '' });
    setSelectedMaterial(null);
    setCalculationResults(null);
  };

  // Gestion des dimensions
  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setDimensions({
      ...dimensions,
      [name]: value,
    });
  };

  // Sélection de matériau
  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material);
  };

  // Calcul des matériaux
  const calculateMaterials = () => {
    const { length, width, thickness } = dimensions;
    const volume = (parseFloat(length) * parseFloat(width) * parseFloat(thickness)) / 1000; // en m³ (conversion cm en m)
    
    let quantity;
    let buckets = null;
    let wheelbarrows = null;
    let cementCalculation = null;
    
    // Calcul de la quantité en fonction du volume et du matériau
    if (selectedMaterial.unit === 'tonne') {
      quantity = volume / selectedMaterial.unitVolume * selectedMaterial.unitWeight / 1000;
    } else if (selectedMaterial.unit === 'sac') {
      quantity = volume / selectedMaterial.unitVolume;
    } else if (selectedMaterial.unit === 'pièce') {
      quantity = volume / selectedMaterial.unitVolume;
    } else if (selectedMaterial.unit === 'm²') {
      quantity = (parseFloat(length) * parseFloat(width)) / 10000; // conversion cm² en m²
    } else if (selectedMaterial.unit === 'm') {
      quantity = parseFloat(length) / 100; // conversion cm en m
    }
    
    // Arrondir à l'unité supérieure
    quantity = Math.ceil(quantity);
    
    // Pour les petits volumes, proposer des seaux ou brouettes
    if (volume < 0.1) {
      buckets = Math.ceil(volume / 0.01); // Un seau fait environ 10L (0.01m³)
      wheelbarrows = Math.ceil(volume / 0.06); // Une brouette fait environ 60L (0.06m³)
    }
    
    // Calcul spécifique pour le ciment (si dosage disponible)
    if (selectedMaterial.dosage) {
      const cementKg = volume * selectedMaterial.dosage; // kg de ciment nécessaire
      const cementBags = Math.ceil(cementKg / selectedMaterial.unitWeight); // nombre de sacs
      
      cementCalculation = {
        dosage: selectedMaterial.dosage,
        totalWeight: cementKg.toFixed(2),
        bags: cementBags,
        bagWeight: selectedMaterial.unitWeight
      };
    }
    
    setCalculationResults({
      material: selectedMaterial,
      volume: volume.toFixed(3),
      quantity,
      buckets,
      wheelbarrows,
      cementCalculation,
      totalPrice: (quantity * selectedMaterial.price).toFixed(2)
    });
    
    handleNext();
  };

  // Génération de devis
  const generateQuote = () => {
    setOpenSnackbar(true);
    // Ici, vous pourriez implémenter la logique pour générer un devis PDF ou rediriger vers une page de devis
  };

  // Soumission du formulaire de contact
  const onSubmitContact = (data) => {
    console.log(data); // Ici, vous enverriez les données à votre backend
    setContactSuccess(true);
    reset();
    setTimeout(() => setContactSuccess(false), 5000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Section d'en-tête */}
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
          Notre Entreprise
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Votre partenaire de confiance pour tous vos projets de construction
        </Typography>
        <Divider sx={{ width: '10%', mx: 'auto', borderColor: 'primary.main', borderWidth: 2, mb: 4 }} />
      </Box>

      {/* Section À propos */}
      <Grid container spacing={6} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
            À propos de Proximat 224
          </Typography>
          <Typography variant="body1" paragraph>
            Fondée en 2010, Proximat 224 s'est imposée comme un leader dans la fourniture de matériaux de construction de haute qualité. Notre mission est de fournir aux professionnels et aux particuliers les meilleurs produits au meilleur prix, avec un service client exceptionnel.
          </Typography>
          <Typography variant="body1" paragraph>
            Nous sommes fiers de notre équipe d'experts qui peut vous conseiller sur tous vos projets, qu'il s'agisse de construction neuve ou de rénovation. Notre vaste gamme de produits comprend tout ce dont vous avez besoin, du ciment aux finitions.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              endIcon={<ArrowForward />}
              sx={{ borderRadius: '50px', px: 4 }}
            >
              En savoir plus
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={4}>
            <CardMedia
              component="img"
              height="300"
              image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Entrepôt de matériaux de construction"
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notre entrepôt principal
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Plus de 5000m² dédiés au stockage et à la distribution de matériaux de construction de qualité, avec une équipe de professionnels à votre service.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Calculateur de matériaux */}
      <Paper elevation={3} sx={{ p: 4, mb: 8, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', display: 'flex', alignItems: 'center' }}>
          <CalculateOutlined sx={{ mr: 1 }} />
          Calculateur de Matériaux
        </Typography>
        <Typography variant="body1" paragraph>
          Estimez rapidement les quantités de matériaux nécessaires pour votre projet. Entrez les dimensions, sélectionnez le matériau, et obtenez une estimation précise.
        </Typography>

        <Stepper activeStep={activeStep} orientation="vertical" sx={{ mt: 4 }}>
          {/* Étape 1: Dimensions */}
          <Step>
            <StepLabel>Dimensions</StepLabel>
            <StepContent>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Entrez les dimensions de votre surface ou volume à calculer.
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Longueur"
                    name="length"
                    type="number"
                    value={dimensions.length}
                    onChange={handleDimensionChange}
                    required
                    InputProps={{
                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Largeur"
                    name="width"
                    type="number"
                    value={dimensions.width}
                    onChange={handleDimensionChange}
                    required
                    InputProps={{
                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Épaisseur"
                    name="thickness"
                    type="number"
                    value={dimensions.thickness}
                    onChange={handleDimensionChange}
                    required
                    InputProps={{
                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!dimensions.length || !dimensions.width || !dimensions.thickness}
                >
                  Continuer
                </Button>
              </Box>
            </StepContent>
          </Step>

          {/* Étape 2: Sélection du matériau */}
          <Step>
            <StepLabel>Sélection du matériau</StepLabel>
            <StepContent>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Choisissez le matériau que vous souhaitez utiliser pour votre projet.
              </Typography>
              
              {materialCategories.map((category) => (
                <Box key={category} sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    {category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {materialsData
                      .filter((material) => material.category === category)
                      .map((material) => (
                        <Chip
                          key={material.id}
                          label={material.name}
                          onClick={() => handleMaterialSelect(material)}
                          color={selectedMaterial?.id === material.id ? 'primary' : 'default'}
                          variant={selectedMaterial?.id === material.id ? 'filled' : 'outlined'}
                          sx={{ 
                            py: 2.5,
                            '&:hover': { backgroundColor: 'rgba(255, 107, 0, 0.1)' }
                          }}
                        />
                      ))}
                  </Box>
                </Box>
              ))}
              
              <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                <Button onClick={handleBack}>Retour</Button>
                <Button
                  variant="contained"
                  onClick={calculateMaterials}
                  disabled={!selectedMaterial}
                  endIcon={<CalculateOutlined />}
                >
                  Calculer
                </Button>
              </Box>
            </StepContent>
          </Step>

          {/* Étape 3: Résultats */}
          <Step>
            <StepLabel>Résultats</StepLabel>
            <StepContent>
              {calculationResults && (
                <>
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Calcul effectué avec succès ! Voici les résultats pour {calculationResults.material.name}.
                  </Alert>
                  
                  <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                    <Table>
                      <TableHead sx={{ backgroundColor: 'rgba(255, 107, 0, 0.1)' }}>
                        <TableRow>
                          <TableCell><strong>Matériau</strong></TableCell>
                          <TableCell><strong>Volume estimé</strong></TableCell>
                          <TableCell><strong>Quantité</strong></TableCell>
                          <TableCell><strong>Unité</strong></TableCell>
                          <TableCell><strong>Prix unitaire</strong></TableCell>
                          <TableCell><strong>Prix total</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{calculationResults.material.name}</TableCell>
                          <TableCell>{calculationResults.volume} m³</TableCell>
                          <TableCell>{calculationResults.quantity}</TableCell>
                          <TableCell>{calculationResults.material.unit}</TableCell>
                          <TableCell>{calculationResults.material.price.toFixed(2)} €</TableCell>
                          <TableCell><strong>{calculationResults.totalPrice} €</strong></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  {/* Affichage des seaux/brouettes pour petits volumes */}
                  {calculationResults.buckets && (
                    <Alert severity="info" sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Pour ce petit volume ({calculationResults.volume} m³), vous pouvez aussi utiliser :
                      </Typography>
                      <Typography variant="body2">
                        • {calculationResults.buckets} seau(x) de 10 litres<br />
                        • {calculationResults.wheelbarrows} brouette(s) de 60 litres
                      </Typography>
                    </Alert>
                  )}
                  
                  {/* Calcul spécifique pour le ciment */}
                  {calculationResults.cementCalculation && (
                    <Alert severity="info" sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Détails du calcul pour le ciment :
                      </Typography>
                      <Typography variant="body2">
                        • Dosage : {calculationResults.cementCalculation.dosage} kg/m³<br />
                        • Poids total de ciment nécessaire : {calculationResults.cementCalculation.totalWeight} kg<br />
                        • Nombre de sacs nécessaires : {calculationResults.cementCalculation.bags} sac(s) de {calculationResults.cementCalculation.bagWeight} kg
                      </Typography>
                    </Alert>
                  )}
                  
                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button onClick={handleReset} startIcon={<RemoveCircleOutline />}>
                      Nouveau calcul
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={generateQuote}
                      startIcon={<ShoppingCartOutlined />}
                    >
                      Générer un devis
                    </Button>
                  </Box>
                </>
              )}
            </StepContent>
          </Step>
        </Stepper>
      </Paper>

      {/* Section Contact */}
      <Paper elevation={3} sx={{ p: 4, mb: 8, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
          Contactez-nous
        </Typography>
        <Typography variant="body1" paragraph>
          Vous avez des questions ou besoin d'un devis personnalisé ? N'hésitez pas à nous contacter.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit(onSubmitContact)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Le prénom est requis' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Prénom"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message || ''}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Le nom est requis' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Nom"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message || ''}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ 
                      required: 'L\'email est requis',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Adresse email invalide'
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Email"
                        error={!!errors.email}
                        helperText={errors.email?.message || ''}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Téléphone"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="message"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Le message est requis' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Message"
                        multiline
                        rows={4}
                        error={!!errors.message}
                        helperText={errors.message?.message || ''}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<SendIcon />}
                    fullWidth
                  >
                    Envoyer
                  </Button>
                </Grid>
              </Grid>
            </form>
            {contactSuccess && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                  Nos coordonnées
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn color="primary" sx={{ mr: 2 }} />
                      <Typography variant="body1">
                        123 Avenue de la Construction<br />
                        75001 Paris, France
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Phone color="primary" sx={{ mr: 2 }} />
                      <Typography variant="body1">
                        +33 1 23 45 67 89
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Email color="primary" sx={{ mr: 2 }} />
                      <Typography variant="body1">
                        contact@proximat224.fr
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                  Horaires d'ouverture
                </Typography>
                <Typography variant="body2" paragraph>
                  Lundi - Vendredi: 8h00 - 18h00<br />
                  Samedi: 9h00 - 16h00<br />
                  Dimanche: Fermé
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                  Suivez-nous
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <IconButton color="primary" aria-label="facebook">
                    <Facebook />
                  </IconButton>
                  <IconButton color="primary" aria-label="twitter">
                    <Twitter />
                  </IconButton>
                  <IconButton color="primary" aria-label="instagram">
                    <Instagram />
                  </IconButton>
                  <IconButton color="primary" aria-label="linkedin">
                    <LinkedIn />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Google Maps iframe */}
      <Paper elevation={3} sx={{ p: 0, mb: 8, borderRadius: 3, overflow: 'hidden', height: 400 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047033236!2d2.3354330157606347!3d48.87456857928921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e38f817b573%3A0x48d69c30470e7aeb!2sOp%C3%A9ra%20Garnier!5e0!3m2!1sfr!2sfr!4v1659123456789!5m2!1sfr!2sfr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
        ></iframe>
      </Paper>

      {/* Snackbar pour le devis */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Votre demande de devis a été envoyée avec succès !"
        action={
          <Button color="primary" size="small" onClick={() => setOpenSnackbar(false)}>
            Fermer
          </Button>
        }
      />
    </Container>
  );
}

export default CompanyPage;