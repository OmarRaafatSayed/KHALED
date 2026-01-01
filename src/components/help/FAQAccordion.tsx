'use client'

import { useState } from 'react'
import { FAQ } from '@/types/marketplace'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface FAQAccordionProps {
  faqs: FAQ[]
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  if (faqs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No FAQs found matching your search.</p>
      </div>
    )
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <button
              onClick={() => toggleItem(faq.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 pr-4">
                {faq.question}
              </h3>
              <ChevronDownIcon
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openItems.has(faq.id) ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {openItems.has(faq.id) && (
              <div className="px-6 pb-4">
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}