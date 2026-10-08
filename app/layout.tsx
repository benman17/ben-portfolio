import type { Metadata, Viewport } from "next";
import { Libre_Franklin, Source_Serif_4, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const franklin = Libre_Franklin({
  variable: "--font-franklin",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ben Manguiat, Data Analyst",
  description:
    "Data analyst portfolio: Snowflake and PostgreSQL SQL, Power BI dashboards and Python analysis, including 49,977 ranked Teamfight Tactics matches.",
  keywords: ["Ben Manguiat", "Data Analyst", "BI Analyst", "Product Analyst", "Game Data Analyst", "SQL", "Snowflake", "Power BI", "Python"],
  authors: [{ name: "Ben Manguiat" }],
  openGraph: {
    title: "Ben Manguiat, Data Analyst",
    description: "Reaching level 9 in ranked TFT meant a top-4 finish 87% of the time. SQL, Snowflake and Power BI work by Ben Manguiat.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111317" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${franklin.variable} ${sourceSerif.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col bg-paper text-ink font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
