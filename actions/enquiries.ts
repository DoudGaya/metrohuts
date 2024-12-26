'use server'
import { db } from '@/lib/db'



export const createEnquiryAction = async (data: any) => {
    try {
        const enquiry = await db.enquiry.create({
            data
        })
        return enquiry
    } catch (error) {
        console.log(error)
    }
}