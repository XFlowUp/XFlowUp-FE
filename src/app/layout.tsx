import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import TanstackQueryProvider from '@/shared/providers/TanstackQueryProvider';
import { ThemeProvider } from '@/shared/providers/ThemeProvider';
import GraphQLProvider from '@/shared/providers/GraphQL';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'XFlowup',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <TanstackQueryProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <GraphQLProvider>{children}</GraphQLProvider>
          </ThemeProvider>
        </body>
      </TanstackQueryProvider>
    </html>
  );
}
