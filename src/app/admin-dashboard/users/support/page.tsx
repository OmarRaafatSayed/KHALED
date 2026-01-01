'use client';

import { useState } from 'react';

interface SupportTicket {
  id: number;
  ticketNumber: string;
  subject: string;
  description: string;
  category: 'technical' | 'billing' | 'product' | 'account' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  responses: TicketResponse[];
  attachments: string[];
}

interface TicketResponse {
  id: number;
  message: string;
  isStaff: boolean;
  authorName: string;
  createdAt: string;
  attachments?: string[];
}

const mockTickets: SupportTicket[] = [
  {
    id: 1,
    ticketNumber: 'TK-2024-001',
    subject: 'مشكلة في الدفع عبر الموقع',
    description: 'لا أستطيع إكمال عملية الدفع، تظهر رسالة خطأ عند الضغط على زر الدفع',
    category: 'billing',
    priority: 'high',
    status: 'open',
    customerName: 'أحمد محمد علي',
    customerEmail: 'ahmed@example.com',
    customerPhone: '+966501234567',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    responses: [],
    attachments: ['/api/placeholder/200/150']
  },
  {
    id: 2,
    ticketNumber: 'TK-2024-002',
    subject: 'استفسار حول المنتج',
    description: 'أريد معرفة المزيد من التفاصيل حول مواصفات الهاتف المعروض',
    category: 'product',
    priority: 'medium',
    status: 'in_progress',
    customerName: 'فاطمة أحمد',
    customerEmail: 'fatima@example.com',
    assignedTo: 'سارة المطيري',
    createdAt: '2024-01-19',
    updatedAt: '2024-01-20',
    responses: [
      {
        id: 1,
        message: 'شكراً لتواصلك معنا. سنقوم بالرد على استفسارك في أقرب وقت ممكن.',
        isStaff: true,
        authorName: 'سارة المطيري',
        createdAt: '2024-01-19'
      }
    ],
    attachments: []
  },
  {
    id: 3,
    ticketNumber: 'TK-2024-003',
    subject: 'طلب استرداد',
    description: 'أريد استرداد المنتج الذي اشتريته لأنه لا يعمل بشكل صحيح',
    category: 'billing',
    priority: 'urgent',
    status: 'resolved',
    customerName: 'محمد سالم',
    customerEmail: 'mohammed@example.com',
    assignedTo: 'أحمد الخالد',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-19',
    responses: [
      {
        id: 1,
        message: 'تم معالجة طلب الاسترداد وسيتم تحويل المبلغ خلال 3-5 أيام عمل.',
        isStaff: true,
        authorName: 'أحمد الخالد',
        createdAt: '2024-01-19'
      }
    ],
    attachments: []
  }
];

export default function SupportTickets() {
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [newResponse, setNewResponse] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    priority: 'all'
  });

  const handleStatusChange = (ticketId: number, newStatus: SupportTicket['status']) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : ticket
    ));
  };

  const handleAssignTicket = (ticketId: number, assignee: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, assignedTo: assignee, status: 'in_progress', updatedAt: new Date().toISOString().split('T')[0] }
        : ticket
    ));
  };

  const handleAddResponse = () => {
    if (!selectedTicket || !newResponse.trim()) return;

    const response: TicketResponse = {
      id: Date.now(),
      message: newResponse,
      isStaff: true,
      authorName: 'أدمين النظام',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTickets(prev => prev.map(ticket => 
      ticket.id === selectedTicket.id 
        ? { 
            ...ticket, 
            responses: [...ticket.responses, response],
            status: 'in_progress',
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : ticket
    ));

    setNewResponse('');
    setShowResponseModal(false);
    
    // Update selected ticket
    setSelectedTicket(prev => prev ? {
      ...prev,
      responses: [...prev.responses, response],
      status: 'in_progress',
      updatedAt: new Date().toISOString().split('T')[0]
    } : null);
  };

  const filteredTickets = tickets.filter(ticket => {
    const statusMatch = filters.status === 'all' || ticket.status === filters.status;
    const categoryMatch = filters.category === 'all' || ticket.category === filters.category;
    const priorityMatch = filters.priority === 'all' || ticket.priority === filters.priority;
    return statusMatch && categoryMatch && priorityMatch;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      open: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    const labels = {
      open: 'مفتوح',
      in_progress: 'قيد المعالجة',
      resolved: 'تم الحل',
      closed: 'مغلق'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    const labels = {
      low: 'منخفض',
      medium: 'متوسط',
      high: 'عالي',
      urgent: 'عاجل'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[priority as keyof typeof styles]}`}>
        {labels[priority as keyof typeof labels]}
      </span>
    );
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      technical: 'تقني',
      billing: 'فوترة',
      product: 'منتج',
      account: 'حساب',
      other: 'أخرى'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in_progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
  const urgentTickets = tickets.filter(t => t.priority === 'urgent').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">تذاكر الدعم الفني</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{openTickets}</div>
              <div className="text-sm text-blue-800">تذاكر مفتوحة</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{inProgressTickets}</div>
              <div className="text-sm text-yellow-800">قيد المعالجة</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{resolvedTickets}</div>
              <div className="text-sm text-green-800">تم الحل</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{urgentTickets}</div>
              <div className="text-sm text-red-800">عاجل</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">جميع الحالات</option>
              <option value="open">مفتوح</option>
              <option value="in_progress">قيد المعالجة</option>
              <option value="resolved">تم الحل</option>
              <option value="closed">مغلق</option>
            </select>

            <select 
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="all">جميع الفئات</option>
              <option value="technical">تقني</option>
              <option value="billing">فوترة</option>
              <option value="product">منتج</option>
              <option value="account">حساب</option>
              <option value="other">أخرى</option>
            </select>

            <select 
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={filters.priority}
              onChange={(e) => setFilters({...filters, priority: e.target.value})}
            >
              <option value="all">جميع الأولويات</option>
              <option value="low">منخفض</option>
              <option value="medium">متوسط</option>
              <option value="high">عالي</option>
              <option value="urgent">عاجل</option>
            </select>

            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
              تصدير التقرير
            </button>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    رقم التذكرة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الموضوع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    العميل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الفئة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الأولوية
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المعين إليه
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    آخر تحديث
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{ticket.ticketNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                        {ticket.subject}
                      </div>
                      <div className="text-xs text-gray-500 max-w-xs truncate">
                        {ticket.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{ticket.customerName}</div>
                        <div className="text-sm text-gray-500">{ticket.customerEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getCategoryLabel(ticket.category)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPriorityBadge(ticket.priority)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(ticket.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ticket.assignedTo || 'غير معين'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ticket.updatedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setShowTicketModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          عرض
                        </button>
                        {ticket.status !== 'closed' && (
                          <button
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setShowResponseModal(true);
                            }}
                            className="text-green-600 hover:text-green-900"
                          >
                            رد
                          </button>
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

      {/* Ticket Detail Modal */}
      {showTicketModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                تذكرة رقم: {selectedTicket.ticketNumber}
              </h3>
              <button
                onClick={() => setShowTicketModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">الموضوع</h4>
                  <p className="text-gray-700">{selectedTicket.subject}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">الوصف</h4>
                  <p className="text-gray-700">{selectedTicket.description}</p>
                </div>

                {selectedTicket.attachments.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">المرفقات</h4>
                    <div className="flex space-x-2">
                      {selectedTicket.attachments.map((attachment, index) => (
                        <img 
                          key={index}
                          src={attachment} 
                          alt={`Attachment ${index + 1}`}
                          className="w-20 h-20 object-cover rounded border cursor-pointer"
                          onClick={() => window.open(attachment, '_blank')}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">المحادثة</h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {selectedTicket.responses.map((response) => (
                      <div key={response.id} className={`p-3 rounded-lg ${
                        response.isStaff ? 'bg-blue-50 ml-8' : 'bg-gray-50 mr-8'
                      }`}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {response.authorName}
                          </span>
                          <span className="text-xs text-gray-500">{response.createdAt}</span>
                        </div>
                        <p className="text-sm text-gray-700">{response.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">معلومات العميل</h4>
                  <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                    <div><strong>الاسم:</strong> {selectedTicket.customerName}</div>
                    <div><strong>البريد:</strong> {selectedTicket.customerEmail}</div>
                    {selectedTicket.customerPhone && (
                      <div><strong>الهاتف:</strong> {selectedTicket.customerPhone}</div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">تفاصيل التذكرة</h4>
                  <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <strong>الفئة:</strong>
                      <span>{getCategoryLabel(selectedTicket.category)}</span>
                    </div>
                    <div className="flex justify-between">
                      <strong>الأولوية:</strong>
                      {getPriorityBadge(selectedTicket.priority)}
                    </div>
                    <div className="flex justify-between">
                      <strong>الحالة:</strong>
                      {getStatusBadge(selectedTicket.status)}
                    </div>
                    <div className="flex justify-between">
                      <strong>المعين إليه:</strong>
                      <span>{selectedTicket.assignedTo || 'غير معين'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">إجراءات سريعة</h4>
                  <div className="space-y-2">
                    <select 
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      value={selectedTicket.status}
                      onChange={(e) => handleStatusChange(selectedTicket.id, e.target.value as SupportTicket['status'])}
                    >
                      <option value="open">مفتوح</option>
                      <option value="in_progress">قيد المعالجة</option>
                      <option value="resolved">تم الحل</option>
                      <option value="closed">مغلق</option>
                    </select>
                    
                    <select 
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      value={selectedTicket.assignedTo || ''}
                      onChange={(e) => handleAssignTicket(selectedTicket.id, e.target.value)}
                    >
                      <option value="">اختر المعين</option>
                      <option value="أحمد الخالد">أحمد الخالد</option>
                      <option value="سارة المطيري">سارة المطيري</option>
                      <option value="محمد العتيبي">محمد العتيبي</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                onClick={() => setShowTicketModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                إغلاق
              </button>
              <button
                onClick={() => {
                  setShowTicketModal(false);
                  setShowResponseModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                إضافة رد
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {showResponseModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              إضافة رد على التذكرة: {selectedTicket.ticketNumber}
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الرد
              </label>
              <textarea
                value={newResponse}
                onChange={(e) => setNewResponse(e.target.value)}
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="اكتب ردك هنا..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowResponseModal(false);
                  setNewResponse('');
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddResponse}
                disabled={!newResponse.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                إرسال الرد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}