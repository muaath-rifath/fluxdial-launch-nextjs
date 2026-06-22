"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["solutions", "features"];
      let currentSection = "";
      
      const offset = window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset) {
            currentSection = section;
          }
        }
      }
      
      // Check if user has scrolled to the bottom
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
        currentSection = sections[sections.length - 1];
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-border bg-surface-container-lowest/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[var(--container-max)] items-center justify-between px-4 sm:px-[var(--spacing-gutter)] md:px-10">
        <div className="flex items-center gap-[var(--spacing-gutter)]">
          <Link href="/" className="font-geist text-xl font-bold tracking-tight text-on-surface">
            Flux<span className="text-primary-container">Dial</span>
          </Link>
          <nav className="hidden items-center gap-[var(--spacing-gutter)] pt-1 lg:flex">
            <Link
              href="/#solutions"
              className={`border-b-2 pb-1 font-inter text-sm transition-colors hover:text-primary active:opacity-80 ${
                activeSection === "solutions" && pathname !== "/contact"
                  ? "border-primary-container font-medium text-on-surface"
                  : "border-transparent text-secondary"
              }`}
            >
              Solutions
            </Link>
            <Link
              href="/#features"
              className={`border-b-2 pb-1 font-inter text-sm transition-colors hover:text-primary active:opacity-80 ${
                activeSection === "features" && pathname !== "/contact"
                  ? "border-primary-container font-medium text-on-surface"
                  : "border-transparent text-secondary"
              }`}
            >
              Features
            </Link>
            <Link
              href="/contact"
              className={`border-b-2 pb-1 font-inter text-sm transition-colors hover:text-primary active:opacity-80 ${
                pathname === "/contact"
                  ? "border-primary-container font-medium text-on-surface"
                  : "border-transparent text-secondary"
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">

          <button
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 text-on-surface"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`block h-[2px] w-5 bg-current transition-transform ${isMobileMenuOpen ? "translate-y-[8px] rotate-45" : ""}`}></span>
            <span className={`block h-[2px] w-5 bg-current transition-opacity ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block h-[2px] w-5 bg-current transition-transform ${isMobileMenuOpen ? "-translate-y-[8px] -rotate-45" : ""}`}></span>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-16 left-0 w-full bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-border transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col p-4 gap-4">
          <Link
            href="/#solutions"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`font-inter text-base transition-colors hover:text-primary ${
              activeSection === "solutions" && pathname !== "/contact"
                ? "font-medium text-primary-container"
                : "text-secondary"
            }`}
          >
            Solutions
          </Link>
          <Link
            href="/#features"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`font-inter text-base transition-colors hover:text-primary ${
              activeSection === "features" && pathname !== "/contact"
                ? "font-medium text-primary-container"
                : "text-secondary"
            }`}
          >
            Features
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`font-inter text-base transition-colors hover:text-primary ${
              pathname === "/contact"
                ? "font-medium text-primary-container"
                : "text-secondary"
            }`}
          >
            Contact
          </Link>

        </nav>
      </div>
    </header>
  );
}
