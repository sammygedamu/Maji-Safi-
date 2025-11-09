
import React, { useState, useCallback } from 'react';
import { AppStep, Template, GeneratedData } from './types';
import { BRAND_INFO } from './constants';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import UploadStep from './components/UploadStep';
import TemplateStep from './components/TemplateStep';
import GeneratingStep from './components/GeneratingStep';
import PreviewStep from './components/PreviewStep';
import { generateBrandedContent } from './services/geminiService';

export default function App() {
  const [step, setStep] = useState<AppStep>(AppStep.UPLOAD);
  const [userContent, setUserContent] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleContentUploaded = (content: string) => {
    setUserContent(content);
    setStep(AppStep.CHOOSE_TEMPLATE);
    setError(null);
  };

  const handleTemplateSelected = (template: Template) => {
    setSelectedTemplate(template);
    setStep(AppStep.GENERATING);
    handleGenerate(template);
  };

  const handleGenerate = useCallback(async (template: Template) => {
    if (!userContent || !template) return;
    setError(null);
    try {
      const data = await generateBrandedContent(userContent, template);
      setGeneratedData(data);
      setStep(AppStep.PREVIEW);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Generation failed. Please check your content or try again. Details: ${errorMessage}`);
      setStep(AppStep.CHOOSE_TEMPLATE); // Go back to template selection on failure
    }
  }, [userContent]);

  const handleStartOver = () => {
    setStep(AppStep.UPLOAD);
    setUserContent('');
    setSelectedTemplate(null);
    setGeneratedData(null);
    setError(null);
  };
  
  const handleBack = () => {
    if (step === AppStep.CHOOSE_TEMPLATE) {
      setStep(AppStep.UPLOAD);
    } else if(step === AppStep.PREVIEW){
      setStep(AppStep.CHOOSE_TEMPLATE);
    }
  }

  const renderStep = () => {
    switch (step) {
      case AppStep.UPLOAD:
        return <UploadStep onContentUploaded={handleContentUploaded} />;
      case AppStep.CHOOSE_TEMPLATE:
        return <TemplateStep onTemplateSelected={handleTemplateSelected} />;
      case AppStep.GENERATING:
        return <GeneratingStep />;
      case AppStep.PREVIEW:
        if (!selectedTemplate || !generatedData) {
            handleStartOver();
            return null;
        }
        return <PreviewStep template={selectedTemplate} data={generatedData} />;
      default:
        return <UploadStep onContentUploaded={handleContentUploaded} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#add8e6]/20 text-[#333333]">
      <Header onStartOver={handleStartOver} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressBar currentStep={step} />
        {error && (
            <div className="my-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        )}
         {(step === AppStep.CHOOSE_TEMPLATE || step === AppStep.PREVIEW) && (
            <button
                onClick={handleBack}
                className="mb-4 text-sm font-semibold text-[#2A8FBD] hover:text-[#333333] transition-colors"
            >
                &larr; Back
            </button>
        )}
        <div className="mt-6">{renderStep()}</div>
      </main>
    </div>
  );
}
