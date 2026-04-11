import './globals.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Splitly',
  description: 'Track and split expenses',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#08080B]" cz-shortcut-listen="true">
        {children}
      </body>
    </html>
  );
}
