import Link from "next/link";

export default function CTASection() {
  return (
    <section id="start" className="mx-auto flex max-w-4xl flex-col items-center gap-[var(--spacing-gutter)] px-4 py-32 text-center sm:px-[var(--spacing-gutter)] md:px-10">
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-primary-container/10 blur-3xl"></div>
        <h2 className="relative font-geist text-4xl font-bold leading-tight tracking-tighter text-on-surface sm:text-5xl">
          Ready to launch your voice campaigns?
        </h2>
      </div>
      <p className="font-inter text-base font-medium leading-relaxed text-secondary sm:text-lg">
        Create intelligent agents, upload your contacts, and start automating your outreach with the ultimate AI voice engagement platform.
      </p>
      <div className="mt-2 flex flex-col gap-4 sm:flex-row">
        <Link href="#start" className="btn-primary w-full px-8 py-4 sm:w-auto">
          Start Automating Calls
        </Link>
        <Link href="#contact" className="btn-secondary w-full px-8 py-4 sm:w-auto">
          Contact Sales
        </Link>
      </div>
    </section>
  );
}
