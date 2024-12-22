import React from 'react'
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";


export const metadata: Metadata = {
  title: "Metrohuts Homes",
  description: "Make yourself at home, because you are home. Find beautiful apartments from MetroHuts ",
  openGraph: {
    title: 'Acme',
    description: 'Welcome to Metrohuts Homes',
    url: 'https://metrohuts.com',
    siteName: 'Acme',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metrohuts Homes',
    description: 'Welcome to Metrohuts Homes',
    creator: '@metrohuts',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

const RootLayout = async ({ children }: { children:  React.ReactNode}) => {

    const session = await auth()

    return (
      <html lang="en">
       <SessionProvider session={session}>
       <body className={`text-gray-950 bg-gray-50`}>
        <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
          {children}

        </ThemeProvider>
        </body>
       </SessionProvider>
      </html>
    );

}

export default RootLayout

