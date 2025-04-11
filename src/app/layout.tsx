// src/app/layout.tsx
import '../styles/globals.css';
import type { Metadata } from 'next';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Haramain Volunteers',
  description: 'Volunteer platform for the Presidency of Religious Affairs at the Grand Mosque and the Prophet\'s Mosque',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap" 
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}