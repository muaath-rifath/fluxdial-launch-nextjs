export default function TechSection() {
  return (
    <section id="features" className="border-y border-surface-border bg-surface-container-lowest px-4 py-24 sm:px-[var(--spacing-gutter)] md:px-10">
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 items-center gap-[var(--spacing-gutter)] lg:grid-cols-12">
        <div className="flex flex-col gap-4 pr-0 lg:col-span-6 lg:pr-12">
          <h2 className="font-geist text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">Intelligent Campaign Execution</h2>
          <p className="font-inter text-base font-medium leading-relaxed text-secondary sm:text-lg">
            Upload your contact lists, schedule campaigns, and define success criteria. ErlangLabs handles the dialing, connects the AI agent, and automatically extracts crucial insights into structured schemas.
          </p>
          <ul className="mt-2 flex flex-col gap-2">
            <li className="flex items-start gap-2">
              <svg className="mt-1 text-primary-container" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
              <span className="font-inter text-sm font-medium text-on-surface">Automated Outbound Dialing</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="mt-1 text-primary-container" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
              <span className="font-inter text-sm font-medium text-on-surface">Dynamic Knowledge Base Integration</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="mt-1 text-primary-container" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
              <span className="font-inter text-sm font-medium text-on-surface">Transcripts, Summaries, and Outcomes</span>
            </li>
          </ul>
        </div>
        <aside className="mt-12 lg:col-span-6 lg:mt-0">
          <div className="bento-card overflow-x-auto bg-[#0a0a0a] p-4 font-mono text-sm text-surface-container-lowest">
            <div className="mb-4 flex gap-2 border-b border-surface-border pb-2">
              <span className="h-3 w-3 rounded-full bg-error"></span>
              <span className="h-3 w-3 rounded-full bg-outline"></span>
              <span className="h-3 w-3 rounded-full bg-surface-bright"></span>
              <span className="ml-2 text-xs text-text-muted">agent_config.yaml</span>
            </div>
            <pre className="text-secondary"><code>
              <span className="text-primary-fixed-dim">agent_name:</span> "School Assistant"{"\n"}
              <span className="text-primary-fixed-dim">goal:</span> "Inform students about exam schedule changes"{"\n"}
              <span className="text-primary-fixed-dim">contact:</span> "John Doe"{"\n"}
              {"\n"}
              <span className="text-primary-fixed-dim">summary:</span> {`>`}{"\n"}
              {"  "}Student acknowledged announcement{"\n"}
              {"  "}and confirmed attendance.{"\n"}
              {"\n"}
              <span className="text-primary-fixed-dim">extracted_data:</span>{"\n"}
              {"  "}<span className="text-white">attendance:</span> <span className="text-tertiary">true</span>{"\n"}
              {"  "}<span className="text-white">questions:</span> <span className="text-tertiary">null</span>{"\n"}
              {"  "}<span className="text-white">callback_requested:</span> <span className="text-tertiary">false</span>
            </code></pre>
          </div>
        </aside>
      </div>
    </section>
  );
}
