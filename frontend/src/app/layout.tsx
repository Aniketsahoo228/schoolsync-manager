import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import '../../styles/global.css';

export const metadata: Metadata = {
  title: 'SchoolSync',
  description: 'SchoolSync dashboard',
};

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body>{children}</body>
    </html>
  );
}
