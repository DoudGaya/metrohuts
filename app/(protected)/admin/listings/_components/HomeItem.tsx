
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
import { Homes } from '@/typings'


interface HomeItemProps {
  home: Homes
  onDelete: (homeId: number) => void
}

export function HomeItem({ home, onDelete }: HomeItemProps) {




  const handleDelete = () => {
    onDelete(home.id)
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
            src={home?.heroImage}
            alt={home.title}
            width={400}
            height={300}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />

          <CardHeader>
            <CardTitle className=' text-lg line-clamp-2'>{home?.title}</CardTitle>
           <div className=" flex flex-col space-y-3 ">
              <div className="text-sm flex items-center bg-gray-100/90 rounded-full px-3 py-0.5 space-x-3 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 flex-none">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                      <p className=' truncate'> {home.address} </p>
                    {/* <p>{home.state + ' '+ home.lga }</p> */}
              </div>
           </div>
          </CardHeader>


          <CardContent className=' h-full flex flex-col justify-between'>
            <p className="text-gray-600 overflow-hidden text-justify text-sm h-[100px] mb-4">
              {home.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-gray-800 text-sm font-bold"> <span className=' text-xs'>NGN</span> {home.price}</span>
              <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="link" className=' text-red-500' size="sm">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this Home item?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the Home item
                <span className=' font-semibold text-gray-800'> {home.title}
                  </span> and remove its data from our servers.
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

