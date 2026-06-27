import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | ErlangLabs",
  description: "Terms of service and acceptable use policy for ErlangLabs. Read our guidelines for using our enterprise AI voice platform.",
  alternates: {
    canonical: "https://erlanglabs.com/terms",
  },
  openGraph: {
    title: "Terms and Conditions | ErlangLabs",
    description: "Terms of service and acceptable use policy for ErlangLabs. Read our guidelines for using our enterprise AI voice platform.",
    url: "https://erlanglabs.com/terms",
    siteName: "ErlangLabs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    site: "@erlanglabs",
    title: "Terms and Conditions | ErlangLabs",
    description: "Terms of service and acceptable use policy for ErlangLabs.",
  },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-4 py-24 sm:px-[var(--spacing-gutter)] md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12">
            <h1 className="mb-4 font-geist text-4xl font-bold tracking-tight text-on-surface sm:text-5xl">
              Terms and Conditions
            </h1>
            <p className="font-mono text-sm text-secondary">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          <div className="flex flex-col gap-8 font-inter text-base leading-relaxed text-secondary">
            <section className="flex flex-col gap-4">
              <h2 className="font-geist text-2xl font-semibold text-on-surface">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the ErlangLabs platform, website, and associated APIs (the "Services"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use our Services.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-geist text-2xl font-semibold text-on-surface">2. Description of Service</h2>
              <p>
                ErlangLabs provides an enterprise voice infrastructure platform that allows users to deploy AI voice agents for automated outbound and inbound calling, data extraction, and campaign management. The Services are provided "as is" and "as available".
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-geist text-2xl font-semibold text-on-surface">3. Acceptable Use Policy</h2>
              <p>
                You agree not to use the Services for any unlawful or prohibited activities. This includes, but is not limited to:
              </p>
              <ul className="ml-6 list-disc flex flex-col gap-2">
                <li>Violating any local, state, national, or international law or regulation regarding telecommunications and automated dialing (e.g., TCPA compliance in the United States).</li>
                <li>Transmitting fraudulent, deceptive, or misleading communications.</li>
                <li>Impersonating any person or entity without their explicit consent.</li>
                <li>Attempting to interfere with or compromise the system integrity or security of the platform.</li>
              </ul>
              <p>
                ErlangLabs reserves the right to immediately suspend or terminate accounts that violate this Acceptable Use Policy.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-geist text-2xl font-semibold text-on-surface">4. Data and Intellectual Property</h2>
              <p>
                You retain all rights to the contact data and schemas you upload to the platform. ErlangLabs retains all rights, title, and interest in and to the platform, including all associated intellectual property rights. You grant us a limited license to process your data solely to provide the Services.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-geist text-2xl font-semibold text-on-surface">5. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, ErlangLabs shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your use of the Services or any telecommunications compliance failures on your part.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-geist text-2xl font-semibold text-on-surface">6. Contact Information</h2>
              <p>
                For any questions regarding these Terms and Conditions, please contact us at <a href="mailto:contact@erlanglabs.com" className="text-primary-container hover:underline">contact@erlanglabs.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
