'use client';

import { useState } from 'react';
import { Camera, Save, Upload } from 'lucide-react';

export default function StoreProfile() {
  const [storeData, setStoreData] = useState({
    storeName: 'متجر الإلكترونيات الذكية',
    storeDescription: 'متجر متخصص في بيع الأجهزة الإلكترونية والهواتف الذكية بأفضل الأسعار',
    storeAddress: 'الرياض، المملكة العربية السعودية',
    storePhone: '+966501234567',
    storeEmail: 'info@smartelectronics.com',
    storeLogo: '/api/placeholder/100/100',
    storeBanner: '/api/placeholder/800/200',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Store profile updated:', storeData);
  };

  return (
    <div className="space-y-6">
      {/* Store Banner */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">غلاف المتجر</h3>
        </div>
        <div className="p-6">
          <div className="relative">
            <img
              src={storeData.storeBanner}
              alt="Store Banner"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button className="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all">
              <Camera size={20} className="text-gray-600" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">الحد الأقصى: 2MB، الأبعاد المفضلة: 1200x300 بكسل</p>
        </div>
      </div>

      {/* Store Info Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">معلومات المتجر</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Logo and Basic Info */}
          <div className="flex items-start gap-6">
            <div className="relative">
              <img
                src={storeData.storeLogo}
                alt="Store Logo"
                className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200"
              />
              <button
                type="button"
                className="absolute -bottom-2 -right-2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
              >
                <Upload size={16} />
              </button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم المتجر</label>
                <input
                  type="text"
                  value={storeData.storeName}
                  onChange={(e) => setStoreData({...storeData, storeName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">وصف المتجر</label>
                <textarea
                  value={storeData.storeDescription}
                  onChange={(e) => setStoreData({...storeData, storeDescription: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
              <input
                type="text"
                value={storeData.storeAddress}
                onChange={(e) => setStoreData({...storeData, storeAddress: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
              <input
                type="tel"
                value={storeData.storePhone}
                onChange={(e) => setStoreData({...storeData, storePhone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                value={storeData.storeEmail}
                onChange={(e) => setStoreData({...storeData, storeEmail: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Store Policies */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-medium text-gray-800 mb-4">سياسات المتجر</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">سياسة الإرجاع</label>
                <textarea
                  rows={3}
                  placeholder="اكتب سياسة الإرجاع الخاصة بمتجرك..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">سياسة الشحن</label>
                <textarea
                  rows={3}
                  placeholder="اكتب سياسة الشحن الخاصة بمتجرك..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Save size={16} />
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}