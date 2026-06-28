import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EarlyAccessForm from "../components/EarlyAccessForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Early Access | ErlangLabs",
  description: "Join the ErlangLabs early access waitlist to deploy enterprise AI voice agents. Automate your customer engagement with our cutting-edge voice infrastructure.",
  alternates: {
    canonical: "https://erlanglabs.com/early-access",
  },
  openGraph: {
    title: "Get Early Access | ErlangLabs",
    description: "Join the ErlangLabs early access waitlist to deploy enterprise AI voice agents. Automate your customer engagement with our cutting-edge voice infrastructure.",
    url: "https://erlanglabs.com/early-access",
    siteName: "ErlangLabs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@erlanglabs",
    title: "Get Early Access | ErlangLabs",
    description: "Join the ErlangLabs early access waitlist to deploy enterprise AI voice agents.",
  },
};

export default function EarlyAccessPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 lg:py-24 sm:px-[var(--spacing-gutter)] md:px-10">
        <div className="w-full max-w-2xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-geist text-4xl font-bold tracking-tight text-on-surface sm:text-5xl">
              Join the Waitlist
            </h1>
            <p className="font-inter text-lg text-secondary">
              Be among the first to experience ErlangLabs's enterprise-grade AI voice infrastructure. Sign up below to get early access.
            </p>
          </div>

          <div className="bento-card p-8 sm:p-10">
            <EarlyAccessForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
