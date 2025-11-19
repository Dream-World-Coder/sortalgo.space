import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/contexts/theme-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Journey Through the Realms of Sorting Algorithms",
  description:
    "Interactive Blog Posts On Sorting Algorithms & Computer Science by Subhajit Gorai",
  keywords: [
    "sorting",
    "algorithms",
    "quicksort",
    "heapsort",
    "mergesort",
    "selectionsort",
    "bubblesort",
    "heapsort",
    "bucketsort",
    "radixsort",
    "visualisation",
  ],
  robots: { index: true, follow: true },

  openGraph: {
    title: "A Journey Through the Realms of Sorting Algorithms",
    description:
      "Interactive Blog Posts On Sorting Algorithms & Computer Science by Subhajit Gorai",
    url: "https://sortalgo.space",
    images: ["https://www.sortalgo.space/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "A Journey Through the Realms of Sorting Algorithms",
    url: "https://sortalgo.space",
    description:
      "Interactive Blog Posts On Sorting Algorithms & Computer Science by Subhajit Gorai",
    keywords: [
      "sorting",
      "algorithms",
      "quicksort",
      "heapsort",
      "mergesort",
      "selectionsort",
      "bubblesort",
      "heapsort",
      "bucketsort",
      "radixsort",
      "visualisation",
    ],
    isPartOf: {
      "@type": "WebSite",
      name: "SortAlgo",
      url: "https://sortalgo.space",
    },
    image: "https://www.sortalgo.space/preview.png",
    publisher: {
      "@type": "Organization",
      name: "SortAlgo",
      url: "https://sortalgo.space",
      logo: {
        "@type": "ImageObject",
        url: "https://www.sortalgo.space/preview.png",
      },
    },
    author: {
      "@type": "Person",
      name: "Subhajit Gorai",
      url: "https://sortalgo.space",
    },
  };

  return (
    <html lang="en">
      <Script
        id="schema-sortalgo"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <ThemeProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full`}
        >
          <div
            className="min-h-screen w-full antialiased dark:hidden fixed -z-10"
            style={{
              background:
                "repeating-linear-gradient(135deg, #f0f0f0 0px, #f0f0f0 3px, #e8e8e8 5px, #e8e8e8 4px)",
            }}
          />
          <div
            className="min-h-screen w-full antialiased hidden dark:block fixed -z-10"
            style={{
              background:
                "repeating-linear-gradient(135deg, #1c1c1c 0px, #1c1c1c 3px, #252525 5px, #252525 4px)",
            }}
          />
          {children}
          <Analytics />
        </body>
      </ThemeProvider>
    </html>
  );
}

/*
if i add lists of blogs in homepage, then i need to also add:
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "SortAlgo – Interactive Sorting Algorithm Blog",
  "url": "https://sortalgo.space",
  "description": "Explore visualisations, explanations, and interactive blog posts on sorting algorithms.",
  "publisher": {
    "@type": "Person",
    "name": "Subhajit Gorai"
  }
}
*/
