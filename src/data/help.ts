import type { HelpCategory, HelpQuestion } from '../types';

export const helpCategories: HelpCategory[] = [
  { id: 'partner-onboarding', name: 'Partner Onboarding' },
  { id: 'legal', name: 'Legal' },
  { id: 'faqs', name: 'FAQs' },
  { id: 'instant-onboarding', name: 'Instamart Onboarding' },
  { id: 'b2c-faq', name: 'IRCTC FAQ' },
];

export const helpQuestions: HelpQuestion[] = [
  { id: 'q1', categoryId: 'partner-onboarding', question: 'I want to partner my restaurant with Swiggy', answer: 'You can register your restaurant by filling out our partner onboarding form. Our team will reach out within 2-3 business days to complete verification and get you live.' },
  { id: 'q2', categoryId: 'partner-onboarding', question: 'What are the mandatory documents needed to list my restaurant on Swiggy?', answer: 'You will need a valid FSSAI license, GST registration (if applicable), a cancelled cheque or bank passbook copy, and your restaurant menu with prices.' },
  { id: 'q3', categoryId: 'partner-onboarding', question: 'I want to opt-out from Google reserve', answer: 'Send an email' },
  { id: 'q4', categoryId: 'partner-onboarding', question: 'After I submit all documents, how long will it take for my restaurant to go live on Swiggy?', answer: 'Typically it takes 3-5 business days after document verification for your restaurant to go live, provided all details are accurate and complete.' },
  { id: 'q5', categoryId: 'partner-onboarding', question: 'What is this one time Onboarding fees? Do I have to pay for it while registering?', answer: 'The one-time onboarding fee covers account setup and catalogue creation. It is deducted from your first settlement cycle, so there is no upfront payment required.' },
  { id: 'q6', categoryId: 'legal', question: 'Where can I find the Swiggy terms of use?', answer: 'Our terms of use, privacy policy and partner agreements are available in the Legal section of our website footer.' },
  { id: 'q7', categoryId: 'legal', question: 'How do I raise a legal or compliance concern?', answer: 'You can write to our legal team through the contact form linked in the Legal section, and we will respond within 5 business days.' },
  { id: 'q8', categoryId: 'faqs', question: 'How do I track my order?', answer: 'Open the order from your order history and tap Track Order to see live status and delivery partner location.' },
  { id: 'q9', categoryId: 'faqs', question: 'How do I cancel an order?', answer: 'You can cancel an order from the order details page before it is accepted by the restaurant. Cancellation charges may apply after that.' },
  { id: 'q10', categoryId: 'faqs', question: 'What payment methods are accepted?', answer: 'We accept UPI, credit/debit cards, net banking, wallets and cash on delivery in select areas.' },
  { id: 'q11', categoryId: 'instant-onboarding', question: 'How do I onboard for instant grocery delivery?', answer: 'Instant onboarding lets verified partners go live within 24 hours by submitting minimal documentation through the fast-track form.' },
  { id: 'q12', categoryId: 'instant-onboarding', question: 'What categories are supported for instant delivery?', answer: 'Groceries, fresh produce, dairy, and household essentials are currently supported for instant delivery onboarding.' },
  { id: 'q13', categoryId: 'b2c-faq', question: 'How do I link my rail ticket bookings?', answer: 'Enter your PNR number on the order page to link food delivery directly to your train seat and journey.' },
  { id: 'q14', categoryId: 'b2c-faq', question: 'Can I order food for a train that is delayed?', answer: 'Yes, delivery times automatically adjust based on live train running status.' },
];
