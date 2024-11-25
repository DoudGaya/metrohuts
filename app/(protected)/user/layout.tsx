import { auth } from '@/auth'
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { TopNav } from "../_components/TopNav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/app-sidebar';

// import { UserDashboardSideBar } from './_components/UserSideBar';

export default async function UserLayout({ children }: { children: React.ReactNode }) {


  const session = await auth()
  const user = session?.user.name
  if (session?.user.role === "USER") {
    return (
      <SessionProvider session={session}>
        {/* <div className="flex h-screen bg-slate-50  md:flex-row md:overflow-hidden">

          <div className="flex flex-col w-full md:overflow-y-auto ">
            <TopNav />
          <div className=" mt-20 md:mt-0 w-full h-full"> */}
           <SidebarProvider>
              <AppSidebar />
              <main>
                <SidebarTrigger />
                   {children}
              </main>
          </SidebarProvider>
          {/* </div>
          </div>
        </div> */}
      </SessionProvider>
    );
  } else {
    return redirect('/user/dashboard')
}
}