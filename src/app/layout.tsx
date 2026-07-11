import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://tube2blog.com"),
  title: {
    template: "%s - Tube2Blog",
    default: "Tube2Blog - From YouTuber to Automated Blogger in Seconds",
  },
  description:
    "Turn YouTube videos into SEO-optimized blog posts in 30 seconds. Extract transcripts, generate metadata, and export clean Markdown. Double your content output from every video — free, no sign-up required.",
  openGraph: {
    type: "website",
    siteName: "Tube2Blog",
    title: "Tube2Blog - From YouTuber to Automated Blogger in Seconds",
    description:
      "Turn YouTube videos into SEO-optimized blog posts in 30 seconds. Extract transcripts, generate metadata, and export clean Markdown. Double your content output from every video — free, no sign-up required.",
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
    title: "Tube2Blog - From YouTuber to Automated Blogger in Seconds",
    description:
      "Turn YouTube videos into SEO-optimized blog posts in 30 seconds. Extract transcripts, generate metadata, and export clean Markdown. Double your content output from every video — free, no sign-up required.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
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
      </body>
    </html>
  );
}
