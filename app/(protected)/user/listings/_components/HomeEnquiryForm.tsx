// 'use client'

// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'
// import { Button } from "@/components/ui/button"
// import { Textarea } from '@/components/ui/textarea'
// import { uploadMultipleFilesToS3 } from '@/actions/amazon-s3'
// import { Input } from "@/components/ui/input"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { useRouter } from 'next/navigation'
// import { enquirySchema, homeSchema } from '@/lib/schema'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { uploadFileToS3 } from '@/actions/amazon-s3'
// import { useToast } from '@/hooks/use-toast'
// import { createHomeAction } from '@/actions/homes'
// import { HomeStatus } from '@prisma/client'
// import { Homes } from '@/typings'


// interface AddHomeFormProps {
//   onClose: () => void
// }


// export function HomeEnquiryForm({ onClose }: AddHomeFormProps) {
  
//   const [isPending, setIsPending] = useState(false)
//   const router = useRouter()
//   const { toast } = useToast()




//   const form = useForm<z.infer<typeof enquirySchema>>({
//     resolver: zodResolver(enquirySchema),
//     defaultValues: {
//         homeId: 0,
//         message: "",
//         userId: 0,
//     },
//   })

//   async function handleSubmit(values: z.infer<typeof homeSchema>) {
//     setIsPending(true)
//     try {
//       let formDataToSubmit: any = { ...values };

    
//       const data = await createHomeAction(formDataToSubmit)
//       form.reset()
//       onClose()
//       toast({
//         title: "Enquiry Sent",
//         description: "New home enquiry been added successfully",
//       })
//     } catch (error) {
//       console.error('Error submitting form:', error)
//       toast({
//         title: "Error",
//         description: "Failed to add Enquiry. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsPending(false)
//       router.refresh()
//     }
//   }

  
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
//         <div className="grid grid-cols-1 gap-4">
        
//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Message</FormLabel>
//                 <FormControl>
//                   <Textarea placeholder='Optional' className=' h-[120px]' disabled={isPending} {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//         </div>
//         <Button type="submit" disabled={isPending}>
//           {isPending ? 'Submitting...' : 'Submit'}
//         </Button>
//       </form>
//     </Form>
//   )
// }