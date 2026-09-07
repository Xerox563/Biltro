import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import BrandStrip from "@/components/landing/BrandStrip";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import CTA from "@/components/landing/CTA";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <Hero />
      <BrandStrip />
      <HowItWorks />
      <Features />
      <CTA />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
