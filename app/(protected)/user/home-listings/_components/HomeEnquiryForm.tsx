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
import { homeSchema } from '@/lib/schema'
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
import { HomeStatus } from '@prisma/client'
import { Homes } from '@/typings'


interface AddHomeFormProps {
  onSubmit: (data: Homes) => void
  onClose: () => void
}


export function HomeEnquiryForm({ onSubmit, onClose }: AddHomeFormProps) {
  
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const { toast } = useToast()




  const form = useForm<z.infer<typeof homeSchema>>({
    resolver: zodResolver(homeSchema),
    defaultValues: {
        title: "",
        address: "",
        description: "",
        lga: "",
        homeStatus: undefined,
        price: "",
        state: "",
        heroImage: undefined,
        images: undefined,

    },
  })

  async function handleSubmit(values: z.infer<typeof homeSchema>) {
    setIsPending(true)
    try {
      let formDataToSubmit: any = { ...values };

      if (values.heroImage) {
        formDataToSubmit.heroImage = await uploadFileToS3(values.heroImage, 'jigawa-state');
      }


      if (values.images) { 
        const images = await uploadMultipleFilesToS3(values.images, 'jigawa-state');
        formDataToSubmit.images = images;
      }
      const data = await createHomeAction(formDataToSubmit)
      onSubmit(data.home as Homes)
      form.reset()
      onClose()
      toast({
        title: "Home Added",
        description: "New Home has been added successfully",
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error",
        description: "Failed to add Home. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
      router.refresh()
    }
  }

  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
            name="homeStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Home Status" />
                      </SelectTrigger>
                      <SelectContent>
                            <SelectItem value={HomeStatus.ComingSoon}>Coming Soon</SelectItem>
                            <SelectItem value={HomeStatus.Selling}>Selling</SelectItem>
                            <SelectItem value={HomeStatus.Sold}>Sold</SelectItem>
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
                <FormLabel className=''>Booking Price</FormLabel>
                <FormControl>
                  <Input className='before:content-[NGN] '
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
                  <Input disabled={isPending} className=''
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
                  <Input disabled={isPending} className=''
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

