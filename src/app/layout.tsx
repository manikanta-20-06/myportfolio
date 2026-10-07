import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/site";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const url = "https://manikanta.dev";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: "Manikanta J N — AI & ML Student",
    template: "%s — Manikanta J N",
  },
  description:
    "Portfolio of Manikanta J N, an Artificial Intelligence and Machine Learning student building practical AI, software, and interactive web experiences.",
  keywords: [
    "Manikanta J N",
    "AI",
    "Machine Learning",
    "Portfolio",
    "VTU",
    "Bengaluru",
    "Flask",
    "TensorFlow",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url,
    siteName: "Manikanta J N — AI & ML Student",
    title: "Manikanta J N — AI & ML Student",
    description:
      "Portfolio of Manikanta J N, an Artificial Intelligence and Machine Learning student building practical AI, software, and interactive web experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manikanta J N — AI & ML Student",
    description:
      "Portfolio of Manikanta J N, an Artificial Intelligence and Machine Learning student building practical AI, software, and interactive web experiences.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
