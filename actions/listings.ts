// "use server"

// "use server"
// import { db } from '@/lib/db'
// // import { createNewsSchema } from '@/lib/schema'
// import * as z from 'zod'
// import { slugify } from '@/lib/utils'
// import { revalidatePath } from 'next/cache'







// export const createNewsAction = async (values: z.infer<typeof createNewsSchema >) => {
//     const fieldValidation = createNewsSchema.safeParse(values);
//     if (!fieldValidation.success) {
//          return { error: "field Validation failed " }
//     }
//     const { 
//         author,
//         content,
//         published,
//         imageUrl,
//         title,
//      } = fieldValidation.data

//      const news = await db.news.create({
//         data: {
//             content,
//             imageUrl,
//             published,
//             slug: slugify(title),
//             title,
//             author: {
//                  connect: {
//                         id: author
//                  }
//             },

//         }
//      })

//      revalidatePath('/user')
//      return { success: "News has been created successfully", news: news}

// }

// export const getAllNews = async () => {
//     const news =  await db.news.findMany({
//         include: {
//             author: true
//         }
//     })


//     revalidatePath('/user')
//     return news
// }


// export const getNewsById = async (id: string) => {
//     const news = await db.news.findUnique({
//         where: {
//             id
//         },
//         include: {
//             author: true
//         }
//     })


//     revalidatePath('/user')
//     return news
// }

// export const getNewsBySlug = async (slug: string) => {
//     const news = await db.news.findUnique({
//         where: {
//             slug,
//         },
//         include: {
//             author: true
//         }
//     })


//     revalidatePath('/user')
//     return news
// }



// export const deleteNews = async (id: string) => {
//     const news = await db.news.delete({
//         where: {
//             id
//         }
//     })
//     revalidatePath('/user')
//     return {success: "News has been deleted successfully"}
// }


// export const updateNews = async (id: string, values: z.infer<typeof createNewsSchema>) => {
//     const fieldValidation = createNewsSchema.safeParse(values);
//     if (!fieldValidation.success) {
//          return { error: "field Validation failed " }
//     }
//     const { 
//         author,
//         content,
//         published,
//         imageUrl,
//         title,
//      } = fieldValidation.data

//     const news = await db.news.update({
//         where: {
//             id
//         },
//         data: {
//             content,
//             imageUrl,
//             slug: slugify(title),
//             published,
//             title,
//             author: {
//                     connect: {
//                             id: author
//                     }
//             }
//         }
//     })


//     revalidatePath('/user')
//     return { success: "News has been updated successfully", news: news}
// }