'use client'
import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from '@/components/ui/scroll-area'
import { EnquiriesItem } from './EnquiryItem'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { deleteApartment } from '@/actions/apartments'
import { ApartmentType, EnquiryType } from '@/typings'

export function ApartmentActionArea({
  enquiries
}: {
  enquiries: EnquiryType[]
}) {
  const [anquiriesItem, setEnquiriesItem] = useState<EnquiryType[]>([...enquiries])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const itemsPerPage = 20

  const filtereEnquiries = anquiriesItem.filter(item =>
    item?.home?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.home?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filtereEnquiries.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEnquiries  = filtereEnquiries.slice(startIndex, endIndex)

  return (
    <div className="flex flex-col w-full h-[calc(100vh-5vh)]">
      <div className="flex flex-col max-h-min py-0 my-0 bg-white dark:bg-dark-bg border-b drop-shadow-sm  w-full">
        <div className="w-full items-center flex px-6 justify-between py-4 rounded-lg">
          <div className="flex flex-col  md:space-y-0 md:flex-row justify-center w-full md:items-center">
            <div className="flex flex-col">
              <div className="mb-4 flex flex-col items-center justify-center text-center space-y-2">
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
                  className="max-w-sm outline-primary border-primary placeholder:primary w-[350px]"
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
              anquiriesItem.length > 0 ? (
                currentEnquiries.map( en => (
                  <EnquiriesItem
                    key={en.id}
                    enquiries={en}
                  />
                ))
              ) : (
                <div className="text-center w-full items-center text-primary flex flex-col justify-center col-span-3 py-16">
                  <h2 className="text-3xl font-bold mb-4">No Apartment Available</h2>
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
          className='bg-black dark:bg-gray-600'
        >
          Next
        </Button>
      </div>
    </div>
  )
}

