import React from 'react';

export const metadata = {
  title: 'FundOS Investor',
  description: 'FundOS Investor Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
