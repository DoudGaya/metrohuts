"use server"
import { db } from '@/lib/db'
import { enquirySchema, homeSchema } from '@/lib/schema'
import { slugify } from '@/lib/utils'
import { deleteFileFromS3 } from './amazon-s3'
import * as z from 'zod'
import { getUserById } from '@/data/user'
import { sendEnquiryEmail } from '@/lib/mail'




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
  
  try {
    const home =  await db.homes.findMany()
    
    return home
    } catch (error) {
      console.log(error)

      return {error: 'Something Went Wrong'}
    }
}


export const getHomeById = async (id: number) => {
    const home = await db.homes.findUnique({
        where: {
            id
        },
    })
    return home
}


export const updateHomeAction = async (id: number, values: z.infer<typeof homeSchema>) => {
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



  export const sendHomeRequestToAdmin = async (values: z.infer<typeof enquirySchema >) => {

    const fieldValidation = enquirySchema.safeParse(values);
    if (!fieldValidation.success) {
         return { error: "field Validation failed " }
    }

    const { homeId, userId, message } = fieldValidation.data

    const home = await getHomeById(homeId)

    const user = await getUserById(userId)

    if (!user) {
        return { error: "User not found" }
    }

    if (!home) {
        return { error: "Home not found" }
    }

    const homeRequest = await db.enquiries.create({
        data: {
            message,
            home: {
                connect: {
                    id: homeId
                }
            },
          user: {
                connect: {
                    id: userId
                }
            }
        }
    })

    await sendEnquiryEmail(user.email, user.name, message, home.title, user.phone, home.description)

    return { success: "Home request sent to admin successfully", homeRequest: homeRequest}
  }