import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Privacy Policy — ErlangLabs",
  description: "Privacy policy and data handling practices for ErlangLabs.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-4 py-24 sm:px-[var(--spacing-gutter)] md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12">
            <h1 className="mb-4 font-geist text-4xl font-bold tracking-tight text-on-surface sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="font-mono text-sm text-secondary">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          <div className="flex flex-col gap-8 font-inter text-base leading-relaxed text-secondary">
            <section className="flex flex-col gap-4">
              <h2 className="font-geist text-2xl font-semibold text-on-surface">1. Information We Collect</h2>
              <p>
                At ErlangLabs, we collect information that you provide directly to us when you create an account, use our AI voice engagement platform, or communicate with us. This may include your name, email address, company details, billing information, and the contact lists or data schemas you upload for campaigns.
              </p>
              <p>
                We also automatically collect certain information about your device and usage of our services, including IP addresses, browser types, and log data related to call metrics and agent performance.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-geist text-2xl font-semibold text-on-surface">2. How We Use Your Information</h2>
              <p>
                The information we collect is strictly used to operate, maintain, and improve the ErlangLabs platform. This includes:
              </p>
              <ul className="ml-6 list-disc flex flex-col gap-2">
                <li>Executing outbound and inbound AI voice campaigns on your behalf.</li>
                <li>Processing transactions and sending related information.</li>
                <li>Analyzing call transcripts and extracting structured data as defined by your schemas.</li>
                <li>Improving our underlying AI models and speech synthesis quality.</li>
                <li>Sending technical notices, updates, and security alerts.</li>
              </ul>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-geist text-2xl font-semibold text-on-surface">3. Data Processing and Telephony Partners</h2>
              <p>
                To provide our core services, we securely share necessary data with trusted third-party infrastructure providers (such as WebRTC servers, SIP trunking providers, and LLM APIs). All such processing is governed by strict confidentiality agreements. We do not sell your personal data or campaign data to third parties.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-geist text-2xl font-semibold text-on-surface">4. Data Security</h2>
              <p>
                We implement enterprise-grade technical and organizational measures designed to protect your data against unauthorized access, destruction, or alteration. All voice data, transcripts, and extracted insights are encrypted in transit and at rest.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-geist text-2xl font-semibold text-on-surface">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact our data protection team at <a href="mailto:contact@erlanglabs.com" className="text-primary-container hover:underline">contact@erlanglabs.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
