import jsPDF from 'jspdf';
import 'jspdf-autotable';

class PDFService {
  constructor() {
    this.doc = null;
    this.pageWidth = 210; // A4 width in mm
    this.pageHeight = 297; // A4 height in mm
    this.margin = 20;
  }

  // Génère le PDF sans l'ouvrir automatiquement
  generateEstimatePDF(estimateData, clientData) {
    try {
      this.doc = new jsPDF();
      
      // Génération du contenu PDF
      this.addHeader();
      this.addClientInfo(clientData);
      this.addEstimateDetails(estimateData);
      this.addMaterialsTable(estimateData);
      this.addSummary(estimateData);
      this.addFooter();
      
      return {
        success: true,
        message: 'PDF généré avec succès'
      };
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      throw new Error('Impossible de générer le PDF: ' + error.message);
    }
  }

  // Ouvre le PDF dans un nouvel onglet (pour le bouton "Générer PDF")
  openPDFInNewTab() {
    if (!this.doc) {
      throw new Error('Aucun PDF généré');
    }
    
    const pdfBlob = this.doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  }

  // Télécharge le PDF (pour le bouton "Générer PDF")
  downloadPDF(filename = 'devis-proximat.pdf') {
    if (!this.doc) {
      throw new Error('Aucun PDF généré');
    }
    
    this.doc.save(filename);
    return { success: true, message: 'PDF téléchargé avec succès' };
  }

  // Retourne le blob PDF pour l'envoi par email
  getPDFBlob() {
    if (!this.doc) {
      return null;
    }
    
    return this.doc.output('blob');
  }

  addHeader() {
    // En-tête avec logo et informations entreprise
    this.doc.setFontSize(24);
    this.doc.setTextColor(255, 107, 53); // Orange PROXIMAT
    this.doc.text('PROXIMAT', this.pageWidth / 2, 30, { align: 'center' });
    
    this.doc.setFontSize(12);
    this.doc.setTextColor(100, 100, 100);
    this.doc.text('Matériaux de construction', this.pageWidth / 2, 40, { align: 'center' });
    this.doc.text('Quartier morne-vert à Ducos 97224, Martinique', this.pageWidth / 2, 46, { align: 'center' });
    this.doc.text('Tél: 0596 03 70 01 | Email: contact@proximat.fr', this.pageWidth / 2, 52, { align: 'center' });
    
    // Ligne de séparation
    this.doc.setDrawColor(255, 107, 53);
    this.doc.setLineWidth(1);
    this.doc.line(this.margin, 60, this.pageWidth - this.margin, 60);
  }

  addClientInfo(clientData) {
    const currentDate = new Date().toLocaleDateString('fr-FR');
    const devisNumber = `DEV-${Date.now().toString().slice(-6)}`;
    
    this.doc.setFontSize(14);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('DEVIS ESTIMATIF', this.margin, 75);
    
    this.doc.setFontSize(10);
    this.doc.text(`N° ${devisNumber}`, this.margin, 85);
    this.doc.text(`Date: ${currentDate}`, this.margin, 92);
    
    if (clientData.clientName) {
      this.doc.text(`Client: ${clientData.clientName}`, this.margin, 105);
    }
    if (clientData.clientEmail) {
      this.doc.text(`Email: ${clientData.clientEmail}`, this.margin, 112);
    }
  }

  addEstimateDetails(estimateData) {
    this.doc.setFontSize(12);
    this.doc.text('Détails du projet:', this.margin, 130);
    
    this.doc.setFontSize(10);
    this.doc.text(`Surface: ${estimateData.surface_m2} m²`, this.margin, 140);
    this.doc.text(`Volume: ${estimateData.volume_m3} m³`, this.margin, 147);
  }

  addMaterialsTable(estimateData) {
    const tableData = estimateData.items.map(item => [
      item.material.name,
      item.quantity.toString(),
      item.displayUnit,
      `${item.totalPrice.toFixed(2)} €`
    ]);
    
    this.doc.autoTable({
      startY: 160,
      head: [['Matériau', 'Quantité', 'Unité', 'Prix HT']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [255, 107, 53],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 10,
        cellPadding: 5
      }
    });
  }

  addSummary(estimateData) {
    const finalY = this.doc.lastAutoTable.finalY + 20;
    
    this.doc.setFontSize(12);
    this.doc.setFont(undefined, 'bold');
    this.doc.text(`TOTAL HT: ${estimateData.totalPrice.toFixed(2)} €`, this.pageWidth - this.margin, finalY, { align: 'right' });
    
    if (estimateData.hasManualItems) {
      this.doc.setFontSize(10);
      this.doc.setFont(undefined, 'normal');
      this.doc.setTextColor(200, 100, 0);
      this.doc.text('* Ce devis contient des produits sur devis. Le prix final peut varier.', this.margin, finalY + 15);
    }
  }

  addFooter() {
    const footerY = this.pageHeight - 30;
    
    this.doc.setFontSize(8);
    this.doc.setTextColor(100, 100, 100);
    this.doc.text('Devis valable 30 jours - Prix HT', this.pageWidth / 2, footerY, { align: 'center' });
    this.doc.text('PROXIMAT - Matériaux de construction', this.pageWidth / 2, footerY + 8, { align: 'center' });
  }
}

export default PDFService;