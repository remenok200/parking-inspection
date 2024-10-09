import jsPDF from 'jspdf';
import QRious from 'qrious';
import { format } from 'date-fns';
import CONSTANTS from '../constants';
const { QR_CODE_BASE_URL } = CONSTANTS;

const generateProtocolPDF = async (protocol) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const createdAt = format(new Date(protocol.createdAt), 'dd.MM.yyyy | HH:mm');
  const updatedAt = format(new Date(protocol.updatedAt), 'dd.MM.yyyy | HH:mm');
  const generatedOn = format(new Date(), 'dd.MM.yyyy | HH:mm');

  const qrCode = new QRious({
    value: `${QR_CODE_BASE_URL}/protocols/details/${protocol.id}`,
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

  addHeader(`Protocol # ${protocol.id}`);

  addSectionTitle('Details', 40);
  addText(`Service notes: ${protocol.serviceNotes || 'No notes provided'}`, 50);
  addText(`Fine amount: ${protocol.fineAmount || 'Not available'}`, 60);
  addText(`Violator full name: ${protocol.violatorFullName}`, 70);
  addText(`Violator passport number: ${protocol.violatorPassportNumber}`, 80);

  addSectionTitle('Timestamps', 100);
  addText(`Created: ${createdAt}`, 110);
  addText(`Updated: ${updatedAt}`, 120);

  addSectionTitle('Officer Details', 140);
  addText(`Officer full name: ${protocol.parkOfficer.full_name}`, 150);
  addText(`Officer badge number: ${protocol.parkOfficer.badge_number}`, 160);

  if (protocol.images && protocol.images.length > 0) {
    for (let i = 0; i < protocol.images.length; i++) {
      const imageUrl = `http://localhost:5001/images/${protocol.images[i].path}`;

      try {
        const imgData = await loadImageData(imageUrl);

        if (imgData) {
          doc.addPage();
          addSectionTitle(`Protocol image ${i + 1}`, 20);
          doc.addImage(imgData, 'JPEG', 14, 40, 180, 150);
        }
      } catch (error) {
        doc.addPage();
        addSectionTitle(`Image ${i + 1}`, 20);
        addText(`Failed to load image ${i + 1}`, 40);
      }
    }
  } else {
    addSectionTitle('Protocol Images', 180);
    addText('No images available for this protocol.', 190);
  }

  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(i, totalPages);
  }

  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl);
};

const loadImageData = (imgUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/jpeg'));
    };
    img.onerror = reject;
    img.src = imgUrl;
  });
};

export default generateProtocolPDF;
