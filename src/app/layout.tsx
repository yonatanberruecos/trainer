import { Amplify } from 'aws-amplify';
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { COGNITO_CONFIG } from '../../aws-exports'
import { ResourcesConfig } from "aws-amplify";
import { MainContextAppProvider } from "./context/MainContextAppProvider";
import { I18nProvider } from "./context/I18nProvider";
import AmplifyProvider from './AmplifyProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
        <I18nProvider>
          <Header />
          <main style={{paddingBottom: '120px'}}>
          <AmplifyProvider>
            <MainContextAppProvider>
              {children}
            </MainContextAppProvider>
          </AmplifyProvider>
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
