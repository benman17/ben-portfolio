import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ben Manguiat — Data, Analytics & Scrum Master Portfolio",
  description: "Interactive portfolio showcasing data analytics pipelines, executive Power BI dashboards, and Agile Scrum Master project delivery.",
  keywords: ["Ben Manguiat", "Data Analytics", "Scrum Master", "Power BI", "SQL", "Python", "Information Systems", "Project Management"],
  authors: [{ name: "Ben Manguiat" }],
  openGraph: {
    title: "Ben Manguiat — Data, Analytics & Scrum Master Portfolio",
    description: "Turning raw data and ideas into organized, actionable outcomes.",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
