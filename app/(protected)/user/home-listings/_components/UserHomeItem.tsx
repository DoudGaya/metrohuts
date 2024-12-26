import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Dialog, 
  DialogContent, 
  DialogTitle,
  DialogDescription,
  DialogHeader, 
  DialogTrigger 
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Homes } from "@/typings"
import { HomeEnquiryForm } from "./HomeEnquiryForm"


export function UserHomeItem({ home }: {home: Homes}) {


  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={home.heroImage}
            alt={home.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-2">{home.title}</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{home.description}</p>
      </CardContent>

      <CardFooter>
      <div className=" w-full flex justify-between items-center">

      <Dialog>
        <DialogTrigger asChild>
          <Button className='font-poppins text-white dark:bg-primary'>Make Enquiry</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] max-h-[80%] md:max-w-xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className='py-5 flex text-center bg-orange-200 dark:text-orange-200 rounded-lg justify-center'>
              <p className='flex items-start text-center font-poppins text-orange-600'>Add Home</p>
            </DialogTitle>
          </DialogHeader>
          <HomeEnquiryForm />
        </DialogContent>
      </Dialog>
        <Link href={`/home/${home.id}`} className="text-primary font-semibold">View</Link>
      </div>
      </CardFooter>
    </Card>
  )
}

