"use server"
import { db } from '@/lib/db'
import { homeSchema } from '@/lib/schema'
import * as z from 'zod'


export const createHomeAction = async (values: z.infer<typeof homeSchema >) => {
    const fieldValidation = homeSchema.safeParse(values);
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
        title,
     } = fieldValidation.data

     const home = await db.homes.create({
        data: {
            address,
            description,
            lga,
            price,
            state,
            heroImage,
            images,
            title,
        }
     })


     return { success: "home has been created successfully", home: home}

}

export const getAllhomes = async () => {
    const home =  await db.homes.findMany()
    return home
}


export const ethomeById = async (id: number) => {
    const home = await db.homes.findUnique({
        where: {
            id
        },
    })
    return home
}


export const deletehome = async (id: number) => {
    const home = await db.homes.delete({
        where: {
            id
        }
    })
    return {success: "home has been deleted successfully"}
}


export const updatehome = async (id: number, values: z.infer<typeof homeSchema>) => {
    const fieldValidation = homeSchema.safeParse(values);
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
       title,
     } = fieldValidation.data

    const home = await db.homes.update({
        where: {
            id
        },
        data: {
            address,
            description,
            lga,
            price,
            state,
            heroImage,
            images,
            title,
        }
    })

    return { success: "home has been updated successfully", home : home}
}