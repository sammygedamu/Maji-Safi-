
import React from 'react';
import { Template } from '../types';
import { TEMPLATES } from '../constants';
import TemplateCard from './TemplateCard';

interface TemplateStepProps {
  onTemplateSelected: (template: Template) => void;
}

const TemplateStep: React.FC<TemplateStepProps> = ({ onTemplateSelected }) => {
  return (
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-2">Choose a Template</h2>
      <p className="text-lg text-gray-600 mb-8">
        Select a professional template to apply Maji Safi's branding to your content.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEMPLATES.map((template) => (
          <TemplateCard
            key={template.key}
            template={template}
            onSelect={() => onTemplateSelected(template)}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateStep;
