'use client';

import { useState } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isEnabled: boolean;
  isDefault: boolean;
  direction: 'ltr' | 'rtl';
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
  exchangeRate: number;
  isEnabled: boolean;
  isDefault: boolean;
}

export default function LocalizationSettings() {
  const [languages, setLanguages] = useState<Language[]>([
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      isEnabled: true,
      isDefault: true,
      direction: 'rtl'
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      isEnabled: true,
      isDefault: false,
      direction: 'ltr'
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      isEnabled: false,
      isDefault: false,
      direction: 'ltr'
    }
  ]);

  const [currencies, setCurrencies] = useState<Currency[]>([
    {
      code: 'SAR',
      name: 'Saudi Riyal',
      symbol: 'ر.س',
      exchangeRate: 1.0,
      isEnabled: true,
      isDefault: true
    },
    {
      code: 'USD',
      name: 'US Dollar',
      symbol: '$',
      exchangeRate: 0.27,
      isEnabled: true,
      isDefault: false
    },
    {
      code: 'EUR',
      name: 'Euro',
      symbol: '€',
      exchangeRate: 0.24,
      isEnabled: false,
      isDefault: false
    },
    {
      code: 'AED',
      name: 'UAE Dirham',
      symbol: 'د.إ',
      exchangeRate: 0.98,
      isEnabled: true,
      isDefault: false
    },
    {
      code: 'EGP',
      name: 'Egyptian Pound',
      symbol: 'ج.م',
      exchangeRate: 8.45,
      isEnabled: false,
      isDefault: false
    }
  ]);

  const [localizationSettings, setLocalizationSettings] = useState({
    autoDetectLanguage: true,
    autoDetectCurrency: false,
    showCurrencyConverter: true,
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    numberFormat: 'arabic',
    weekStartsOn: 'saturday'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleLanguageToggle = (languageCode: string, enabled: boolean) => {
    setLanguages(prev => prev.map(lang => 
      lang.code === languageCode 
        ? { ...lang, isEnabled: enabled }
        : lang
    ));
  };

  const handleLanguageDefault = (languageCode: string) => {
    setLanguages(prev => prev.map(lang => ({
      ...lang,
      isDefault: lang.code === languageCode
    })));
  };

  const handleCurrencyToggle = (currencyCode: string, enabled: boolean) => {
    setCurrencies(prev => prev.map(curr => 
      curr.code === currencyCode 
        ? { ...curr, isEnabled: enabled }
        : curr
    ));
  };

  const handleCurrencyDefault = (currencyCode: string) => {
    setCurrencies(prev => prev.map(curr => ({
      ...curr,
      isDefault: curr.code === currencyCode
    })));
  };

  const handleExchangeRateChange = (currencyCode: string, rate: number) => {
    setCurrencies(prev => prev.map(curr => 
      curr.code === currencyCode 
        ? { ...curr, exchangeRate: rate }
        : curr
    ));
  };

  const updateExchangeRates = async () => {
    // Simulate API call to update exchange rates
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSaveMessage('تم تحديث أسعار الصرف بنجاح!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('حدث خطأ أثناء تحديث أسعار الصرف');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveMessage('تم حفظ إعدادات اللغة والعملة بنجاح!');
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
            <h1 className="text-3xl font-bold text-gray-900">إعدادات اللغة والعملة</h1>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Languages */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">إدارة اللغات</h2>
              <span className="text-sm text-gray-500">
                {languages.filter(l => l.isEnabled).length} من {languages.length} مفعلة
              </span>
            </div>
            
            <div className="space-y-4">
              {languages.map((language) => (
                <div key={language.code} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{language.flag}</span>
                    <div>
                      <div className="font-medium text-gray-900">
                        {language.nativeName}
                        {language.isDefault && (
                          <span className="mr-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            افتراضي
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {language.name} ({language.code.toUpperCase()}) - {language.direction.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {language.isEnabled && !language.isDefault && (
                      <button
                        onClick={() => handleLanguageDefault(language.code)}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
                      >
                        جعل افتراضي
                      </button>
                    )}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={language.isEnabled}
                        onChange={(e) => handleLanguageToggle(language.code, e.target.checked)}
                        disabled={language.isDefault}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Currencies */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">إدارة العملات</h2>
              <div className="flex space-x-2">
                <button
                  onClick={updateExchangeRates}
                  disabled={isSaving}
                  className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 disabled:opacity-50"
                >
                  تحديث الأسعار
                </button>
                <span className="text-sm text-gray-500">
                  {currencies.filter(c => c.isEnabled).length} من {currencies.length} مفعلة
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              {currencies.map((currency) => (
                <div key={currency.code} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-medium text-gray-900">
                          {currency.name} ({currency.symbol})
                          {currency.isDefault && (
                            <span className="mr-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              افتراضي
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{currency.code}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {currency.isEnabled && !currency.isDefault && (
                        <button
                          onClick={() => handleCurrencyDefault(currency.code)}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
                        >
                          جعل افتراضي
                        </button>
                      )}
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currency.isEnabled}
                          onChange={(e) => handleCurrencyToggle(currency.code, e.target.checked)}
                          disabled={currency.isDefault}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                      </label>
                    </div>
                  </div>
                  
                  {currency.isEnabled && !currency.isDefault && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        سعر الصرف (مقابل العملة الافتراضية)
                      </label>
                      <input
                        type="number"
                        step="0.0001"
                        value={currency.exchangeRate}
                        onChange={(e) => handleExchangeRateChange(currency.code, parseFloat(e.target.value))}
                        className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* General Localization Settings */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">الإعدادات العامة</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">الكشف التلقائي للغة</h3>
                  <p className="text-sm text-gray-500">تحديد اللغة حسب موقع المستخدم</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localizationSettings.autoDetectLanguage}
                    onChange={(e) => setLocalizationSettings({
                      ...localizationSettings,
                      autoDetectLanguage: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">الكشف التلقائي للعملة</h3>
                  <p className="text-sm text-gray-500">تحديد العملة حسب موقع المستخدم</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localizationSettings.autoDetectCurrency}
                    onChange={(e) => setLocalizationSettings({
                      ...localizationSettings,
                      autoDetectCurrency: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">عرض محول العملات</h3>
                  <p className="text-sm text-gray-500">إظهار أداة تحويل العملات للمستخدمين</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localizationSettings.showCurrencyConverter}
                    onChange={(e) => setLocalizationSettings({
                      ...localizationSettings,
                      showCurrencyConverter: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تنسيق التاريخ
                </label>
                <select 
                  value={localizationSettings.dateFormat}
                  onChange={(e) => setLocalizationSettings({
                    ...localizationSettings,
                    dateFormat: e.target.value
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تنسيق الوقت
                </label>
                <select 
                  value={localizationSettings.timeFormat}
                  onChange={(e) => setLocalizationSettings({
                    ...localizationSettings,
                    timeFormat: e.target.value
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="24h">24 ساعة</option>
                  <option value="12h">12 ساعة</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تنسيق الأرقام
                </label>
                <select 
                  value={localizationSettings.numberFormat}
                  onChange={(e) => setLocalizationSettings({
                    ...localizationSettings,
                    numberFormat: e.target.value
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="arabic">أرقام عربية (١٢٣)</option>
                  <option value="western">أرقام غربية (123)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  بداية الأسبوع
                </label>
                <select 
                  value={localizationSettings.weekStartsOn}
                  onChange={(e) => setLocalizationSettings({
                    ...localizationSettings,
                    weekStartsOn: e.target.value
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="saturday">السبت</option>
                  <option value="sunday">الأحد</option>
                  <option value="monday">الاثنين</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}