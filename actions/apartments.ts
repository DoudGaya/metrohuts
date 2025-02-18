"use server"
import { db } from '@/lib/db'
import { apartmentSchema, bookingSchema } from '@/lib/schema'
import { slugify } from '@/lib/utils'
import { ApartmentStatus } from '@prisma/client'
import * as z from 'zod'
import { deleteFileFromS3 } from './amazon-s3'
import { getUserById } from '@/data/user'
import { sendBookingMailToAdmin } from '@/lib/mail'


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


export const getApartmentById = async (id: number) => {
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

    export const sendBookingRequestToAdmin = async (values: z.infer<typeof bookingSchema >) => {
  
      const fieldValidation = bookingSchema.safeParse(values);
      if (!fieldValidation.success) {
           return { error: "field Validation failed " }
      }
  
      const { apartmentId, userId, checkInDate, checkOutDate } = fieldValidation.data
  
      const home = await getApartmentById(apartmentId)
  
      const user = await getUserById(userId)
  
      if (!user) {
          return { error: "User not found" }
      }
  
      if (!home) {
          return { error: "Home not found" }
      }
  
      const homeRequest = await db.bookings.create({
          data: {
              checkInDate,
              checkOutDate,
              apartment: {
                  connect: {
                      id: apartmentId
                  }
              },
            user: {
                  connect: {
                      id: userId
                  }
              }
          }
      })
  
      await sendBookingMailToAdmin(user.email, user.name, new Date(checkInDate), new Date(checkOutDate), home.title, user.phone, home.description)
  
      return { success: "Home request sent to admin successfully", homeRequest: homeRequest}
    }



    export const getBookingsByUserId = async (userId: string) => {
        const bookings = await db.bookings.findMany({
            where: {
                userId
            },
            include: {
                apartment: true
            }
        })
        return bookings
    }

    export const getAllBookings = async () => {
        const bookings = await db.bookings.findMany({
            include: {
                apartment: true,
                user: true
            }
        })
        return bookings
    }