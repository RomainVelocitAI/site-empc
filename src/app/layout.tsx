import type { Metadata } from 'next';
import { Lora, DM_Sans } from 'next/font/google';
import './globals.css';
import { defaultMetadata } from '@/lib/metadata';
import { organizationSchema, doctorSchema, websiteSchema } from '@/lib/schema';

// Editorial serif for headings - elegant, literary, warm
const lora = Lora({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  style: ['normal', 'italic'],
});

// Modern humanist sans for body - friendly, readable, distinctive
const dmSans = DM_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  ...defaultMetadata,
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="theme-color" content="#5C6B4A" />
        <meta name="color-scheme" content="light" />
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(doctorSchema),
          }}
        />
      </head>
      <body className={`${lora.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
