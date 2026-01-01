'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CompanyRegistrationForm {
  companyName: string;
  companyType: string;
  industry: string;
  establishedYear: string;
  employeeCount: string;
  website: string;
  description: string;
  logo: File | null;
  
  // Contact Information
  contactPersonName: string;
  contactPersonTitle: string;
  email: string;
  phone: string;
  
  // Address
  country: string;
  city: string;
  address: string;
  postalCode: string;
  
  // Legal Information
  commercialRegister: string;
  taxNumber: string;
  
  // Agreement
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
}

export default function CompanyRegister() {
  const [formData, setFormData] = useState<CompanyRegistrationForm>({
    companyName: '',
    companyType: '',
    industry: '',
    establishedYear: '',
    employeeCount: '',
    website: '',
    description: '',
    logo: null,
    contactPersonName: '',
    contactPersonTitle: '',
    email: '',
    phone: '',
    country: 'السعودية',
    city: '',
    address: '',
    postalCode: '',
    commercialRegister: '',
    taxNumber: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof CompanyRegistrationForm, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('تم تسجيل الشركة بنجاح! سيتم مراجعة طلبكم والرد عليكم خلال 24-48 ساعة.');
    } catch (error) {
      alert('حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">تسجيل شركة جديدة</h1>
            <p className="text-gray-600">انضم إلى منصتنا وابدأ في نشر الوظائف للعثور على أفضل المواهب</p>
          </div>
          
          {/* Progress Steps */}
          <div className="mt-8">
            <div className="flex items-center justify-center">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <div className="flex space-x-8 text-sm text-gray-600">
                <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : ''}>معلومات الشركة</span>
                <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : ''}>معلومات التواصل</span>
                <span className={currentStep >= 3 ? 'text-blue-600 font-medium' : ''}>المراجعة والتأكيد</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
          {/* Step 1: Company Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">معلومات الشركة</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم الشركة *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="أدخل اسم الشركة"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع الشركة *
                  </label>
                  <select
                    required
                    value={formData.companyType}
                    onChange={(e) => handleInputChange('companyType', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">اختر نوع الشركة</option>
                    <option value="شركة مساهمة">شركة مساهمة</option>
                    <option value="شركة ذات مسؤولية محدودة">شركة ذات مسؤولية محدودة</option>
                    <option value="مؤسسة فردية">مؤسسة فردية</option>
                    <option value="شراكة">شراكة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المجال *
                  </label>
                  <select
                    required
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">اختر المجال</option>
                    <option value="تقنية المعلومات">تقنية المعلومات</option>
                    <option value="التجارة الإلكترونية">التجارة الإلكترونية</option>
                    <option value="التسويق والإعلان">التسويق والإعلان</option>
                    <option value="المالية والمصرفية">المالية والمصرفية</option>
                    <option value="الصحة والطب">الصحة والطب</option>
                    <option value="التعليم">التعليم</option>
                    <option value="الهندسة والبناء">الهندسة والبناء</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    سنة التأسيس
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max="2024"
                    value={formData.establishedYear}
                    onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="2020"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عدد الموظفين
                  </label>
                  <select
                    value={formData.employeeCount}
                    onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">اختر عدد الموظفين</option>
                    <option value="1-10">1-10 موظفين</option>
                    <option value="11-50">11-50 موظف</option>
                    <option value="51-200">51-200 موظف</option>
                    <option value="201-500">201-500 موظف</option>
                    <option value="500+">أكثر من 500 موظف</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الموقع الإلكتروني
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وصف الشركة *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="اكتب وصفاً مختصراً عن الشركة وأنشطتها..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  شعار الشركة
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">الحد الأقصى: 2MB، PNG/JPG</p>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">معلومات التواصل</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم الشخص المسؤول *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPersonName}
                    onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="أدخل اسم الشخص المسؤول"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المنصب
                  </label>
                  <input
                    type="text"
                    value={formData.contactPersonTitle}
                    onChange={(e) => handleInputChange('contactPersonTitle', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="مدير الموارد البشرية"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="hr@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+966501234567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المدينة *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="الرياض"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الرمز البريدي
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="12345"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  العنوان *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل العنوان التفصيلي للشركة"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    السجل التجاري *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.commercialRegister}
                    onChange={(e) => handleInputChange('commercialRegister', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="CR-1234567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الرقم الضريبي
                  </label>
                  <input
                    type="text"
                    value={formData.taxNumber}
                    onChange={(e) => handleInputChange('taxNumber', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123456789012345"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirmation */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">مراجعة البيانات والتأكيد</h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">معلومات الشركة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>اسم الشركة:</strong> {formData.companyName}</div>
                  <div><strong>نوع الشركة:</strong> {formData.companyType}</div>
                  <div><strong>المجال:</strong> {formData.industry}</div>
                  <div><strong>سنة التأسيس:</strong> {formData.establishedYear}</div>
                  <div><strong>عدد الموظفين:</strong> {formData.employeeCount}</div>
                  <div><strong>الموقع الإلكتروني:</strong> {formData.website}</div>
                </div>
                <div className="mt-4">
                  <strong>وصف الشركة:</strong>
                  <p className="text-gray-700 mt-1">{formData.description}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">معلومات التواصل</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>الشخص المسؤول:</strong> {formData.contactPersonName}</div>
                  <div><strong>المنصب:</strong> {formData.contactPersonTitle}</div>
                  <div><strong>البريد الإلكتروني:</strong> {formData.email}</div>
                  <div><strong>رقم الهاتف:</strong> {formData.phone}</div>
                  <div><strong>المدينة:</strong> {formData.city}</div>
                  <div><strong>السجل التجاري:</strong> {formData.commercialRegister}</div>
                </div>
                <div className="mt-4">
                  <strong>العنوان:</strong>
                  <p className="text-gray-700 mt-1">{formData.address}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="mr-3 text-sm text-gray-700">
                    أوافق على <Link href="/terms" className="text-blue-600 hover:text-blue-800">الشروط والأحكام</Link> الخاصة بالمنصة
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={formData.agreeToPrivacy}
                    onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="privacy" className="mr-3 text-sm text-gray-700">
                    أوافق على <Link href="/privacy" className="text-blue-600 hover:text-blue-800">سياسة الخصوصية</Link>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  السابق
                </button>
              )}
            </div>

            <div>
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  التالي
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!formData.agreeToTerms || !formData.agreeToPrivacy || isSubmitting}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'جاري التسجيل...' : 'تسجيل الشركة'}
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            لديك حساب بالفعل؟ 
            <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium mr-2">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}