import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import BrandStrip from "@/components/landing/BrandStrip";
import ProblemSolution from "@/components/landing/ProblemSolution";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import CTA from "@/components/landing/CTA";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <AnimatedBackground intensity={0.55} />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <BrandStrip />
      <ProblemSolution />
      <HowItWorks />
      <Features />
      <CTA />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
