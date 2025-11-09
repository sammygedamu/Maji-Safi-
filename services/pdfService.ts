
import { jsPDF } from 'jspdf';
import { InvoiceData, ProductBrochureData } from '../types';
import { BRAND_INFO } from '../constants';

export const createInvoicePdf = (data: InvoiceData) => {
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'letter',
  });

  const page = {
      width: doc.internal.pageSize.getWidth(),
      height: doc.internal.pageSize.getHeight(),
      margin: 72, // 1 inch
  };
  
  let y = page.margin;

  // Header
  doc.setFillColor(BRAND_INFO.colors.primaryBlue);
  doc.rect(0, 0, page.width, 90, 'F');
  doc.addImage(BRAND_INFO.logo, 'PNG', page.margin, 20, 50, 50);
  
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(BRAND_INFO.colors.white);
  doc.text('INVOICE', page.width - page.margin, 45, { align: 'right' });

  doc.setFontSize(10);
  doc.text(`Invoice #: ${data.invoiceNumber}`, page.width - page.margin, 65, { align: 'right' });


  // Bill To / From
  y += 30;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(BRAND_INFO.colors.textDark);
  doc.text('FROM:', page.margin, y);
  doc.text('BILL TO:', page.width / 2, y);

  doc.setFont('Helvetica', 'normal');
  doc.text(BRAND_INFO.name, page.margin, y + 15);
  doc.text(BRAND_INFO.contact.email, page.margin, y + 30);
  doc.text(BRAND_INFO.contact.website, page.margin, y + 45);

  doc.text(data.clientName, page.width / 2, y + 15);
  doc.text(data.clientAddress, page.width / 2, y + 30);

  y += 70;

  // Table Header
  doc.setFillColor(BRAND_INFO.colors.primaryBlue);
  doc.rect(page.margin, y, page.width - (page.margin * 2), 25, 'F');
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(BRAND_INFO.colors.white);
  doc.text('Description', page.margin + 10, y + 17);
  doc.text('Qty', page.margin + 280, y + 17);
  doc.text('Rate', page.margin + 340, y + 17);
  doc.text('Amount', page.width - page.margin - 10, y + 17, { align: 'right' });
  y += 25;

  // Table Rows
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(BRAND_INFO.colors.textDark);
  data.lineItems.forEach(item => {
    y += 20;
    doc.text(item.description, page.margin + 10, y);
    doc.text(item.quantity.toString(), page.margin + 280, y);
    doc.text(`$${item.rate.toFixed(2)}`, page.margin + 340, y);
    doc.text(`$${item.amount.toFixed(2)}`, page.width - page.margin - 10, y, { align: 'right' });
  });

  y += 20;
  doc.setDrawColor(BRAND_INFO.colors.lightBlue);
  doc.line(page.margin, y, page.width - page.margin, y);
  y += 20;

  // Totals
  const totalsX = page.width / 2 + 100;
  doc.setFont('Helvetica', 'normal');
  doc.text('Subtotal:', totalsX, y, { align: 'right' });
  doc.text(`$${data.subtotal.toFixed(2)}`, page.width - page.margin, y, { align: 'right' });
  y += 20;

  doc.text(`Tax (8%):`, totalsX, y, { align: 'right' });
  doc.text(`$${data.tax.toFixed(2)}`, page.width - page.margin, y, { align: 'right' });
  y += 10;
  doc.line(totalsX - 100, y, page.width - page.margin, y);
  y += 20;
  
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('TOTAL:', totalsX, y, { align: 'right' });
  doc.text(`$${data.total.toFixed(2)}`, page.width - page.margin, y, { align: 'right' });
  
  y += 50;

  // Payment Terms
  doc.setFillColor(BRAND_INFO.colors.lightBlue + '33'); // light blue with opacity
  doc.rect(page.margin, y, page.width - (page.margin * 2), 60, 'F');
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(BRAND_INFO.colors.textDark);
  doc.text('PAYMENT TERMS:', page.margin + 10, y + 15);
  doc.setFont('Helvetica', 'normal');
  doc.text(data.paymentTerms, page.margin + 10, y + 30, { maxWidth: page.width - (page.margin*2) - 20 });
  
  
  // Footer
  const footerY = page.height - page.margin;
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(BRAND_INFO.colors.textGray);
  const missionText = doc.splitTextToSize(BRAND_INFO.mission, page.width - (page.margin*2));
  doc.text(missionText, page.margin, footerY);
  
  const today = new Date().toLocaleDateString();
  doc.save(`MajiSafi_Invoice_${data.invoiceNumber}_${today}.pdf`);
};

export const createProductBrochurePdf = (data: ProductBrochureData) => {
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'letter',
  });

  const page = {
      width: doc.internal.pageSize.getWidth(),
      height: doc.internal.pageSize.getHeight(),
      margin: 72, // 1 inch
  };
  
  let y = 0;

  // Header
  doc.setFillColor(BRAND_INFO.colors.primaryBlue);
  doc.rect(0, 0, page.width, 150, 'F');
  doc.addImage(BRAND_INFO.logo, 'PNG', page.width / 2 - 40, 20, 80, 50); 
  
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(BRAND_INFO.colors.white);
  doc.text(data.productName, page.width / 2, 105, { align: 'center' });

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(14);
  doc.text(data.tagline, page.width / 2, 125, { align: 'center' });

  y = 150 + 40; // Start content below header

  // Introduction
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(BRAND_INFO.colors.textDark);
  const introLines = doc.splitTextToSize(data.introduction, page.width - page.margin * 2);
  doc.text(introLines, page.margin, y);
  y += doc.getTextDimensions(introLines).h + 30;


  // Features & Benefits (side by side)
  const contentWidth = page.width - page.margin * 2;
  const columnWidth = (contentWidth - 20) / 2;
  const featuresX = page.margin;
  const benefitsX = page.margin + columnWidth + 20;
  let featuresY = y;
  let benefitsY = y;

  // Features Column
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(BRAND_INFO.colors.primaryBlue);
  doc.text('Key Features', featuresX, featuresY);
  featuresY += 20;

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(BRAND_INFO.colors.textDark);
  data.features.forEach(feature => {
      doc.setFont('Helvetica', 'bold');
      doc.text(`• ${feature.name}`, featuresX, featuresY, { maxWidth: columnWidth });
      featuresY += 12;
      
      doc.setFont('Helvetica', 'normal');
      const descLines = doc.splitTextToSize(feature.description, columnWidth);
      doc.text(descLines, featuresX + 10, featuresY);
      featuresY += doc.getTextDimensions(descLines).h + 10;
  });


  // Benefits Column
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(BRAND_INFO.colors.primaryBlue);
  doc.text('Benefits', benefitsX, benefitsY);
  benefitsY += 20;
  
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(BRAND_INFO.colors.textDark);
  data.benefits.forEach(benefit => {
      const benefitLines = doc.splitTextToSize(`• ${benefit}`, columnWidth);
      doc.text(benefitLines, benefitsX, benefitsY);
      benefitsY += doc.getTextDimensions(benefitLines).h + 5;
  });

  // Set y to the bottom of the longest column
  y = Math.max(featuresY, benefitsY) + 40;

  // Call to Action
  const ctaWidth = 200;
  const ctaHeight = 40;
  const ctaX = page.width / 2 - ctaWidth / 2;
  doc.setFillColor(BRAND_INFO.colors.primaryBlue);
  doc.roundedRect(ctaX, y, ctaWidth, ctaHeight, 5, 5, 'F');
  
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(BRAND_INFO.colors.white);
  doc.text(data.callToAction, page.width / 2, y + ctaHeight / 2 + 5, { align: 'center' });


  // Footer
  const footerY = page.height - 40;
  doc.setFillColor(BRAND_INFO.colors.lightBlue + '40');
  doc.rect(0, footerY - 20, page.width, 60, 'F');
  
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(BRAND_INFO.colors.textGray);
  const footerText1 = `${BRAND_INFO.name} | ${BRAND_INFO.vision}`;
  const footerText2 = `${BRAND_INFO.contact.email} | ${BRAND_INFO.contact.website}`;
  doc.text(footerText1, page.width / 2, footerY, { align: 'center' });
  doc.text(footerText2, page.width / 2, footerY + 12, { align: 'center' });

  const today = new Date().toLocaleDateString().replace(/\//g, '-');
  doc.save(`MajiSafi_Brochure_${data.productName.replace(/\s/g, '_')}_${today}.pdf`);
};
