import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

export const metadata = {
  title: "Contact Us — ErlangLabs",
  description: "Get in touch with the ErlangLabs team to discuss your enterprise AI voice needs.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 sm:px-[var(--spacing-gutter)] md:px-10">
        <div className="w-full max-w-2xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-geist text-4xl font-bold tracking-tight text-on-surface sm:text-5xl">
              Get in Touch
            </h1>
            <p className="font-inter text-lg text-secondary">
              Interested in deploying enterprise-grade AI voice agents? Our team is ready to help you build the perfect communication infrastructure.
            </p>
            <p className="mt-4 font-inter text-base text-secondary">
              Or email us directly at <a href="mailto:contact@erlanglabs.com" className="text-primary-container hover:underline">contact@erlanglabs.com</a>
            </p>
          </div>

          <div className="bento-card p-8 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
