import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import LogoStrip from "./components/LogoStrip";
import CapabilitiesGrid from "./components/CapabilitiesGrid";
import TechSection from "./components/TechSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ErlangLabs | Enterprise AI Voice Agents",
  description: "Deploy intelligent AI voice agents that automate outbound dialing, handle inbound calls, and extract structured data seamlessly for your enterprise.",
  alternates: {
    canonical: "https://erlanglabs.com",
  }
};

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
