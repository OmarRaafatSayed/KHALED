import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import NewHeader from '@/components/NewHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'TailAdmin Marketplace - منصة التجارة الإلكترونية',
  description: 'منصة تجارة إلكترونية حديثة مبنية بـ Next.js و Laravel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-sans">
        <NewHeader />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster 
          position="top-center" 
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  )
}