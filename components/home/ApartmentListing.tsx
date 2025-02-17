"use client"
import Image from 'next/image'

import { ApartmentType } from '@/typings'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { ApartmentStatus, HomeStatus } from '@prisma/client'


const ApaprtmentListing = ( {
    apartments
    }: {
        apartments: ApartmentType[]
} ) => {

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } }
      }
    
      const slideIn = {
        hidden: { x: -50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
      }

      
  return (
    <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeIn}
    className="py-16 bg-white dark:bg-dark"
  >
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-primary mb-12">Apartment Listings</h2>
      <div className="grid grid-cols-1 h-full md:grid-cols-2 lg:grid-cols-4 gap-8">
        {apartments.map((property) => (
          <motion.div key={property.id} whileHover={{ y: -10 }} className=' h-full'>
          <Card className=' h-full justify-between bg-white  dark:bg-black border-gray-200 dark:border-gray-800 text-dark dark:text-orange-200 flex px-0 flex-col'>
       <Image
         src={property?.heroImage}
         alt={property.title}
         width={400}
         height={300}
         className="w-full h-[250px] object-cover rounded-t-lg"
       />

       <CardHeader className=' '>
         <CardTitle className=' text-base line-clamp-2'>{property?.title}</CardTitle>
        <div className=" flex flex-col  space-y-3 ">
           <div className="text-sm flex flex-col space-y-1 bg-orange-100 dark:bg-dark rounded-lg py-2 space-x-3 dark:text-gray-300 text-gray-700">
                <div className=" flex items-center px-2 font-semibold  space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 flex-none">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                   <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                 </svg>
                 {/* <p>Address</p> */}
                 <p className=' font-semibold'>{property.state + ' '+ property.lga }</p>
                </div>
                   <p className=' text-xs line-clamp-2'> {property.address} </p>
           </div>
        </div>
       </CardHeader>
       <CardContent className=' flex bg-white dark:bg-black space-y-3 flex-col'>
       <span className={`${property.status == ApartmentStatus.Available ? ' bg-green-500/50 text-green-950' : property.status == ApartmentStatus.Booked ? ' bg-yellow-500/50 text-yellow-950' : ''} max-w-max py-0.5 font-poppins font-semibold px-2 rounded-full text-xs`}> {property.status} </span>
         <p className="text-gray-600 font-poppins dark:text-gray-300 line-clamp-3 overflow-hidden text-justify text-xs mb-4">
           {property.description}
         </p>
         <div className="flex justify-between items-center">
           <span className="text-green-500 text-xl font-mono font-bold"> <span className=' text-xs'>NGN</span> {property.price}</span>
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
               <SheetTitle className=' text-2xl font-poppins text-primary'>{property.title}</SheetTitle>
               <SheetDescription >{property.address}</SheetDescription>
             </SheetHeader>
             <div className="mt-4 space-y-4">
               <Image
                 src={property.heroImage}
                 alt={property.title}
                 width={400}
                 height={300}
                 className="rounded-lg h-[400px] w-full object-cover"
               />
               <div className=" flex py-2 ">
               <span className={`${property.status == ApartmentStatus.Available ? ' bg-green-500/50 text-green-950' : property.status == ApartmentStatus.Booked ? ' bg-yellow-500/50 text-yellow-950' : ''} max-w-max py-0.5 font-poppins font-semibold px-2 rounded-full text-lg`}> {property.status} </span>
               </div>
               <h4 className="font-semibold text-primary font-poppins mb-2">Gallery</h4>
               <div className="">
                 {property.images && property.images.length > 0 && (
                   <div className=' grid grid-cols-3 gap-2'>
                       {property.images.map((image, index) => (
                         <Image
                           key={index}
                           src={image}
                           alt={`${property.title} - Image ${index + 1}`}
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
                 <p className="text-sm text-muted-foreground text-pretty font-poppins">{property.description}</p>
               </div>
               
               <div className=' flex flex-col space-y-1'>
                 <div className=" flex flex-col">
                 <h4 className="font-semibold">Price</h4>
                 <p className="font-mono text-2xl font-bold text-green-500">{ 'NGN ' + property.price}</p>
                 </div>
               </div>
             </div>
           </SheetContent>
         </Sheet>
       </CardFooter>

     </Card>
        
       </motion.div>
          // <motion.div key={property.id} whileHover={{ y: -10 }} className=' h-full'>
          //   <Card className=' h-full flex flex-col'>
          //     <Image
          //       src={property.heroImage}
          //       alt={property.title}
          //       width={400}
          //       height={300}
          //       className="w-full h-48 object-cover rounded-t-lg"
          //     />

          //     <CardHeader>
          //       <CardTitle className=' text-xl'>{property.title}</CardTitle>
          //       <p className="text-sm text-gray-500">{property.state} { property.lga}</p>
          //       <small className=" italic font-poppins"> {property.address}  </small>
          //     </CardHeader>
          //     <CardContent className=' h-full flex flex-col justify-between'>
          //       <p className="text-gray-600 text-sm mb-4">
          //         {property.description}
          //       </p>
          //       <div className="flex justify-between items-center">
          //         <span className="text-gray-800 text-sm font-bold">{property.price}</span>
          //         <Button variant={'link'} className=" text-yellow-500 bg-transparent font-semibold font-poppins">
          //           Details
          //         </Button>
          //       </div>
          //     </CardContent>
          //   </Card>
          // </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
  )
}

export default ApaprtmentListing