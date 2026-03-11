import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cricket AI Studio - AI-Powered Cricket Analytics',
  description: 'Real-time cricket analytics, AI-powered insights, win probability predictions, and comprehensive match analysis.',
  keywords: ['cricket', 'analytics', 'AI', 'live scores', 'win probability', 'match insights'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-primary">
            <Header />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 p-4 md:p-6 lg:p-8 ml-0 lg:ml-64">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
