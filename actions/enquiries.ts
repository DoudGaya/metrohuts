'use server'
import { db } from '@/lib/db'
import { enquirySchema } from '@/lib/schema'
import { connect } from 'http2'
import * as z from 'zod'



export const createEnquiryAction = async (data: z.infer<typeof enquirySchema>) => {

    const fieldValidation = enquirySchema.safeParse(data);
    if (!fieldValidation.success) {
        return { error: "field Validation failed " }
    }

    const { 
        homeId,
        userId,
        message,
    } = fieldValidation.data

    try {
        const enquiry = await db.enquiries.create({
            data: {
                message,
                user: {
                    connect: {
                        id: userId
                    }
                },
                home: {
                    connect: {
                        id: homeId
                    }
                }
            },
        })

        
        return { success: "Enquiry has been created successfully", enquiry: enquiry}

    } catch (error) {
        console.log(error)
    }
}