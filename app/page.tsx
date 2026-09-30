import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import ServiceBento from "@/components/ServiceBento";
import { AppBand, Benefits, Contact, Footer, News, Safety } from "@/components/Sections";
import HowItWorks from "@/components/how-it-works/HowItWorks";
import { Faq, MobileCTA, Reviews, Specialists } from "@/components/Interactive";

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white">
        Asosiy mazmunga o‘tish
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <ServiceBento />
        <HowItWorks />
        <Benefits />
        <Services />
        <AppBand />
        <Safety />
        <Specialists />
        <Reviews />
        <News />
        <Faq />
        <div className="h-3" />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
