"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import logo from '@/public/img/logo-icon.png'
import Image from "next/image"
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { useTransition } from "react";
import Link from "next/link";
import { signUpSchema } from "@/lib/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGGED_IN_REDIRRECT } from "@/routes";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// import { register, regsiter } from "@/actions/regsiter";
import { FormSuccess } from "../FormSuccess";
import { FormError } from "../FormError";
import { regsiter } from "@/actions/register";


export function SignUpForm() {

  const [terms, setTerms] = useState<boolean> (false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState < string | undefined>('')


  const googleSignIn = (provider: "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGGED_IN_REDIRRECT
    })
  }


  const changeTerms = () => {
    return setTerms((prev: boolean): boolean => {
      return !prev
    })
  }

   const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof signUpSchema>) {
    setError('')
    setSuccess('')

    startTransition(() => {
      if(values.password !== values.passwordConfirmation) {
        setError('Password does not matched')
      }
      
      regsiter(values)
      .then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })

  }



  return (
    <div className=" mt-20 flex flex-col bg-white px-12 py-12 border shadow-lg rounded-lg  w-full">
       <div className=" w-full items-center justify-center py-2 ">
        <Image src={logo} alt="" className=" h-16 w-16 bg-rd-300" />
      </div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name </FormLabel>
              <FormControl>
                <Input disabled={isPending} className=" outline-primary" placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" grid grid-cols-2 gap-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input disabled={isPending} type="email" className=" outline-primary" placeholder="Email Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input disabled={isPending} className=" outline-primary" placeholder="(234) 000 000 000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
       <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" disabled={isPending} className=" outline-primary" placeholder="Passsord" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl>
                <Input type="password"disabled={isPending} className=" outline-primary" placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       </div>
       <div className="flex items-center space-x-2">
    </div>
          <FormSuccess message={success} />
          <FormError message={error} />
       <Button type="submit" disabled={isPending} className=" bg-primary hover:bg-black/80 text-white w-full">Create an Account</Button>
      </form>
    </Form>
   <div className=" flex flex-col space-y-4 pt-6">
    <Link href="/login" className=" flex space-x-2">
        <p className=""> Already have an account ? </p>
        <span className=" font-semibold">Log In</span>
    </Link>
   </div>
    </div>
  )
}

