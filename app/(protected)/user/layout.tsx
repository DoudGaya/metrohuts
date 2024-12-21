import { auth } from '@/auth'
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { TopNav } from "../_components/TopNav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/app-sidebar';
import { Toaster } from "@/components/ui/toaster"

// import { UserDashboardSideBar } from './_components/UserSideBar';

export default async function UserLayout({ children }: { children: React.ReactNode }) {


  const session = await auth()
  const user = session?.user.name
  if (session?.user.role === "ADMIN") {
    return redirect('/admin/home')
} else {
    return (
      <SessionProvider session={session}>
           <SidebarProvider>
              <AppSidebar />
              <main className=' w-full'>
                <SidebarTrigger />
                   {children}
                   <Toaster />
              </main>
          </SidebarProvider>
      </SessionProvider>
    );
}
}