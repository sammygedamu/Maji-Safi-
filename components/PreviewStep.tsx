
import React, { lazy, Suspense } from 'react';
import { Template, GeneratedData, TemplateKey } from '../types';
import { createInvoicePdf, createProductBrochurePdf } from '../services/pdfService';
import { BRAND_INFO } from '../constants';

interface PreviewStepProps {
  template: Template;
  data: GeneratedData;
}

const ProfessionalEmailPreview = lazy(() => import('../templates/ProfessionalEmail'));
const InvoicePreview = lazy(() => import('../templates/Invoice'));
const ProductBrochurePreview = lazy(() => import('../templates/ProductBrochure'));
const SocialMediaPackPreview = lazy(() => import('../templates/SocialMediaPack'));
// Import other previews similarly

const PreviewStep: React.FC<PreviewStepProps> = ({ template, data }) => {

  const handleDownloadPdf = () => {
    if (template.key === TemplateKey.PROFESSIONAL_INVOICE) {
      createInvoicePdf(data as any);
    } else if (template.key === TemplateKey.PRODUCT_BROCHURE) {
      createProductBrochurePdf(data as any);
    } else {
      alert(`PDF generation for "${template.name}" is not implemented yet, but you can see the preview.`);
    }
  };
  
  const handleOpenGoogleDocs = () => {
    alert("This feature would use the Google Docs API to create a new document in your Google Drive.");
  }
  
  const handleEmailDocument = () => {
    const subject = `Maji Safi ${template.name} - ${new Date().toLocaleDateString()}`;
    const body = `Please find the attached document: ${template.name}.`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const renderPreview = () => {
    switch (template.key) {
      case TemplateKey.PROFESSIONAL_INVOICE:
        return <InvoicePreview data={data as any} />;
      case TemplateKey.PROFESSIONAL_EMAIL:
        return <ProfessionalEmailPreview data={data as any} />;
      case TemplateKey.PRODUCT_BROCHURE:
        return <ProductBrochurePreview data={data as any} />;
      case TemplateKey.SOCIAL_MEDIA_PACK:
        return <SocialMediaPackPreview data={data as any} />;
      // Add cases for other templates
      default:
        return <div className="text-center p-8 bg-gray-100 rounded-lg">Preview for "{template.name}" is not available yet.</div>;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        <h2 className="text-3xl font-bold mb-4">Preview & Download</h2>
        <div className="bg-white p-2 rounded-lg shadow-lg overflow-auto" style={{ maxHeight: '80vh' }}>
            <Suspense fallback={<div className="text-center p-10">Loading Preview...</div>}>
              {renderPreview()}
            </Suspense>
        </div>
      </div>
      <div className="lg:w-1/3">
        <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
          <h3 className="text-xl font-bold mb-4">Export Options</h3>
          <div className="space-y-4">
            <button
              onClick={handleDownloadPdf}
              className="w-full flex items-center justify-center bg-[#2A8FBD] text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-opacity-90 transition-transform transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download as PDF
            </button>
            <button
             onClick={handleOpenGoogleDocs}
              className="w-full flex items-center justify-center bg-gray-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-gray-600 transition-transform transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Open in Google Docs
            </button>
            <button
              onClick={handleEmailDocument}
              className="w-full flex items-center justify-center bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Email Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewStep;
