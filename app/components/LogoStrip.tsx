export default function LogoStrip() {
  return (
    <section className="border-y border-surface-border bg-surface-container-lowest py-8">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col items-center gap-2 px-4 sm:px-[var(--spacing-gutter)] md:px-10">
        <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.1em] text-secondary">
          Powering Campaigns For
        </p>
        <ul aria-label="Industries we serve" className="mt-4 flex flex-wrap justify-center gap-8 opacity-60 grayscale md:gap-16 list-none p-0 m-0">
          <li className="font-geist text-xl font-bold tracking-tighter text-on-surface">Healthcare</li>
          <li className="font-geist text-xl font-bold tracking-tighter text-on-surface">Education</li>
          <li className="font-geist text-xl font-bold tracking-tighter text-on-surface">Recruitment</li>
          <li className="font-geist text-xl font-bold tracking-tighter text-on-surface">Government</li>
          <li className="font-geist text-xl font-bold tracking-tighter text-on-surface">Real Estate</li>
        </ul>
      </div>
    </section>
  );
}
