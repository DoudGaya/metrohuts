import { Footer } from '@/components/Footer'
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { PublicNavigations } from '@/components/PublicNavigations'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  return (
    <html lang="en">
     <SessionProvider session={session}>
     <body className={`${inter.className} text-gray-950 bg-gray-50`}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      <PublicNavigations />
        {children}
        <Footer />
      </ThemeProvider>
      </body>
     </SessionProvider>
    </html>
  );
}
