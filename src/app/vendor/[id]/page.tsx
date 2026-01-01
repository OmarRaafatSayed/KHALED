'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
}

interface Job {
  id: number;
  title: string;
  type: 'full-time' | 'part-time' | 'contract';
  location: string;
  salary: string;
  postedDate: string;
  description: string;
}

interface VendorInfo {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  description: string;
  rating: number;
  totalReviews: number;
  totalProducts: number;
  joinedDate: string;
  location: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  isFollowing: boolean;
  followers: number;
}

const mockVendor: VendorInfo = {
  id: 'tech-store-pro',
  name: 'متجر التقنية المتقدمة',
  logo: '/api/placeholder/120/120',
  coverImage: '/api/placeholder/1200/300',
  description: 'متجر متخصص في بيع أحدث الأجهزة الإلكترونية والتقنية. نوفر منتجات عالية الجودة بأسعار تنافسية مع ضمان شامل وخدمة عملاء ممتازة.',
  rating: 4.8,
  totalReviews: 1247,
  totalProducts: 156,
  joinedDate: '2020-03-15',
  location: 'الرياض، السعودية',
  socialMedia: {
    facebook: 'https://facebook.com/techstore',
    twitter: 'https://twitter.com/techstore',
    instagram: 'https://instagram.com/techstore',
    website: 'https://techstore.com'
  },
  isFollowing: false,
  followers: 15420
};

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 1299,
    originalPrice: 1399,
    image: '/api/placeholder/250/250',
    rating: 4.9,
    reviews: 234,
    category: 'هواتف ذكية'
  },
  {
    id: 2,
    name: 'MacBook Pro 16"',
    price: 2499,
    image: '/api/placeholder/250/250',
    rating: 4.7,
    reviews: 156,
    category: 'أجهزة كمبيوتر'
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: 249,
    originalPrice: 299,
    image: '/api/placeholder/250/250',
    rating: 4.6,
    reviews: 89,
    category: 'إكسسوارات'
  },
  {
    id: 4,
    name: 'iPad Air',
    price: 599,
    image: '/api/placeholder/250/250',
    rating: 4.8,
    reviews: 167,
    category: 'أجهزة لوحية'
  }
];

const mockJobs: Job[] = [
  {
    id: 1,
    title: 'مطور تطبيقات موبايل',
    type: 'full-time',
    location: 'الرياض',
    salary: '8000 - 12000 ريال',
    postedDate: '2024-01-20',
    description: 'نبحث عن مطور تطبيقات موبايل خبير في React Native و Flutter'
  },
  {
    id: 2,
    title: 'مصمم UI/UX',
    type: 'part-time',
    location: 'عن بُعد',
    salary: '5000 - 7000 ريال',
    postedDate: '2024-01-18',
    description: 'مطلوب مصمم واجهات مستخدم مبدع لتصميم تطبيقات التجارة الإلكترونية'
  }
];

export default function VendorShopfront() {
  const params = useParams();
  const vendorId = params.id as string;
  
  const [activeTab, setActiveTab] = useState<'products' | 'jobs' | 'about'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFollowing, setIsFollowing] = useState(mockVendor.isFollowing);
  const [followers, setFollowers] = useState(mockVendor.followers);

  const categories = ['all', 'هواتف ذكية', 'أجهزة كمبيوتر', 'إكسسوارات', 'أجهزة لوحية'];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowers(prev => isFollowing ? prev - 1 : prev + 1);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image & Store Header */}
      <div className="relative">
        <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${mockVendor.coverImage})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 pb-6">
            <div className="flex items-end space-x-4">
              <img 
                src={mockVendor.logo} 
                alt={mockVendor.name}
                className="w-32 h-32 rounded-lg border-4 border-white shadow-lg bg-white"
              />
              <div className="text-white mb-4">
                <h1 className="text-3xl font-bold">{mockVendor.name}</h1>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    {renderStars(mockVendor.rating)}
                    <span className="mr-2 text-sm">({mockVendor.totalReviews} تقييم)</span>
                  </div>
                  <span className="text-sm">{mockVendor.totalProducts} منتج</span>
                  <span className="text-sm">{followers.toLocaleString()} متابع</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 md:mt-0 md:mr-auto">
              <button
                onClick={handleFollow}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isFollowing 
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isFollowing ? 'إلغاء المتابعة' : 'متابعة المتجر'}
              </button>
              
              {/* Social Media Links */}
              <div className="flex space-x-2">
                {mockVendor.socialMedia.website && (
                  <a href={mockVendor.socialMedia.website} target="_blank" rel="noopener noreferrer" 
                     className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-600">
                    🌐
                  </a>
                )}
                {mockVendor.socialMedia.facebook && (
                  <a href={mockVendor.socialMedia.facebook} target="_blank" rel="noopener noreferrer"
                     className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-600">
                    📘
                  </a>
                )}
                {mockVendor.socialMedia.instagram && (
                  <a href={mockVendor.socialMedia.instagram} target="_blank" rel="noopener noreferrer"
                     className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-600 hover:text-pink-600">
                    📷
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('products')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === 'products'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    المنتجات ({mockProducts.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === 'jobs'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    الوظائف ({mockJobs.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === 'about'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    حول المتجر
                  </button>
                </nav>
              </div>
            </div>

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                {/* Search & Filter */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="البحث في منتجات المتجر..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'جميع الفئات' : category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                      <Link href={`/products/${product.id}`}>
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      </Link>
                      <div className="p-4">
                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-medium text-gray-900 hover:text-blue-600 mb-2">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center mb-2">
                          {renderStars(product.rating)}
                          <span className="mr-2 text-sm text-gray-500">({product.reviews})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-gray-900">${product.price}</span>
                            {product.originalPrice && (
                              <span className="mr-2 text-sm text-gray-500 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <div className="space-y-4">
                {mockJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            job.type === 'full-time' ? 'bg-green-100 text-green-800' :
                            job.type === 'part-time' ? 'bg-blue-100 text-blue-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {job.type === 'full-time' ? 'دوام كامل' :
                             job.type === 'part-time' ? 'دوام جزئي' : 'عقد مؤقت'}
                          </span>
                          <span>📍 {job.location}</span>
                          <span>💰 {job.salary}</span>
                          <span>📅 {job.postedDate}</span>
                        </div>
                      </div>
                      <Link 
                        href={`/jobs/${job.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        التقديم
                      </Link>
                    </div>
                    <p className="text-gray-700">{job.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">حول المتجر</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">{mockVendor.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">معلومات المتجر</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>الموقع:</strong> {mockVendor.location}</div>
                      <div><strong>تاريخ الانضمام:</strong> {mockVendor.joinedDate}</div>
                      <div><strong>عدد المنتجات:</strong> {mockVendor.totalProducts}</div>
                      <div><strong>التقييم:</strong> {mockVendor.rating}/5 ({mockVendor.totalReviews} تقييم)</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">روابط التواصل</h3>
                    <div className="space-y-2">
                      {mockVendor.socialMedia.website && (
                        <a href={mockVendor.socialMedia.website} target="_blank" rel="noopener noreferrer"
                           className="flex items-center text-blue-600 hover:text-blue-800">
                          🌐 الموقع الرسمي
                        </a>
                      )}
                      {mockVendor.socialMedia.facebook && (
                        <a href={mockVendor.socialMedia.facebook} target="_blank" rel="noopener noreferrer"
                           className="flex items-center text-blue-600 hover:text-blue-800">
                          📘 فيسبوك
                        </a>
                      )}
                      {mockVendor.socialMedia.instagram && (
                        <a href={mockVendor.socialMedia.instagram} target="_blank" rel="noopener noreferrer"
                           className="flex items-center text-pink-600 hover:text-pink-800">
                          📷 إنستغرام
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Store Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">إحصائيات المتجر</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">التقييم العام</span>
                  <div className="flex items-center">
                    {renderStars(mockVendor.rating)}
                    <span className="mr-2 font-medium">{mockVendor.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">عدد التقييمات</span>
                  <span className="font-medium">{mockVendor.totalReviews.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المتابعين</span>
                  <span className="font-medium">{followers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المنتجات</span>
                  <span className="font-medium">{mockVendor.totalProducts}</span>
                </div>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">آخر التقييمات</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    {renderStars(5)}
                    <span className="mr-2 text-sm font-medium">أحمد محمد</span>
                  </div>
                  <p className="text-sm text-gray-600">خدمة ممتازة ومنتجات عالية الجودة. أنصح بالتعامل مع هذا المتجر.</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    {renderStars(4)}
                    <span className="mr-2 text-sm font-medium">فاطمة علي</span>
                  </div>
                  <p className="text-sm text-gray-600">سرعة في التوصيل وتعامل راقي. المنتج وصل كما هو موضح بالضبط.</p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    {renderStars(5)}
                    <span className="mr-2 text-sm font-medium">محمد سالم</span>
                  </div>
                  <p className="text-sm text-gray-600">أسعار تنافسية وجودة عالية. سأتعامل معهم مرة أخرى بالتأكيد.</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات التواصل</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <span className="text-gray-600">📍 الموقع:</span>
                  <span className="mr-2">{mockVendor.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600">📅 عضو منذ:</span>
                  <span className="mr-2">{mockVendor.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}