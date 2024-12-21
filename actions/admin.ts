import { db } from "@/lib/db"
import * as z from 'zod'

export const getAllRecords = async () => {
    const homes = await db.homes.findMany()
    const apartments = await db.apartment.findMany()
    const users =  await db.user.findMany()
    const bookings = await db.bookings.findMany()    

    return {
        homes,
        apartments,
        users,
        bookings
    }
}