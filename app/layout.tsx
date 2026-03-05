import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import './globals.css';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal',
});

export const metadata: Metadata = {
  title: 'ملفي الشخصي | Portfolio',
  description: 'سيرة ذاتية تفاعلية حديثة',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} scroll-smooth`} suppressHydrationWarning>
      <body suppressHydrationWarning className="font-tajawal antialiased transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
