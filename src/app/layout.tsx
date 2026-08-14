import { Amplify } from 'aws-amplify';
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { inter, sora } from "./fonts";
import "./globals.css";
import { COGNITO_CONFIG } from '../../aws-exports'
import { I18nProvider } from "./context/I18nProvider";
import AppShell from '../components/AppShell';

// Configure AWS Amplify once globally
Amplify.configure(COGNITO_CONFIG, { ssr: false});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const SITE_URL = "https://trainixai.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Trainix | Rutinas de entrenamiento personalizadas con IA",
  description:
    "Genera rutinas de entrenamiento personalizadas con inteligencia artificial. Recibe ejercicios, series, repeticiones y videos explicativos adaptados a tus objetivos.",
  keywords: [
    "rutina personalizada",
    "rutina de gimnasio",
    "entrenador con inteligencia artificial",
    "generador de rutinas fitness",
    "rutinas de entrenamiento",
    "ejercicios con videos",
    "inteligencia artificial fitness",
    "rutina de gimnasio Colombia",
  ],
  manifest: "/manifest.json",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Trainix",
    title: "Trainix | Rutinas de entrenamiento personalizadas con IA",
    description:
      "Genera rutinas de entrenamiento personalizadas con inteligencia artificial. Recibe ejercicios, series, repeticiones y videos explicativos adaptados a tus objetivos.",
    images: [
      {
        url: "/trainix.png",
        width: 1200,
        height: 630,
        alt: "Trainix — Rutinas personalizadas con IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trainix | Rutinas de entrenamiento personalizadas con IA",
    description:
      "Genera rutinas de entrenamiento personalizadas con inteligencia artificial adaptadas a tus objetivos.",
    images: ["/trainix.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#05070D" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Trainix" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${roboto.className} overflow-x-hidden`}>
        <I18nProvider>
          <AppShell>{children}</AppShell>
        </I18nProvider>
      </body>
    </html>
  );
}
