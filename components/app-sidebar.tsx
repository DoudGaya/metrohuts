'use client'
import { Calendar, Home, Inbox, BoxesIcon, CalendarCheck, PhoneCall, UsersRound, PhoneCallIcon, Settings } from "lucide-react"
import logo from '@/assets/metrohuts-logo.png'
import Image from "next/image"
import { DarkButton } from "./DarkButton"
// import { LogOutButton } from "./auth/LogOutButton"
import LogoutButton from "./auth/LogOutButton"
import { RoleGate } from "./auth/RoleGate"
import { useCurrentRole } from "@/hooks/use-current-role"
import Link from "next/link"
import { useCurrentUser } from "@/hooks/use-current-user"

const adminNavs = [
    {
      title: "Home",
      url: "/admin/home",
      icon: Home,
    },
    {
      title: "Home Listings",
      url: "/admin/listings",
      icon: Inbox,
    },
    {
      title: "Apartments",
      url: "/admin/apartments",
      icon: Calendar,
    },
    {
      title: "Team Members",
      url: "/admin/members",
      icon: CalendarCheck,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: UsersRound,
    },
    // {
    //   title: "Enquiries",
    //   url: "/admin/enquiries",
    //   icon: PhoneCall,
    // },
    {
      title: "Settings",
      url: "/admin/profile",
      icon: Settings,
    },
  ]


  const userNavs = [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: Home,
    },
    {
      title: "Home Listings",
      url: "/user/listings",
      icon: Inbox,
    },
    {
      title: "Apartments",
      url: "/user/apartments",
      icon: Calendar,
    },
    {
      title: "Bookings",
      url: "/user/bookings",
      icon: CalendarCheck,
    },
    {
      title: "My Enquiries",
      url: "/user/enquiries",
      icon: PhoneCallIcon,
    },

    {
      title: "Settings",
      url: "/user/profile",
      icon: Settings,
    },
  ]

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { UserRole } from "@prisma/client"
  
  export function AppSidebar() {
    const role = useCurrentRole()
    return (
     <Sidebar className=" w-64 h-full bg-white dark:bg-black border-r dark:border-stone-800">
       <SidebarHeader className=" w-full dark:border-stone-800 flex px-4 border-b justify-start ">
        <Link href={'/'} className=" text-lg font-semibold font-poppins">
          <Image alt="" src={logo} className=" h-10 object-contain object-left" />
        </Link>
      </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel className=" font-poppins font-semibold "> 
                  {role == UserRole.ADMIN ? UserRole.ADMIN : UserRole.USER}
                  {' DASHBOARD'}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        { role == UserRole.ADMIN.toString() &&  adminNavs.map(item => (
                                <SidebarMenuItem className="" key={item.title}>
                                    <SidebarMenuButton className="text-base hover:bg-primary py-2 hover:text-black"  asChild>
                                        <a href={item.url}>
                                            <item.icon className=" size-16" />
                                            <span className=" py-2"> {item.title} </span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )) 
                            }
                            {
                                role == UserRole.USER.toString() && userNavs.map(item => (
                                    <SidebarMenuItem className=" " key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span> {item.title} </span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="">
         <div className=" dark:bg-gray-600/50 bg items-center flex justify-between py-2 bg-white dark:bg-stone-950 px-3 rounded-xl w-full h-full">
                <DarkButton />
                <LogoutButton />
         </div>
        </SidebarFooter>
     </Sidebar>
    )
  }
  