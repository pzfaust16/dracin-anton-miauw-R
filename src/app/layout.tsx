import type { Metadata } from "next";
import "@/styles/globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Suspense } from "react";
import { Plus_Jakarta_Sans } from 'next/font/google';
import { getWebsiteSettings } from "@/server/db/website-settings.db";
import { WebsiteSettingsProvider } from "@/components/providers/website-settings-provider";
import { VisitorTracker } from "@/components/visitor-tracker";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getWebsiteSettings();
  return {
    title: settings?.websiteName ? `${settings.websiteName} - ${settings.heroTitle}` : "MiawMiaw - Streaming Drama Pendek",
    description: settings?.metaDescription || settings?.heroDescription || "Nonton drama pendek gratis.",
    keywords: settings?.metaKeywords || "drama, streaming, nonton",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getWebsiteSettings();

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="apple-mobile-web-app-title" content="MaoMao" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/png" href="/web-app-manifest-192.png" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
        {settings?.primaryColor && (
          <style
            dangerouslySetInnerHTML={{
              __html: `
                 :root {
                   --primary: ${settings.primaryColor};
                 }
               `,
            }}
          />
        )}
      </head>
      <body className={plusJakartaSans.variable}>
        <WebsiteSettingsProvider settings={settings}>
          <VisitorTracker />
          <Providers>
            {children}
            <Toaster />
            <Sonner />
          </Providers>
        </WebsiteSettingsProvider>
      </body>
    </html>
  );
}
