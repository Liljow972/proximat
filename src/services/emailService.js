import emailjs from '@emailjs/browser';

class EmailService {
  constructor() {
    // Configuration depuis les variables d'environnement
    this.serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    this.templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    this.publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    
    // Vérification de la configuration
    this.isConfigured = !!(this.serviceId && this.templateId && this.publicKey &&
                          this.serviceId !== 'your_actual_service_id');
    
    if (this.isConfigured) {
      // Initialisation d'EmailJS
      emailjs.init(this.publicKey);
    }
  }

  async sendEstimateEmail(clientData, estimateData, pdfBlob) {
    try {
      if (!this.isConfigured) {
        return {
          success: false,
          message: 'Service d\'email non configuré. Veuillez vérifier les variables d\'environnement.',
          error: 'Configuration manquante'
        };
      }

      // Vérification des données requises
      if (!clientData.clientEmail) {
        throw new Error('Email du client requis');
      }
      
      const templateParams = {
        to_name: clientData.clientName || 'Client',
        to_email: clientData.clientEmail,
        from_name: 'PROXIMAT 224',
        subject: `Devis estimatif - ${new Date().toLocaleDateString('fr-FR')}`,
        message: this.generateEstimateEmailContent(estimateData),
        reply_to: 'contact@proximat224.fr'
      };

      console.log('Envoi email avec les paramètres:', templateParams);

      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      return {
        success: true,
        message: 'Email envoyé avec succès !',
        response
      };
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      return {
        success: false,
        message: `Erreur lors de l'envoi: ${error.message}`,
        error
      };
    }
  }

  async sendPreorderEmail(clientData, orderData) {
    try {
      if (!this.isConfigured) {
        return {
          success: false,
          message: 'Service d\'email non configuré.',
          error: 'Configuration manquante'
        };
      }

      const templateParams = {
        to_name: clientData.customerName || 'Client',
        to_email: clientData.customerEmail,
        from_name: 'PROXIMAT 224',
        subject: `Confirmation de précommande - ${new Date().toLocaleDateString('fr-FR')}`,
        message: this.generatePreorderEmailContent(orderData),
        reply_to: 'contact@proximat224.fr'
      };

      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      return {
        success: true,
        message: 'Email de confirmation envoyé !',
        response
      };
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de précommande:', error);
      return {
        success: false,
        message: `Erreur lors de l'envoi: ${error.message}`,
        error
      };
    }
  }

  generateEstimateEmailContent(estimateData) {
    try {
      const surface = estimateData.surface_m2 || '0';
      const volume = estimateData.volume_m3 || '0';
      const totalPrice = estimateData.totalPrice || 0;
      const materialsCount = estimateData.items ? estimateData.items.length : 0;
      
      return `Veuillez trouver ci-joint votre devis estimatif pour votre projet de construction.

DÉTAILS DU PROJET:
• Surface: ${surface} m²
• Volume: ${volume} m³
• Mode de vente: ${estimateData.sellInBuckets ? 'Vente en seaux' : 'Vente en m³'}

RÉSUMÉ:
• Nombre de matériaux: ${materialsCount}
• Total HT: ${totalPrice.toFixed(2)} €
• TVA (20%): ${(totalPrice * 0.20).toFixed(2)} €
• Total TTC: ${(totalPrice * 1.20).toFixed(2)} €

DÉTAIL DES MATÉRIAUX:
${estimateData.items.map(item => 
  `• ${item.material?.name}: ${item.quantity} ${item.displayUnit} - ${(item.totalPrice || 0).toFixed(2)} €`
).join('\n')}

Ce devis est valable 30 jours à compter de sa date d'émission.

Pour toute question, n'hésitez pas à nous contacter.`;
    } catch (error) {
      console.error('Erreur lors de la génération du contenu email:', error);
      return 'Erreur lors de la génération du contenu du devis.';
    }
  }

  generatePreorderEmailContent(orderData) {
    try {
      return `Nous avons bien reçu votre précommande.

Détails de la commande:
• Nombre d'articles: ${orderData.items?.length || 0}
• Total estimé: ${(orderData.total || 0).toFixed(2)} €
• Date de commande: ${new Date().toLocaleDateString('fr-FR')}

Nous vous recontacterons sous 24h pour confirmer la disponibilité et finaliser votre commande.

Merci de votre confiance !`;
    } catch (error) {
      console.error('Erreur lors de la génération du contenu précommande:', error);
      return 'Erreur lors de la génération du contenu de précommande.';
    }
  }

  async testEmailConfiguration() {
    try {
      if (!this.isConfigured) {
        return {
          success: false,
          message: 'Configuration EmailJS manquante',
          configured: false
        };
      }

      // Test simple sans envoi réel
      return {
        success: true,
        message: 'Configuration EmailJS valide',
        configured: true,
        serviceId: this.serviceId,
        templateId: this.templateId
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur de configuration: ' + error.message,
        configured: false
      };
    }
  }
}

export default EmailService;