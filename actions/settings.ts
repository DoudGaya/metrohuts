"use server"
import * as z from 'zod'
import { db } from '@/lib/db'
import { getUserByEmail, getUserById } from '@/data/user'
import bcrypt from 'bcryptjs'
import { currentUser } from '@/lib/auth'
import { SettingsSchema, settingsSecurityDetailsSchema } from '@/lib/schema'
import { handleUsersProfileImages } from './images'
// import 

export const profileRecordsUpdate = async (values: z.infer<typeof SettingsSchema>) => {




    const user = await currentUser();
    if (!user) {
        return {error: "Unauthorized"}
    }

    if ( user.isOAuth ) {
        values.email = undefined 
    }

    const dbUser = await getUserById(user.id);
    if (!dbUser) {
        return {error: "Unauthorized"}
    }



    if (values.image) {
        // @ts-ignore
        const imagePath = await handleUsersProfileImages(values)
        if (!imagePath) {
            return {error: "No Image Found"}
        }
        await db.user.update({
            where: {id: dbUser.id},
            data: {
                ...values,
                image: imagePath
            }
        })

    }

    if (!values.image) {
        await db.user.update({
            where: {id: dbUser.id},
            data: {
                ...values
            }
        })
    }


   
    

   
    return {success: "Profile Updated"}
}

export const securityRecordsUpdate = async ( values: z.infer<typeof settingsSecurityDetailsSchema>) => {
      const user = await currentUser();

            if (!user) {
                    return {error: "Unauthorized"}
            }

          const fieldValidation = settingsSecurityDetailsSchema.safeParse(values);
          if (!fieldValidation.success) {
               return { error: "field Validation failed " }
          }
          const { newPassword, newPasswordConfirmation, oldPassword } = fieldValidation.data


          if (!newPassword || !newPasswordConfirmation || !oldPassword) {
                return {error: "All fields are required"}
          }
          if (newPassword !== newPasswordConfirmation) return {error: "Password doesn not match"}
            const dbUser = await getUserById(user.id);
      
    if (!dbUser) {
        return {error: "Unauthorized"}
    }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        if (!dbUser.email) {
            return {error: 'email does not exist'}
        }
        // checking for an existing user
        
        const emailExist = await getUserByEmail(dbUser.email)
        
        if (emailExist) {
            return {error: "User already Exist"}
        }
    await db.user.update({
        where: {id: dbUser.id},
        data: {
            ...values,
            password: hashedPassword,
           }
    })
    return {success: "Profile Updated"}
}
