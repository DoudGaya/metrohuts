"use server"
import { db } from '@/lib/db'
import { apartmentSchema } from '@/lib/schema'
import { slugify } from '@/lib/utils'
import { ApartmentStatus } from '@prisma/client'
import * as z from 'zod'
import { deleteFileFromS3 } from './amazon-s3'


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


// export const deleteApartment = async (id: number) => {
//     const apartment = await db.apartment.delete({
//         where: {
//             id
//         }
//     })
//     return {success: "Apartment has been deleted successfully"}
// }


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


export const deleteApartment = async (homeId: number, bucketName: string) => {
    try {
      // Find the home record to get the file keys
      const home = await db.apartment.findUnique({
        where: { id: homeId },
      });
  
      if (!home) {
        return { error: "Home not found" };
      }
  
      // Delete hero image
      if (home.heroImage) {
        const heroImageKey = new URL(home.heroImage).pathname.slice(1); // Extract key from URL
        await deleteFileFromS3(bucketName, heroImageKey);
      }
  
      // Delete all other images if they exist
      if (home.images && Array.isArray(home.images)) {
        for (const imageUrl of home.images) {
          const imageKey = new URL(imageUrl).pathname.slice(1);
          await deleteFileFromS3(bucketName, imageKey);
        }
      }
  
      // Delete the home record from the database
      await db.apartment.delete({
        where: { id: homeId },
      });
  
      return { success: "Home and associated files deleted successfully" };
    } catch (error) {
      console.error("Error deleting home:", error);
      return { error: "Failed to delete home" };
    }
  };