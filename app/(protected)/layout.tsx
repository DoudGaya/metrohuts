import React from 'react'
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";


const ProtectedLayout = async ({ children }: { children:  React.ReactNode}) => {

    const session = await auth()

    return (

        <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
         <div className=" h-screen w-screen bg-dark">
         {children}
         </div>
        </ThemeProvider>

    );

}

export default ProtectedLayout

