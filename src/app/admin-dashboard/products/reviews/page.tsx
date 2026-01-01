'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Review {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  title: string;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  isVerifiedPurchase: boolean;
  createdAt: string;
  images: string[];
}

const mockReviews: Review[] = [
  {
    id: 1,
    productId: 1,
    productName: 'iPhone 15 Pro Max',
    productImage: '/api/placeholder/60/60',
    customerName: 'أحمد محمد',
    customerEmail: 'ahmed@example.com',
    rating: 5,
    title: 'منتج ممتاز جداً',
    comment: 'الهاتف رائع والكاميرا مذهلة. أنصح بشرائه بقوة. الأداء سريع جداً والبطارية تدوم طوال اليوم.',
    status: 'pending',
    isVerifiedPurchase: true,
    createdAt: '2024-01-20',
    images: ['/api/placeholder/100/100', '/api/placeholder/100/100']
  },
  {
    id: 2,
    productId: 2,
    productName: 'Samsung Galaxy S24',
    productImage: '/api/placeholder/60/60',
    customerName: 'فاطمة علي',
    customerEmail: 'fatima@example.com',
    rating: 4,
    title: 'جيد لكن يحتاج تحسين',
    comment: 'الهاتف جيد بشكل عام لكن البطارية تنفد بسرعة. الشاشة ممتازة والكاميرا جيدة.',
    status: 'approved',
    isVerifiedPurchase: true,
    createdAt: '2024-01-18',
    images: []
  },
  {
    id: 3,
    productId: 1,
    productName: 'iPhone 15 Pro Max',
    productImage: '/api/placeholder/60/60',
    customerName: 'محمد سالم',
    customerEmail: 'mohammed@example.com',
    rating: 1,
    title: 'منتج سيء جداً',
    comment: 'المنتج وصل معطل والخدمة سيئة. لا أنصح بالشراء من هذا المتجر.',
    status: 'rejected',
    isVerifiedPurchase: false,
    createdAt: '2024-01-15',
    images: []
  }
];

export default function ProductReviews() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [selectedReviews, setSelectedReviews] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRating, setFilterRating] = useState<string>('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const handleStatusChange = (reviewId: number, newStatus: 'approved' | 'rejected') => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, status: newStatus }
        : review
    ));
  };

  const handleBulkAction = (action: 'approve' | 'reject' | 'delete') => {
    if (action === 'delete') {
      setReviews(prev => prev.filter(review => !selectedReviews.includes(review.id)));
    } else {
      setReviews(prev => prev.map(review => 
        selectedReviews.includes(review.id)
          ? { ...review, status: action === 'approve' ? 'approved' : 'rejected' }
          : review
      ));
    }
    setSelectedReviews([]);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedReviews(checked ? filteredReviews.map(r => r.id) : []);
  };

  const handleSelectReview = (reviewId: number, checked: boolean) => {
    setSelectedReviews(prev => 
      checked 
        ? [...prev, reviewId]
        : prev.filter(id => id !== reviewId)
    );
  };

  const filteredReviews = reviews.filter(review => {
    const statusMatch = filterStatus === 'all' || review.status === filterStatus;
    const ratingMatch = filterRating === 'all' || review.rating.toString() === filterRating;
    return statusMatch && ratingMatch;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    const labels = {
      pending: 'في الانتظار',
      approved: 'موافق عليه',
      rejected: 'مرفوض'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const pendingCount = reviews.filter(r => r.status === 'pending').length;
  const approvedCount = reviews.filter(r => r.status === 'approved').length;
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">إدارة تقييمات المنتجات</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{reviews.length}</div>
              <div className="text-sm text-blue-800">إجمالي التقييمات</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
              <div className="text-sm text-yellow-800">في انتظار المراجعة</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
              <div className="text-sm text-green-800">التقييمات المعتمدة</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{averageRating}</div>
              <div className="text-sm text-purple-800">متوسط التقييم</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                فلترة حسب الحالة
              </label>
              <select 
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">جميع الحالات</option>
                <option value="pending">في الانتظار</option>
                <option value="approved">موافق عليه</option>
                <option value="rejected">مرفوض</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                فلترة حسب التقييم
              </label>
              <select 
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
              >
                <option value="all">جميع التقييمات</option>
                <option value="5">5 نجوم</option>
                <option value="4">4 نجوم</option>
                <option value="3">3 نجوم</option>
                <option value="2">2 نجوم</option>
                <option value="1">1 نجمة</option>
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                تصدير التقييمات
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedReviews.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <span className="text-blue-800">تم تحديد {selectedReviews.length} تقييم</span>
              <div className="space-x-2">
                <button 
                  onClick={() => handleBulkAction('approve')}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  اعتماد المحدد
                </button>
                <button 
                  onClick={() => handleBulkAction('reject')}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  رفض المحدد
                </button>
                <button 
                  onClick={() => handleBulkAction('delete')}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  حذف المحدد
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedReviews.length === filteredReviews.length && filteredReviews.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المنتج
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    العميل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التقييم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التعليق
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التاريخ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedReviews.includes(review.id)}
                        onChange={(e) => handleSelectReview(review.id, e.target.checked)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={review.productImage} 
                          alt={review.productName}
                          className="w-12 h-12 rounded-lg object-cover ml-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{review.productName}</div>
                          <div className="text-sm text-gray-500">ID: {review.productId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {review.customerName}
                          {review.isVerifiedPurchase && (
                            <span className="mr-2 text-green-500 text-xs">✓ مشترٍ موثق</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{review.customerEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                        <span className="mr-2 text-sm text-gray-600">({review.rating})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="text-sm font-medium text-gray-900 mb-1">{review.title}</div>
                        <div className="text-sm text-gray-600 line-clamp-2">{review.comment}</div>
                        {review.images.length > 0 && (
                          <div className="flex space-x-1 mt-2">
                            {review.images.slice(0, 3).map((img, idx) => (
                              <img key={idx} src={img} alt="" className="w-8 h-8 rounded object-cover" />
                            ))}
                            {review.images.length > 3 && (
                              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs">
                                +{review.images.length - 3}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(review.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {review.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedReview(review);
                            setShowReviewModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          عرض
                        </button>
                        {review.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(review.id, 'approved')}
                              className="text-green-600 hover:text-green-900"
                            >
                              اعتماد
                            </button>
                            <button
                              onClick={() => handleStatusChange(review.id, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                            >
                              رفض
                            </button>
                          </>
                        )}
                        <button className="text-red-600 hover:text-red-900">
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6 rounded-lg shadow">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              السابق
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              التالي
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                عرض <span className="font-medium">1</span> إلى <span className="font-medium">{filteredReviews.length}</span> من <span className="font-medium">{filteredReviews.length}</span> نتيجة
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  السابق
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  التالي
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Review Detail Modal */}
      {showReviewModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">تفاصيل التقييم</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={selectedReview.productImage} 
                  alt={selectedReview.productName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{selectedReview.productName}</h4>
                  <p className="text-sm text-gray-500">بواسطة: {selectedReview.customerName}</p>
                  {selectedReview.isVerifiedPurchase && (
                    <span className="text-xs text-green-600">✓ مشترٍ موثق</span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  {renderStars(selectedReview.rating)}
                  <span className="mr-2 text-sm text-gray-600">({selectedReview.rating}/5)</span>
                </div>
                <h5 className="font-medium text-gray-900 mb-2">{selectedReview.title}</h5>
                <p className="text-gray-700">{selectedReview.comment}</p>
              </div>

              {selectedReview.images.length > 0 && (
                <div>
                  <h6 className="font-medium text-gray-900 mb-2">الصور المرفقة</h6>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedReview.images.map((img, idx) => (
                      <img key={idx} src={img} alt="" className="w-full h-24 rounded object-cover" />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  {getStatusBadge(selectedReview.status)}
                  <span className="mr-4 text-sm text-gray-500">{selectedReview.createdAt}</span>
                </div>
                <div className="space-x-2">
                  {selectedReview.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          handleStatusChange(selectedReview.id, 'approved');
                          setShowReviewModal(false);
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        اعتماد
                      </button>
                      <button
                        onClick={() => {
                          handleStatusChange(selectedReview.id, 'rejected');
                          setShowReviewModal(false);
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        رفض
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}