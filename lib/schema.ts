import { HomeStatus } from '@prisma/client';
import * as z from 'zod'

const isBrowser = typeof window !== 'undefined';

// Custom file validation function
const fileValidation = (maxSize: number, allowedTypes: string[]) =>
    z.any()
      .refine(
        (file) => {
          if (!isBrowser) return true; // Skip validation on server
          return file instanceof File;
        },
        "Expected a file."
      )
      .refine(
        (file) => {
          if (!isBrowser) return true; // Skip validation on server
          return file.size <= maxSize;
        },
        `Max file size is ${maxSize / 1000000}MB.`
      )
      .refine(
        (file) => {
          if (!isBrowser) return true; // Skip validation on server
          return allowedTypes.includes(file.type);
        },
        `Only ${allowedTypes.join(', ')} files are allowed.`
      );


// Custom multiple file validation function
const multipleFileValidation = (maxSize: number, allowedTypes: string[]) =>
    z.any()
      .refine(
        (files) => {
          if (!isBrowser) return true; // Skip validation on server
          return files instanceof FileList;
        },
        "Expected a FileList."
      )
      .refine(
        (files) => {
          if (!isBrowser) return true; // Skip validation on server
          return Array.from(files as FileList).every(file => file.size <= maxSize);
        },
        `Max file size is ${maxSize / 1000000}MB.`
      )
      .refine(
        (files) => {
          if (!isBrowser) return true; // Skip validation on server
          return Array.from(files as FileList).every(file => allowedTypes.includes(file.type));
        },
        `Only ${allowedTypes.join(', ')} files are allowed.`
      );


export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string()),
  phone: z.optional(z.string()),
  image: z.optional(z.any())
}) 

export const settingsSecurityDetailsSchema = z.object({
  oldPassword: z.optional(z.string()),
  newPassword: z.optional(z.string()),
  newPasswordConfirmation: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
}) 


export const loginSchema = z.object({
    email: z.string().email({
      message: "Email must be of type email"
    }),
    password: z.string().min(1, {
      message: "Password is required"
    }),
    code: z.optional(z.string().length(6))
  })
  export const newPasswordSchema = z.object({
    password: z.string().min(6, {
      message: "Min of 6 Characters required"
    }),
    passwordConfirmation: z.string().min(6, {
      message: "Min of 6 Characters required"
    }),
  })
  export const ResetSchema = z.object({
    email: z.string().email({
      message: "Email must be of type email"
    }),
  })




  export const apartmentSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters",
    }),
    state: z.string().min(2, {}),
    lga: z.string().min(2, {}),
    address: z.string().min(2, {
      message: "Address must be at least 2 characters",
    }),
    price: z.string().min(1, {
      message: "Please add the price of the apartment",
    }),
    description: z.string().min(2, {
      message: "Description must be at least 2 characters",
    }),
    status: z.enum(['Available', 'Booked']).optional(),
    heroImage: fileValidation(10000000, ['image/jpeg', 'image/png', 'image/gif']).optional(),
    images: multipleFileValidation(10000000, ['image/jpeg', 'image/png', 'image/gif']).optional(),
  })


  export const homeSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters",
    }),
    state: z.string().min(2, {
      message: "State must be at least 2 characters",
    }),
    lga: z.string().min(2, {
      message: "LGA must be at least 2 characters",
    }),
    address: z.string().min(2, {
      message: "Address must be at least 2 characters",
    }),
    price: z.string().min(1, {
      message: "Please add the price of the home",
    }),
    homeStatus: z.enum([HomeStatus.ComingSoon, HomeStatus.Selling, HomeStatus.Sold]),
    description: z.string().min(2, {
      message: "Description must be at least 2 characters",
    }),
    heroImage: fileValidation(10000000, ['image/jpeg', 'image/png', 'image/gif']).optional(),
    images: multipleFileValidation(10000000, ['image/jpeg', 'image/png', 'image/gif']).optional(),
  })



  export const enquirySchema = z.object({
    userId: z.string().min(2, {
      message: "Please select a user for this enquiry",
    }),
    homeId: z.number(),
  message: z.string().optional(),
  })



  export const signUpSchema = z.object({
    fullName: z.string().min(2, {
      message: "Please provide your Full Name",
    }),
    email: z.string().min(3, {
      message: "Email address must be less than 2 characters",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    phone: z.string().min(2, {
      message: "Password confirmation must match characters.",
    }),
    passwordConfirmation: z.string().min(6, {
      message: "Password confirmation must match",
    }),
  })




