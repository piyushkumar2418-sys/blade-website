import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { SiteProvider } from "@/context/SiteContext";
import { AuthProvider } from "@/context/AuthContext";
import CookieConsent from "@/components/CookieConsent";
import { Analytics } from "@vercel/analytics/react";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import PostHogPageview from "@/components/providers/PostHogPageview";
import { Suspense } from "react";
import Script from "next/script";
import { headers } from "next/headers";

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

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  let host = "";
  try {
    const headersList = await headers();
    host = headersList.get("host") || "";
  } catch (e) {
    // Fail-safe for build time or environments where headers() is not available
    console.warn("Could not retrieve host header in generateMetadata:", e);
  }
  
  const isInnerCircle = host.includes("innercircle.in") || host.includes("innercircle");

  if (isInnerCircle) {
    return {
      title: {
        default: "Blade Inner Circle | The School of Modern Content",
        template: "%s | Blade Inner Circle"
      },
      description: "The Blade Inner Circle is the elite community and training ground for modern content creators, high-ticket founders, and operators.",
      keywords: ["Inner Circle", "Modern Content", "Creator Community", "High-Ticket Founders", "Blade Inner Circle"],
      appleWebApp: {
        title: "Blade Inner Circle",
        statusBarStyle: "black-translucent",
      },
      authors: [{ name: "Piyush", url: "https://innercircle.in" }],
      creator: "Blade Inner Circle",
      publisher: "Blade Inner Circle",
      metadataBase: new URL("https://innercircle.in"),
      alternates: {
        canonical: "/",
      },
      openGraph: {
        title: "Blade Inner Circle | The School of Modern Content",
        description: "The Blade Inner Circle is the elite community and training ground for modern content creators, high-ticket founders, and operators.",
        url: "https://innercircle.in",
        siteName: "Blade Inner Circle",
        images: [
          {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: "Blade Inner Circle | The School of Modern Content",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Blade Inner Circle | The School of Modern Content",
        description: "The Blade Inner Circle is the elite community and training ground for modern content creators, high-ticket founders, and operators.",
        images: ["/og-image.png"],
      },
      robots: {
        index: true,
        follow: true,
      },
      icons: {
        icon: "/inner-circle-logo.png",
        shortcut: "/inner-circle-logo.png",
        apple: "/inner-circle-logo.png",
      },
      verification: {
        google: "s1LJv7f1Cy938IT3wDll5_6ndlN2HaPPB-8mpmCXCf4",
      },
    };
  }

  return {
    title: {
      default: "Blade Media | High-Ticket Video Content & Growth Agency",
      template: "%s | Blade Media"
    },
    description: "Blade Media is the institutional content production and strategic growth engine for elite creators and premium brands.",
    keywords: ["Content Agency", "Video Editing", "Social Media Growth", "Visual Dominance", "Viral Content", "Blade Media", "Content Strategy", "Retention Editing"],
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
      title: "Blade Media | High-Ticket Video Content & Growth Agency",
      description: "Blade Media is the institutional content production and strategic growth engine for elite creators and premium brands.",
      url: "https://blademedia.in",
      siteName: "Blade Media",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Blade Media | High-Ticket Video Content & Growth Agency",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blade Media | High-Ticket Video Content & Growth Agency",
      description: "Blade Media is the institutional content production and strategic growth engine for elite creators and premium brands.",
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
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
        "https://www.instagram.com/blade.media_/",
        "https://www.linkedin.com/in/piyush-kumar-96b064250/"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Blade Media",
      "url": "https://blademedia.in",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://blademedia.in/?s={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black">
        <PostHogProvider>
          {/* Google Analytics */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-5KW01DDXCM'}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-5KW01DDXCM'}');
            `}
          </Script>
          <Suspense fallback={null}>
            <PostHogPageview />
          </Suspense>
          <AuthProvider>
            <Toaster position="top-right" richColors theme="dark" />
            <SiteProvider>
              {children}
              <CookieConsent />
              <Analytics />
            </SiteProvider>
          </AuthProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
