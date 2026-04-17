import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O‘zbekiston mustaqilligining 35 yilligi',
  description: 'O‘zbekiston mustaqilligining 35 yilligiga bag‘ishlangan rasmiy portal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}