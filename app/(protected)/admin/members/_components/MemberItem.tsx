
"use client"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
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
import type { TeamMemberType } from "@/typings"
import { Mail } from "lucide-react"
import { EditMemberForm } from "./EditMember"

interface MemberProps {
  member: TeamMemberType
  onDelete: (memberId: number) => void
  onUpdate: (updatedMember: TeamMemberType) => void
}

export function MemberItem({ member, onDelete, onUpdate }: MemberProps) {
  const handleDelete = () => {
    onDelete(member.id)
  }

  return (
    <Card className="w-full max-w-md bg-white dark:bg-black border-gray-200 dark:border-gray-800">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="relative h-16 w-16 rounded-full border-2 border-primary overflow-hidden">
          <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
        </div>
        <div className="flex flex-col">
          <CardTitle className="text-xl font-semibold text-primary">{member.name}</CardTitle>
          <CardDescription className="text-sm font-medium text-muted-foreground">{member.role}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          {/* <span>{member.email}</span> */}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-2 border-t dark:border-gray-800">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              View Details
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-[425px] bg-white dark:bg-black">
            <SheetHeader>
              <SheetTitle className="text-2xl font-semibold text-primary">Team Member Details</SheetTitle>
              <SheetDescription>View and manage team member information</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div className="relative h-48 w-48 mx-auto rounded-full overflow-hidden">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-primary">Name</h4>
                  <p className="text-sm text-muted-foreground">{member.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-primary">Role</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
                {/* <div>
                  <h4 className="text-sm font-medium text-primary">Email</h4>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div> */}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-[425px] bg-white dark:bg-black">
              <SheetHeader>
                <SheetTitle className="text-2xl font-semibold text-primary">Edit Team Member</SheetTitle>
              </SheetHeader>
              <EditMemberForm onClose={() => {}} member={member} onSubmit={onUpdate}  />
              {/* Add your EditMemberForm component here */}
            </SheetContent>
          </Sheet>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white dark:bg-black">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {member.name} from the team? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  )
}
