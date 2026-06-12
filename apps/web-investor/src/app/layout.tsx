import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@fundos/ui';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

// Note: In a real environment, we would have the Satoshi woff2 file.
// For now, we'll fallback to sans-serif if it's missing, or use Inter as display too.
// For this environment, we'll use Inter for both display and body
// since we don't have the Satoshi woff2 file available.
const satoshi = {
  variable: '--font-display',
};

export const metadata: Metadata = {
  title: 'FundOS Investor | Confidence Meets Opportunity',
  description: 'AI-powered investing for institutional quality at any check size.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, satoshi.variable)}>
      <body className="bg-surface-app text-text-primary font-body antialiased">
        {children}
      </body>
    </html>
  );
}
