import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "My personal trainer",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <header style={{padding:'20px 40px'}}><h1 style={{fontWeight:'bold', fontSize: '30px'}}>{ 'My Trainer' }</h1></header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
