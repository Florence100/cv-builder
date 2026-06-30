import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { ApolloWrapper } from '@/src/app/providers';
import { MobileFallback } from '@/src/shared/ui/mobile-fallback';
import '../src/app/styles/globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'CV-Builder',
  description: 'The app for building CVs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} antialiased`}>
      <body>
        <NextIntlClientProvider>
          <ApolloWrapper>
            <div className="hidden md:flex min-h-dvh w-full flex-col items-center">{children}</div>
            <MobileFallback />
          </ApolloWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
