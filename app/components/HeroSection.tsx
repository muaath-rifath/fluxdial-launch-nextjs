import Link from "next/link";
import Globe from "./Globe";

export default function HeroSection() {
  return (
    <section className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-[var(--container-max)] flex-col lg:flex-row items-center justify-center lg:justify-start gap-12 lg:gap-8 px-4 py-24 sm:px-[var(--spacing-gutter)] md:px-10 lg:py-0">
      <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left gap-6 w-full lg:w-7/12">
        <h1 className="font-geist text-4xl font-semibold leading-tight tracking-tight text-on-surface sm:text-5xl lg:text-6xl">
          The AI Voice Engagement <br className="hidden lg:block" />
          Platform.
        </h1>
        <p className="max-w-2xl font-inter text-base leading-relaxed text-secondary sm:text-lg">
          Deploy intelligent voice agents that automatically reach people over phone calls, hold natural conversations, deliver information, and return structured outcomes at scale.
        </p>
        <div className="mt-2 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
          <Link href="#start" className="btn-primary text-center">
            Start Automating Calls
          </Link>
          <Link href="#docs" className="btn-secondary">
            View Documentation
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Globe Container - Absolute positioning with top-0 bottom-0 my-auto avoids min-height percentage bugs and locks to far right */}
      <div className="relative mt-12 lg:mt-0 w-full lg:absolute lg:top-0 lg:bottom-0 lg:my-auto lg:right-0 xl:-right-10 flex items-center justify-center pointer-events-none z-0 
        aspect-square lg:w-[500px] xl:w-[600px] max-w-[400px] md:max-w-[500px] lg:max-w-none 
        lg:h-[500px] xl:h-[600px] mx-auto lg:mx-0 lg:translate-y-8">
        {/* Glow effect behind the globe */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-container/20 to-primary/0 blur-3xl scale-90"></div>
        
        <div className="relative w-full h-full">
          <Globe />
        </div>
      </div>
    </section>
  );
}
