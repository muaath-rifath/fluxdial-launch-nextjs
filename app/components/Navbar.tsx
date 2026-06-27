import Link from "next/link";
import Image from "next/image";
import { ClientNav } from "./ClientNav";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-border bg-surface-container-lowest/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[var(--container-max)] items-center justify-between px-4 sm:px-[var(--spacing-gutter)] md:px-10">
        <div className="flex items-center gap-[var(--spacing-gutter)] w-full">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image src="/erlanglabs-logo-topbar.svg" alt="ErlangLabs Logo" width={700} height={140} className="h-8 w-auto object-contain" />
          </Link>
          <div className="flex-1 flex justify-end lg:justify-start items-center">
             <ClientNav />
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/early-access" className="btn-primary hidden sm:inline-flex whitespace-nowrap">
            Get Early Access
          </Link>
        </div>
      </div>
    </header>
  );
}
