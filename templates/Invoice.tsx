
import React from 'react';
import { InvoiceData } from '../types';
import { BRAND_INFO } from '../constants';

interface InvoicePreviewProps {
  data: InvoiceData;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ data }) => {
  return (
    <div className="bg-white text-[#333333] font-['Open_Sans'] text-[12px] p-8" style={{ fontFamily: BRAND_INFO.typography.body }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header style={{ backgroundColor: BRAND_INFO.colors.primaryBlue, color: 'white' }} className="p-6 flex justify-between items-center">
          <img src={BRAND_INFO.logo} alt="Maji Safi Logo" className="h-16" />
          <div className="text-right">
            <h1 style={{ fontFamily: BRAND_INFO.typography.headings }} className="text-3xl font-bold">INVOICE</h1>
            <p>Invoice #: {data.invoiceNumber}</p>
          </div>
        </header>

        {/* Bill To Info */}
        <section className="grid grid-cols-2 gap-8 my-8 px-6">
          <div>
            <h2 style={{ fontFamily: BRAND_INFO.typography.headings }} className="font-bold text-sm mb-2 text-gray-500">FROM</h2>
            <p className="font-bold">{BRAND_INFO.name}</p>
            <p>{BRAND_INFO.contact.email}</p>
            <p>{BRAND_INFO.contact.website}</p>
          </div>
          <div className="text-right">
            <h2 style={{ fontFamily: BRAND_INFO.typography.headings }} className="font-bold text-sm mb-2 text-gray-500">BILL TO</h2>
            <p className="font-bold">{data.clientName}</p>
            <p>{data.clientAddress}</p>
          </div>
        </section>

        {/* Invoice Details */}
        <section className="grid grid-cols-2 gap-8 my-8 px-6">
            <div>
                <p className="text-gray-500">Date:</p>
                <p className="font-bold">{data.date}</p>
            </div>
            <div className="text-right">
                <p className="text-gray-500">Due Date:</p>
                <p className="font-bold">{data.dueDate}</p>
            </div>
        </section>

        {/* Line Items Table */}
        <section className="px-6 my-8">
          <table className="w-full text-left">
            <thead>
              <tr style={{ backgroundColor: BRAND_INFO.colors.primaryBlue, color: 'white' }}>
                <th className="p-3 font-bold">Description</th>
                <th className="p-3 font-bold text-center">Qty</th>
                <th className="p-3 font-bold text-right">Rate</th>
                <th className="p-3 font-bold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.lineItems.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{item.description}</td>
                  <td className="p-3 text-center">{item.quantity}</td>
                  <td className="p-3 text-right">${item.rate.toFixed(2)}</td>
                  <td className="p-3 text-right">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Totals */}
        <section className="flex justify-end my-8 px-6">
          <div className="w-1/2">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span>${data.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Tax (8%):</span>
              <span>${data.tax.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg" style={{ color: BRAND_INFO.colors.primaryBlue }}>
              <span>TOTAL:</span>
              <span>${data.total.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* Payment Terms */}
        <section className="my-8 px-6">
          <div style={{ backgroundColor: BRAND_INFO.colors.lightBlue + '40' }} className="p-4 rounded-md">
            <h3 style={{ fontFamily: BRAND_INFO.typography.headings }} className="font-bold mb-2">Payment Terms</h3>
            <p className="text-sm">{data.paymentTerms}</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-500 mt-12 px-6">
          <p className="font-bold mb-2">Thank you for your business!</p>
          <p>{BRAND_INFO.mission}</p>
        </footer>
      </div>
    </div>
  );
};

export default InvoicePreview;
