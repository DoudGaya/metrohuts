'use server'
import { teamMemberSchema } from "@/lib/schema"
import * as z from 'zod'
import { db } from "@/lib/db"
import { deleteFileFromS3, uploadFileToS3 } from "./amazon-s3"



export const getAllTeamMembers = async () => {
    const teamMembers = await db.teamMember.findMany()
    return teamMembers
}

export const getTeamMemberById = async (id: number) => {
    const teamMember = await db.teamMember.findUnique({
        where: {
            id
        }
    })
    return teamMember
}


export const createMemberAction = async (values: z.infer<typeof teamMemberSchema >) => {
    const fieldValidation = teamMemberSchema.safeParse(values);
    if (!fieldValidation.success) {
         return { error: "field Validation failed " }
    }
    const { 
      email,
      name,
      role,
      image
     } = fieldValidation.data

     const member = await db.teamMember.create({
        data: {
          email,
          image,
          name,
          role
        }
     })


     return { success: "Member has been created successfully", member: member}

}


export const deleteMemberAction = async (memberId: number, bucketName: string) => {
    try {
      // Find the home record to get the file keys
      const member = await db.teamMember.findUnique({
        where: { id: memberId },
      });
  
      if (!member) {
        return { error: "Member not found" };
      }
  
      // Delete hero image
      if (member.image) {
        const image = new URL(member.image).pathname.slice(1); // Extract key from URL
        await deleteFileFromS3(bucketName, image);
      }
      // Delete the home record from the database
      await db.teamMember.delete({
        where: { id: member.id },
      });
  
      return { success: "Member and associated files deleted successfully" };
    } catch (error) {
      console.error("Error deleting home:", error);
      return { error: "Failed to delete home" };
    }
  };



export const updateTeamMember = async (id: number, data: z.infer<typeof teamMemberSchema>) => {

    const fieldValidation = teamMemberSchema.safeParse(data);
    if (!fieldValidation.success) {
         return { error: "field Validation failed " }
    }

    const  {
        name,
        role,
        image,
        email
    } = fieldValidation.data

    try {
        const teamMember = await db.teamMember.update({
            where: {
                id
            },
            data: {
                name,
                role,
                image,
                email,
            }
        })
        return {data: teamMember, success: 'Team Member updated successfully'}
    } catch (error) {
        console.log(error)
    }
}


export const createTeamMember = async (data: z.infer<typeof teamMemberSchema>) => {


       const fieldValidation = teamMemberSchema.safeParse(data);
        if (!fieldValidation.success) {
             return { error: "field Validation failed " }
        }



    const  {
        name,
        role,
        image,
        email
    } = fieldValidation.data

    try {
        const teamMember = await db.teamMember.create({
            data: {
                name,
                role,
                image,
                email,
            }
        })
        return {data: teamMember, success: 'Team Member created successfully'}
    } catch (error) {
        console.log(error)
    }
}