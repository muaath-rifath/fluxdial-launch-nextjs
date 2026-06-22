import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import LogoStrip from "./components/LogoStrip";
import CapabilitiesGrid from "./components/CapabilitiesGrid";
import TechSection from "./components/TechSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <LogoStrip />
        <CapabilitiesGrid />
        <TechSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
