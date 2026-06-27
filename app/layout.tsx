import type { Metadata } from "next";
import { Geist, Inter, JetBrains_Mono, Figtree } from "next/font/google";
import "./globals.css";
import InteractiveBackground from "./components/InteractiveBackground";
import { cn } from "@/lib/utils";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://erlanglabs.com"),
  title: {
    default: "ErlangLabs | AI Voice Engagement Platform",
    template: "%s | ErlangLabs",
  },
  description: "The Voice Infrastructure for Enterprise AI. Deploy intelligent voice agents that sound human and reason like software. Automate outbound and inbound calls seamlessly.",
  keywords: ["AI Voice", "Enterprise AI", "Voice Agents", "Voice AI", "ErlangLabs", "AI Infrastructure", "Conversational AI", "Outbound Automation", "Inbound Automation", "AI Caller"],
  authors: [{ name: "ErlangLabs", url: "https://erlanglabs.com" }],
  creator: "ErlangLabs",
  publisher: "ErlangLabs",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ErlangLabs | AI Voice Engagement Platform",
    description: "The Voice Infrastructure for Enterprise AI. Deploy intelligent voice agents that sound human and reason like software. Automate outbound and inbound calls seamlessly.",
    url: "https://erlanglabs.com",
    siteName: "ErlangLabs",
    images: [
      {
        url: "https://erlanglabs.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ErlangLabs - AI Voice Engagement Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@erlanglabs",
    creator: "@erlanglabs",
    title: "ErlangLabs | AI Voice Engagement Platform",
    description: "The Voice Infrastructure for Enterprise AI. Deploy intelligent voice agents that sound human and reason like software.",
    images: ["https://erlanglabs.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, inter.variable, jetbrainsMono.variable, "font-sans", figtree.variable)}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <InteractiveBackground />
        {children}
      </body>
    </html>
  );
}
