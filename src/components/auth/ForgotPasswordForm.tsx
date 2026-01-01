'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError('البريد الإلكتروني مطلوب')
      return
    }
    
    if (!validateEmail(email)) {
      setError('البريد الإلكتروني غير صحيح')
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      // محاكاة إرسال البريد الإلكتروني
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsEmailSent(true)
    } catch (error) {
      setError('حدث خطأ أثناء إرسال البريد الإلكتروني. حاول مرة أخرى')
    } finally {
      setIsLoading(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              تم إرسال البريد الإلكتروني
            </h2>
            <p className="text-gray-600 mb-6">
              تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  <strong>تحقق من بريدك الإلكتروني:</strong> {email}
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  إذا لم تجد الرسالة، تحقق من مجلد الرسائل غير المرغوب فيها
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => setIsEmailSent(false)}
                  variant="outline"
                  className="w-full"
                >
                  إرسال مرة أخرى
                </Button>
                
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    <ArrowRight className="h-4 w-4 ml-2" />
                    العودة لتسجيل الدخول
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <div className="bg-primary text-white w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl mx-auto mb-4">
              T
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            نسيت كلمة المرور؟
          </h2>
          <p className="text-gray-600">
            أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError('')
                  }}
                  placeholder="أدخل بريدك الإلكتروني"
                  className={`pl-10 ${error ? 'border-red-300' : ''}`}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3"
              size="lg"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>جاري الإرسال...</span>
                </div>
              ) : (
                'إرسال رابط إعادة التعيين'
              )}
            </Button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center text-sm text-primary hover:text-primary-dark"
            >
              <ArrowRight className="h-4 w-4 ml-1" />
              العودة لتسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}