
import React from 'react';
import { EmailData } from '../types';
import { BRAND_INFO } from '../constants';

interface ProfessionalEmailPreviewProps {
  data: EmailData;
}

const ProfessionalEmailPreview: React.FC<ProfessionalEmailPreviewProps> = ({ data }) => {
  const today = new Date().toLocaleDateString();
  return (
    <div className="bg-white text-[#333333] font-['Open_Sans'] text-[14px] leading-6 p-8 border border-gray-200" style={{ fontFamily: BRAND_INFO.typography.body }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div style={{ backgroundColor: BRAND_INFO.colors.primaryBlue }} className="p-4 flex justify-between items-center text-white">
          <img src={BRAND_INFO.logo} alt="Maji Safi Logo" className="h-12" />
          <span className="text-sm">Date: {today}</span>
        </div>

        {/* Body */}
        <div className="p-8 border-l border-r border-gray-200">
          <h2 style={{ fontFamily: BRAND_INFO.typography.headings, color: BRAND_INFO.colors.textDark }} className="font-bold text-xl mb-4">{data.subject}</h2>
          <p className="mb-4">Dear {data.recipientName},</p>
          
          {data.emailBody.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}

          {data.callToAction && (
            <div className="my-6">
              <a href="#" style={{ backgroundColor: BRAND_INFO.colors.primaryBlue }} className="text-white font-bold py-3 px-6 rounded-md inline-block no-underline">
                {data.callToAction}
              </a>
            </div>
          )}

          <p>Best regards,</p>
          <p className="font-bold">The Maji Safi Team</p>
        </div>

        {/* Footer */}
        <div style={{ backgroundColor: BRAND_INFO.colors.lightBlue + '40' }} className="p-4 text-xs text-center text-[#666666]">
          <p className="font-bold">Mission:</p>
          <p>{BRAND_INFO.mission}</p>
          <p className="mt-2">
            {BRAND_INFO.contact.email} | {BRAND_INFO.contact.website}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalEmailPreview;
