import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import { Layout } from "./components/Layout";
import { Analytics } from "@vercel/analytics/next"
import HolidayProvider from './components/HolidayProvider';

const inter = Inter({
  variable: "--font-inter",

  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pratik Hingorani - Portfolio",
  description: "A portfolio for a full stack software engineer.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        <HolidayProvider />
        
        <ThemeRegistry>
          <Layout>{children}</Layout>
        </ThemeRegistry>
        <Analytics />
      </body>
    </html>
  );
}
