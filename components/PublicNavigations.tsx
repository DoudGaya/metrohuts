"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
// import logo from '@/public/metrohuts-logo.svg'
import logo from '@/assets/metrohuts-logo.png'



import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from '@radix-ui/react-separator'



export const PublicNavigations = () => {
    const session = useSession()
    const user = session.data?.user.name

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } }
      }
    
      const slideIn = {
        hidden: { x: -50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
      }
    
      const menuItems = [{name: "Home", url: '/', id: 1}, {name: "About", url: '/about', id: 2}, {name: "Services", url: '/services', id: 3}]
    
    //   const SideNav = () => (
      
    //   )

  return (
<>
<header className=" bg-white/80 h-16 text-primary shadow-md items-center fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4 h-full flex justify-between items-center">
          <motion.div initial="hidden" animate="visible" className=' justify-start' variants={fadeIn}>
            <div className=" flex items-start w-full justify-start">
                <Image src={logo} className='h-10 w-full object-contain object-start ' alt='' />
            </div>
          </motion.div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
            <div className="flex space-y-4 md:space-y-0 items-start flex-col lg:space-x-6 h-full font-poppins lg:items-center">
                <div className="">
                <Image src={logo} className='h-10 w-full object-contain object-start ' alt='' />
                </div>
                    {menuItems.map((item) => (
                        <SheetTrigger key={item.id}>
                            <motion.a
                                href={item.url}
                                className="text-gray-800 hover:text-primary transition duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                >
                                {item.name}
                            </motion.a>
                        </SheetTrigger>
                    ))}
                    </div>
            </SheetContent>
          </Sheet>
          <nav className="hidden md:flex items-center space-x-8">

          {menuItems.map((item) => (
                    <motion.a
                        href={item.url}
                        key={item.id}
                        className="text-gray-800 hover:text-primary transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        >
                        {item.name}
                    </motion.a>
                ))}
                <Separator orientation="vertical" className="h-6 border border-primary" />
               {
                    session.data ? 
                    <motion.a
                          href={'/user/dashboard'}
                          className="text-gray-800 bg-primary px-6 py-2 rounded-full hover:text-white transition duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          >
                          {'Dashboard'}
                      </motion.a>
                      : 
                      (
                        <div className=" flex flex-row items-start  space-x-4">
                        <motion.a
                            href={'/login'}
                            className="rounded-full font-poppins px-2 py-2 text-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            >
                            {'Log In'}
                        </motion.a>
                        <motion.a
                            href={'/register'}
                            className="rounded-full bg-primary font-poppins px-6 py-2 text-white"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            >
                            {'Get Started'}
                        </motion.a>
                    </div>
                      )
               }
               
               
          </nav>
        </div>
      </header>
</>
  )
}


