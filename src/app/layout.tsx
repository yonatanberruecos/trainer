import { Amplify } from 'aws-amplify';
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { COGNITO_CONFIG } from '../../aws-exports'
import { ResourcesConfig } from "aws-amplify";
import { MainContextAppProvider } from "./context/MainContextAppProvider";
import AmplifyProvider from './AmplifyProvider';
import Header from '../components/Header';

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
        <Header />
        <main style={{paddingBottom: '120px'}}>
        <AmplifyProvider>
          <MainContextAppProvider>
            {children}
          </MainContextAppProvider>
        </AmplifyProvider>
        </main>
        <footer className="fixed bottom-0 left-0 right-0 h-[120px] bg-white border-t border-gray-200 flex items-center justify-center z-50">
          <nav className="flex justify-around items-center w-full max-w-4xl px-4">
            <a 
              href="#" 
              className="flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-gray-900 transition-colors p-3 min-w-[80px]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-xs font-medium">Privacy</span>
            </a>
            <a 
              href="#" 
              className="flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-gray-900 transition-colors p-3 min-w-[80px]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
              <span className="text-xs font-medium">Data</span>
            </a>
            <a 
              href="#" 
              className="flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-gray-900 transition-colors p-3 min-w-[80px]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xs font-medium">Terms</span>
            </a>
            <a 
              href="#" 
              className="flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-gray-900 transition-colors p-3 min-w-[80px]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-medium">About</span>
            </a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
