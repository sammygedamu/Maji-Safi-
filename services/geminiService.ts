import { GoogleGenAI, Type } from "@google/genai";
import { Template, TemplateKey, GeneratedData } from '../types';
import { BRAND_INFO } from '../constants';

// FIX: Adhere to Gemini API guideline for API key initialization.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getResponseSchema = (templateKey: TemplateKey) => {
  switch (templateKey) {
    case TemplateKey.PROFESSIONAL_INVOICE:
      return {
        type: Type.OBJECT,
        properties: {
          clientName: { type: Type.STRING },
          clientAddress: { type: Type.STRING },
          invoiceNumber: { type: Type.STRING },
          date: { type: Type.STRING },
          dueDate: { type: Type.STRING },
          lineItems: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                description: { type: Type.STRING },
                quantity: { type: Type.NUMBER },
                rate: { type: Type.NUMBER },
                amount: { type: Type.NUMBER },
              },
              required: ['description', 'quantity', 'rate', 'amount'],
            },
          },
          subtotal: { type: Type.NUMBER },
          tax: { type: Type.NUMBER },
          total: { type: Type.NUMBER },
          paymentTerms: { type: Type.STRING },
        },
        required: ['clientName', 'invoiceNumber', 'date', 'lineItems', 'total'],
      };
    case TemplateKey.PROFESSIONAL_EMAIL:
      return {
        type: Type.OBJECT,
        properties: {
          recipientName: { type: Type.STRING },
          subject: { type: Type.STRING },
          emailBody: { type: Type.STRING },
          callToAction: { type: Type.STRING },
        },
        required: ['recipientName', 'subject', 'emailBody'],
      };
    case TemplateKey.SALES_PROPOSAL:
      return {
        type: Type.OBJECT,
        properties: {
          clientName: { type: Type.STRING },
          projectName: { type: Type.STRING },
          executiveSummary: { type: Type.STRING },
          proposedSolution: { type: Type.STRING },
          timeline: { type: Type.STRING },
          pricing: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                item: { type: Type.STRING },
                price: { type: Type.NUMBER },
              },
            }
          },
          totalPrice: { type: Type.NUMBER },
        },
        required: ['clientName', 'projectName', 'executiveSummary', 'proposedSolution', 'pricing', 'totalPrice'],
      };
    case TemplateKey.CASE_STUDY:
      return {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          clientName: { type: Type.STRING, description: "The community or organization featured." },
          challenge: { type: Type.STRING, description: "The problem they faced with water access." },
          solution: { type: Type.STRING, description: "How Maji Safi's system solved the problem." },
          results: { type: Type.STRING, description: "The measurable impact and key outcomes." },
          quote: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              author: { type: Type.STRING },
              title: { type: Type.STRING },
            }
          },
        },
        required: ['title', 'clientName', 'challenge', 'solution', 'results'],
      };
    case TemplateKey.PRODUCT_BROCHURE:
      return {
        type: Type.OBJECT,
        properties: {
          productName: { type: Type.STRING },
          tagline: { type: Type.STRING },
          introduction: { type: Type.STRING },
          features: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
              },
              required: ['name', 'description'],
            },
          },
          benefits: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          callToAction: { type: Type.STRING },
        },
        required: ['productName', 'tagline', 'introduction', 'features', 'benefits', 'callToAction'],
      };
    case TemplateKey.NEWSLETTER:
      return {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          issueDate: { type: Type.STRING },
          introduction: { type: Type.STRING },
          articles: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                headline: { type: Type.STRING },
                body: { type: Type.STRING },
              },
              required: ['headline', 'body'],
            },
          },
          communitySpotlight: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              text: { type: Type.STRING },
            }
          },
          callToAction: { type: Type.STRING },
        },
        required: ['title', 'issueDate', 'introduction', 'articles'],
      };
    case TemplateKey.ONE_PAGER:
      return {
        type: Type.OBJECT,
        properties: {
          headline: { type: Type.STRING },
          subheadline: { type: Type.STRING },
          problemStatement: { type: Type.STRING },
          ourSolution: { type: Type.STRING },
          keyBenefits: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          callToAction: { type: Type.STRING },
        },
        required: ['headline', 'problemStatement', 'ourSolution', 'keyBenefits', 'callToAction'],
      };
    case TemplateKey.SOCIAL_MEDIA_PACK:
      return {
        type: Type.OBJECT,
        properties: {
          campaignTitle: { type: Type.STRING },
          posts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                platform: { type: Type.STRING, description: "e.g., 'Twitter', 'LinkedIn', 'Instagram'" },
                caption: { type: Type.STRING },
                imageSuggestion: { type: Type.STRING, description: "A brief description of a suggested image for the post." },
              },
              required: ['platform', 'caption', 'imageSuggestion'],
            },
          },
        },
        required: ['campaignTitle', 'posts'],
      };
    default:
      throw new Error(`Response schema for template ${templateKey} is not defined.`);
  }
};

// FIX: Per Gemini API guidelines, persona and instructions should be provided via systemInstruction.
const getSystemInstruction = (): string => {
  return `
    You are an expert brand strategist for "Maji Safi", a company focused on decentralized water purification systems.
    Your task is to analyze the user-provided text below, structure it into a JSON object according to the provided schema, and rewrite the textual content to perfectly match Maji Safi's brand voice.

    **Maji Safi Brand Identity:**
    - **Tone of Voice:** Clean, community-centered, transparent, innovative, and hopeful. Write clearly, with a focus on reliability, sustainability, and positive social impact. Be professional but warm.
    - **Core Values to Integrate:** Transparency, Joy, Ownership, Innovation, Community.
    - **Example of rewriting:**
      - *Original:* "The total is $500. Pay in 30 days."
      - *Maji Safi Tone:* "We're excited to partner with you on this project. The total investment is $500, with payment due within 30 days. Your support helps us bring clean water to more communities."

    **Instructions:**
    1.  **Extract Data:** Carefully read the user content and extract all relevant information that fits the fields in the response schema. If a value is not present, infer it logically or use a sensible placeholder (e.g., today's date).
    2.  **Transform Tone:** Rewrite all relevant text fields (like email bodies, descriptions, payment terms) to align with the Maji Safi brand voice described above. Naturally weave in concepts from the core values where appropriate.
    3.  **Format Output:** Return a single, valid JSON object that strictly adheres to the provided schema. Do not include any extra text or explanations outside of the JSON object.
    `;
};


export const generateBrandedContent = async (content: string, template: Template): Promise<GeneratedData> => {
    try {
        const schema = getResponseSchema(template.key);
        const systemInstruction = getSystemInstruction();

        // FIX: Per Gemini API guidelines, user content should be passed to `contents` and instructions to `systemInstruction`.
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: content,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: schema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);
        
        return parsedData;

    } catch (error) {
        console.error("Error generating content with Gemini:", error);
        throw new Error("Failed to process content with AI. The model may have returned an unexpected format.");
    }
};