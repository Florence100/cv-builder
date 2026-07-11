import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { ApolloWrapper } from '@/src/app/providers';
import { MobileFallback } from '@/src/shared/ui/mobile-fallback';
import '../src/app/styles/globals.css';
import { cookies } from 'next/headers';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'CV-Builder',
  description: 'The app for building CVs',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'light';
  const serverThemeClass = theme === 'dark' ? 'dark' : '';

  return (
    <html lang="en" className={`${roboto.variable} ${serverThemeClass} antialiased`}>
      <head>
        {theme === 'device' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.classList.add('dark');
                }
              `,
            }}
          />
        )}
      </head>
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
