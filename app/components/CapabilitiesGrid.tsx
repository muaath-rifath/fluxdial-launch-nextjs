export default function CapabilitiesGrid() {
  return (
    <section id="solutions" className="mx-auto max-w-[var(--container-max)] px-4 py-24 sm:px-[var(--spacing-gutter)] md:px-10">
      <div className="mb-12">
        <h2 className="mb-2 font-geist text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">Domain-Agnostic Voice Campaigns</h2>
        <p className="max-w-3xl font-inter text-base font-medium leading-relaxed text-secondary sm:text-lg">
          From customer feedback to school announcements, FluxDial enables organizations to automate outbound communication, engage dynamically, and collect structured insights across any industry.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-[var(--spacing-gutter)] md:grid-cols-2 lg:grid-cols-3">
        {/* Large Card */}
        <div className="bento-card group flex flex-col justify-between p-8 transition-colors hover:border-outline md:col-span-2">
          <div className="mb-12">
            <svg className="mb-4 text-primary-container" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <h3 className="mb-2 font-geist text-xl font-semibold tracking-tight text-on-surface">Lead Qualification</h3>
            <p className="max-w-md font-inter text-sm leading-relaxed text-secondary sm:text-base">
              Automate outbound calls to navigate qualifying questions, handle objections natively, and seamlessly route high-intent prospects while logging structured CRM data.
            </p>
          </div>
          <div className="overflow-x-auto bento-inner-card">
            <pre className="font-mono text-xs text-on-surface-variant"><code>{`{
  "lead_score": 85,
  "intent": "high",
  "timeline": "Q3",
  "budget_confirmed": true
}`}</code></pre>
          </div>
        </div>

        {/* Small Card 1 */}
        <div className="bento-card group flex flex-col justify-between p-6 transition-colors hover:border-outline">
          <div className="mb-6">
            <svg className="mb-4 text-primary-container" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
              <path d="m9 16 2 2 4-4" />
            </svg>
            <h3 className="mb-2 font-geist text-xl font-semibold tracking-tight text-on-surface">Appointment Reminders</h3>
            <p className="font-inter text-sm leading-relaxed text-secondary sm:text-base">
              Deploy outbound agents for scheduling confirmations, handle reschedules dynamically, and seamlessly sync directly with your enterprise calendar APIs.
            </p>
          </div>
          <div className="overflow-x-auto bento-inner-card">
            <pre className="font-mono text-xs text-on-surface-variant"><code>{`{
  "status": "confirmed",
  "reschedule": null,
  "sync_to_cal": true
}`}</code></pre>
          </div>
        </div>

        {/* Small Card 2 */}
        <div className="bento-card group flex flex-col justify-between p-6 transition-colors hover:border-outline">
          <div className="mb-6">
            <svg className="mb-4 text-primary-container" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="10" cy="8" r="5" />
              <path d="M2 21a8 8 0 0 1 13.292-6" />
              <circle cx="18" cy="18" r="3" />
              <path d="m22 22-1.5-1.5" />
            </svg>
            <h3 className="mb-2 font-geist text-xl font-semibold tracking-tight text-on-surface">Recruitment Screening</h3>
            <p className="font-inter text-sm leading-relaxed text-secondary sm:text-base">
              Automate phone screenings to evaluate candidates at scale. Systematically assess basic requirements, availability, and communication skills before human review.
            </p>
          </div>
          <div className="overflow-x-auto bento-inner-card">
            <pre className="font-mono text-xs text-on-surface-variant"><code>{`{
  "fit_score": 92,
  "availability": "immediate",
  "verified": true
}`}</code></pre>
          </div>
        </div>

        {/* Medium Card */}
        <div className="bento-card group flex flex-col items-center gap-[var(--spacing-gutter)] p-6 transition-colors hover:border-outline md:col-span-2 md:flex-row">
          <div className="flex-1">
            <svg className="mb-4 text-primary-container" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M10.5 14.5 8 17l-1.5-1.5" />
              <path d="M10.5 19.5 8 22l-1.5-1.5" />
            </svg>
            <h3 className="mb-2 font-geist text-xl font-semibold tracking-tight text-on-surface">Surveys & Feedback</h3>
            <p className="font-inter text-sm leading-relaxed text-secondary sm:text-base">
              Automatically conduct conversational outbound surveys to gather actionable customer feedback, clarify intent, and process structured responses efficiently.
            </p>
          </div>
          <div className="flex h-32 w-full flex-1 items-center justify-center bento-inner-card">
            <div className="flex h-full w-full items-end justify-between gap-1 px-4">
              <div className="h-1/4 w-1/6 rounded-t bg-surface-bright"></div>
              <div className="h-1/2 w-1/6 rounded-t bg-surface-bright"></div>
              <div className="h-3/4 w-1/6 rounded-t bg-primary-container"></div>
              <div className="h-1/3 w-1/6 rounded-t bg-surface-bright"></div>
              <div className="h-2/3 w-1/6 rounded-t bg-surface-bright"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
