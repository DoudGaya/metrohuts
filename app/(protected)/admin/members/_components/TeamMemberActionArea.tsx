'use client'

import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from '@/components/ui/scroll-area'
import { MemberItem } from './MemberItem'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddMemberForm } from './AddMemberForm'
// import { deletehome } from '@/actions/homes'
import { useToast } from "@/hooks/use-toast"
import { TeamMemberType } from '@/typings'
import { deleteMemberAction } from '@/actions/teamMember'


export function TeamMemberActionArea({
  members
}: {
  members: TeamMemberType[]
}) {
  const [membersItems, setMembersItems] = useState<TeamMemberType[]>([...members])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const itemsPerPage = 20

  const filteredMembers = membersItems.filter(item =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.role?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMembers = filteredMembers.slice(startIndex, endIndex)

    const handleMemberDelete = async (membersId: number) => {
      try {
        await deleteMemberAction(membersId, 'jigawa-state')
        setMembersItems(prevItems => prevItems.filter(item => item.id !== membersId))
        toast({
          title: "Member Listing Deleted",
          description: "Member has been deleted successfully",
          variant: "default",
        })
      } catch (error) {
        console.error("Error deleting Home:", error)
        toast({
          title: "Error",
          description: "Failed to delete Member. Please try again.",
          variant: "destructive",
        })
      }
    }

    const handleMemberUpdate = (updatedMember: TeamMemberType) => {
      setMembersItems(prevItems =>
        prevItems.map(item => item.id === updatedMember.id ? updatedMember : item as TeamMemberType)
      )
      toast({
        title: "Home Updated",
        description: "Home has been updated successfully",
      })
    }
  
    const handleMemberAdd = (newMember: TeamMemberType) => {
      setMembersItems(prevItems => [...prevItems, newMember])
      setIsDialogOpen(false)
      toast({
        title: "Member Added",
        description: "New Memmber has been added successfully",
      })
    }
  return (
    <div className="flex flex-col w-full h-[calc(100vh-5vh)]">
      <div className="flex flex-col max-h-min py-0 my-0 dark:bg-dark dark:bg-dark-bg border-b dark:border-zinc-800 drop-shadow-sm  w-full">
        <div className="w-full items-center flex px-6 justify-between py-4 rounded-lg">
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row w-full md:justify-between md:items-center">
            <div className="flex space-y-2 flex-col">
              <p className='text-lg font-poppins font-semibold'>Member Listing System</p>
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='font-poppins text-white dark:bg-primary'>Add Member</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px] bg-white dark:bg-black max-h-[80%] md:max-w-xl overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className='py-5 flex text-center bg-orange-200 dark:text-orange-200 rounded-lg justify-center'>
                        <p className='flex items-start text-center font-poppins text-orange-600'>Add Member</p>
                      </DialogTitle>
                    </DialogHeader>
                    <AddMemberForm onSubmit={handleMemberAdd} onClose={() => setIsDialogOpen(false)} />
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
            {currentMembers.map((member) => (
              <MemberItem member={member} key={member.id} onUpdate={handleMemberUpdate} onDelete={handleMemberDelete}  />
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

