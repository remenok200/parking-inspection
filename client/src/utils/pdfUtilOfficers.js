import jsPDF from 'jspdf';
import QRious from 'qrious';
import { format } from 'date-fns';
import CONSTANTS from '../constants';
const { QR_CODE_BASE_URL } = CONSTANTS;

const generateOfficerPDF = async (officer) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const createdAt = format(new Date(officer.createdAt), 'dd.MM.yyyy | HH:mm');
  const updatedAt = format(new Date(officer.updatedAt), 'dd.MM.yyyy | HH:mm');
  const generatedOn = format(new Date(), 'dd.MM.yyyy | HH:mm');
  
  const qrCode = new QRious({
    value: `${QR_CODE_BASE_URL}/officers/details/${officer.id}`,
    size: 30,
  });
  const qrCodeDataUrl = qrCode.toDataURL();
  
  const addFooter = (pageNumber, totalPages) => {
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      `Page ${pageNumber} of ${totalPages}`,
      pageWidth - 40,
      pageHeight - 10
    );
    doc.text(`Generated on: ${generatedOn}`, 14, pageHeight - 10);
    doc.addImage(qrCodeDataUrl, 'PNG', pageWidth - 35, pageHeight - 40, 20, 20);
  };
  
  const addHeader = (title) => {
    doc.setFontSize(22);
    doc.setTextColor('#007bff');
    doc.text(title, pageWidth / 2, 20, { align: 'center' });
  };
  
  const addSectionTitle = (title, yPosition) => {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#007bff');
    doc.text(title, 14, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.setDrawColor('#007bff');
    doc.line(14, yPosition + 2, pageWidth - 14, yPosition + 2);
  };
  
  const addText = (text, yPosition) => {
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(text, 14, yPosition);
  };
  
  addHeader(`Officer # ${officer.badgeNumber}`);
  
  addSectionTitle('Officer Details', 40);
  addText(`Full Name: ${officer.fullName}`, 50);
  addText(`Badge Number: ${officer.badgeNumber}`, 60);
  addText(`District: ${officer.district}`, 70);
  addText(
    `Status: ${officer.isWorked ? 'Active (Worked)' : 'Inactive (Not Worked)'}`,
    80
  );
  
  addSectionTitle('Timestamps', 100);
  addText(`Created: ${createdAt}`, 110);
  addText(`Updated: ${updatedAt}`, 120);
  
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(i, totalPages);
  }
  
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl);
};

export default generateOfficerPDF;
