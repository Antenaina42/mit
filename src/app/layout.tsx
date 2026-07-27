import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppBubble from "@/components/layout/WhatsAppBubble";
import Chatbot from "@/components/layout/Chatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "M-It LevelUp | Nous Construisons le Futur du Digital",
  description:
    "M-It LevelUp est une agence digitale premium basée à Madagascar. Nous créons des sites web, logiciels métiers, solutions IA et applications mobiles de classe mondiale pour les entreprises qui veulent croître plus vite.",
  keywords: [
    "agence digitale",
    "développement web",
    "développement application mobile",
    "solutions IA",
    "développement logiciel",
    "Madagascar",
    "M-It LevelUp",
    "logiciel entreprise",
    "CRM",
    "ERP",
  ],
  authors: [{ name: "M-It LevelUp" }],
  openGraph: {
    title: "M-It LevelUp | Nous Construisons le Futur du Digital",
    description:
      "Agence digitale premium créant des sites web, logiciels métiers, solutions IA et applications mobiles de classe mondiale.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen font-sans bg-background text-foreground">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <WhatsAppBubble />
        <Chatbot />
      </body>
    </html>
  );
}
