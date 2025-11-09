import React from 'react';
import { ProductBrochureData } from '../types';
import { BRAND_INFO } from '../constants';
import { CheckCircleIcon } from '../components/Icons';

const ProductBrochurePreview: React.FC<{ data: ProductBrochureData }> = ({ data }) => {
  return (
    <div className="bg-white text-[#333333] font-['Open_Sans']" style={{ fontFamily: BRAND_INFO.typography.body }}>
      <div className="max-w-4xl mx-auto border border-gray-200">
        {/* Header Section */}
        <header style={{ backgroundColor: BRAND_INFO.colors.primaryBlue }} className="text-white p-12 text-center">
          <img src={BRAND_INFO.logo} alt="Maji Safi Logo" className="h-20 mx-auto mb-4" />
          <h1 style={{ fontFamily: BRAND_INFO.typography.headings }} className="text-4xl font-bold mb-2">{data.productName}</h1>
          <p className="text-xl opacity-90">{data.tagline}</p>
        </header>

        {/* Main Content */}
        <main className="p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-10">
            <p className="text-lg leading-relaxed text-gray-700">{data.introduction}</p>
          </section>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Features Section */}
            <section>
              <h2 style={{ fontFamily: BRAND_INFO.typography.headings, color: BRAND_INFO.colors.primaryBlue }} className="text-2xl font-bold mb-4 border-b-2 border-blue-200 pb-2">Key Features</h2>
              <ul className="space-y-4">
                {data.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-800">{feature.name}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Benefits Section */}
            <section>
              <h2 style={{ fontFamily: BRAND_INFO.typography.headings, color: BRAND_INFO.colors.primaryBlue }} className="text-2xl font-bold mb-4 border-b-2 border-blue-200 pb-2">Benefits</h2>
               <ul className="space-y-3">
                {data.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                     <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                     <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          
           {/* Call to Action */}
          <section className="text-center mt-12">
             <a href="#" style={{ backgroundColor: BRAND_INFO.colors.primaryBlue }} className="text-white font-bold py-4 px-10 rounded-lg inline-block no-underline text-lg transition-transform transform hover:scale-105">
                {data.callToAction}
              </a>
          </section>

        </main>
        
        {/* Footer */}
        <footer style={{ backgroundColor: BRAND_INFO.colors.lightBlue + '40' }} className="p-6 text-center text-xs text-[#666666] mt-8">
            <p className="font-bold">{BRAND_INFO.name} | {BRAND_INFO.vision}</p>
            <p className="mt-2">{BRAND_INFO.contact.email} | {BRAND_INFO.contact.website}</p>
        </footer>
      </div>
    </div>
  );
};

export default ProductBrochurePreview;
