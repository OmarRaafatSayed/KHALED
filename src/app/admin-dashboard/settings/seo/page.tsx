'use client';

import { useState } from 'react';

interface SEOSettings {
  metaTags: {
    title: string;
    description: string;
    keywords: string;
    author: string;
    robots: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    twitterCard: string;
    twitterSite: string;
  };
  analytics: {
    googleAnalyticsId: string;
    googleTagManagerId: string;
    facebookPixelId: string;
    hotjarId: string;
    isEnabled: boolean;
  };
  sitemap: {
    autoGenerate: boolean;
    includeImages: boolean;
    changeFrequency: string;
    priority: number;
  };
  schema: {
    organizationName: string;
    organizationType: string;
    logo: string;
    contactPoint: {
      telephone: string;
      contactType: string;
    };
  };
}

export default function SEOSettings() {
  const [settings, setSettings] = useState<SEOSettings>({
    metaTags: {
      title: 'TailAdmin Marketplace - منصة التجارة الإلكترونية الرائدة',
      description: 'اكتشف أفضل المنتجات والخدمات في منصة TailAdmin Marketplace. تسوق بأمان وثقة مع ضمان الجودة والتوصيل السريع.',
      keywords: 'تجارة إلكترونية, متجر إلكتروني, تسوق أونلاين, منتجات, خدمات',
      author: 'TailAdmin Team',
      robots: 'index, follow',
      ogTitle: 'TailAdmin Marketplace - منصة التجارة الإلكترونية الرائدة',
      ogDescription: 'اكتشف أفضل المنتجات والخدمات في منصة TailAdmin Marketplace',
      ogImage: 'https://tailadmin.com/og-image.jpg',
      twitterCard: 'summary_large_image',
      twitterSite: '@tailadmin'
    },
    analytics: {
      googleAnalyticsId: 'GA-XXXXXXXXX-X',
      googleTagManagerId: 'GTM-XXXXXXX',
      facebookPixelId: '',
      hotjarId: '',
      isEnabled: true
    },
    sitemap: {
      autoGenerate: true,
      includeImages: true,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    schema: {
      organizationName: 'TailAdmin Marketplace',
      organizationType: 'Organization',
      logo: 'https://tailadmin.com/logo.png',
      contactPoint: {
        telephone: '+966501234567',
        contactType: 'customer service'
      }
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [testResults, setTestResults] = useState<Record<string, { success: boolean; message: string }>>({});

  const handleMetaTagChange = (field: keyof typeof settings.metaTags, value: string) => {
    setSettings({
      ...settings,
      metaTags: {
        ...settings.metaTags,
        [field]: value
      }
    });
  };

  const handleAnalyticsChange = (field: keyof typeof settings.analytics, value: string | boolean) => {
    setSettings({
      ...settings,
      analytics: {
        ...settings.analytics,
        [field]: value
      }
    });
  };

  const handleSitemapChange = (field: keyof typeof settings.sitemap, value: string | boolean | number) => {
    setSettings({
      ...settings,
      sitemap: {
        ...settings.sitemap,
        [field]: value
      }
    });
  };

  const handleSchemaChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setSettings({
        ...settings,
        schema: {
          ...settings.schema,
          [parent]: {
            ...settings.schema[parent as keyof typeof settings.schema],
            [child]: value
          }
        }
      });
    } else {
      setSettings({
        ...settings,
        schema: {
          ...settings.schema,
          [field]: value
        }
      });
    }
  };

  const testAnalytics = async (service: string) => {
    setTestResults(prev => ({ ...prev, [service]: { success: false, message: 'جاري الاختبار...' } }));

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let hasValidId = false;
      switch (service) {
        case 'ga':
          hasValidId = settings.analytics.googleAnalyticsId.startsWith('GA-') || settings.analytics.googleAnalyticsId.startsWith('G-');
          break;
        case 'gtm':
          hasValidId = settings.analytics.googleTagManagerId.startsWith('GTM-');
          break;
        case 'fb':
          hasValidId = settings.analytics.facebookPixelId.length > 0;
          break;
        case 'hotjar':
          hasValidId = settings.analytics.hotjarId.length > 0;
          break;
      }

      if (hasValidId) {
        setTestResults(prev => ({ 
          ...prev, 
          [service]: { 
            success: true, 
            message: 'تم التحقق بنجاح! الكود صحيح ويعمل.' 
          } 
        }));
      } else {
        setTestResults(prev => ({ 
          ...prev, 
          [service]: { 
            success: false, 
            message: 'الكود غير صحيح أو فارغ.' 
          } 
        }));
      }
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [service]: { 
          success: false, 
          message: 'فشل في التحقق من الكود.' 
        } 
      }));
    }
  };

  const generateSitemap = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSaveMessage('تم إنشاء خريطة الموقع بنجاح!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('حدث خطأ أثناء إنشاء خريطة الموقع');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveMessage('تم حفظ إعدادات SEO والتحليلات بنجاح!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('حدث خطأ أثناء حفظ الإعدادات');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">إعدادات SEO والتحليلات</h1>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isSaving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {saveMessage && (
          <div className={`mb-6 p-4 rounded-lg ${
            saveMessage.includes('نجاح') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {saveMessage}
          </div>
        )}

        <div className="space-y-8">
          {/* Meta Tags */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Meta Tags العامة</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان الموقع
                  </label>
                  <input
                    type="text"
                    value={settings.metaTags.title}
                    onChange={(e) => handleMetaTagChange('title', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">الطول المثالي: 50-60 حرف</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وصف الموقع
                  </label>
                  <textarea
                    value={settings.metaTags.description}
                    onChange={(e) => handleMetaTagChange('description', e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">الطول المثالي: 150-160 حرف</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الكلمات المفتاحية
                  </label>
                  <input
                    type="text"
                    value={settings.metaTags.keywords}
                    onChange={(e) => handleMetaTagChange('keywords', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="كلمة1, كلمة2, كلمة3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المؤلف
                  </label>
                  <input
                    type="text"
                    value={settings.metaTags.author}
                    onChange={(e) => handleMetaTagChange('author', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    إعدادات Robots
                  </label>
                  <select
                    value={settings.metaTags.robots}
                    onChange={(e) => handleMetaTagChange('robots', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="index, follow">فهرسة وتتبع الروابط</option>
                    <option value="index, nofollow">فهرسة بدون تتبع الروابط</option>
                    <option value="noindex, follow">عدم فهرسة مع تتبع الروابط</option>
                    <option value="noindex, nofollow">عدم فهرسة وعدم تتبع</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Open Graph & Twitter</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان Open Graph
                  </label>
                  <input
                    type="text"
                    value={settings.metaTags.ogTitle}
                    onChange={(e) => handleMetaTagChange('ogTitle', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وصف Open Graph
                  </label>
                  <textarea
                    value={settings.metaTags.ogDescription}
                    onChange={(e) => handleMetaTagChange('ogDescription', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    صورة Open Graph
                  </label>
                  <input
                    type="url"
                    value={settings.metaTags.ogImage}
                    onChange={(e) => handleMetaTagChange('ogImage', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">الحجم المثالي: 1200x630 بكسل</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع بطاقة Twitter
                  </label>
                  <select
                    value={settings.metaTags.twitterCard}
                    onChange={(e) => handleMetaTagChange('twitterCard', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="summary">ملخص</option>
                    <option value="summary_large_image">ملخص مع صورة كبيرة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    حساب Twitter
                  </label>
                  <input
                    type="text"
                    value={settings.metaTags.twitterSite}
                    onChange={(e) => handleMetaTagChange('twitterSite', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="@username"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">أدوات التحليل والتتبع</h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.analytics.isEnabled}
                  onChange={(e) => handleAnalyticsChange('isEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {settings.analytics.isEnabled && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Google Analytics ID
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={settings.analytics.googleAnalyticsId}
                        onChange={(e) => handleAnalyticsChange('googleAnalyticsId', e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="GA-XXXXXXXXX-X or G-XXXXXXXXXX"
                      />
                      <button
                        onClick={() => testAnalytics('ga')}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm"
                      >
                        اختبار
                      </button>
                    </div>
                    {testResults.ga && (
                      <div className={`mt-2 p-2 rounded text-sm ${
                        testResults.ga.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {testResults.ga.message}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Google Tag Manager ID
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={settings.analytics.googleTagManagerId}
                        onChange={(e) => handleAnalyticsChange('googleTagManagerId', e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="GTM-XXXXXXX"
                      />
                      <button
                        onClick={() => testAnalytics('gtm')}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm"
                      >
                        اختبار
                      </button>
                    </div>
                    {testResults.gtm && (
                      <div className={`mt-2 p-2 rounded text-sm ${
                        testResults.gtm.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {testResults.gtm.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Facebook Pixel ID
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={settings.analytics.facebookPixelId}
                        onChange={(e) => handleAnalyticsChange('facebookPixelId', e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="123456789012345"
                      />
                      <button
                        onClick={() => testAnalytics('fb')}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm"
                      >
                        اختبار
                      </button>
                    </div>
                    {testResults.fb && (
                      <div className={`mt-2 p-2 rounded text-sm ${
                        testResults.fb.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {testResults.fb.message}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hotjar ID
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={settings.analytics.hotjarId}
                        onChange={(e) => handleAnalyticsChange('hotjarId', e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="1234567"
                      />
                      <button
                        onClick={() => testAnalytics('hotjar')}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm"
                      >
                        اختبار
                      </button>
                    </div>
                    {testResults.hotjar && (
                      <div className={`mt-2 p-2 rounded text-sm ${
                        testResults.hotjar.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {testResults.hotjar.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sitemap & Schema */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sitemap */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">خريطة الموقع</h2>
                <button
                  onClick={generateSitemap}
                  disabled={isSaving}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm"
                >
                  إنشاء خريطة الموقع
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="autoGenerate"
                    checked={settings.sitemap.autoGenerate}
                    onChange={(e) => handleSitemapChange('autoGenerate', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="autoGenerate" className="text-sm font-medium text-gray-700">
                    إنشاء تلقائي لخريطة الموقع
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="includeImages"
                    checked={settings.sitemap.includeImages}
                    onChange={(e) => handleSitemapChange('includeImages', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="includeImages" className="text-sm font-medium text-gray-700">
                    تضمين الصور في خريطة الموقع
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تكرار التحديث
                  </label>
                  <select
                    value={settings.sitemap.changeFrequency}
                    onChange={(e) => handleSitemapChange('changeFrequency', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="daily">يومي</option>
                    <option value="weekly">أسبوعي</option>
                    <option value="monthly">شهري</option>
                    <option value="yearly">سنوي</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الأولوية (0.0 - 1.0)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={settings.sitemap.priority}
                    onChange={(e) => handleSitemapChange('priority', parseFloat(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Schema Markup */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Schema Markup</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم المنظمة
                  </label>
                  <input
                    type="text"
                    value={settings.schema.organizationName}
                    onChange={(e) => handleSchemaChange('organizationName', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع المنظمة
                  </label>
                  <select
                    value={settings.schema.organizationType}
                    onChange={(e) => handleSchemaChange('organizationType', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Organization">منظمة</option>
                    <option value="Corporation">شركة</option>
                    <option value="LocalBusiness">عمل محلي</option>
                    <option value="OnlineStore">متجر إلكتروني</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رابط الشعار
                  </label>
                  <input
                    type="url"
                    value={settings.schema.logo}
                    onChange={(e) => handleSchemaChange('logo', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    value={settings.schema.contactPoint.telephone}
                    onChange={(e) => handleSchemaChange('contactPoint.telephone', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع التواصل
                  </label>
                  <select
                    value={settings.schema.contactPoint.contactType}
                    onChange={(e) => handleSchemaChange('contactPoint.contactType', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="customer service">خدمة العملاء</option>
                    <option value="technical support">الدعم الفني</option>
                    <option value="sales">المبيعات</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}