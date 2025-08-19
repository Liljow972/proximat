import emailjs from '@emailjs/browser';

class EmailService {
  constructor() {
    // Ces clés seront configurées via les variables d'environnement
    this.serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id';
    this.templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id';
    this.publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key';
    
    // Initialisation d'EmailJS
    emailjs.init(this.publicKey);
  }

  async sendEstimateEmail(clientData, estimateData, pdfBlob) {
    try {
      // Conversion du PDF en base64 pour l'envoi
      const pdfBase64 = await this.blobToBase64(pdfBlob);
      
      const templateParams = {
        to_name: clientData.clientName,
        to_email: clientData.clientEmail,
        from_name: 'PROXIMAT',
        subject: `Devis estimatif - ${new Date().toLocaleDateString('fr-FR')}`,
        message: this.generateEstimateEmailContent(estimateData),
        pdf_attachment: pdfBase64,
        reply_to: 'contact@proximat.fr'
      };

      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      return {
        success: true,
        message: 'Email envoyé avec succès',
        response
      };
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      return {
        success: false,
        message: 'Erreur lors de l\'envoi de l\'email',
        error
      };
    }
  }

  async sendPreorderEmail(clientData, orderData) {
    try {
      const templateParams = {
        to_name: clientData.customerName,
        to_email: clientData.customerEmail,
        from_name: 'PROXIMAT',
        subject: `Confirmation de précommande - ${new Date().toLocaleDateString('fr-FR')}`,
        message: this.generatePreorderEmailContent(orderData),
        reply_to: 'contact@proximat.fr'
      };

      const response = await emailjs.send(
        this.serviceId,
        'template_preorder', // Template spécifique pour les précommandes
        templateParams
      );

      return {
        success: true,
        message: 'Email de confirmation envoyé',
        response
      };
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de précommande:', error);
      return {
        success: false,
        message: 'Erreur lors de l\'envoi de l\'email',
        error
      };
    }
  }

  generateEstimateEmailContent(estimateData) {
    return `
Bonjour,

Veuillez trouver ci-joint votre devis estimatif pour votre projet de construction.

DÉTAILS DU PROJET:
- Surface: ${estimateData.surface} m²
- Épaisseur: ${estimateData.thickness} cm
- Volume: ${estimateData.volume} m³

RÉSUMÉ:
- Nombre de matériaux: ${estimateData.materials.length}
- Total HT: ${estimateData.totalPrice.toFixed(2)} €
- TVA (20%): ${(estimateData.totalPrice * 0.20).toFixed(2)} €
- Total TTC: ${(estimateData.totalPrice * 1.20).toFixed(2)} €

Ce devis est valable 30 jours à compter de sa date d'émission.

Pour toute question ou pour passer commande, n'hésitez pas à nous contacter:
- Téléphone: +33 1 23 45 67 89
- Email: contact@proximat.fr

Cordialement,
L'équipe PROXIMAT
    `.trim();
  }

  generatePreorderEmailContent(orderData) {
    const itemsList = orderData.cart.map(item => 
      `- ${item.product.name}: ${item.quantity} ${item.product.unit} (${item.totalPrice.toFixed(2)} €)`
    ).join('\n');

    return `
Bonjour ${orderData.customer.name},

Nous avons bien reçu votre précommande. Voici le récapitulatif:

ARTICLES COMMANDÉS:
${itemsList}

TOTAL: ${orderData.total.toFixed(2)} € HT

INFORMATIONS DE CONTACT:
- Email: ${orderData.customer.email}
- Téléphone: ${orderData.customer.phone}

${orderData.customer.notes ? `NOTES: ${orderData.customer.notes}` : ''}

PROCHAINES ÉTAPES:
1. Nous préparons votre commande
2. Nous vous contactons pour organiser le retrait
3. Retrait sur place dans nos locaux

Nos équipes vous contacteront dans les plus brefs délais pour organiser le retrait de votre commande.

Merci de votre confiance,
L'équipe PROXIMAT
    `.trim();
  }

  blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1]; // Enlever le préfixe data:
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Méthode pour tester la configuration
  async testEmailConfiguration() {
    try {
      const testParams = {
        to_email: 'test@example.com',
        from_name: 'PROXIMAT Test',
        message: 'Test de configuration EmailJS'
      };

      await emailjs.send(this.serviceId, this.templateId, testParams);
      return { success: true, message: 'Configuration EmailJS valide' };
    } catch (error) {
      return { success: false, message: 'Erreur de configuration EmailJS', error };
    }
  }
}

export default EmailService;