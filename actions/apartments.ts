"use server"
import { db } from '@/lib/db'
import { apartmentSchema } from '@/lib/schema'
import { slugify } from '@/lib/utils'
import { ApartmentStatus } from '@prisma/client'
import * as z from 'zod'


export const createApartmentAction = async (values: z.infer<typeof apartmentSchema >) => {
    const fieldValidation = apartmentSchema.safeParse(values);
    if (!fieldValidation.success) {
         return { error: "field Validation failed " }
    }
    const { 
        address,
        description,
        lga,
        price,
        state,
        heroImage,
        images,
        status,
        title,
     } = fieldValidation.data

     const apartment = await db.apartment.create({
        data: {
            address,
            description,
            lga,
            slug: slugify(title),
            status,
            price ,
            state,
            heroImage,
            images,
            title,
        }
     })
     return { success: "Apartment has been created successfully", apartment: apartment}

}

export const getAllApartments = async () => {
    const apartment =  await db.apartment.findMany()
    return apartment
}


export const etApartmentById = async (id: number) => {
    const apartment = await db.apartment.findUnique({
        where: {
            id
        },
    })
    return apartment
}


export const deleteApartment = async (id: number) => {
    const apartment = await db.apartment.delete({
        where: {
            id
        }
    })
    return {success: "Apartment has been deleted successfully"}
}


export const updateApartment = async (id: number, values: z.infer<typeof apartmentSchema>) => {
    const fieldValidation = apartmentSchema.safeParse(values);
    if (!fieldValidation.success) {
         return { error: "field Validation failed " }
    }
    const { 
       address,
       description,
       lga,
       price,
       state,
       heroImage,
       status,
       images,
       title,
     } = fieldValidation.data

    const apartment = await db.apartment.update({
        where: {
            id
        },
        data: {
            address,
            description,
            lga,
            price,
            slug: slugify(title),
            status,
            state,
            heroImage,
            images,
            title,
        }
    })

    return { success: "Apartment has been updated successfully", apartment : apartment}
}