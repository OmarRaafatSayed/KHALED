'use client';

import { useState } from 'react';

interface VendorApplication {
  id: number;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  businessType: string;
  businessLicense: string;
  taxNumber: string;
  bankAccount: string;
  address: string;
  website?: string;
  description: string;
  documents: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  monthlyRevenue?: number;
  productsCount: number;
}

const mockApplications: VendorApplication[] = [
  {
    id: 1,
    businessName: 'متجر التقنية المتقدمة',
    ownerName: 'أحمد محمد الأحمد',
    email: 'ahmed@techstore.com',
    phone: '+966501234567',
    businessType: 'إلكترونيات',
    businessLicense: 'CR-12345678',
    taxNumber: '123456789012345',
    bankAccount: 'SA1234567890123456789012',
    address: 'الرياض، حي الملك فهد، شارع الملك عبدالعزيز',
    website: 'https://techstore.com',
    description: 'متجر متخصص في بيع الأجهزة الإلكترونية والهواتف الذكية',
    documents: ['/api/placeholder/200/150', '/api/placeholder/200/150', '/api/placeholder/200/150'],
    status: 'pending',
    submittedAt: '2024-01-20',
    productsCount: 0
  },
  {
    id: 2,
    businessName: 'أزياء النخبة',
    ownerName: 'فاطمة علي السالم',
    email: 'fatima@eliteFashion.com',
    phone: '+966507654321',
    businessType: 'أزياء وملابس',
    businessLicense: 'CR-87654321',
    taxNumber: '987654321098765',
    bankAccount: 'SA9876543210987654321098',
    address: 'جدة، حي الروضة، شارع التحلية',
    description: 'متجر أزياء نسائية راقية ومستلزمات الموضة',
    documents: ['/api/placeholder/200/150', '/api/placeholder/200/150'],
    status: 'approved',
    submittedAt: '2024-01-15',
    reviewedAt: '2024-01-18',
    reviewedBy: 'أدمين النظام',
    monthlyRevenue: 15000,
    productsCount: 45
  },
  {
    id: 3,
    businessName: 'مطعم الذواقة',
    ownerName: 'محمد سالم القحطاني',
    email: 'mohammed@gourmet.com',
    phone: '+966509876543',
    businessType: 'مطاعم وأغذية',
    businessLicense: 'CR-11223344',
    taxNumber: '112233445566778',
    bankAccount: 'SA1122334455667788990011',
    address: 'الدمام، حي الفيصلية، شارع الأمير محمد بن فهد',
    description: 'مطعم متخصص في الأكلات الشعبية والعربية الأصيلة',
    documents: ['/api/placeholder/200/150'],
    status: 'rejected',
    submittedAt: '2024-01-10',
    reviewedAt: '2024-01-12',
    reviewedBy: 'أدمين النظام',
    rejectionReason: 'الوثائق المطلوبة غير مكتملة',
    productsCount: 0
  }
];

export default function VendorManagement() {
  const [applications, setApplications] = useState<VendorApplication[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<VendorApplication | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleApprove = (applicationId: number) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? { 
            ...app, 
            status: 'approved', 
            reviewedAt: new Date().toISOString().split('T')[0],
            reviewedBy: 'أدمين النظام'
          }
        : app
    ));
  };

  const handleReject = (applicationId: number, reason: string) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? { 
            ...app, 
            status: 'rejected', 
            reviewedAt: new Date().toISOString().split('T')[0],
            reviewedBy: 'أدمين النظام',
            rejectionReason: reason
          }
        : app
    ));
    setShowRejectModal(false);
    setRejectionReason('');
  };

  const filteredApplications = applications.filter(app => 
    filterStatus === 'all' || app.status === filterStatus
  );

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

  const pendingCount = applications.filter(app => app.status === 'pending').length;
  const approvedCount = applications.filter(app => app.status === 'approved').length;
  const rejectedCount = applications.filter(app => app.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">إدارة البائعين</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
              <div className="text-sm text-blue-800">إجمالي الطلبات</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
              <div className="text-sm text-yellow-800">في انتظار المراجعة</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
              <div className="text-sm text-green-800">البائعين المعتمدين</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
              <div className="text-sm text-red-800">الطلبات المرفوضة</div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">فلترة حسب الحالة:</label>
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">جميع الطلبات</option>
              <option value="pending">في الانتظار</option>
              <option value="approved">موافق عليه</option>
              <option value="rejected">مرفوض</option>
            </select>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    معلومات العمل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    صاحب العمل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    نوع النشاط
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ التقديم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{application.businessName}</div>
                        <div className="text-sm text-gray-500">{application.email}</div>
                        <div className="text-xs text-gray-400">رخصة: {application.businessLicense}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{application.ownerName}</div>
                        <div className="text-sm text-gray-500">{application.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.businessType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(application.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.submittedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setShowDetailModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          عرض التفاصيل
                        </button>
                        {application.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(application.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              موافقة
                            </button>
                            <button
                              onClick={() => {
                                setSelectedApplication(application);
                                setShowRejectModal(true);
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              رفض
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">تفاصيل طلب البائع</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">معلومات العمل</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div><strong>اسم العمل:</strong> {selectedApplication.businessName}</div>
                    <div><strong>نوع النشاط:</strong> {selectedApplication.businessType}</div>
                    <div><strong>رقم الرخصة:</strong> {selectedApplication.businessLicense}</div>
                    <div><strong>الرقم الضريبي:</strong> {selectedApplication.taxNumber}</div>
                    <div><strong>رقم الحساب البنكي:</strong> {selectedApplication.bankAccount}</div>
                    {selectedApplication.website && (
                      <div><strong>الموقع الإلكتروني:</strong> 
                        <a href={selectedApplication.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 mr-2">
                          {selectedApplication.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">معلومات صاحب العمل</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div><strong>الاسم:</strong> {selectedApplication.ownerName}</div>
                    <div><strong>البريد الإلكتروني:</strong> {selectedApplication.email}</div>
                    <div><strong>رقم الهاتف:</strong> {selectedApplication.phone}</div>
                    <div><strong>العنوان:</strong> {selectedApplication.address}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">وصف النشاط</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedApplication.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">الوثائق المرفقة</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedApplication.documents.map((doc, index) => (
                      <img 
                        key={index}
                        src={doc} 
                        alt={`Document ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border cursor-pointer hover:opacity-80"
                        onClick={() => window.open(doc, '_blank')}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">حالة الطلب</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center">
                      <strong className="ml-2">الحالة:</strong>
                      {getStatusBadge(selectedApplication.status)}
                    </div>
                    <div><strong>تاريخ التقديم:</strong> {selectedApplication.submittedAt}</div>
                    {selectedApplication.reviewedAt && (
                      <>
                        <div><strong>تاريخ المراجعة:</strong> {selectedApplication.reviewedAt}</div>
                        <div><strong>تمت المراجعة بواسطة:</strong> {selectedApplication.reviewedBy}</div>
                      </>
                    )}
                    {selectedApplication.rejectionReason && (
                      <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                        <strong className="text-red-800">سبب الرفض:</strong>
                        <p className="text-red-700 mt-1">{selectedApplication.rejectionReason}</p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedApplication.status === 'approved' && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">إحصائيات البائع</h4>
                    <div className="bg-green-50 p-4 rounded-lg space-y-2">
                      <div><strong>عدد المنتجات:</strong> {selectedApplication.productsCount}</div>
                      {selectedApplication.monthlyRevenue && (
                        <div><strong>الإيرادات الشهرية:</strong> ${selectedApplication.monthlyRevenue.toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                إغلاق
              </button>
              {selectedApplication.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleApprove(selectedApplication.id);
                      setShowDetailModal(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    موافقة على الطلب
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      setShowRejectModal(true);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    رفض الطلب
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">رفض طلب البائع</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                سبب الرفض
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="اكتب سبب رفض الطلب..."
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleReject(selectedApplication.id, rejectionReason)}
                disabled={!rejectionReason.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                رفض الطلب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}