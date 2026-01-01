'use client';

import { useState } from 'react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  usersCount: number;
  isSystem: boolean;
  createdAt: string;
}

const availablePermissions: Permission[] = [
  // Product Management
  { id: 'products.view', name: 'عرض المنتجات', description: 'يمكن عرض قائمة المنتجات', category: 'إدارة المنتجات' },
  { id: 'products.create', name: 'إضافة منتجات', description: 'يمكن إضافة منتجات جديدة', category: 'إدارة المنتجات' },
  { id: 'products.edit', name: 'تعديل المنتجات', description: 'يمكن تعديل المنتجات الموجودة', category: 'إدارة المنتجات' },
  { id: 'products.delete', name: 'حذف المنتجات', description: 'يمكن حذف المنتجات', category: 'إدارة المنتجات' },
  { id: 'categories.manage', name: 'إدارة التصنيفات', description: 'يمكن إدارة تصنيفات المنتجات', category: 'إدارة المنتجات' },
  
  // User Management
  { id: 'users.view', name: 'عرض المستخدمين', description: 'يمكن عرض قائمة المستخدمين', category: 'إدارة المستخدمين' },
  { id: 'users.edit', name: 'تعديل المستخدمين', description: 'يمكن تعديل بيانات المستخدمين', category: 'إدارة المستخدمين' },
  { id: 'users.ban', name: 'حظر المستخدمين', description: 'يمكن حظر وإلغاء حظر المستخدمين', category: 'إدارة المستخدمين' },
  { id: 'vendors.approve', name: 'اعتماد البائعين', description: 'يمكن الموافقة على طلبات البائعين', category: 'إدارة المستخدمين' },
  
  // Orders Management
  { id: 'orders.view', name: 'عرض الطلبات', description: 'يمكن عرض جميع الطلبات', category: 'إدارة الطلبات' },
  { id: 'orders.edit', name: 'تعديل الطلبات', description: 'يمكن تعديل حالة الطلبات', category: 'إدارة الطلبات' },
  { id: 'orders.refund', name: 'استرداد الطلبات', description: 'يمكن معالجة طلبات الاسترداد', category: 'إدارة الطلبات' },
  
  // Reports & Analytics
  { id: 'reports.sales', name: 'تقارير المبيعات', description: 'يمكن عرض تقارير المبيعات', category: 'التقارير والتحليلات' },
  { id: 'reports.financial', name: 'التقارير المالية', description: 'يمكن عرض التقارير المالية', category: 'التقارير والتحليلات' },
  { id: 'analytics.view', name: 'عرض التحليلات', description: 'يمكن عرض تحليلات الموقع', category: 'التقارير والتحليلات' },
  
  // System Settings
  { id: 'settings.general', name: 'الإعدادات العامة', description: 'يمكن تعديل إعدادات النظام', category: 'إعدادات النظام' },
  { id: 'settings.payments', name: 'إعدادات الدفع', description: 'يمكن إدارة طرق الدفع', category: 'إعدادات النظام' },
  { id: 'roles.manage', name: 'إدارة الأدوار', description: 'يمكن إنشاء وتعديل الأدوار والصلاحيات', category: 'إعدادات النظام' }
];

const mockRoles: Role[] = [
  {
    id: 1,
    name: 'مدير النظام',
    description: 'صلاحيات كاملة على جميع أجزاء النظام',
    permissions: availablePermissions.map(p => p.id),
    usersCount: 2,
    isSystem: true,
    createdAt: '2024-01-01'
  },
  {
    id: 2,
    name: 'مدير المنتجات',
    description: 'إدارة المنتجات والتصنيفات والبراندات',
    permissions: ['products.view', 'products.create', 'products.edit', 'products.delete', 'categories.manage'],
    usersCount: 5,
    isSystem: false,
    createdAt: '2024-01-10'
  },
  {
    id: 3,
    name: 'مشرف العملاء',
    description: 'إدارة المستخدمين والرد على الاستفسارات',
    permissions: ['users.view', 'users.edit', 'users.ban', 'orders.view'],
    usersCount: 3,
    isSystem: false,
    createdAt: '2024-01-15'
  },
  {
    id: 4,
    name: 'محلل البيانات',
    description: 'عرض التقارير والتحليلات فقط',
    permissions: ['reports.sales', 'reports.financial', 'analytics.view'],
    usersCount: 2,
    isSystem: false,
    createdAt: '2024-01-20'
  }
];

export default function RolesPermissions() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  const handleCreateRole = () => {
    const role: Role = {
      id: Date.now(),
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      usersCount: 0,
      isSystem: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setRoles(prev => [...prev, role]);
    setNewRole({ name: '', description: '', permissions: [] });
    setShowRoleModal(false);
  };

  const handleEditRole = () => {
    if (!editingRole) return;
    
    setRoles(prev => prev.map(role => 
      role.id === editingRole.id 
        ? { ...role, name: newRole.name, description: newRole.description, permissions: newRole.permissions }
        : role
    ));
    
    setEditingRole(null);
    setNewRole({ name: '', description: '', permissions: [] });
    setShowRoleModal(false);
  };

  const handleDeleteRole = (roleId: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الدور؟')) {
      setRoles(prev => prev.filter(role => role.id !== roleId));
    }
  };

  const openEditModal = (role: Role) => {
    setEditingRole(role);
    setNewRole({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions]
    });
    setShowRoleModal(true);
  };

  const togglePermission = (permissionId: string) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const groupedPermissions = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">الأدوار والصلاحيات</h1>
            <button
              onClick={() => {
                setEditingRole(null);
                setNewRole({ name: '', description: '', permissions: [] });
                setShowRoleModal(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              إضافة دور جديد
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{roles.length}</div>
              <div className="text-sm text-blue-800">إجمالي الأدوار</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{availablePermissions.length}</div>
              <div className="text-sm text-green-800">إجمالي الصلاحيات</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {roles.reduce((acc, role) => acc + role.usersCount, 0)}
              </div>
              <div className="text-sm text-purple-800">المستخدمين المعينين</div>
            </div>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div key={role.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                  {role.isSystem && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      نظام
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">عدد الصلاحيات:</span>
                    <span className="font-medium">{role.permissions.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">المستخدمين:</span>
                    <span className="font-medium">{role.usersCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">تاريخ الإنشاء:</span>
                    <span className="font-medium">{role.createdAt}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">الصلاحيات:</h4>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 3).map((permissionId) => {
                      const permission = availablePermissions.find(p => p.id === permissionId);
                      return permission ? (
                        <span key={permissionId} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {permission.name}
                        </span>
                      ) : null;
                    })}
                    {role.permissions.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        +{role.permissions.length - 3} أخرى
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(role)}
                    className="flex-1 px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    تعديل
                  </button>
                  {!role.isSystem && (
                    <button
                      onClick={() => handleDeleteRole(role.id)}
                      className="flex-1 px-3 py-2 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      حذف
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingRole ? 'تعديل الدور' : 'إضافة دور جديد'}
              </h3>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم الدور
                  </label>
                  <input
                    type="text"
                    value={newRole.name}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="أدخل اسم الدور"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الوصف
                  </label>
                  <input
                    type="text"
                    value={newRole.description}
                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="وصف مختصر للدور"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-4">الصلاحيات</h4>
                <div className="space-y-4">
                  {Object.entries(groupedPermissions).map(([category, permissions]) => (
                    <div key={category} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-3">{category}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {permissions.map((permission) => (
                          <label key={permission.id} className="flex items-start space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={newRole.permissions.includes(permission.id)}
                              onChange={() => togglePermission(permission.id)}
                              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                              <div className="text-xs text-gray-500">{permission.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                إلغاء
              </button>
              <button
                onClick={editingRole ? handleEditRole : handleCreateRole}
                disabled={!newRole.name.trim() || !newRole.description.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingRole ? 'حفظ التغييرات' : 'إنشاء الدور'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}