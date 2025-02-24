"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"
import { Button } from "@/components/ui/button"
import { uploadMultipleFilesToS3, uploadFileToS3 } from "@/actions/amazon-s3"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { ApartmentStatus } from "@prisma/client"
import { Textarea } from "@/components/ui/textarea"
import { apartmentSchema } from "@/lib/schema"

import { useToast } from "@/hooks/use-toast"
// import { updateApartmentAction } from "@/actions/apartments"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" 

import type { ApartmentType } from "@/typings"
import { updateApartment } from "@/actions/apartments"

interface EditApartmentFormProps {
  apartment: ApartmentType
  onSubmit: (data: ApartmentType) => void
  onClose: () => void
}

export function EditApartmentForm({ apartment, onSubmit, onClose }: EditApartmentFormProps) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof apartmentSchema>>({
    resolver: zodResolver(apartmentSchema),
    defaultValues: {
      title: apartment.title,
      description: apartment.description,
      address: apartment.address,
      status: apartment.status,
      lga: apartment.lga,
      price: apartment.price,
      state: apartment.state,
      heroImage: undefined,
      images: undefined,
    },
  })

  async function handleSubmit(values: z.infer<typeof apartmentSchema>) {
    setIsPending(true)
    try {
      const formDataToSubmit: any = { ...values }

      if (values.heroImage) {
        formDataToSubmit.heroImage = await uploadFileToS3(values.heroImage, "jigawa-state")
      } else {
        formDataToSubmit.heroImage = apartment.heroImage
      }

      if (values.images) {
        const images = await uploadMultipleFilesToS3(values.images, "jigawa-state")
        formDataToSubmit.images = images
      } else {
        formDataToSubmit.images = apartment.images
      }

      const data = await updateApartment(apartment.id, formDataToSubmit)
      onSubmit(data.apartment as ApartmentType)
      form.reset()
      onClose()
      toast({
        title: "Apartment Updated",
        description: "Apartment has been updated successfully",
      })
    } catch (error) {
      console.error("Error updating apartment:", error)
      toast({
        title: "Error",
        description: "Failed to update apartment. Please try again.",
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
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Home Status" />
                      </SelectTrigger>
                      <SelectContent>
                            <SelectItem value={ApartmentStatus.Available}>Available</SelectItem>
                            <SelectItem value={ApartmentStatus.Booked }>Booked</SelectItem>
                            {/* <SelectItem value={HomeStatus.Sold}>Sold</SelectItem> */}
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
                  <Input className=' before:content-[NGN] '
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
          {isPending ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  )
}

