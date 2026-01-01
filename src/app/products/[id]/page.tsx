'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  vendor: string;
  specifications: Record<string, string>;
  reviews: Review[];
}

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

const mockProduct: Product = {
  id: 1,
  name: 'iPhone 15 Pro Max',
  description: 'أحدث هواتف Apple مع كاميرا احترافية وأداء فائق. يتميز بشاشة Super Retina XDR مقاس 6.7 بوصة ومعالج A17 Pro المتطور.',
  price: 1299,
  originalPrice: 1399,
  images: [
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600'
  ],
  category: 'الإلكترونيات',
  brand: 'Apple',
  rating: 4.8,
  reviewCount: 234,
  inStock: true,
  stockCount: 15,
  vendor: 'متجر التقنية المتقدمة',
  specifications: {
    'الشاشة': '6.7 بوصة Super Retina XDR',
    'المعالج': 'A17 Pro',
    'الذاكرة': '256GB',
    'الكاميرا': '48MP + 12MP + 12MP',
    'البطارية': '4441 mAh',
    'نظام التشغيل': 'iOS 17',
    'الوزن': '221 جرام',
    'الألوان': 'تيتانيوم طبيعي، تيتانيوم أزرق، تيتانيوم أبيض، تيتانيوم أسود'
  },
  reviews: [
    {
      id: 1,
      userName: 'أحمد محمد',
      rating: 5,
      comment: 'هاتف رائع جداً، الكاميرا مذهلة والأداء سريع. أنصح بشرائه بقوة.',
      date: '2024-01-20',
      verified: true
    },
    {
      id: 2,
      userName: 'فاطمة علي',
      rating: 4,
      comment: 'جودة عالية لكن السعر مرتفع قليلاً. بشكل عام راضية عن الشراء.',
      date: '2024-01-18',
      verified: true
    },
    {
      id: 3,
      userName: 'محمد سالم',
      rating: 5,
      comment: 'أفضل هاتف استخدمته حتى الآن. البطارية تدوم طوال اليوم.',
      date: '2024-01-15',
      verified: false
    }
  ]
};

const relatedProducts = [
  { id: 2, name: 'iPhone 15 Pro', price: 1099, image: '/api/placeholder/200/200', rating: 4.7 },
  { id: 3, name: 'AirPods Pro', price: 249, image: '/api/placeholder/200/200', rating: 4.6 },
  { id: 4, name: 'Apple Watch Series 9', price: 399, image: '/api/placeholder/200/200', rating: 4.8 },
  { id: 5, name: 'MacBook Air M2', price: 1199, image: '/api/placeholder/200/200', rating: 4.9 }
];

export default function ProductDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAddingToCart(false);
    // Redirect to checkout instead of showing alert
    window.location.href = '/checkout';
  };

  const handleAddToWishlist = () => {
    alert('تم إضافة المنتج إلى قائمة الأمنيات');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const shareProduct = (platform: string) => {
    const url = window.location.href;
    const text = `تحقق من هذا المنتج الرائع: ${mockProduct.name}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${text} ${url}`);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">الرئيسية</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-600">المنتجات</Link>
            <span>/</span>
            <Link href={`/products?category=${mockProduct.category}`} className="hover:text-blue-600">
              {mockProduct.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{mockProduct.name}</span>
          </div>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative mb-4">
              <img
                src={mockProduct.images[selectedImage]}
                alt={mockProduct.name}
                className={`w-full h-96 object-cover rounded-lg cursor-zoom-in transition-transform ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              {mockProduct.originalPrice && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg">
                  خصم {Math.round(((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100)}%
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{mockProduct.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {renderStars(mockProduct.rating)}
                <span className="mr-2 text-sm text-gray-600">
                  ({mockProduct.reviewCount} تقييم)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">{mockProduct.price} ريال</span>
                {mockProduct.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {mockProduct.originalPrice} ريال
                  </span>
                )}
              </div>
            </div>

            {/* Short Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">{mockProduct.description}</p>

            {/* Stock Status */}
            <div className="mb-6">
              {mockProduct.inStock ? (
                <div className="flex items-center text-green-600">
                  <span className="w-3 h-3 bg-green-500 rounded-full ml-2"></span>
                  متوفر في المخزون ({mockProduct.stockCount} قطعة)
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <span className="w-3 h-3 bg-red-500 rounded-full ml-2"></span>
                  غير متوفر حالياً
                </div>
              )}
            </div>

            {/* Vendor */}
            <div className="mb-6">
              <span className="text-gray-600">البائع: </span>
              <Link href={`/vendor/${mockProduct.vendor}`} className="text-blue-600 hover:text-blue-800 font-medium">
                {mockProduct.vendor}
              </Link>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">الكمية:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(mockProduct.stockCount, quantity + 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!mockProduct.inStock || isAddingToCart}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isAddingToCart ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                      جاري الشراء...
                    </div>
                  ) : (
                    <>
                      🛍️ اشتري الآن
                    </>
                  )}
                </button>

                <button
                  onClick={handleAddToWishlist}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  ♡ المفضلة
                </button>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <span className="text-gray-600">مشاركة:</span>
                <button
                  onClick={() => shareProduct('facebook')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  فيسبوك
                </button>
                <button
                  onClick={() => shareProduct('twitter')}
                  className="text-blue-400 hover:text-blue-600"
                >
                  تويتر
                </button>
                <button
                  onClick={() => shareProduct('whatsapp')}
                  className="text-green-600 hover:text-green-800"
                >
                  واتساب
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-lg shadow mb-12">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'description', name: 'الوصف التفصيلي' },
                { id: 'specifications', name: 'المواصفات' },
                { id: 'reviews', name: `التقييمات (${mockProduct.reviewCount})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {mockProduct.description}
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  يتميز هذا المنتج بجودة عالية ومواصفات متقدمة تلبي احتياجات المستخدمين المتطلبين. 
                  تم تصميمه بعناية فائقة لضمان الأداء الأمثل والمتانة طويلة المدى.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(mockProduct.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">{key}:</span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                {/* Rating Summary */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">
                        {mockProduct.rating}
                      </div>
                      <div className="flex justify-center mb-2">
                        {renderStars(mockProduct.rating)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {mockProduct.reviewCount} تقييم
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map(rating => (
                        <div key={rating} className="flex items-center mb-2">
                          <span className="text-sm text-gray-600 w-8">{rating}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ 
                                width: `${(mockProduct.reviews.filter(r => Math.floor(r.rating) === rating).length / mockProduct.reviews.length) * 100}%` 
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-8">
                            {mockProduct.reviews.filter(r => Math.floor(r.rating) === rating).length}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {mockProduct.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-medium">
                            {review.userName.charAt(0)}
                          </div>
                          <div className="mr-3">
                            <div className="flex items-center">
                              <span className="font-medium text-gray-900">{review.userName}</span>
                              {review.verified && (
                                <span className="mr-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                  مشترٍ موثق
                                </span>
                              )}
                            </div>
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                              <span className="mr-2 text-sm text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">منتجات ذات صلة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    {renderStars(product.rating)}
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {product.price} ريال
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}