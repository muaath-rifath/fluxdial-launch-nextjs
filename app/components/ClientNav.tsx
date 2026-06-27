"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function ClientNav() {
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
      
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
        currentSection = sections[sections.length - 1];
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
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

      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 text-on-surface ml-4"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle Menu"
      >
        <span className={`block h-[2px] w-5 bg-current transition-transform ${isMobileMenuOpen ? "translate-y-[8px] rotate-45" : ""}`}></span>
        <span className={`block h-[2px] w-5 bg-current transition-opacity ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
        <span className={`block h-[2px] w-5 bg-current transition-transform ${isMobileMenuOpen ? "-translate-y-[8px] -rotate-45" : ""}`}></span>
      </button>

      {/* Mobile Menu Dropdown */}
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
          <div className="h-px w-full bg-surface-border my-2"></div>
          <Link
            href="/early-access"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-primary w-full text-center mt-2 sm:hidden"
          >
            Get Early Access
          </Link>
        </nav>
      </div>
    </>
  );
}
