"use client";

import { useState } from 'react';
import { FiDownload, FiLoader } from 'react-icons/fi';
import { generatePDF, CalculationResult, formatDate } from '@/utils/pdfGenerator';

interface PDFDownloadButtonProps {
  title: string;
  category: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
  elementId?: string;
  className?: string;
  disabled?: boolean;
}

export default function PDFDownloadButton({
  title,
  category,
  inputs,
  results,
  elementId,
  className = "",
  disabled = false
}: PDFDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (disabled || isGenerating) return;

    try {
      setIsGenerating(true);

      const calculationResult: CalculationResult = {
        title,
        category,
        inputs,
        results,
        date: formatDate()
      };

      await generatePDF(calculationResult, elementId);
    } catch (error) {
      console.error('PDF download failed:', error);
      alert('PDF indirme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={disabled || isGenerating}
      className={`
        inline-flex items-center justify-center px-6 py-3 
        bg-gradient-to-r from-slate-700 to-slate-800 
        text-white rounded-xl font-semibold 
        hover:shadow-lg transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {isGenerating ? (
        <>
          <FiLoader className="mr-2 h-5 w-5 animate-spin" />
          PDF Hazırlanıyor...
        </>
      ) : (
        <>
          <FiDownload className="mr-2 h-5 w-5" />
          PDF İndir
        </>
      )}
    </button>
  );
} 