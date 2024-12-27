"use client"

import { useState } from "react"
import Image from "next/image"
import { Homes } from "@/typings"
import { HomeEnquiryForm } from "./HomeEnquiryForm"
import { formatCurrency } from "@/lib/utils"
import { MapPin, Home, Info } from 'lucide-react'

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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

export function UserHomeItem({ home }: { home: Homes }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative h-[300px] w-full">
        <Image
          src={home.heroImage}
          alt={home.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform h-full w-full hover:scale-105"
        />
        <Badge 
          variant="secondary" 
          className="absolute top-2 right-2 bg-white/80 text-primary"
        >
          {home.homeStatus}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{home.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin size={16} className="mr-1" />
          <span>{home.state}, {home.lga}</span>
        </div>
        <p className="text-xl font-bold text-primary mb-2">
          {home.price}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{home.description}</p>
      </CardContent>
      <CardFooter className="px-4 py-3 bg-secondary/10 flex justify-between items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Info size={16} className="mr-2" />
              Details
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-[700px] max-w-full h-full overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{home.title}</SheetTitle>
              <SheetDescription>{home.address}</SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              <Image
                src={home.heroImage}
                alt={home.title}
                width={400}
                height={300}
                className="rounded-lg h-[400px] object-cover"
              />
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{home.description}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Location</h4>
                <p className="text-sm text-muted-foreground">{home.address}, {home.lga}, {home.state}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Price</h4>
                <p className="text-lg font-bold text-primary">{home.price}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Status</h4>
                <Badge variant="outline">{home.homeStatus}</Badge>
              </div>
              {home.images && home.images.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Gallery</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {home.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`${home.title} - Image ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

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
            <HomeEnquiryForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}




// "use client"
// import { 
//   Card, 
//   CardContent, 
//   CardFooter, 
//   CardHeader, 
//   CardTitle 
// } from "@/components/ui/card"
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogTitle,
//   DialogDescription,
//   DialogHeader, 
//   DialogTrigger 
// } from "@/components/ui/dialog"

// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import Image from "next/image"
// import { Homes } from "@/typings"
// import { HomeEnquiryForm } from "./HomeEnquiryForm"
// import { useState } from "react"


// export function UserHomeItem({ home }: {home: Homes}) {

//   const [isDialogOpen, setIsDialogOpen] = useState(false)





//   return (
//     <Card className="overflow-hidden">
//       <CardHeader className="p-0">
//         <div className="relative h-48 w-full">
//           <Image
//             src={home.heroImage}
//             alt={home.title}
//             layout="fill"
//             objectFit="cover"
//           />
//         </div>
//       </CardHeader>
//       <CardContent className="p-4">
//         <CardTitle className="text-lg font-semibold mb-2">{home.title}</CardTitle>
//         <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{home.description}</p>
//       </CardContent>

//       <CardFooter>
//       <div className=" w-full flex justify-between items-center">

//       <Dialog>
//         <DialogTrigger asChild>
//           <Button className='font-poppins text-white dark:bg-primary'>Make Enquiry</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[700px] max-h-[80%] md:max-w-xl overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className='py-5 flex text-center bg-orange-200 dark:text-orange-200 rounded-lg justify-center'>
//               <p className='flex items-start text-center font-poppins text-orange-600'>Make Enquiry</p>
//             </DialogTitle>
//           </DialogHeader>
//           <HomeEnquiryForm onClose={() => setIsDialogOpen(false)} />
//         </DialogContent>
//       </Dialog>
//         <Link href={`/home/${home.id}`} className="text-primary font-semibold">View</Link>
//       </div>
//       </CardFooter>
//     </Card>
//   )
// }

