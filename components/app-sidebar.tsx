import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

const homes = [
    {
      title: "Rental Homes",
      url: "#",
      icon: Home,
    },
    {
      title: "Homes",
      url: "#",
      icon: Inbox,
    },
    {
      title: "On Sale",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Booked",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
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
  
  export function AppSidebar() {
    return (
     <Sidebar>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Ministry </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {
                            homes.map(item => (
                                <SidebarMenuItem key={item.title}>
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
     </Sidebar>
    )
  }
  