'use client';

import { useState } from 'react';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'vendor' | 'admin' | 'moderator';
  status: 'active' | 'banned' | 'pending';
  avatar: string;
  joinDate: string;
  lastLogin: string;
  totalOrders: number;
  totalSpent: number;
  isVerified: boolean;
  location: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'أحمد محمد علي',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    role: 'customer',
    status: 'active',
    avatar: '/api/placeholder/40/40',
    joinDate: '2024-01-15',
    lastLogin: '2024-01-20',
    totalOrders: 12,
    totalSpent: 2450.00,
    isVerified: true,
    location: 'الرياض، السعودية'
  },
  {
    id: 2,
    name: 'فاطمة أحمد',
    email: 'fatima@example.com',
    phone: '+966507654321',
    role: 'vendor',
    status: 'active',
    avatar: '/api/placeholder/40/40',
    joinDate: '2024-01-10',
    lastLogin: '2024-01-19',
    totalOrders: 0,
    totalSpent: 0,
    isVerified: true,
    location: 'جدة، السعودية'
  },
  {
    id: 3,
    name: 'محمد سالم',
    email: 'mohammed@example.com',
    phone: '+966509876543',
    role: 'customer',
    status: 'banned',
    avatar: '/api/placeholder/40/40',
    joinDate: '2024-01-05',
    lastLogin: '2024-01-18',
    totalOrders: 3,
    totalSpent: 150.00,
    isVerified: false,
    location: 'الدمام، السعودية'
  }
];

export default function Users() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
    verified: 'all'
  });
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleStatusChange = (userId: number, newStatus: 'active' | 'banned') => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedUsers(checked ? filteredUsers.map(u => u.id) : []);
  };

  const handleSelectUser = (userId: number, checked: boolean) => {
    setSelectedUsers(prev => 
      checked ? [...prev, userId] : prev.filter(id => id !== userId)
    );
  };

  const filteredUsers = users.filter(user => {
    const roleMatch = filters.role === 'all' || user.role === filters.role;
    const statusMatch = filters.status === 'all' || user.status === filters.status;
    const verifiedMatch = filters.verified === 'all' || 
      (filters.verified === 'verified' && user.isVerified) ||
      (filters.verified === 'unverified' && !user.isVerified);
    return roleMatch && statusMatch && verifiedMatch;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      banned: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    const labels = {
      active: 'نشط',
      banned: 'محظور',
      pending: 'في الانتظار'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      customer: 'bg-blue-100 text-blue-800',
      vendor: 'bg-purple-100 text-purple-800',
      admin: 'bg-red-100 text-red-800',
      moderator: 'bg-orange-100 text-orange-800'
    };
    const labels = {
      customer: 'عميل',
      vendor: 'بائع',
      admin: 'أدمين',
      moderator: 'مشرف'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[role as keyof typeof styles]}`}>
        {labels[role as keyof typeof labels]}
      </span>
    );
  };

  const activeUsers = users.filter(u => u.status === 'active').length;
  const bannedUsers = users.filter(u => u.status === 'banned').length;
  const verifiedUsers = users.filter(u => u.isVerified).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">إدارة المستخدمين</h1>
            <div className="flex space-x-3">
              <Link 
                href="/admin-dashboard/users/vendors"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                إدارة البائعين
              </Link>
              <Link 
                href="/admin-dashboard/users/roles"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                الأدوار والصلاحيات
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{users.length}</div>
              <div className="text-sm text-blue-800">إجمالي المستخدمين</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
              <div className="text-sm text-green-800">المستخدمين النشطين</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{bannedUsers}</div>
              <div className="text-sm text-red-800">المستخدمين المحظورين</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{verifiedUsers}</div>
              <div className="text-sm text-purple-800">المستخدمين الموثقين</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={filters.role}
              onChange={(e) => setFilters({...filters, role: e.target.value})}
            >
              <option value="all">جميع الأدوار</option>
              <option value="customer">العملاء</option>
              <option value="vendor">البائعين</option>
              <option value="admin">الأدمن</option>
              <option value="moderator">المشرفين</option>
            </select>

            <select 
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="banned">محظور</option>
              <option value="pending">في الانتظار</option>
            </select>

            <select 
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={filters.verified}
              onChange={(e) => setFilters({...filters, verified: e.target.value})}
            >
              <option value="all">جميع المستخدمين</option>
              <option value="verified">موثق</option>
              <option value="unverified">غير موثق</option>
            </select>

            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
              تصدير البيانات
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <span className="text-blue-800">تم تحديد {selectedUsers.length} مستخدم</span>
              <div className="space-x-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  تفعيل المحدد
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  حظر المحدد
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                  حذف المحدد
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المستخدم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الدور
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الطلبات
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    إجمالي الإنفاق
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    آخر دخول
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-10 h-10 rounded-full ml-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {user.name}
                            {user.isVerified && (
                              <span className="mr-2 text-green-500 text-xs">✓</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400">{user.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.totalOrders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${user.totalSpent.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          عرض
                        </button>
                        <button
                          onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'banned' : 'active')}
                          className={`${
                            user.status === 'active' 
                              ? 'text-red-600 hover:text-red-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {user.status === 'active' ? 'حظر' : 'تفعيل'}
                        </button>
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
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">تفاصيل المستخدم</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={selectedUser.avatar} 
                  alt={selectedUser.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-gray-900 flex items-center">
                    {selectedUser.name}
                    {selectedUser.isVerified && (
                      <span className="mr-2 text-green-500">✓ موثق</span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                  <p className="text-sm text-gray-500">{selectedUser.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">الدور</label>
                  <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">الحالة</label>
                  <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">تاريخ الانضمام</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">آخر دخول</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.lastLogin}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">إجمالي الطلبات</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.totalOrders}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">إجمالي الإنفاق</label>
                  <p className="mt-1 text-sm text-gray-900">${selectedUser.totalSpent.toFixed(2)}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">الموقع</label>
                <p className="mt-1 text-sm text-gray-900">{selectedUser.location}</p>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  إغلاق
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  تعديل المستخدم
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}