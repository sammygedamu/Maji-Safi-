
import React from 'react';
import { AppStep } from '../types';

interface ProgressBarProps {
  currentStep: AppStep;
}

const steps = [
  { id: AppStep.UPLOAD, name: 'Upload' },
  { id: AppStep.CHOOSE_TEMPLATE, name: 'Choose Template' },
  { id: AppStep.GENERATING, name: 'Generate' },
  { id: AppStep.PREVIEW, name: 'Download' },
];

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep || (currentStep === AppStep.GENERATING && step.id === AppStep.GENERATING));
  
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="md:flex-1">
            {stepIdx <= currentStepIndex ? (
              <div className="group flex flex-col border-l-4 border-[#2A8FBD] py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0">
                <span className="text-sm font-semibold text-[#2A8FBD]">{`Step ${stepIdx + 1}`}</span>
                <span className="text-sm font-semibold">{step.name}</span>
              </div>
            ) : (
              <div className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0">
                <span className="text-sm font-medium text-gray-500">{`Step ${stepIdx + 1}`}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default ProgressBar;
