'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Package, 
  Plus, 
  Store,
  ShoppingBag,
  Settings,
  LogOut
} from 'lucide-react';

const menuItems = [
  { href: '/vendor', label: 'لوحة التحكم', icon: BarChart3 },
  { href: '/vendor/products', label: 'المنتجات', icon: Package },
  { href: '/vendor/add-product', label: 'إضافة منتج', icon: Plus },
  { href: '/vendor/orders', label: 'الطلبات', icon: ShoppingBag },
  { href: '/vendor/store', label: 'إعدادات المتجر', icon: Store },
  { href: '/vendor/settings', label: 'الإعدادات', icon: Settings },
];

export default function VendorSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">لوحة البائع</h2>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-green-50 text-green-600 border-r-2 border-green-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full">
            <LogOut size={20} />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </div>
    </div>
  );
}