'use client'

import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from '@/components/ui/scroll-area'
import { HomeItem } from './HomeItem'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddHomeForm } from './AddHomeForm'
// import { deletehome } from '@/actions/homes'
import { useToast } from "@/hooks/use-toast"
import { Homes } from '@/typings'
import { deleteHomeAction } from '@/actions/homes'

export function HomeActionArea({
  homes
}: {
  homes: Homes[]
}) {
  const [homesItems, setHomeItems] = useState<(Homes)[]>([...homes])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const itemsPerPage = 20

  const filteredHomes = homesItems.filter(item =>
    item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredHomes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentHomes = filteredHomes.slice(startIndex, endIndex)

    const handleHomeDelete = async (homeId: number) => {
      try {
        await deleteHomeAction(homeId, 'jigawa-state')
        setHomeItems(prevItems => prevItems.filter(item => item.id !== homeId))
        toast({
          title: "Home Listing Deleted",
          description: "Home has been deleted successfully",
          variant: "default",
        })
      } catch (error) {
        console.error("Error deleting Home:", error)
        toast({
          title: "Error",
          description: "Failed to delete Home. Please try again.",
          variant: "destructive",
        })
      }
    }

    const handleHomeUpdate = (updatedHome: Homes) => {
      setHomeItems(prevItems =>
        prevItems.map(item => item.id === updatedHome.id ? updatedHome : item)
      )
      toast({
        title: "Home Updated",
        description: "Home has been updated successfully",
      })
    }
  
    const HandleHomeAdd = (newHome: Homes) => {
      setHomeItems(prevItems => [...prevItems, newHome])
      setIsDialogOpen(false)
      toast({
        title: "Home Added",
        description: "New Home has been added successfully",
      })
    }
  return (
    <div className="flex flex-col w-full h-[calc(100vh-5vh)]">
      <div className="flex flex-col max-h-min py-0 my-0 dark:bg-dark dark:bg-dark-bg border-b dark:border-zinc-800 drop-shadow-sm  w-full">
        <div className="w-full items-center flex px-6 justify-between py-4 rounded-lg">
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row w-full md:justify-between md:items-center">
            <div className="flex space-y-2 flex-col">
              <p className='text-lg font-poppins font-semibold'>Homes Listing System</p>
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='font-poppins text-white dark:bg-primary'>Add Home</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px] bg-white dark:bg-black max-h-[80%] md:max-w-xl overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className='py-5 flex text-center bg-orange-200 dark:text-orange-200 rounded-lg justify-center'>
                        <p className='flex items-start text-center font-poppins text-orange-600'>Add Home</p>
                      </DialogTitle>
                    </DialogHeader>
                    <AddHomeForm onSubmit={HandleHomeAdd} onClose={() => setIsDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-4 flex flex-col space-y-2">
                <Label htmlFor="search" className='text-base font-poppins font-semibold'>Search Home</Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by title, content, or author"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="max-w-sm outline-primary dark:bg-dark dark:text-primary  border-primary placeholder:text-primary w-[350px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-grow dark:bg-dark ">
        <div className="p-4">
          <div className="grid grid-cols-1 dark:bg-dark h-full md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentHomes.map((home) => (
              <HomeItem home={home} key={home.id} onUpdate={handleHomeUpdate} onDelete={handleHomeDelete}  />
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className="flex justify-center py-4 bg-white dark:bg-dark dark:border-zinc-800 border-t">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className=' bg-primary dark:bg-gray-600'
        >
          Previous
        </Button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className=' bg-primary dark:bg-gray-600'
        >
          Next
        </Button>
      </div>
    </div>
  )
}

