import jsPDF from 'jspdf';
import 'jspdf-autotable';

class PDFService {
  constructor() {
    this.doc = null;
    this.pageWidth = 210; // A4 width in mm
    this.pageHeight = 297; // A4 height in mm
    this.margin = 20;
  }

  generateEstimatePDF(estimateData, clientData) {
    this.doc = new jsPDF();
    
    // Configuration des couleurs
    const primaryColor = [255, 107, 53]; // Orange #FF6B35
    const secondaryColor = [55, 71, 79]; // Gris foncé #37474F
    const lightGray = [245, 245, 245];
    
    // En-tête avec logo et informations entreprise
    this.addHeader(primaryColor, secondaryColor);
    
    // Informations client et devis
    this.addClientInfo(clientData, estimateData, secondaryColor);
    
    // Tableau des matériaux
    this.addMaterialsTable(estimateData, primaryColor, secondaryColor);
    
    // Résumé et total
    this.addSummary(estimateData, primaryColor, secondaryColor);
    
    // Pied de page
    this.addFooter(secondaryColor);
    
    return this.doc;
  }

  addHeader(primaryColor, secondaryColor) {
    // Rectangle d'en-tête
    this.doc.setFillColor(...primaryColor);
    this.doc.rect(0, 0, this.pageWidth, 40, 'F');
    
    // Logo et nom de l'entreprise
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('PROXIMAT', this.margin, 25);
    
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('Matériaux de construction', this.margin, 32);
    
    // Informations de contact (alignées à droite)
    const contactX = this.pageWidth - this.margin;
    this.doc.setFontSize(10);
    this.doc.text('123 Avenue de la Construction', contactX, 15, { align: 'right' });
    this.doc.text('75001 Paris, France', contactX, 20, { align: 'right' });
    this.doc.text('Tél: +33 1 23 45 67 89', contactX, 25, { align: 'right' });
    this.doc.text('contact@proximat.fr', contactX, 30, { align: 'right' });
  }

  addClientInfo(clientData, estimateData, secondaryColor) {
    let yPos = 60;
    
    // Titre du document
    this.doc.setTextColor(...secondaryColor);
    this.doc.setFontSize(20);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('DEVIS ESTIMATIF', this.margin, yPos);
    
    yPos += 20;
    
    // Informations du devis
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    
    const devisInfo = [
      ['Numéro de devis:', `DEV-${Date.now().toString().slice(-6)}`],
      ['Date:', new Date().toLocaleDateString('fr-FR')],
      ['Validité:', '30 jours']
    ];
    
    devisInfo.forEach(([label, value]) => {
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(label, this.margin, yPos);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(value, this.margin + 40, yPos);
      yPos += 8;
    });
    
    // Informations client
    yPos += 10;
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('INFORMATIONS CLIENT', this.margin, yPos);
    yPos += 10;
    
    this.doc.setFont('helvetica', 'normal');
    if (clientData.clientName) {
      this.doc.text(`Nom: ${clientData.clientName}`, this.margin, yPos);
      yPos += 8;
    }
    if (clientData.clientEmail) {
      this.doc.text(`Email: ${clientData.clientEmail}`, this.margin, yPos);
      yPos += 8;
    }
    
    // Informations du projet
    yPos += 10;
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('DÉTAILS DU PROJET', this.margin, yPos);
    yPos += 10;
    
    this.doc.setFont('helvetica', 'normal');
    const projectInfo = [
      ['Surface:', `${estimateData.surface} m²`],
      ['Épaisseur:', `${estimateData.thickness} cm`],
      ['Volume:', `${estimateData.volume} m³`]
    ];
    
    projectInfo.forEach(([label, value]) => {
      this.doc.text(`${label} ${value}`, this.margin, yPos);
      yPos += 8;
    });
  }

  addMaterialsTable(estimateData, primaryColor, secondaryColor) {
    const startY = 180;
    
    // Préparation des données du tableau
    const tableData = estimateData.materials.map(material => [
      material.name,
      material.quantity.toString(),
      material.unit,
      `${material.unitPrice.toFixed(2)} €`,
      `${material.totalPrice.toFixed(2)} €`
    ]);
    
    // Configuration du tableau
    this.doc.autoTable({
      startY: startY,
      head: [['Matériau', 'Quantité', 'Unité', 'Prix unitaire', 'Prix total']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 12
      },
      bodyStyles: {
        fontSize: 10,
        textColor: secondaryColor
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250]
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 25, halign: 'center' },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 35, halign: 'right' },
        4: { cellWidth: 35, halign: 'right' }
      },
      margin: { left: this.margin, right: this.margin }
    });
  }

  addSummary(estimateData, primaryColor, secondaryColor) {
    const finalY = this.doc.lastAutoTable.finalY + 20;
    
    // Cadre de résumé
    this.doc.setDrawColor(...secondaryColor);
    this.doc.setLineWidth(0.5);
    this.doc.rect(this.pageWidth - 80, finalY, 60, 40);
    
    // Titre du résumé
    this.doc.setFillColor(...primaryColor);
    this.doc.rect(this.pageWidth - 80, finalY, 60, 10, 'F');
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('RÉSUMÉ', this.pageWidth - 50, finalY + 7, { align: 'center' });
    
    // Détails du résumé
    this.doc.setTextColor(...secondaryColor);
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    
    let summaryY = finalY + 18;
    this.doc.text(`Sous-total HT:`, this.pageWidth - 75, summaryY);
    this.doc.text(`${estimateData.totalPrice.toFixed(2)} €`, this.pageWidth - 25, summaryY, { align: 'right' });
    
    summaryY += 8;
    const tva = estimateData.totalPrice * 0.20;
    this.doc.text(`TVA (20%):`, this.pageWidth - 75, summaryY);
    this.doc.text(`${tva.toFixed(2)} €`, this.pageWidth - 25, summaryY, { align: 'right' });
    
    summaryY += 8;
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(`TOTAL TTC:`, this.pageWidth - 75, summaryY);
    this.doc.text(`${(estimateData.totalPrice + tva).toFixed(2)} €`, this.pageWidth - 25, summaryY, { align: 'right' });
    
    // Conditions
    const conditionsY = finalY + 60;
    this.doc.setFontSize(8);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('Conditions:', this.margin, conditionsY);
    this.doc.text('• Devis valable 30 jours', this.margin, conditionsY + 8);
    this.doc.text('• Retrait sur place uniquement', this.margin, conditionsY + 16);
    this.doc.text('• Paiement à la commande', this.margin, conditionsY + 24);
  }

  addFooter(secondaryColor) {
    const footerY = this.pageHeight - 20;
    
    this.doc.setTextColor(...secondaryColor);
    this.doc.setFontSize(8);
    this.doc.setFont('helvetica', 'normal');
    
    const footerText = 'PROXIMAT - Matériaux de construction - SIRET: 123 456 789 00012';
    this.doc.text(footerText, this.pageWidth / 2, footerY, { align: 'center' });
  }

  downloadPDF(filename = 'devis-proximat.pdf') {
    if (this.doc) {
      this.doc.save(filename);
    }
  }

  getPDFBlob() {
    if (this.doc) {
      return this.doc.output('blob');
    }
    return null;
  }
}

export default PDFService;