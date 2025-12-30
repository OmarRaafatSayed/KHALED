import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Truck, Shield, Heart } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-primary-100 py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                اكتشف أفضل
                <span className="text-primary block">المنتجات</span>
                في مكان واحد
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                منصة تسوق حديثة تجمع أفضل البائعين والمنتجات عالية الجودة
                مع تجربة تسوق سهلة وآمنة
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-4">
                  <ShoppingBag className="ml-2 h-5 w-5" />
                  تسوق الآن
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  انضم كبائع
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 rounded-lg h-32"></div>
                  <div className="bg-gray-200 rounded-lg h-32"></div>
                  <div className="bg-gray-200 rounded-lg h-32"></div>
                  <div className="bg-gray-100 rounded-lg h-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              لماذا تختار منصتنا؟
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              نوفر لك تجربة تسوق متميزة مع أفضل الخدمات والضمانات
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">تسوق آمن</h3>
              <p className="text-gray-600">نظام دفع آمن ومضمون مع حماية كاملة لبياناتك</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                <Truck className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">توصيل سريع</h3>
              <p className="text-gray-600">توصيل سريع وموثوق إلى باب منزلك</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">منتجات مميزة</h3>
              <p className="text-gray-600">منتجات عالية الجودة من بائعين موثوقين</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                <ShoppingBag className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">تجربة سهلة</h3>
              <p className="text-gray-600">واجهة بسيطة وسهلة الاستخدام</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              تسوق حسب الفئة
            </h2>
            <p className="text-lg text-gray-600">
              اكتشف مجموعة واسعة من المنتجات في جميع الفئات
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              'إلكترونيات',
              'أزياء',
              'منزل وحديقة',
              'رياضة',
              'جمال وعناية',
              'كتب'
            ].map((category, index) => (
              <Link
                key={index}
                href={`/products?category=${category}`}
                className="group bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-gray-100 w-16 h-16 rounded-full mx-auto mb-4 group-hover:bg-primary-100 transition-colors"></div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            ابدأ رحلة التسوق الآن
          </h2>
          <p className="text-xl mb-8 opacity-90">
            انضم إلى آلاف العملاء الراضين واكتشف تجربة تسوق جديدة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              إنشاء حساب جديد
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
              تصفح المنتجات
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}