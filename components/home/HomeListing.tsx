"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link'



import { FaHome, FaHotel, FaSearch, FaStar, FaCheckCircle } from 'react-icons/fa'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from 'react'
// import { HomeType } from "@/typings"

import { Homes } from '@/typings'
import { useCurrentRole } from '@/hooks/use-current-role'
import { HomeStatus } from '@prisma/client'


const HomeListing = ( {homeListings}: {
  homeListings: Homes[]
} ) => {

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } }
      }
    
      const slideIn = {
        hidden: { x: -50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
      }


      const role = useCurrentRole()

      
  return (
    <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeIn}
    className="py-16 bg-white dark:bg-black"
  >
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Current Listings</h2>
      <div className="grid grid-cols-1 h-full md:grid-cols-2 lg:grid-cols-4 gap-8">
        {homeListings.map((home) => (
          <motion.div key={home.id} whileHover={{ y: -10 }} className=' h-full'>
             <Card className=' h-full justify-between bg-white  dark:bg-black border-gray-200 dark:border-gray-800 text-dark dark:text-orange-200 flex px-0 flex-col'>
          <Image
            src={home?.heroImage}
            alt={home.title}
            width={400}
            height={300}
            className="w-full h-[250px] object-cover rounded-t-lg"
          />

          <CardHeader className=' '>
            <CardTitle className=' text-base line-clamp-2'>{home?.title}</CardTitle>
           <div className=" flex flex-col  space-y-3 ">
              <div className="text-sm flex flex-col space-y-1 bg-orange-100 dark:bg-dark rounded-lg py-2 space-x-3 dark:text-gray-300 text-gray-700">
                   <div className=" flex items-center px-2 font-semibold  space-x-1">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 flex-none">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    {/* <p>Address</p> */}
                    <p className=' font-semibold'>{home.state + ' '+ home.lga }</p>
                   </div>
                      <p className=' text-xs line-clamp-2'> {home.address} </p>
              </div>
           </div>
          </CardHeader>
          <CardContent className=' flex bg-white dark:bg-black space-y-3 flex-col'>
            <span className={`${home.homeStatus == HomeStatus.ComingSoon ? ' bg-yellow-500/50 text-stone-950' : home.homeStatus == HomeStatus.Selling ? ' bg-yellow-500/50 text-green-950' : home.homeStatus == HomeStatus.Sold ? ' bg-red-500/50 text-red-950' : ''} max-w-max py-0.5 font-poppins font-semibold px-2 rounded-full text-xs`}> {home.homeStatus} </span>
            <p className="text-gray-600 font-poppins dark:text-gray-300 line-clamp-3 overflow-hidden text-justify text-xs mb-4">
              {home.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-green-500 text-xl font-mono font-bold"> <span className=' text-xs'>NGN</span> {home.price}</span>
            </div>
          </CardContent>
        
          <CardFooter className=' flex justify-between items-center'>
            <Sheet>
              <SheetTrigger asChild>
                <button className=' bg-transparent border-0 hover:underline'>
                  Details
                </button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-[700px] bg-white dark:bg-dark dark:border-primary/50 dark:text-gray-300 max-w-full w-full h-full overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className=' text-2xl font-poppins text-primary'>{home.title}</SheetTitle>
                  <SheetDescription >{home.address}</SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  <Image
                    src={home.heroImage}
                    alt={home.title}
                    width={400}
                    height={300}
                    className="rounded-lg h-[400px] w-full object-cover"
                  />
                  <div className=" flex py-2 ">
                  <span className={`${home.homeStatus == HomeStatus.ComingSoon ? ' bg-yellow-500/50 text-stone-950' : home.homeStatus == HomeStatus.Selling ? ' bg-yellow-500/50 text-green-950' : home.homeStatus == HomeStatus.Sold ? ' bg-red-500/50 text-red-950' : ''} max-w-max py-0.5 font-poppins font-semibold px-2 rounded-full text-lg`}> {home.homeStatus} </span>
                  </div>
                  <h4 className="font-semibold text-primary font-poppins mb-2">Gallery</h4>
                  <div className="">
                    {home.images && home.images.length > 0 && (
                      <div className=' grid grid-cols-3 gap-2'>
                          {home.images.map((image, index) => (
                            <Image
                              key={index}
                              src={image}
                              alt={`${home.title} - Image ${index + 1}`}
                              width={100}
                              height={100}
                              className="rounded-md w-full h-full  object-cover"
                            />
                          ))}
                        </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground text-pretty font-poppins">{home.description}</p>
                  </div>
                  
                  <div className=' flex flex-col space-y-1'>
                    <div className=" flex flex-col">
                    <h4 className="font-semibold">Price</h4>
                    <p className="font-mono text-2xl font-bold text-green-500">{ 'NGN ' + home.price}</p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>


            <Link href={role ? `${role.toLocaleLowerCase()}/listings` : '/register'} className=' bg-primary text-black px-3 py-2 rounded-lg'>
              Buy Now
            </Link>
            {/* <Dialog>
              <DialogTrigger className=' bg-primary text-black px-3 py-2 rounded-lg'>
                Buy Now
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog> */}

          </CardFooter>

        </Card>
           
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
  )
}

export default HomeListing