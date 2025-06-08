import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// jsPDF AutoTable için tip tanımlaması
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export interface CalculationResult {
  title: string;
  category: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
  date: string;
}

// Türkçe karakterleri ASCII karşılıklarına çeviren fonksiyon
const convertTurkishChars = (text: string): string => {
  const turkishChars: { [key: string]: string } = {
    'ç': 'c', 'Ç': 'C',
    'ğ': 'g', 'Ğ': 'G', 
    'ı': 'i', 'İ': 'I',
    'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S',
    'ü': 'u', 'Ü': 'U'
  };
  
  return text.replace(/[çÇğĞıİöÖşŞüÜ]/g, (char) => turkishChars[char] || char);
};

export const generatePDF = async (
  calculationResult: CalculationResult,
  elementId?: string
): Promise<void> => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Türkçe karakter desteği için font ayarları
    pdf.setFont('helvetica');
    
    // Header Background
    pdf.setFillColor(17, 28, 49); // Dark blue background
    pdf.rect(0, 0, pageWidth, 45, 'F');
    
    // Header Text
    pdf.setFontSize(18);
    pdf.setTextColor(255, 255, 255); // White
    pdf.text(convertTurkishChars('Av. Serhat Maverdeler'), pageWidth / 2, 20, { align: 'center' });
    
    pdf.setFontSize(14);
    pdf.setTextColor(200, 200, 200); // Light gray
    pdf.text(convertTurkishChars('Hukuki Hesaplama Raporu'), pageWidth / 2, 32, { align: 'center' });
    
    // Title Section
    pdf.setFontSize(20);
    pdf.setTextColor(17, 28, 49); // Dark blue
    pdf.text(convertTurkishChars(calculationResult.title), 20, 65);
    
    // Info Box
    pdf.setFillColor(248, 250, 252); // Light gray background
    pdf.setDrawColor(226, 232, 240); // Border color
    pdf.roundedRect(20, 75, pageWidth - 40, 25, 3, 3, 'FD');
    
    pdf.setFontSize(11);
    pdf.setTextColor(71, 85, 105); // Gray
    pdf.text(convertTurkishChars(`Kategori: ${calculationResult.category}`), 25, 87);
    pdf.text(convertTurkishChars(`Hesaplama Tarihi: ${calculationResult.date}`), 25, 95);
    
    let yPosition = 120;
    
    // Inputs Section
    if (Object.keys(calculationResult.inputs).length > 0) {
      // Section Header
      pdf.setFillColor(59, 130, 246); // Blue
      pdf.rect(20, yPosition - 8, pageWidth - 40, 15, 'F');
      
      pdf.setFontSize(12);
      pdf.setTextColor(255, 255, 255); // White
      pdf.text(convertTurkishChars('GIRILEN BILGILER'), 25, yPosition);
      yPosition += 20;
      
      // Input items
      pdf.setFontSize(10);
      pdf.setTextColor(51, 51, 51); // Dark gray
      
      Object.entries(calculationResult.inputs).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          // Background for each item
          pdf.setFillColor(249, 250, 251);
          pdf.rect(25, yPosition - 5, pageWidth - 50, 10, 'F');
          
          pdf.setTextColor(75, 85, 99);
          pdf.text(convertTurkishChars(`${key}:`), 30, yPosition);
          
          pdf.setTextColor(17, 24, 39);
          pdf.text(convertTurkishChars(String(value)), 100, yPosition);
          
          yPosition += 12;
        }
      });
      
      yPosition += 10;
    }
    
    // Results Section
    if (Object.keys(calculationResult.results).length > 0) {
      // Section Header
      pdf.setFillColor(16, 185, 129); // Green
      pdf.rect(20, yPosition - 8, pageWidth - 40, 15, 'F');
      
      pdf.setFontSize(12);
      pdf.setTextColor(255, 255, 255); // White
      pdf.text(convertTurkishChars('HESAPLAMA SONUCLARI'), 25, yPosition);
      yPosition += 20;
      
      // Result items
      pdf.setFontSize(11);
      
      Object.entries(calculationResult.results).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          // Highlighted background for results
          pdf.setFillColor(240, 253, 244); // Light green
          pdf.setDrawColor(16, 185, 129); // Green border
          pdf.roundedRect(25, yPosition - 6, pageWidth - 50, 12, 2, 2, 'FD');
          
          pdf.setTextColor(22, 101, 52); // Dark green
          pdf.text(convertTurkishChars(`${key}:`), 30, yPosition);
          
          pdf.setTextColor(15, 118, 110); // Teal
          pdf.setFont('helvetica', 'bold');
          pdf.text(convertTurkishChars(String(value)), 100, yPosition);
          pdf.setFont('helvetica', 'normal');
          
          yPosition += 15;
        }
      });
    }
    
    // If specific element should be captured
    if (elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        try {
          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
          });
          
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = pageWidth - 40;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          // Add new page if needed
          if (yPosition + imgHeight > pageHeight - 40) {
            pdf.addPage();
            yPosition = 20;
          }
          
          pdf.addImage(imgData, 'PNG', 20, yPosition, imgWidth, imgHeight);
        } catch (error) {
          console.warn('HTML2Canvas capture failed:', error);
        }
      }
    }
    
    // Footer
    const footerY = pageHeight - 30;
    
    // Footer background
    pdf.setFillColor(248, 250, 252);
    pdf.rect(0, footerY - 10, pageWidth, 40, 'F');
    
    // Warning text
    pdf.setFontSize(9);
    pdf.setTextColor(107, 114, 128);
    pdf.text(convertTurkishChars('Bu hesaplama sonuclari bilgilendirme amaclidir ve kesin hukuki sonuc dogurmaz.'), pageWidth / 2, footerY, { align: 'center' });
    
    // Contact info
    pdf.setFontSize(8);
    pdf.setTextColor(156, 163, 175);
    pdf.text(convertTurkishChars('Av. Serhat Maverdeler | Hukuk Burosu'), pageWidth / 2, footerY + 8, { align: 'center' });
    
    // Download
    const fileName = `${calculationResult.title.replace(/\s+/g, '_').replace(/[çÇğĞıİöÖşŞüÜ]/g, (char) => {
      const map: { [key: string]: string } = {
        'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G', 'ı': 'i', 'İ': 'I',
        'ö': 'o', 'Ö': 'O', 'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U'
      };
      return map[char] || char;
    })}_${new Date().getTime()}.pdf`;
    pdf.save(fileName);
    
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw new Error('PDF oluşturulurken bir hata oluştu');
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount) + ' TL';
};

export const formatDate = (date: Date = new Date()): string => {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}; 