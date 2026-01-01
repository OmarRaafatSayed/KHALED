'use client'

import { useState } from 'react'
import { FAQCategory } from '@/types/marketplace'
import HelpHeader from '@/components/help/HelpHeader'
import FAQCategories from '@/components/help/FAQCategories'
import FAQAccordion from '@/components/help/FAQAccordion'
import ContactSupport from '@/components/help/ContactSupport'

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Mock FAQ data
  const faqCategories: FAQCategory[] = [
    {
      id: 'orders',
      name: 'Orders & Shipping',
      icon: '📦',
      faqs: [
        {
          id: '1',
          question: 'How can I track my order?',
          answer: 'You can track your order by logging into your account and visiting the "My Orders" section. You will find tracking information and status updates there.',
          category: 'orders'
        },
        {
          id: '2',
          question: 'What are the shipping costs?',
          answer: 'Shipping costs vary based on your location and order value. Orders over 500 EGP qualify for free shipping within Cairo and Giza.',
          category: 'orders'
        }
      ]
    },
    {
      id: 'payments',
      name: 'Payments',
      icon: '💳',
      faqs: [
        {
          id: '3',
          question: 'What payment methods do you accept?',
          answer: 'We accept credit cards, debit cards, and mobile wallets through Paymob and Stripe payment gateways.',
          category: 'payments'
        },
        {
          id: '4',
          question: 'Is my payment information secure?',
          answer: 'Yes, all payment information is encrypted and processed through secure payment gateways (Paymob/Stripe) that comply with international security standards.',
          category: 'payments'
        }
      ]
    },
    {
      id: 'returns',
      name: 'Returns & Refunds',
      icon: '↩️',
      faqs: [
        {
          id: '5',
          question: 'What is your return policy?',
          answer: 'You can return items within 14 days of delivery. Items must be in original condition with tags attached.',
          category: 'returns'
        },
        {
          id: '6',
          question: 'How long do refunds take?',
          answer: 'Refunds are processed within 3-5 business days after we receive your returned item.',
          category: 'returns'
        }
      ]
    },
    {
      id: 'hiring',
      name: 'Jobs & Hiring',
      icon: '💼',
      faqs: [
        {
          id: '7',
          question: 'How do I apply for a job?',
          answer: 'Browse our job listings, click on a position that interests you, and submit your application with your resume and cover letter.',
          category: 'hiring'
        },
        {
          id: '8',
          question: 'When will I hear back about my application?',
          answer: 'We typically respond to applications within 1-2 weeks. You will receive an email update about your application status.',
          category: 'hiring'
        }
      ]
    }
  ]

  const filteredFAQs = () => {
    let allFAQs = faqCategories.flatMap(category => category.faqs)
    
    if (selectedCategory) {
      allFAQs = allFAQs.filter(faq => faq.category === selectedCategory)
    }
    
    if (searchQuery) {
      allFAQs = allFAQs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return allFAQs
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HelpHeader 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <FAQCategories 
          categories={faqCategories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        
        <FAQAccordion faqs={filteredFAQs()} />
        
        <ContactSupport />
      </div>
    </div>
  )
}