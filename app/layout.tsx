import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { SiteProvider } from "@/context/SiteContext";
import { AuthProvider } from "@/context/AuthContext";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Blade Media | Growth, Engineered.",
    template: "%s | Blade Media"
  },
  description: "Blade Media - The institutional engine for systematized visual dominance. High-velocity content production and strategic growth systems for elite creators.",
  keywords: ["Content Agency", "Video Editing", "Social Media Growth", "Visual Dominance", "Viral Content", "Blade Media", "Content Strategy", "Retention Editing"],
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    title: "Blade Media",
    statusBarStyle: "black-translucent",
  },
  authors: [{ name: "Piyush", url: "https://blademedia.in" }],
  creator: "Blade Media",
  publisher: "Blade Media",
  metadataBase: new URL("https://blademedia.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Blade Media | Growth, Engineered.",
    description: "The institutional engine for systematized visual dominance.",
    url: "https://blademedia.in",
    siteName: "Blade Media",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blade Media - Growth, Engineered.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blade Media | Growth, Engineered.",
    description: "The institutional engine for systematized visual dominance.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/blade-logo.png",
    shortcut: "/blade-logo.png",
    apple: "/blade-logo.png",
  },
  verification: {
    google: "s1LJv7f1Cy938IT3wDll5_6ndlN2HaPPB-8mpmCXCf4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Blade Media",
    "url": "https://blademedia.in",
    "logo": "https://blademedia.in/blade-logo.png",
    "description": "The institutional engine for systematized visual dominance.",
    "founder": {
      "@type": "Person",
      "name": "Piyush"
    },
    "sameAs": [
      "https://www.instagram.com/blademedia",
      "https://twitter.com/blademedia"
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black">
        <AuthProvider>
          <Toaster position="top-right" richColors theme="dark" />
          <SiteProvider>
            {children}
            <CookieConsent />
          </SiteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
