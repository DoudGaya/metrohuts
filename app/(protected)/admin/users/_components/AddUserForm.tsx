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
import { homeSchema, signUpSchema, UserRegistrationSchema } from '@/lib/schema'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { uploadFileToS3 } from '@/actions/amazon-s3'
import { useToast } from '@/hooks/use-toast'
import { createHomeAction } from '@/actions/homes'
import { HomeStatus, UserRole } from '@prisma/client'
import { Homes, User } from '@/typings'
import { regsiter } from '@/actions/register'
import { createNewUser } from '@/data/user'


interface AddUserProps {
  onSubmit: (data: User) => void
  onClose: () => void
}


export function AddUserForm({ onSubmit, onClose }: AddUserProps) {
  
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof UserRegistrationSchema>>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      passwordConfirmation: '',
      phone: '',
      role: UserRole.USER,
    },
  })



  async function handleSubmit(values: z.infer<typeof UserRegistrationSchema>) {
    setIsPending(true)
    try {
      let formDataToSubmit: any = { ...values };

      const data = await createNewUser(formDataToSubmit)
      // @ts-ignore
      onSubmit(data.user as User)
      form.reset()
      onClose()
      toast({
        title: "User Registered",
        description: "New User has been added successfully",
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error",
        description: "Failed to add User. Please try again.",
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
            name="fullName"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>Email</FormLabel>
                <FormControl>
                  <Input disabled={isPending} className=' dark:border-gray-700 border-gray-200  dark:bg-dark' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>Phone</FormLabel>
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
                  <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className=' dark:border-gray-700 border-gray-200  dark:bg-dark text-primary active:border-primary'>
                        <SelectValue placeholder="Select Home Status" />
                      </SelectTrigger>
                      <SelectContent>
                            <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                            <SelectItem value={UserRole.USER}>User</SelectItem>
                      </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      

          <div className=" grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>Password</FormLabel>
                <FormControl>
                  <Input type='password' disabled={isPending} className=' dark:border-gray-700 border-gray-200  dark:bg-dark' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>Password Confirmation</FormLabel>
                <FormControl>
                  <Input type='password' disabled={isPending} className=' dark:border-gray-700 focus-visible:ring-0 border-gray-200 dark:bg-dark' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}


