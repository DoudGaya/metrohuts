"use client"

import type { User } from "@/typings"
import { motion } from "framer-motion"
import { Mail, UserCircle, Calendar, MessageSquare, Trash2 } from "lucide-react"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface UserProps {
  user: User
  onDelete: (userId: string) => void
}

export function UserItem({ user, onDelete }: UserProps) {
  const handleDelete = () => {
    onDelete(user.id)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.image} alt={user.fullName} />
              <AvatarFallback>
                <UserCircle className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-semibold leading-none">{user.fullName}</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
            </div>
            <Badge variant="secondary" className="ml-auto">
              {user.role}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Bookings</p>
                <p className="text-sm text-muted-foreground">{user.bookings?.length}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Enquiries</p>
                <p className="text-sm text-muted-foreground">{user.enquiries?.length}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="p-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="ml-auto">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete User
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete {user.fullName}&apos;s account and remove
                  their data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </motion.div>
  )
}



// import { motion } from 'framer-motion'
// import { FaHome, FaHotel, FaSearch, FaStar, FaCheckCircle } from 'react-icons/fa'
// import { 
//   Card, 
//   CardContent, 
//   CardHeader, 
//   CardTitle ,
//   CardFooter
// } from "@/components/ui/card"
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"
// import { useState } from 'react'
// // import { HomeType } from "@/typings"
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
// import { Homes, User } from '@/typings'
// import { HomeStatus } from '@prisma/client'


// interface UserProps {
//   user: User
//   onDelete: (userId: string) => void
// }

// export function UserItem({ user, onDelete }: UserProps) {




//   const handleDelete = () => {
//     onDelete(user.id)
//   }

  
// return (
// <div className="">
//   <Card>
//     <CardHeader>
//       <CardTitle>{user.fullName}</CardTitle>
//     </CardHeader>
//     <CardContent>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <div className="flex items-center space-x-2">
//             <FaHotel className="w-5 h-5 text-gray-500" />
//             <p className="text-sm text-gray-500">{user.email}</p>
//           </div>
//         </div>
//       </div>
//     </CardContent>
//     <CardFooter>
//       <div className="flex items-center justify-between">
//         <Button
//           onClick={handleDelete}
//         >
//           Delete
//         </Button>
//       </div>
//     </CardFooter>
//   </Card>
// </div>
// )
// }

