'use server'
import { getUserById } from '@/data/user'
import { db } from '@/lib/db'
import { sendEnquiryEmail } from '@/lib/mail'
import { enquirySchema } from '@/lib/schema'
import { connect } from 'http2'
import * as z from 'zod'
import { getHomeById } from './homes'



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


        const user = await getUserById(userId)

        const property = await getHomeById(homeId)

        if (!property) {
            return { error: "Property not found" }
        }

        if (!user) {
            return { error: "User not found" }
        }


        await sendEnquiryEmail(
            user?.email,
            user?.name,
            message,
            property.title,
            property.description
        )


        return { success: "Enquiry has been created successfully", enquiry: enquiry}

    } catch (error) {
        console.log(error)
    }
}