
import { motion } from 'framer-motion'
import { FaHome, FaHotel, FaSearch, FaStar, FaCheckCircle } from 'react-icons/fa'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle ,
  CardFooter
} from "@/components/ui/card"
import { EditHomeForm } from './EditHomeForm'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from 'react'
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
import { Homes, TeamMemberType } from '@/typings'
import { HomeStatus } from '@prisma/client'


interface MemberProps {
  member: TeamMemberType
  onDelete: (homeId: number) => void
  onUpdate: (updatedHome: TeamMemberType) => void
}

export function MemberItem({ member, onDelete, onUpdate }: MemberProps) {


  const handleDelete = () => {
    onDelete(member.id)
  }
  
return (
<div className="">

</div>
)
}

