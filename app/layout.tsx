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
  title: "FluxDial — AI Voice Engagement Platform",
  description: "The Voice Infrastructure for Enterprise AI. Deploy intelligent voice agents that sound human and reason like software.",
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
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <InteractiveBackground />
        {children}
      </body>
    </html>
  );
}
