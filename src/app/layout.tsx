import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

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
  title: {
    default: "iJob Bangladesh",
    template: "%s | iJob Bangladesh",
  },
  description:
    "Find jobs, hire talent and grow your career with iJob Bangladesh — a modern job portal connecting job seekers and employers.",
  keywords: [
    "jobs in Bangladesh",
    "bd jobs",
    "job portal",
    "career",
    "hiring",
    "employment",
  ],
  authors: [{ name: "iJob Bangladesh Team" }],
  openGraph: {
    title: "iJob Bangladesh",
    description: "Discover jobs and hire talent across Bangladesh with iJob.",
    url: "https://ijob.com",
    siteName: "iJob Bangladesh",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ReactQueryProvider>
          {/* Main App */}
          {children}

          {/* Toast Notification */}
          <Toaster position="bottom-right" richColors closeButton />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
