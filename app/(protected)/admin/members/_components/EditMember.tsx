'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea'
import { uploadMultipleFilesToS3 } from '@/actions/amazon-s3'
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from 'next/navigation'
import { homeSchema, teamMemberSchema } from '@/lib/schema'
import { uploadFileToS3 } from '@/actions/amazon-s3'
import { useToast } from '@/hooks/use-toast'
import { Homes, TeamMemberType } from '@/typings'
import { createMemberAction, updateTeamMember } from '@/actions/teamMember'

// interface AddMemberProps {
//   onSubmit: (data: TeamMemberType) => void
//   onClose: () => void
// }

interface EditMemberProps {
    member: TeamMemberType
    onSubmit: (data: TeamMemberType) => void
    onClose: () => void
  }


export function EditMemberForm({ onSubmit, onClose, member  }: EditMemberProps) {
  
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  

  const form = useForm<z.infer<typeof teamMemberSchema>>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      image: undefined,
      name: member.name,
      role: member.role
    },
  })

  async function handleSubmit(values: z.infer<typeof teamMemberSchema>) {
    setIsPending(true)
    try {
      let formDataToSubmit: any = { ...values };

      if (values.image) {
        formDataToSubmit.image = await uploadFileToS3(values.image, 'jigawa-state');
      }


      if (values.image) { 
        const image = await uploadMultipleFilesToS3(values.image, 'jigawa-state');
        formDataToSubmit.image = image;
      }
      const data = await updateTeamMember(member.id, formDataToSubmit)
      onSubmit(data.member as TeamMemberType)
      form.reset()
      onClose()
      toast({
        title: "Member Updated",
        description: "New Member  has been added successfully",
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error",
        description: "Failed to update member. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
      router.refresh()
    }
  }

  
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 dark:text-orange-200">
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>Full Name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} className=' dark:border-gray-700 border-gray-200  dark:bg-dark' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>Role</FormLabel>
                <FormControl>
                  <Input disabled={isPending} className=' dark:border-gray-700 border-gray-200  dark:bg-dark' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel className=' text-primary'> Image</FormLabel>
                <FormControl>
                  <Input disabled={isPending} className=' dark:border-gray-700 border-gray-200  dark:bg-dark'
                    type="file"
                    accept="image/*"
                    onChange={(e) => onChange(e.target.files?.[0])}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

         
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}


