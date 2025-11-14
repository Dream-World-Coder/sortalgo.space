import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A journey into the realms of Sorting Algorithms",
  description:
    "An intuitive presentation of my understanding about sorting algorithms.",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full`}
        style={{
          background:
            "repeating-linear-gradient(135deg, #f0f0f0 0px, #f0f0f0 3px, #e8e8e8 5px, #e8e8e8 4px)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
