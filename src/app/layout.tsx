import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header style={{padding:'20px 40px'}}><h1 style={{fontWeight:'bold', fontSize: '30px'}}>{ 'My Trainer' }</h1></header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
