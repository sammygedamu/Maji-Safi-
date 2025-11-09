
import React from 'react';
import { BRAND_INFO } from '../constants';

interface HeaderProps {
    onStartOver: () => void;
}

const Header: React.FC<HeaderProps> = ({ onStartOver }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <img src={BRAND_INFO.logo} alt="Maji Safi Logo" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-[#2A8FBD]">
              Maji Safi Brand Studio
            </h1>
          </div>
          <button
            onClick={onStartOver}
            className="text-sm font-semibold text-[#666666] hover:text-[#2A8FBD] transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;