import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "The Glo Alchemist Skin Care Analysis - Personalized Skincare Recommendations",
  description: "Get personalized skincare treatment recommendations from GloAlchemist specialists. Complete our quick skin analysis questionnaire to discover the perfect facial treatments, laser services, and skincare solutions for your unique skin concerns.",
  keywords: "skincare analysis, facial treatments, laser hair removal, acne treatment, anti-aging, skin consultation, GloAlchemist, personalized skincare, beauty treatments",
  authors: [{ name: "GloAlchemist" }],
  creator: "GloAlchemist",
  publisher: "GloAlchemist",
  robots: "index, follow",
  openGraph: {
    title: "The Glo Alchemist Skin Care Analysis - Personalized Skincare Recommendations",
    description: "Get personalized skincare treatment recommendations from GloAlchemist specialists. Complete our quick skin analysis questionnaire.",
    url: "https://thegloalchemist.com",
    siteName: "GloAlchemist",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Glo Alchemist Skin Care Analysis - Personalized Skincare Recommendations",
    description: "Get personalized skincare treatment recommendations from GloAlchemist specialists.",
    creator: "@gloalchemist",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f97316',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://thegloalchemist.com/skin-analysis" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "The Glo Alchemist Skin Care Analysis",
              "description": "Personalized skincare treatment recommendations based on skin type and concerns",
              "url": "https://cursor-glo.vercel.app/#services",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free skin analysis and consultation booking"
              },
              "provider": {
                "@type": "Organization",
                "name": "The Glo Alchemist Skin Care Clinic",
                "url": "https://thegloalchemist.com"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased font-inter`}>
        {children}
      </body>
    </html>
  );
}
