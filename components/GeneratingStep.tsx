
import React from 'react';
import { BRAND_INFO } from '../constants';

const GeneratingStep = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16">
            <div className="relative w-24 h-32">
                <svg viewBox="0 0 100 125" className="absolute inset-0 w-full h-full">
                    <path
                        d="M50 0C25 25 25 50 50 125C75 50 75 25 50 0Z"
                        fill="none"
                        stroke={BRAND_INFO.colors.primaryBlue}
                        strokeWidth="2"
                    />
                </svg>
                <div className="absolute bottom-0 left-0 right-0 h-full w-full overflow-hidden" style={{ clipPath: 'path("M50 0C25 25 25 50 50 125C75 50 75 25 50 0Z")' }}>
                    <div className="absolute bottom-0 left-0 w-full bg-[#2A8FBD] animate-fill-up"></div>
                </div>
                <style>
                    {`
                    @keyframes fill-up {
                        0% { height: 0%; }
                        100% { height: 100%; }
                    }
                    .animate-fill-up {
                        animation: fill-up 3s ease-in-out infinite alternate;
                    }
                    `}
                </style>
            </div>
            <h2 className="text-2xl font-bold mt-8 text-[#333333]">Generating Your Document...</h2>
            <p className="text-gray-600 mt-2">Analyzing content, applying brand voice, and creating your file.</p>
        </div>
    );
};

export default GeneratingStep;