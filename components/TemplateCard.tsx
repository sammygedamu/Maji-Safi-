
import React from 'react';
import { Template } from '../types';

interface TemplateCardProps {
  template: Template;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  const Icon = template.icon;
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col text-left">
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-4">
          <div className="bg-[#add8e6]/50 p-3 rounded-full mr-4">
            <Icon className="w-6 h-6 text-[#2A8FBD]" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">{template.name}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">{template.description}</p>
      </div>
      <div className="p-4 bg-gray-50 rounded-b-lg mt-auto">
        <button
          onClick={onSelect}
          className="w-full bg-[#2A8FBD] text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all transform hover:scale-105"
        >
          Use This Template
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
