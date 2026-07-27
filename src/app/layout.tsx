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
  metadataBase: new URL('https://m-itlevelup.com'),
  title: "M-It LevelUp | Agence Digitale Premium & Solutions IA à Madagascar",
  description:
    "M-It LevelUp est l'agence digitale de référence à Madagascar. Experts en création de sites web performants, logiciels métiers sur mesure (ERP/CRM), et intégration d'Intelligence Artificielle pour propulser votre entreprise.",
  keywords: [
    "agence digitale madagascar",
    "création site web madagascar",
    "développement application mobile antananarivo",
    "solutions intelligence artificielle madagascar",
    "développement logiciel sur mesure",
    "M-It LevelUp",
    "agence web premium",
    "intégration IA entreprise",
    "création ERP CRM madagascar"
  ],
  authors: [{ name: "M-It LevelUp", url: "https://m-itlevelup.com" }],
  openGraph: {
    title: "M-It LevelUp | Agence Digitale Premium & IA à Madagascar",
    description:
      "Transformez votre vision en réalité avec M-It LevelUp. Création de sites web, logiciels métiers et solutions IA de classe mondiale à Madagascar.",
    url: "https://m-itlevelup.com",
    siteName: "M-It LevelUp",
    images: [
      {
        url: "/og-image.jpg", // Make sure to add this image later
        width: 1200,
        height: 630,
        alt: "M-It LevelUp Agency",
      },
    ],
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "M-It LevelUp | Agence Digitale Premium & IA",
    description: "Experts en création de sites web, applications mobiles et solutions IA à Madagascar.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "M-It LevelUp",
              "url": "https://m-itlevelup.com",
              "logo": "https://m-itlevelup.com/logo.png",
              "image": "https://m-itlevelup.com/og-image.jpg",
              "description": "M-It LevelUp est une agence digitale premium basée à Madagascar, spécialisée dans la création de sites web, applications mobiles, logiciels métiers et solutions d'Intelligence Artificielle.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Antananarivo",
                "addressCountry": "MG"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-18.8792",
                "longitude": "47.5079"
              },
              "priceRange": "$$",
              "telephone": "+261340000000",
              "email": "contact@m-itlevelup.com",
              "sameAs": [
                "https://www.linkedin.com/company/m-it-levelup",
                "https://www.facebook.com/mitlevelup"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen font-sans bg-background text-foreground">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <WhatsAppBubble />
        <Chatbot />
      </body>
    </html>
  );
}
