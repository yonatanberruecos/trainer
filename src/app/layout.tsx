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
  title: "Trainix — AI Workout Routines",
  description: "Generate your personalized AI-powered workout routine with Trainix by GenFit.",
  manifest: "/manifest.json",
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
        <meta name="theme-color" content="#00ff87" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Trainix" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${roboto.className} overflow-x-hidden`}>
        <I18nProvider>
          <Header />
          <main className="pb-20 md:pb-[120px]">
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
