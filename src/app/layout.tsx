import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
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
  metadataBase: new URL("https://tube2blog.com"),
  title: {
    template: "%s - Tube2Blog",
    default: "YouTube to Blog Post Converter - Turn Videos into SEO Content | Tube2Blog",
  },
  description:
    "Turn YouTube videos into SEO-optimized blog posts in 30 seconds. Extract transcripts, generate metadata, and export clean Markdown. Double your content output from every video — free, no sign-up required.",
  openGraph: {
    type: "website",
    siteName: "Tube2Blog",
    title: "YouTube to Blog Post Converter | Tube2Blog",
    description:
      "Free YouTube to blog converter: paste any YouTube URL and get an AI-written SEO blog post in seconds. Extract transcripts, generate metadata, export Markdown.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube to Blog Post Converter | Tube2Blog",
    description:
      "Free YouTube to blog converter: paste any YouTube URL and get an AI-written SEO blog post in seconds.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </TooltipProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6CC8HV421L"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6CC8HV421L');
          `}
        </Script>
      </body>
    </html>
  );
}
