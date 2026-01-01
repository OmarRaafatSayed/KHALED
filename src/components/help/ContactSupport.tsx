'use client'

import { useState } from 'react'
import { ChatBubbleLeftRightIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function ContactSupport() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock form submission
    alert('Your message has been sent! We will get back to you soon.')
    setShowContactForm(false)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Still need help?
      </h2>
      <p className="text-gray-600 mb-8">
        Can't find what you're looking for? Our support team is here to help.
      </p>

      {!showContactForm ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowContactForm(true)}
            className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <EnvelopeIcon className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">Send Message</h3>
            <p className="text-sm text-gray-600">Get help via email</p>
          </button>

          <button className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-green-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">Live Chat</h3>
            <p className="text-sm text-gray-600">Chat with support</p>
          </button>

          <button className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
            <PhoneIcon className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
            <p className="text-sm text-gray-600">+20 123 456 789</p>
          </button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a subject</option>
                <option value="order">Order Issue</option>
                <option value="payment">Payment Problem</option>
                <option value="return">Return/Refund</option>
                <option value="job">Job Application</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Please describe your issue in detail..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowContactForm(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}