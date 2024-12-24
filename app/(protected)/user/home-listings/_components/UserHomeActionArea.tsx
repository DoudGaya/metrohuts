'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from '@/components/ui/scroll-area'
// import { Item } from './Item'
import { UserHomeItem } from './UserHomeItem'

import { useToast } from "@/hooks/use-toast"
import { Homes } from '@/typings'

export function UserHomeActionArea({
  homes
}: {
  homes: Homes[]
}) {
  const [homeItems, setHomeItems] = useState<Homes[]>([...homes])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const itemsPerPage = 20

  const filteredHomes = homeItems.filter(item =>
    item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredHomes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentHome = filteredHomes.slice(startIndex, endIndex)

  return (
    <div className="flex flex-col w-full h-[calc(100vh-5vh)]">
      <div className="flex flex-col max-h-min py-0 my-0 bg-white dark:bg-dark-bg border-b drop-shadow-sm  w-full">
        <div className="w-full items-center flex px-6 justify-between py-4 rounded-lg">
          <div className="flex flex-col  md:space-y-0 md:flex-row justify-center w-full md:items-center">
            <div className="flex flex-col">
              <div className="mb-4 flex flex-col items-center justify-center text-center space-y-2">
                <Label htmlFor="search" className='text-base font-poppins font-semibold'>Search Home </Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by title or description"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="max-w-sm outline-primary border-primary placeholder:text-primary w-[350px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-grow ">
        <div className="p-4">
          <div className="grid max-w-7xl w-full items-center justify-center mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {
              homeItems.length > 0 ? (
                currentHome.map(home => (
                  <UserHomeItem
                    key={home.id}
                    home={home}
                  />
                ))
              ) : (
                <div className="text-center w-full items-center flex flex-col justify-center col-span-3 text-primary py-16">
                  <h2 className="text-3xl font-bold mb-4">No Home Available</h2>
                  <p className="text-lg text-gray-600">
                    There are currently no listings available. Please check back later.
                  </p>
                </div>
              )
            }
          </div>
        </div>
      </ScrollArea>
      <div className="flex justify-center py-4 bg-white dark:bg-dark-bg border-t">
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
          className='bg-primary dark:bg-gray-600'
        >
          Next
        </Button>
      </div>
    </div>
  )
}

