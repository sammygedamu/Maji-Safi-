import React from 'react';

export enum AppStep {
  UPLOAD,
  CHOOSE_TEMPLATE,
  GENERATING,
  PREVIEW,
}

export enum TemplateKey {
  PROFESSIONAL_EMAIL = 'PROFESSIONAL_EMAIL',
  SALES_PROPOSAL = 'SALES_PROPOSAL',
  PROFESSIONAL_INVOICE = 'PROFESSIONAL_INVOICE',
  CASE_STUDY = 'CASE_STUDY',
  PRODUCT_BROCHURE = 'PRODUCT_BROCHURE',
  NEWSLETTER = 'NEWSLETTER',
  ONE_PAGER = 'ONE_PAGER',
  SOCIAL_MEDIA_PACK = 'SOCIAL_MEDIA_PACK',
}

export interface Template {
  key: TemplateKey;
  name: string;
  description: string;
  // FIX: Use React.ReactElement instead of JSX.Element in a .ts file to resolve the "Cannot find namespace 'JSX'" error.
  icon: (props: React.ComponentProps<'svg'>) => React.ReactElement;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  clientName: string;
  clientAddress: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentTerms: string;
}

export interface EmailData {
  recipientName: string;
  subject: string;
  emailBody: string;
  callToAction: string;
}

export interface SalesProposalData {
  clientName: string;
  projectName: string;
  executiveSummary: string;
  proposedSolution: string;
  timeline: string;
  pricing: { item: string; price: number; }[];
  totalPrice: number;
}

export interface CaseStudyData {
  title: string;
  clientName: string;
  challenge: string;
  solution: string;
  results: string;
  quote?: {
    text: string;
    author: string;
    title: string;
  };
}

export interface ProductBrochureData {
  productName: string;
  tagline: string;
  introduction: string;
  features: { name: string; description: string; }[];
  benefits: string[];
  callToAction: string;
}

export interface NewsletterData {
  title: string;
  issueDate: string;
  introduction: string;
  articles: { headline: string; body: string; }[];
  communitySpotlight?: {
    title: string;
    text: string;
  };
  callToAction: string;
}

export interface OnePagerData {
  headline: string;
  subheadline: string;
  problemStatement: string;
  ourSolution: string;
  keyBenefits: string[];
  callToAction: string;
}

export interface SocialMediaPackData {
  campaignTitle: string;
  posts: {
    platform: string;
    caption: string;
    imageSuggestion: string;
  }[];
}


export type GeneratedData = 
  | InvoiceData 
  | EmailData 
  | SalesProposalData
  | CaseStudyData
  | ProductBrochureData
  | NewsletterData
  | OnePagerData
  | SocialMediaPackData
  | Record<string, any>;