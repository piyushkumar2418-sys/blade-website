import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteProvider } from "@/context/SiteContext";
<<<<<<< HEAD
import { AuthProvider } from "@/context/AuthContext";
=======
>>>>>>> 73242ea (Initialize project with Firestore database integrations and premium design)

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blade Media",
  description: "Blade Media - Growth, engineered.",
<<<<<<< HEAD
  icons: {
    icon: "/blade-logo.png",
    apple: "/blade-logo.png",
  },
=======
>>>>>>> 73242ea (Initialize project with Firestore database integrations and premium design)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
<<<<<<< HEAD
        <AuthProvider>
          <SiteProvider>{children}</SiteProvider>
        </AuthProvider>
=======
        <SiteProvider>{children}</SiteProvider>
>>>>>>> 73242ea (Initialize project with Firestore database integrations and premium design)
      </body>
    </html>
  );
}
