import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
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
import { ApartmentType, Homes } from "@/typings"


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
        <div className=""> Send Enquiries</div>
      </CardContent>
    </Card>
  )
}

