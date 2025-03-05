'use client'
import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from '@/components/ui/scroll-area'
import { ApartmentItem } from './ApartmentItem'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddApartmentForm } from './AddApartmentForm'
import { useToast } from "@/hooks/use-toast"
import { deleteApartment } from '@/actions/apartments'
import { ApartmentType } from '@/typings'

export function ApartmentActionArea({
  apartments
}: {
  apartments: ApartmentType[]
}) {
  const [apartmentItems, setApartmentItems] = useState<ApartmentType[]>([...apartments])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const itemsPerPage = 20

  const filteredApartments = apartmentItems.filter(item =>
    item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredApartments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentApartment = filteredApartments.slice(startIndex, endIndex)

  

  const handleApartmentDelete = async (apartmentId: number) => {
    try {
      await deleteApartment(apartmentId, 'jigawa-state')
      setApartmentItems(prevItems => prevItems.filter(item => item.id !== apartmentId))
      toast({
        title: "Apartment Deleted",
        description: "Apartment has been deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting Apartment:", error)
      toast({
        title: "Error",
        description: "Failed to delete Apartment. Please try again.",
        variant: "destructive",
      })
    }
  }

     const handleApartmentUpdate = (updatedApartment: ApartmentType) => {
       setApartmentItems(prevItems =>
         prevItems.map(item => item.id === updatedApartment.id ? updatedApartment : item)
       )
       toast({
         title: "Home Updated",
         description: "Home has been updated successfully",
       })
     }

  const handleAddApartment = (newApartment: ApartmentType) => {
    setApartmentItems(prevItems => [...prevItems, newApartment])
    setIsDialogOpen(false)
    toast({
      title: "Apartment Added",
      description: "New Apartment has been added successfully",
    })
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col max-h-min py-0 my-0 bg-white dark:bg-dark border-b dark:border-stone-800 drop-shadow-sm  w-full">
        <div className="w-full items-center flex px-6 justify-between py-4 rounded-lg">
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row w-full md:justify-between md:items-center">
            <div className="flex space-y-2 flex-col">
              <p className='text-lg font-poppins font-semibold'>Apartment Management</p>
              <div className="flex space-x-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className='font-poppins text-white dark:bg-primary'>Add Apartment</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px] max-h-[80%] md:max-w-xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className='py-5 flex text-center bg-orange-200 rounded-lg justify-center'>
                          <p className='flex items-start text-center font-poppins dark:text-primary text-primary'>Add Apartment </p>
                        </DialogTitle>
                    </DialogHeader>
                    <AddApartmentForm onSubmit={handleAddApartment} onClose={() => setIsDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-4 flex flex-col space-y-2">
                <Label htmlFor="search" className='text-base font-poppins font-semibold'>Search Apartment </Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by title or description"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="max-w-sm outline-primary dark:bg-dark border-primary placeholder:text-primary w-[350px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-grow ">
        <div className="p-4">
          <div className="grid max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {currentApartment.map((apartment) => (
              <ApartmentItem apartment={apartment} onUpdate={handleApartmentUpdate} key={apartment.id} onDelete={handleApartmentDelete} />
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className="flex justify-center py-4 bg-white dark:bg-dark border-t border-stone-800 ">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className='bg-black dark:bg-gray-600'
        >
          Previous
        </Button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className='bg-black dark:bg-gray-600'
        >
          Next
        </Button>
      </div>
    </div>
  )
}

