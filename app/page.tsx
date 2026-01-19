import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ContactSection from "@/components/landing/ContactSection";

export default function Home() {
  return (
    <main className="bg-rustic-black min-h-screen">
      <Navbar variant="landing" />
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
