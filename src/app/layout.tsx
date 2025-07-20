import { Amplify } from 'aws-amplify';
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { COGNITO_CONFIG } from '../../aws-exports'
import { ResourcesConfig } from "aws-amplify";
import { MainContextAppProvider } from "./context/MainContextAppProvider";
import AmplifyProvider from './AmplifyProvider';

// Configure AWS Amplify once globally
Amplify.configure(COGNITO_CONFIG, { ssr: false});

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "My personal trainer",
  description: "Generate workout routine with gemini ai help",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <body className={roboto.className}>
        <header style={{padding:'20px 40px'}}><h1 style={{fontWeight:'bold', fontSize: '30px'}}>{ 'My Trainer test' }</h1></header>
        <main>
        <AmplifyProvider>
          <MainContextAppProvider>
            {children}
          </MainContextAppProvider>
        </AmplifyProvider>
        </main>
      </body>
    </html>
  );
}
