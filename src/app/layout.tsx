import { ThemeProvider } from "@/components/ThemeProvider";
import GlobalContextProvider from "@/contexts/GlobalContextProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LanguageContextProvider from "@/contexts/LanguageContextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lingoverse",
  description:
    "Chat, Learn, and Immerse Yourself in Real Conversations! Our AI-powered language partner adapts to your skill level, helps you with pronunciation, and makes learning fun with cultural insights and gamified challenges. Get started below and start speaking like a native today! 🌍✨",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageContextProvider>
            <GlobalContextProvider>{children}</GlobalContextProvider>
          </LanguageContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
