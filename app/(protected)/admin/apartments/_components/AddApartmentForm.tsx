'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea'
import { Input } from "@/components/ui/input"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"

import { useRouter } from 'next/navigation'
// import { createGallerySchema } from '@/lib/schema'
// import { GalleryType } from '@/typings'
// import { createGallery } from '@/actions/galleries'
import { useToast } from '@/hooks/use-toast'
import { uploadFileToS3 } from '@/actions/amazon-s3'
import { apartmentSchema } from '@/lib/schema'
import { createApartmentAction } from '@/actions/apartments'
import { ApartmentType } from '@/typings'

interface AddApartmentProps {
  onSubmit: (data: ApartmentType) => void
  onClose: () => void
}

export function AddApartmentForm({ onSubmit, onClose }: AddApartmentProps) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof apartmentSchema>>({
    resolver: zodResolver(apartmentSchema),
    defaultValues: {
      title: '',
      description: '',
      address: '',
      heroImage: undefined,
      images: undefined,
      status: undefined,
      lga: '',
      price: '',
      state: '',
    },
  })

  async function handleSubmit(values: z.infer<typeof apartmentSchema>) {
    setIsPending(true)
    try {
      let formDataToSubmit: any = { ...values };

      if (values.heroImage) {
        formDataToSubmit.heroImage = await uploadFileToS3(values.heroImage, 'jigawa-state');
      }

      const data = await createApartmentAction(formDataToSubmit)
      onSubmit(data.apartment as ApartmentType)
      form.reset()
      onClose()
      toast({
        title: "Apartment Added",
        description: "New Apartment has been added successfully",
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error",
        description: "Failed to add Apartment. Please try again.",
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea disabled={isPending} {...field} />
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

          <FormField
            control={form.control}
            name="heroImage"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Picture</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    className='border-green-400'
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


        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}

