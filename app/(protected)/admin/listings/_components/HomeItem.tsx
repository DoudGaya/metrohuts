
import { motion } from 'framer-motion'
import { FaHome, FaHotel, FaSearch, FaStar, FaCheckCircle } from 'react-icons/fa'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
// import { HomeType } from "@/typings"
import { Button } from "@/components/ui/button"
import Image from "next/image"
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





interface HomeItemProps {
  home: Homes
  onDelete: (homeId: number) => void
}

export function HomeItem({ home, onDelete }: HomeItemProps) {




  const handleDelete = () => {
    onDelete(home.id)
  }




// export function HomeItem({ home } : { home:  Homes}) {

  // const fadeIn = {
  //   hidden: { opacity: 0 },
  //   visible: { opacity: 1, transition: { duration: 0.6 } }
  // }

  // const slideIn = {
  //   hidden: { x: -50, opacity: 0 },
  //   visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  // }

  
return (
<section
className=" px-0"
>
<div className="">
  {/* <h2 className="text-3xl font-bold text-center mb-12">Current Listings</h2> */}
  <div className="h-full px-0">
      <div className=' h-full'>
        <Card className=' h-full flex px-0 flex-col'>
          <Image
            src={home?.heroImage}
            alt={home.title}
            width={400}
            height={300}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />

          <CardHeader>
            <CardTitle className=' text-lg line-clamp-2'>{home?.title}</CardTitle>
           <div className=" flex flex-col">
           <div className="">
            <div className="text-sm flex space-x-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              <p>{home.state + ' '+ home.lga }</p>
            </div>
            <small> {home.address} </small>
           </div>
           </div>
          </CardHeader>


          <CardContent className=' h-full flex flex-col justify-between'>
            <p className="text-gray-600 line-clamp-2 text-sm h-[100px] mb-4">
              {home.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-gray-800 text-sm font-bold">{home.price}</span>
              <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="link" className=' text-red-500' size="sm">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this Home item?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the Home item
                "{home.title}" and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
      

  </div>
</div>
</section>
)
}

