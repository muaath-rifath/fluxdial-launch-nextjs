import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-surface-border bg-surface-container-lowest">
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-2 gap-[var(--spacing-gutter)] px-4 py-16 sm:px-[var(--spacing-gutter)] md:grid-cols-4 md:px-10 lg:grid-cols-6">
        <div className="col-span-2 flex flex-col gap-2">
          <span className="font-geist text-xl font-bold tracking-tight text-on-surface">
            Erlang<span className="text-primary-container">Labs</span>
          </span>
          <p className="font-inter text-sm text-secondary">
            © 2024 ErlangLabs AI. All rights reserved. Precision voice engagement.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-sm font-medium text-on-surface">Product</span>
          <Link href="#features" className="font-inter text-sm text-secondary transition-colors hover:text-primary-container">Features</Link>
          <Link href="#pricing" className="font-inter text-sm text-secondary transition-colors hover:text-primary-container">Pricing</Link>
          <Link href="#docs" className="font-inter text-sm text-secondary transition-colors hover:text-primary-container">Documentation</Link>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-sm font-medium text-on-surface">Company</span>
          <Link href="#careers" className="font-inter text-sm text-secondary transition-colors hover:text-primary-container">Careers</Link>
          <Link href="#blog" className="font-inter text-sm text-secondary transition-colors hover:text-primary-container">Blog</Link>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-sm font-medium text-on-surface">Resources</span>
          <Link href="#api" className="font-inter text-sm text-secondary transition-colors hover:text-primary-container">API Reference</Link>
          <Link href="#community" className="font-inter text-sm text-secondary transition-colors hover:text-primary-container">Community</Link>
          <Link href="#status" className="font-inter text-sm text-secondary transition-colors hover:text-primary-container">Status</Link>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-sm font-medium text-on-surface">Legal</span>
          <Link href="/privacy" className="font-inter text-sm text-secondary transition-colors hover:text-primary-container">Privacy</Link>
          <Link href="/terms" className="font-inter text-sm text-secondary transition-colors hover:text-primary-container">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
