import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/lib/auth-context";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Elit Gym - Elite Fitness for Cambodia",
  description:
    "Premium gym membership with QR check-in. 20 locations across Cambodia. Join the elite fitness community.",
  keywords: "gym, fitness, Cambodia, Phnom Penh, membership, QR code, workout",
  authors: [{ name: "Elit Gym" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#000000",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Elit Gym",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased bg-black text-white min-h-screen">
        <AuthProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1a1a1a",
                color: "#fff",
                border: "1px solid #d4af37",
              },
              success: {
                iconTheme: {
                  primary: "#d4af37",
                  secondary: "#000",
                },
              },
            }}
          />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
