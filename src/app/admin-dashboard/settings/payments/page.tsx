'use client';

import { useState } from 'react';

interface PaymentGateway {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  isTestMode: boolean;
  config: {
    publicKey: string;
    secretKey: string;
    webhookUrl: string;
    merchantId?: string;
  };
  supportedCurrencies: string[];
  fees: {
    percentage: number;
    fixed: number;
  };
}

export default function PaymentSettings() {
  const [gateways, setGateways] = useState<PaymentGateway[]>([
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'بوابة دفع عالمية تدعم جميع البطاقات الائتمانية',
      isEnabled: true,
      isTestMode: true,
      config: {
        publicKey: 'pk_test_...',
        secretKey: 'sk_test_...',
        webhookUrl: 'https://yoursite.com/webhooks/stripe'
      },
      supportedCurrencies: ['USD', 'EUR', 'SAR', 'AED'],
      fees: {
        percentage: 2.9,
        fixed: 0.30
      }
    },
    {
      id: 'paymob',
      name: 'Paymob',
      description: 'بوابة دفع محلية تدعم البطاقات والمحافظ الإلكترونية',
      isEnabled: false,
      isTestMode: true,
      config: {
        publicKey: '',
        secretKey: '',
        webhookUrl: 'https://yoursite.com/webhooks/paymob',
        merchantId: ''
      },
      supportedCurrencies: ['EGP', 'SAR', 'AED'],
      fees: {
        percentage: 2.5,
        fixed: 0
      }
    }
  ]);

  const [testResults, setTestResults] = useState<Record<string, { success: boolean; message: string }>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleGatewayToggle = (gatewayId: string, enabled: boolean) => {
    setGateways(prev => prev.map(gateway => 
      gateway.id === gatewayId 
        ? { ...gateway, isEnabled: enabled }
        : gateway
    ));
  };

  const handleTestModeToggle = (gatewayId: string, testMode: boolean) => {
    setGateways(prev => prev.map(gateway => 
      gateway.id === gatewayId 
        ? { ...gateway, isTestMode: testMode }
        : gateway
    ));
  };

  const handleConfigChange = (gatewayId: string, field: string, value: string) => {
    setGateways(prev => prev.map(gateway => 
      gateway.id === gatewayId 
        ? { 
            ...gateway, 
            config: { ...gateway.config, [field]: value }
          }
        : gateway
    ));
  };

  const handleFeesChange = (gatewayId: string, field: 'percentage' | 'fixed', value: number) => {
    setGateways(prev => prev.map(gateway => 
      gateway.id === gatewayId 
        ? { 
            ...gateway, 
            fees: { ...gateway.fees, [field]: value }
          }
        : gateway
    ));
  };

  const testConnection = async (gatewayId: string) => {
    const gateway = gateways.find(g => g.id === gatewayId);
    if (!gateway) return;

    setTestResults(prev => ({ ...prev, [gatewayId]: { success: false, message: 'جاري الاختبار...' } }));

    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if required fields are filled
      const hasRequiredFields = gateway.config.publicKey && gateway.config.secretKey;
      
      if (hasRequiredFields) {
        setTestResults(prev => ({ 
          ...prev, 
          [gatewayId]: { 
            success: true, 
            message: 'تم الاتصال بنجاح! البوابة جاهزة للاستخدام.' 
          } 
        }));
      } else {
        setTestResults(prev => ({ 
          ...prev, 
          [gatewayId]: { 
            success: false, 
            message: 'يرجى ملء جميع الحقول المطلوبة.' 
          } 
        }));
      }
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [gatewayId]: { 
          success: false, 
          message: 'فشل في الاتصال. تحقق من البيانات المدخلة.' 
        } 
      }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveMessage('تم حفظ إعدادات الدفع بنجاح!');
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
            <h1 className="text-3xl font-bold text-gray-900">إعدادات طرق الدفع</h1>
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
          {gateways.map((gateway) => (
            <div key={gateway.id} className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {gateway.id === 'stripe' ? (
                        <span className="text-purple-600 font-bold text-lg">S</span>
                      ) : (
                        <span className="text-blue-600 font-bold text-lg">P</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{gateway.name}</h3>
                      <p className="text-sm text-gray-500">{gateway.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      gateway.isTestMode ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {gateway.isTestMode ? 'وضع التجربة' : 'وضع الإنتاج'}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={gateway.isEnabled}
                        onChange={(e) => handleGatewayToggle(gateway.id, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {gateway.isEnabled && (
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Configuration */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">إعدادات الاتصال</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            المفتاح العام (Public Key)
                          </label>
                          <input
                            type="text"
                            value={gateway.config.publicKey}
                            onChange={(e) => handleConfigChange(gateway.id, 'publicKey', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder={gateway.id === 'stripe' ? 'pk_test_...' : 'pub_key_...'}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            المفتاح السري (Secret Key)
                          </label>
                          <input
                            type="password"
                            value={gateway.config.secretKey}
                            onChange={(e) => handleConfigChange(gateway.id, 'secretKey', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder={gateway.id === 'stripe' ? 'sk_test_...' : 'sec_key_...'}
                          />
                        </div>

                        {gateway.id === 'paymob' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              معرف التاجر (Merchant ID)
                            </label>
                            <input
                              type="text"
                              value={gateway.config.merchantId || ''}
                              onChange={(e) => handleConfigChange(gateway.id, 'merchantId', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="merchant_id_..."
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            رابط Webhook
                          </label>
                          <input
                            type="url"
                            value={gateway.config.webhookUrl}
                            onChange={(e) => handleConfigChange(gateway.id, 'webhookUrl', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://yoursite.com/webhooks/..."
                          />
                        </div>

                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id={`testMode-${gateway.id}`}
                            checked={gateway.isTestMode}
                            onChange={(e) => handleTestModeToggle(gateway.id, e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`testMode-${gateway.id}`} className="text-sm font-medium text-gray-700">
                            وضع التجربة (Test Mode)
                          </label>
                        </div>

                        <button
                          onClick={() => testConnection(gateway.id)}
                          className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          اختبار الاتصال
                        </button>

                        {testResults[gateway.id] && (
                          <div className={`p-3 rounded-lg ${
                            testResults[gateway.id].success 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {testResults[gateway.id].message}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Settings */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">الإعدادات والرسوم</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            العملات المدعومة
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {gateway.supportedCurrencies.map((currency) => (
                              <span 
                                key={currency}
                                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                              >
                                {currency}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              رسوم النسبة المئوية (%)
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={gateway.fees.percentage}
                              onChange={(e) => handleFeesChange(gateway.id, 'percentage', parseFloat(e.target.value))}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              رسوم ثابتة ($)
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={gateway.fees.fixed}
                              onChange={(e) => handleFeesChange(gateway.id, 'fixed', parseFloat(e.target.value))}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">مثال على الرسوم</h5>
                          <p className="text-sm text-gray-600">
                            لمعاملة بقيمة $100:
                          </p>
                          <p className="text-sm text-gray-800 font-medium">
                            الرسوم = ${((100 * gateway.fees.percentage / 100) + gateway.fees.fixed).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-800 font-medium">
                            المبلغ المستلم = ${(100 - ((100 * gateway.fees.percentage / 100) + gateway.fees.fixed)).toFixed(2)}
                          </p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h5 className="text-sm font-medium text-blue-900 mb-2">معلومات مهمة</h5>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• تأكد من صحة المفاتيح قبل التفعيل</li>
                            <li>• استخدم وضع التجربة للاختبار</li>
                            <li>• قم بإعداد Webhook للإشعارات</li>
                            <li>• راجع الرسوم مع مزود الخدمة</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* General Payment Settings */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">إعدادات الدفع العامة</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                العملة الافتراضية
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="USD">دولار أمريكي (USD)</option>
                <option value="SAR">ريال سعودي (SAR)</option>
                <option value="AED">درهم إماراتي (AED)</option>
                <option value="EGP">جنيه مصري (EGP)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الحد الأدنى للطلب
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="10.00"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}