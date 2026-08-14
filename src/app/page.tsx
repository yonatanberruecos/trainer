import { inter, sora } from "./fonts";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import ValueProps from "../components/landing/ValueProps";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import ProductShowcase from "../components/landing/ProductShowcase";
import ForTrainers from "../components/landing/ForTrainers";
import Benefits from "../components/landing/Benefits";
import Safety from "../components/landing/Safety";
import Testimonials from "../components/landing/Testimonials";
import Faq from "../components/landing/Faq";
import FinalCta from "../components/landing/FinalCta";
import SiteFooter from "../components/landing/SiteFooter";

// Structured data for richer search results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Trainix",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  url: "https://trainixai.com",
  description:
    "Genera rutinas de entrenamiento personalizadas con inteligencia artificial. Recibe ejercicios, series, repeticiones y videos explicativos adaptados a tus objetivos.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "GenFit" },
};

export default function Home() {
  return (
    <div className={`${sora.variable} ${inter.variable} min-h-screen bg-trainix-bg font-inter text-trainix-text antialiased`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <ValueProps />
        <HowItWorks />
        <Features />
        <ProductShowcase />
        <ForTrainers />
        <Benefits />
        <Safety />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
