"use client"

import { useState } from "react"
import Image from "next/image"
import { ApartmentType, Homes, User } from "@/typings"
// import { HomeEnquiryForm } from "./HomeEnquiryForm"
import { formatCurrency } from "@/lib/utils"
import { MapPin, Home, Info } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import * as z from 'zod'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

import { useToast } from "@/hooks/use-toast"

import { ApartmentStatus, HomeStatus } from "@prisma/client"
import { bookingSchema, enquirySchema, homeSchema } from "@/lib/schema"
import { useCurrentUser } from "@/hooks/use-current-user"
import { sendHomeRequestToAdmin } from "@/actions/homes"
import { Input } from "@/components/ui/input"
import { sendBookingRequestToAdmin } from "@/actions/apartments"

interface GalleryItemProps {
  apartment: ApartmentType
}

export function ApartmentItem({ apartment }: GalleryItemProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const user = useCurrentUser()

  if (!user) {
    return null
   }


  const [isPending, setIsPending] = useState(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
        userId: user.id,
        apartmentId: apartment.id,
        checkInDate: undefined,
        checkOutDate: undefined
    },
  })

  async function handleSubmit(values: z.infer<typeof bookingSchema>) {
    setIsPending(true)
    try {
      let formDataToSubmit: any = {
        ...values,
        checkInDate: values.checkInDate ? new Date(values.checkInDate).toISOString() : undefined,
        checkOutDate: values.checkOutDate ? new Date(values.checkOutDate).toISOString() : undefined,
      };
      const data = await sendBookingRequestToAdmin(formDataToSubmit)
      form.reset()
      toast({
        title: "Booking Request Sent",
        description: "Your request has been sent successfully.",
      })
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error",
        description: "An error occurred while sending your request.",
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
    }
  }




  return (
    <Card className=' h-full justify-between bg-white  dark:bg-black border-gray-200 dark:border-gray-800 text-dark dark:text-orange-200 flex px-0 flex-col'>
    <Image
      src={apartment?.heroImage}
      alt={apartment.title}
      width={400}
      height={300}
      className="w-full h-[300px] object-cover rounded-t-lg"
    />

    <CardHeader className=' '>
      <CardTitle className=' text-base line-clamp-2'>{apartment?.title}</CardTitle>
     <div className=" flex flex-col  space-y-3 ">
        <div className="text-sm flex flex-col space-y-1 bg-orange-100 dark:bg-dark rounded-lg py-2 space-x-3 dark:text-gray-300 text-gray-700">
             <div className=" flex items-center px-2 font-semibold  space-x-1">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 flex-none">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              {/* <p>Address</p> */}
              <p className=' font-semibold'>{apartment.state + ' '+ apartment.lga }</p>
             </div>
                <p className=' text-xs line-clamp-2'> {apartment.address} </p>
        </div>
     </div>
    </CardHeader>
    <CardContent className='  h-full flex bg-white dark:bg-black space-y-3 flex-col'>
      <span className={`${apartment.status == ApartmentStatus.Available ? ' bg-green-500/50 text-green-950' : apartment.status == ApartmentStatus.Booked ? ' bg-yellow-500/50 text-yellow-950' : ''} max-w-max py-0.5 font-poppins font-semibold px-2 rounded-full text-xs`}> {apartment.status} </span>
      <p className="text-gray-600 font-poppins dark:text-gray-300 line-clamp-3 overflow-hidden text-justify text-xs mb-4">
        {apartment.description}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-green-500 text-xl font-mono font-bold"> <span className=' text-xs'>NGN</span> {apartment.price}</span>
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
            <SheetTitle className=' text-2xl font-poppins text-primary'>{apartment.title}</SheetTitle>
            <SheetDescription >{apartment.address}</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <Image
              src={apartment.heroImage}
              alt={apartment.title}
              width={400}
              height={300}
              className="rounded-lg h-[400px] w-full object-cover"
            />
            <div className=" flex py-2 ">
            <span className={`${apartment.status == ApartmentStatus.Available ? ' bg-green-500/50 text-green-950' : apartment.status == ApartmentStatus.Booked ? ' bg-yellow-500/50 text-yellow-950' : ''} max-w-max py-0.5 font-poppins font-semibold px-2 rounded-full text-lg`}> {apartment.status} </span>

            </div>
            <h4 className="font-semibold text-primary font-poppins mb-2">Gallery</h4>
            <div className="">
              {apartment.images && apartment.images.length > 0 && (
                <div className=' grid grid-cols-3 gap-2'>
                    {apartment.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`${apartment.title} - Image ${index + 1}`}
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
              <p className="text-sm text-muted-foreground text-pretty font-poppins">{apartment.description}</p>
            </div>
            
            <div className=' flex flex-col space-y-1'>
              <div className=" flex flex-col">
              <h4 className="font-semibold">Price</h4>
              <p className="font-mono text-2xl font-bold text-green-500">{ 'NGN ' + apartment.price}</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

     <div className=" flex space-x-3 items-center justify-center">
      
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Home size={16} className="mr-2" />
                Enquire
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[80%] md:max-w-xl overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="py-5 text-center bg-primary/10 rounded-lg">
                  <span className="font-semibold text-primary">Make Enquiry</span>
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-4">


          <FormField
            control={form.control}
            name="checkInDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check In Date</FormLabel>
                <FormControl>
                  <Input type="date" className=' w-full' disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="checkOutDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check Out Date</FormLabel>
                <FormControl>
                  <Input type="date" className=' w-full' disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        
         

          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>

            </DialogContent>
          </Dialog>
     </div>
    </CardFooter>

  </Card>
   
  )
}





// import { 
//   Card, 
//   CardContent, 
//   CardHeader, 
//   CardTitle 
// } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import Image from "next/image"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import { ApartmentType } from "@/typings"

// interface GalleryItemProps {
//   apartment: ApartmentType
// }

// export function ApartmentItem({ apartment }: GalleryItemProps) {


//   return (
//     <Card className="overflow-hidden">
//       <CardHeader className="p-0">
//         <div className="relative h-48 w-full">
//           <Image
//             src={apartment.heroImage}
//             alt={apartment.title}
//             layout="fill"
//             objectFit="cover"
//           />
//         </div>
//       </CardHeader>
//       <CardContent className="p-4">
//         <CardTitle className="text-lg font-semibold mb-2">{apartment.title}</CardTitle>
//         <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{apartment.description}</p>
//         <div className=""> Book an Apartment</div>
//       </CardContent>
//     </Card>
//   )
// }

