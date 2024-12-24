import { auth } from '@/auth'
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/app-sidebar';
import { Toaster } from "@/components/ui/toaster"

export default async function AdmninLayout({ children }: { children: React.ReactNode }) {


  const session = await auth()
  const user = session?.user.name
  if (session?.user.role === "USER") {
    return redirect('/user/home')
  } else {
    return (
      <SessionProvider session={session}>
           <SidebarProvider>
              <AppSidebar />
              <main className=' w-full bg-white text-gray-900 dark:bg-dark dark:text-gray-300'>
                <SidebarTrigger />
                   {children}
                   <Toaster />
              </main>
          </SidebarProvider>
      </SessionProvider>
    ); 
}
}
