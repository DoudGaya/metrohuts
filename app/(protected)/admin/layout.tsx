import { auth } from '@/auth'
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { TopNav } from "../_components/TopNav";
import { AdminDashboardSideBar } from "./_components/AdminSideBar";

export default async function AdmninLayout({ children }: { children: React.ReactNode }) {


  const session = await auth()
  const user = session?.user.name
  if (session?.user.role === "ADMIN") {
    return (
      <SessionProvider session={session}>
        <div className="flex h-screen bg-slate-50 dark:bg-black md:flex-row md:overflow-hidden">
          <AdminDashboardSideBar/>
          <div className="flex flex-col w-full md:overflow-y-auto ">
            <TopNav />
          <div className=" mt-20 md:mt-0 w-full h-full">
          {children}
          </div>
          </div>
        </div>
      </SessionProvider>
    );
  } else {
    return redirect('/user/dashboard')
}
}