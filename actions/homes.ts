"use server"
import { db } from '@/lib/db'
import { homeSchema } from '@/lib/schema'
import { slugify } from '@/lib/utils'
import { deleteFileFromS3 } from './amazon-s3'
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
        homeStatus,
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
            slug: slugify(title),
            homeStatus,
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


export const getHomeById = async (id: number) => {
    const home = await db.homes.findUnique({
        where: {
            id
        },
    })
    return home
}


// export const deletehome = async (id: number) => {
//     const home = await db.homes.delete({
//         where: {
//             id
//         }
//     })
//     return {success: "home has been deleted successfully"}
// }


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
       homeStatus,
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
            homeStatus,
            slug: slugify(title),
            state,
            heroImage,
            images,
            title,
        }
    })

    return { success: "home has been updated successfully", home : home}
}

export const deleteHomeAction = async (homeId: number, bucketName: string) => {
    try {
      // Find the home record to get the file keys
      const home = await db.homes.findUnique({
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
      await db.homes.delete({
        where: { id: homeId },
      });
  
      return { success: "Home and associated files deleted successfully" };
    } catch (error) {
      console.error("Error deleting home:", error);
      return { error: "Failed to delete home" };
    }
  };