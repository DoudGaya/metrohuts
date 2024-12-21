'use client'

import { startTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea'
import { uploadMultipleFilesToS3 } from '@/actions/amazon-s3'
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from 'next/navigation'
import { homeSchema } from '@/lib/schema'
import { useTransition } from 'react'
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





export function AddHomeForm({formSubmit }: { formSubmit: (data: Homes) => void }) {
  
  const [isPending, setIsPending] = useState(false)
  // const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const router = useRouter()
  const { toast } = useToast()




  const form = useForm<z.infer<typeof homeSchema>>({
    resolver: zodResolver(homeSchema),
    defaultValues: {
        title: "",
        address: "",
        description: "",
        lga: "",
        price: "",
        state: "",
        heroImage: undefined,
        images: undefined,

    },
  })


  async function onSubmit(data: z.infer<typeof homeSchema>) {
    setIsPending(true)
    try {
      let formDataToSubmit: any = { ...data };


      console.log(formDataToSubmit)

      // Handle file uploads
      if (data.heroImage instanceof File) {
        formDataToSubmit.heroImage = await uploadFileToS3(data.heroImage, 'jigawa-state');
      }


      if (data.images instanceof FileList) {
        formDataToSubmit.images = await uploadMultipleFilesToS3(data.images, 'jigawa-state');
      }

      setError('')
      setSuccess('')


      const records = await createHomeAction(formDataToSubmit)
      await new Promise(resolve => setTimeout(resolve, 1000))
      formSubmit(records.home as Homes)
      form.reset()
      toast({
        title: "Home Created",
        description: "You've Added a new Home",
      })


    } catch (error) {
      console.error('Error processing form submission:', error);
     
    }
}
  return (
    <Form {...form}>
      {/* <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8"> */}
      <form onSubmit={form.handleSubmit((data) => onSubmit(data))} className="space-y-8">
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Description</FormLabel>
                <FormControl>
                  <Textarea className=' h-[120px]' disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <div className=" grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="lga"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Local Government</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>


<div className=" grid grid-cols-2 gap-4">
      <FormField
            control={form.control}
            name=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Author" />
                      </SelectTrigger>
                      <SelectContent>

                        
                            <SelectItem key={author.id} value={author.id}>{author.name}</SelectItem>
                      
                      </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

      <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' dark:text-yellow-200'>Booking Price</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    { ...field }
                    onChange={(e) => {
                      const value = e.target.value.replace(/,/g, '');
                      if (!isNaN(Number(value))) {
                        field.onChange(Number(value).toLocaleString());
                      }
                    }}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

</div>

        <FormField
            control={form.control}
            name="heroImage"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Hero Image</FormLabel>
                <FormControl>
                  <Input disabled={isPending} className=' border-green-400'
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

          <FormField
            control={form.control}
            name="images"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Other Pictures</FormLabel>
                <FormControl>
                  <Input disabled={isPending} className=' border-green-400'
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => onChange(e.target.files)}
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


