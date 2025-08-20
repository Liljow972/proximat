import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';

function QuotePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [quoteError, setQuoteError] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const steps = ['Informations client', 'Détails du projet', 'Confirmation'];
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    setQuoteSuccess(false);
    setQuoteError(false);
    
    try {
      // Simulation d'appel API à Axonaut
      // Dans une implémentation réelle, vous utiliseriez axios pour appeler l'API
      console.log('Données du devis à envoyer:', data);
      
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simuler une réponse réussie
      setQuoteSuccess(true);
      setActiveStep(steps.length);
    } catch (error) {
      console.error('Erreur lors de la génération du devis:', error);
      setQuoteError(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Générer un devis
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 4 }}>
        Créez et envoyez un devis professionnel en quelques étapes
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {activeStep === steps.length ? (
          <Box sx={{ textAlign: 'center' }}>
            {quoteSuccess && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Votre devis a été généré et envoyé avec succès !
              </Alert>
            )}
            <Typography variant="h6" gutterBottom>
              Devis complété
            </Typography>
            <Typography variant="body1" paragraph>
              Merci d'avoir utilisé notre service de génération de devis. Un email a été envoyé au client avec les détails du devis.
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => setActiveStep(0)}
              sx={{ mt: 2 }}
            >
              Créer un nouveau devis
            </Button>
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Informations client
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nom"
                      {...register('clientName', { required: 'Le nom est requis' })}
                      error={!!errors.clientName}
                      helperText={errors.clientName?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Prénom"
                      {...register('clientFirstName', { required: 'Le prénom est requis' })}
                      error={!!errors.clientFirstName}
                      helperText={errors.clientFirstName?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      {...register('clientEmail', { 
                        required: 'L\'email est requis',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Adresse email invalide'
                        }
                      })}
                      error={!!errors.clientEmail}
                      helperText={errors.clientEmail?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Téléphone"
                      {...register('clientPhone', { required: 'Le téléphone est requis' })}
                      error={!!errors.clientPhone}
                      helperText={errors.clientPhone?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Adresse"
                      multiline
                      rows={2}
                      {...register('clientAddress', { required: 'L\'adresse est requise' })}
                      error={!!errors.clientAddress}
                      helperText={errors.clientAddress?.message}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Détails du projet
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Titre du projet"
                      {...register('projectTitle', { required: 'Le titre du projet est requis' })}
                      error={!!errors.projectTitle}
                      helperText={errors.projectTitle?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description du projet"
                      multiline
                      rows={4}
                      {...register('projectDescription', { required: 'La description est requise' })}
                      error={!!errors.projectDescription}
                      helperText={errors.projectDescription?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date de début"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      {...register('startDate', { required: 'La date de début est requise' })}
                      error={!!errors.startDate}
                      helperText={errors.startDate?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date de fin estimée"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      {...register('endDate', { required: 'La date de fin est requise' })}
                      error={!!errors.endDate}
                      helperText={errors.endDate?.message}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Confirmation
                </Typography>
                <Typography variant="body1" paragraph>
                  Veuillez vérifier les informations avant de générer le devis. Une fois le devis généré, il sera envoyé par email au client.
                </Typography>
                {quoteError && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    Une erreur s'est produite lors de la génération du devis. Veuillez réessayer.
                  </Alert>
                )}
              </Box>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Retour
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button 
                  variant="contained" 
                  color="primary" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Générer le devis'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                >
                  Suivant
                </Button>
              )}
            </Box>
          </form>
        )}
      </Paper>
    </Container>
  );
}

export default QuotePage;