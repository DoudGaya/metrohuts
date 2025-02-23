'use server'
import { db } from "@/lib/db";
import { signUpSchema, UserRegistrationSchema } from "@/lib/schema";
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import * as z from 'zod'

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

export const allUsers = async () => {
    try {
        const users = await db.user.findMany({
            include: {
                bookings: true,
                enquiries: true
            },
        })
        return users
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (userId: string) => {
    try {
        const user = await db.user.delete({
            where: {
                id: userId
            }
        })
        return user
    } catch (error) {
        console.log(error)
    }
}

export const createNewUser = async (values: z.infer<typeof UserRegistrationSchema>) => {
    const fieldValidation = UserRegistrationSchema.safeParse(values);
    if (!fieldValidation.success) {
         return { error: "field Validation failed " }
    }
    const { fullName, email, password, passwordConfirmation, role, phone } = fieldValidation.data


    if (password !== passwordConfirmation) return {error: "Password doesn not match"}

    const hashedPassword = await bcrypt.hash(password, 10)
    
    // checking for an existing user
    const emailExist = await getUserByEmail(email)
    
    if (emailExist) {
        return {error: "User already Exist"}
    }

   const user = await db.user.create({
        data: {
            name: fullName,
            email,
            phone,
            password: hashedPassword,
            role: role || "USER",
            emailVerified: new Date()

        }
    })

    const verificationToken = await generateVerificationToken(email)
    // await sendVerificationEmail(verificationToken.email, verificationToken.token)
    return {success: "Check your email to verify your account!", user: user}
}