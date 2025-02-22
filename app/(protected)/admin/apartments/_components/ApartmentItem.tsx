import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle ,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { ApartmentType } from "@/typings"

interface GalleryItemProps {
  apartment: ApartmentType
  onDelete: (apartmentId: number) => void
}

export function ApartmentItem({ apartment, onDelete }: GalleryItemProps) {
  const handleDelete = () => {
    onDelete(apartment.id)
  }

  return (
    <section
className=" px-0"
>
<div className="">
  <div className="h-full px-0">
      <div className=' h-full'>
        <Card className=' h-full flex px-0 flex-col'>
          <Image
            src={apartment?.heroImage}
            alt={apartment.title}
            width={400}
            height={300}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />

          <CardHeader>
            <CardTitle className=' text-base line-clamp-2'>{apartment?.title}</CardTitle>
           <div className=" flex flex-col space-y-3 ">
              <div className="text-sm flex flex-col space-y-1 bg-orange-100 rounded-lg py-2 space-x-3 text-gray-700">
                   <div className=" flex items-center px-2 font-semibold  space-x-1">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 flex-none">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <p>Address</p>
                   </div>
                      <p className=' text-xs line-clamp-2'> {apartment.address} </p>
                    <p className=' font-semibold'>{apartment.state + ' '+ apartment.lga }</p>
              </div>
           </div>
          </CardHeader>


          <CardContent className=' h-full flex flex-col justify-between'>
            <p className="text-gray-600 overflow-hidden text-justify text-sm h-[100px] mb-4">
              {apartment.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-gray-800 text-sm font-bold"> <span className=' text-xs'>NGN</span> {apartment.price}</span>
              
            </div>
          </CardContent>
        
          <CardFooter className=' flex justify-between items-center'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  Details
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-[700px] max-w-full w-full h-full overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>{apartment.title}</SheetTitle>
                  <SheetDescription>{apartment.address}</SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  <Image
                    src={apartment.heroImage}
                    alt={apartment.title}
                    width={400}
                    height={300}
                    className="rounded-lg h-[400px] w-full object-cover"
                  />
                  <h4 className="font-semibold mb-2">Gallery</h4>
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
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">{apartment.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Location</h4>
                    <p className="text-sm text-muted-foreground">{apartment.address}, {apartment.lga}, {apartment.state}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Price</h4>
                    <p className="text-sm text-muted-foreground">{apartment.price}</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className='text-red-500'>
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete apartment</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                  Are you sure you want to delete this apartment?
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className='text-red-500'>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>

        </Card>
      </div>
  </div>
</div>
</section>
    // <Card className="overflow-hidden">
    //   <CardHeader className="p-0">
    //     <div className="relative h-48 w-full">
    //       <Image
    //         src={apartment.heroImage}
    //         alt={apartment.title}
    //         layout="fill"
    //         objectFit="cover"
    //       />
    //     </div>
    //   </CardHeader>
    //   <CardContent className="p-4">
    //     <CardTitle className="text-lg font-semibold mb-2">{apartment.title}</CardTitle>
    //     <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{apartment.description}</p>
    //     <AlertDialog>
    //       <AlertDialogTrigger asChild>
    //         <Button variant="destructive" size="sm">Delete</Button>
    //       </AlertDialogTrigger>
    //       <AlertDialogContent>
    //         <AlertDialogHeader>
    //           <AlertDialogTitle>Are you sure you want to delete this gallery item?</AlertDialogTitle>
    //           <AlertDialogDescription>
    //             This action cannot be undone. This will permanently delete the gallery item
    //             "{apartment.title}" and remove its data from our servers.
    //           </AlertDialogDescription>
    //         </AlertDialogHeader>
    //         <AlertDialogFooter>
    //           <AlertDialogCancel>Cancel</AlertDialogCancel>
    //           <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
    //         </AlertDialogFooter>
    //       </AlertDialogContent>
    //     </AlertDialog>
    //   </CardContent>
    // </Card>
  )
}

