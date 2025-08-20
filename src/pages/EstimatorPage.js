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
} from '@mui/material';

function EstimatorPage() {
  const [formData, setFormData] = useState({
    surface: '',
    workType: '',
    projectType: '',
  });

  const [results, setResults] = useState(null);

  const workTypes = [
    { value: 'carrelage', label: 'Pose de carrelage' },
    { value: 'peinture', label: 'Travaux de peinture' },
    { value: 'maconnerie', label: 'Travaux de maçonnerie' },
    { value: 'plomberie', label: 'Travaux de plomberie' },
  ];

  const projectTypes = [
    { value: 'neuf', label: 'Construction neuve' },
    { value: 'renovation', label: 'Rénovation' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateMaterials = () => {
    // Simulation de calcul (à remplacer par des calculs réels)
    const { surface, workType, projectType } = formData;
    
    let materials = [];
    let totalPrice = 0;
    
    if (workType === 'carrelage') {
      // Calcul pour carrelage
      const carreaux = Math.ceil(parseFloat(surface) * 1.1); // +10% pour les chutes
      const colle = Math.ceil(parseFloat(surface) * 0.25); // 0.25 sac par m²
      const jointement = Math.ceil(parseFloat(surface) * 0.2); // 0.2 kg par m²
      
      materials = [
        { name: 'Carreaux', quantity: carreaux, unit: 'm²', unitPrice: 25, totalPrice: carreaux * 25 },
        { name: 'Colle à carrelage', quantity: colle, unit: 'sac', unitPrice: 15, totalPrice: colle * 15 },
        { name: 'Jointement', quantity: jointement, unit: 'kg', unitPrice: 8, totalPrice: jointement * 8 },
      ];
      
      totalPrice = materials.reduce((sum, item) => sum + item.totalPrice, 0);
    } else if (workType === 'peinture') {
      // Calcul pour peinture
      const peinture = Math.ceil(parseFloat(surface) * 0.4); // 0.4L par m²
      const apprêt = Math.ceil(parseFloat(surface) * 0.2); // 0.2L par m²
      
      materials = [
        { name: 'Peinture', quantity: peinture, unit: 'L', unitPrice: 12, totalPrice: peinture * 12 },
        { name: 'Apprêt', quantity: apprêt, unit: 'L', unitPrice: 8, totalPrice: apprêt * 8 },
      ];
      
      totalPrice = materials.reduce((sum, item) => sum + item.totalPrice, 0);
    } else if (workType === 'maconnerie') {
      // Calcul pour maçonnerie
      const ciment = Math.ceil(parseFloat(surface) * 0.5); // 0.5 sac par m²
      const sable = Math.ceil(parseFloat(surface) * 0.1); // 0.1 tonne par m²
      const gravier = Math.ceil(parseFloat(surface) * 0.15); // 0.15 tonne par m²
      
      materials = [
        { name: 'Ciment', quantity: ciment, unit: 'sac', unitPrice: 10, totalPrice: ciment * 10 },
        { name: 'Sable', quantity: sable, unit: 'tonne', unitPrice: 40, totalPrice: sable * 40 },
        { name: 'Gravier', quantity: gravier, unit: 'tonne', unitPrice: 35, totalPrice: gravier * 35 },
      ];
      
      totalPrice = materials.reduce((sum, item) => sum + item.totalPrice, 0);
    } else if (workType === 'plomberie') {
      // Calcul pour plomberie
      const tuyaux = Math.ceil(parseFloat(surface) * 0.8); // 0.8m par m²
      const raccords = Math.ceil(parseFloat(surface) * 0.3); // 0.3 unité par m²
      
      materials = [
        { name: 'Tuyaux PVC', quantity: tuyaux, unit: 'm', unitPrice: 5, totalPrice: tuyaux * 5 },
        { name: 'Raccords', quantity: raccords, unit: 'unité', unitPrice: 3, totalPrice: raccords * 3 },
      ];
      
      totalPrice = materials.reduce((sum, item) => sum + item.totalPrice, 0);
    }
    
    // Ajustement selon le type de projet
    if (projectType === 'renovation') {
      totalPrice *= 1.2; // +20% pour rénovation (complexité supplémentaire)
      materials = materials.map(item => ({
        ...item,
        totalPrice: item.totalPrice * 1.2
      }));
    }
    
    setResults({
      materials,
      totalPrice
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateMaterials();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Estimateur de matériaux
      </Typography>
      <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
        Calculez rapidement les quantités de matériaux nécessaires pour votre chantier
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Surface (m²)"
                name="surface"
                type="number"
                value={formData.surface}
                onChange={handleChange}
                required
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Type de travaux"
                name="workType"
                value={formData.workType}
                onChange={handleChange}
                required
              >
                {workTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Type de projet"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
              >
                {projectTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Calculer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {results && (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Résultats de l'estimation
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Matériau</TableCell>
                  <TableCell align="right">Quantité</TableCell>
                  <TableCell align="right">Unité</TableCell>
                  <TableCell align="right">Prix unitaire (€)</TableCell>
                  <TableCell align="right">Prix total (€)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.materials.map((material) => (
                  <TableRow key={material.name}>
                    <TableCell component="th" scope="row">
                      {material.name}
                    </TableCell>
                    <TableCell align="right">{material.quantity}</TableCell>
                    <TableCell align="right">{material.unit}</TableCell>
                    <TableCell align="right">{material.unitPrice.toFixed(2)}</TableCell>
                    <TableCell align="right">{material.totalPrice.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} align="right" sx={{ fontWeight: 'bold' }}>
                    Total
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    {results.totalPrice.toFixed(2)} €
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" component="a" href="/catalog">
              Voir le catalogue
            </Button>
            <Button variant="contained" component="a" href="/quote">
              Générer un devis
            </Button>
          </Box>
        </Paper>
      )}
    </Container>
  );
}

export default EstimatorPage;
