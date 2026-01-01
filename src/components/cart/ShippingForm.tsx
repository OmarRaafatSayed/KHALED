'use client'

import { useState } from 'react'
import { MapPin, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ShippingFormProps {
  onNext: (data: any) => void
  onBack: () => void
}

interface Address {
  id: string
  name: string
  phone: string
  street: string
  city: string
  state: string
  zipCode: string
  isDefault: boolean
}

const mockAddresses: Address[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    phone: '+966501234567',
    street: 'شارع الملك فهد، حي النخيل',
    city: 'الرياض',
    state: 'الرياض',
    zipCode: '12345',
    isDefault: true
  }
]

export default function ShippingForm({ onNext, onBack }: ShippingFormProps) {
  const [selectedAddress, setSelectedAddress] = useState<string>(mockAddresses[0]?.id || '')
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedAddress) {
      const address = mockAddresses.find(addr => addr.id === selectedAddress)
      onNext({ shippingAddress: address })
    } else if (showNewAddressForm) {
      onNext({ shippingAddress: newAddress })
    }
  }

  const handleNewAddressSubmit = () => {
    // في التطبيق الحقيقي: حفظ العنوان الجديد
    setShowNewAddressForm(false)
    setSelectedAddress('new')
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-6">معلومات الشحن</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Saved Addresses */}
        {mockAddresses.length > 0 && (
          <div>
            <h3 className="font-medium mb-4">العناوين المحفوظة</h3>
            <div className="space-y-3">
              {mockAddresses.map((address) => (
                <label
                  key={address.id}
                  className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAddress === address.id
                      ? 'border-primary bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    value={address.id}
                    checked={selectedAddress === address.id}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    className="sr-only"
                  />
                  
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 space-x-reverse mb-1">
                        <span className="font-medium">{address.name}</span>
                        {address.isDefault && (
                          <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                            افتراضي
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{address.phone}</p>
                      <p className="text-sm text-gray-600">
                        {address.street}, {address.city}, {address.state} {address.zipCode}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Add New Address Button */}
        {!showNewAddressForm && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowNewAddressForm(true)}
            className="w-full"
          >
            <Plus className="h-4 w-4 ml-2" />
            إضافة عنوان جديد
          </Button>
        )}

        {/* New Address Form */}
        {showNewAddressForm && (
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-4">عنوان جديد</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الكامل *
                </label>
                <Input
                  type="text"
                  required
                  value={newAddress.name}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="أدخل الاسم الكامل"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الهاتف *
                </label>
                <Input
                  type="tel"
                  required
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+966501234567"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  العنوان التفصيلي *
                </label>
                <Input
                  type="text"
                  required
                  value={newAddress.street}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, street: e.target.value }))}
                  placeholder="الشارع، الحي، رقم المبنى"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المدينة *
                </label>
                <Input
                  type="text"
                  required
                  value={newAddress.city}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="الرياض"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المنطقة *
                </label>
                <Input
                  type="text"
                  required
                  value={newAddress.state}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="منطقة الرياض"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الرمز البريدي *
                </label>
                <Input
                  type="text"
                  required
                  value={newAddress.zipCode}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                  placeholder="12345"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 space-x-reverse mt-4">
              <Button
                type="button"
                onClick={handleNewAddressSubmit}
                disabled={!newAddress.name || !newAddress.phone || !newAddress.street}
              >
                حفظ العنوان
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowNewAddressForm(false)}
              >
                إلغاء
              </Button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button type="button" variant="outline" onClick={onBack}>
            العودة للسلة
          </Button>
          
          <Button 
            type="submit"
            disabled={!selectedAddress && !showNewAddressForm}
          >
            متابعة للدفع
          </Button>
        </div>
      </form>
    </div>
  )
}