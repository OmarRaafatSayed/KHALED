import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <div className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold">
                T
              </div>
              <span className="text-xl font-bold">TailAdmin</span>
            </div>
            <p className="text-gray-400 mb-4">
              منصة التجارة الإلكترونية الرائدة في المنطقة. نوفر أفضل المنتجات من بائعين موثوقين.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-400 hover:text-white">المنتجات</Link></li>
              <li><Link href="/categories" className="text-gray-400 hover:text-white">الفئات</Link></li>
              <li><Link href="/deals" className="text-gray-400 hover:text-white">العروض</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">من نحن</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">خدمة العملاء</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-400 hover:text-white">اتصل بنا</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white">الأسئلة الشائعة</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white">الشحن والتوصيل</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white">الإرجاع والاستبدال</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">+966 50 123 4567</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">info@tailadmin.com</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} TailAdmin. جميع الحقوق محفوظة.
          </p>
          <div className="flex space-x-6 space-x-reverse mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}