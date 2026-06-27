import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Get Early Access — ErlangLabs",
  description: "Join the ErlangLabs early access waitlist to deploy enterprise AI voice agents.",
};

export default function EarlyAccessPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 sm:px-[var(--spacing-gutter)] md:px-10">
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
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="font-mono text-sm font-medium text-on-surface">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="rounded border border-surface-border bg-surface-container-lowest px-4 py-3 font-inter text-on-surface outline-none transition-colors focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                    placeholder="Jane"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="font-mono text-sm font-medium text-on-surface">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="rounded border border-surface-border bg-surface-container-lowest px-4 py-3 font-inter text-on-surface outline-none transition-colors focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono text-sm font-medium text-on-surface">
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="rounded border border-surface-border bg-surface-container-lowest px-4 py-3 font-inter text-on-surface outline-none transition-colors focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                  placeholder="jane@company.com"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="font-mono text-sm font-medium text-on-surface">
                  Company Size
                </label>
                <div className="relative">
                  <select
                    id="company"
                    defaultValue=""
                    className="w-full appearance-none rounded border border-surface-border bg-surface-container-lowest px-4 py-3 font-inter text-on-surface outline-none transition-colors focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                    required
                  >
                    <option value="" disabled>Select an option...</option>
                    <option value="1-50">1 - 50 employees</option>
                    <option value="51-200">51 - 200 employees</option>
                    <option value="201-1000">201 - 1000 employees</option>
                    <option value="1001+">1001+ employees</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-sm font-medium text-on-surface">
                  How can we help?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="resize-y rounded border border-surface-border bg-surface-container-lowest px-4 py-3 font-inter text-on-surface outline-none transition-colors focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                  placeholder="Tell us about your use case..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-primary mt-2 w-full text-center sm:w-auto sm:self-end">
                Join Waitlist
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
