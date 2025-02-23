import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
   try {
    const user = await db.user.findUnique({
        where: {
            email,
        }
    })
    return user
    
   } catch (error) {
        console.log(error)
   }
}

export const getUserById = async (id: string) => {


    if (!id) {
        return null
    }
    try {
        const user = await db.user.findUnique({
            where: {
                id
            },
        })
        return user
        
    } catch (error) {
       console.log(error)
    }
}


export const getUserWithRecords = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            },
            include: {
                bookings: true,
                enquiries: true
            }
        })
        return user
    } catch (error) {
        console.log(error)
    }
}



const checkDBUser = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        })
        return user
    } catch (error) {
        console.log(error)
    }
}


export const userBookings = async (userId: string) => {
    try {
        const bookings = await db.bookings.findMany({
            where: {
                userId
            },
        })
        return bookings
    } catch (error) {
        console.log(error)
    }
}

export const userEnquiries = async (userId: string) => {
    try {
        const enquiries = await db.enquiries.findMany({
            where: {
                userId
            },
            include: {
                user: true,
                home: true
            }
        })
        return enquiries
    } catch (error) {
        console.log(error)
    }
}

export const getAllUsers = async () => {
    try {
        const users = await db.user.findMany({
            include: {
                bookings: true,
                enquiries: true
        }})
        return users
    } catch (error) {
        console.log(error)
    }
}