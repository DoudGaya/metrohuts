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
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={apartment.heroImage}
            alt={apartment.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-2">{apartment.title}</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{apartment.description}</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this gallery item?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the gallery item
                "{apartment.title}" and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}

