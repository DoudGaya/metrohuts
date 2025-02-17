"use client"
import React, { useEffect, useCallback, useState } from 'react'
import Link from 'next/link'
import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { emailVerification } from '@/actions/email-verification'
import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'

const EmailVerification = () => {


  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {


    if (!token){
      setError("Missing token")
      return;
    }
    emailVerification(token)
    .then((data) => {
      setSuccess(data.success)
      setError(data.error)
    }).catch(() => {
      setError("Something Went Wrong!")
    })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <div>
      <div className=" max-w-3xl flex items-center space-y-2 justify-center py-20 flex-col text-center dark:bg-black bg-white py-6 px-10 drop-shadow-lg rounded-lg ">
        <h1 className=' text-2xl dark:text-primary font-semibold'>Welcome to MetroHuts</h1>
          {!success && !error && (
            <div className=" flex space-y-2 dark:text-primary items-center text-center flex-col py-3">
              <p>Confirming your Email</p>
              <BeatLoader loading={true} size={8} className='' color='#ffda48'  />
            </div>
          )}

          {
            success ? (
              <FormError message={error} />
              ) : (
                <>
                  <FormSuccess message={success}/>
                    <Link href={'/login'} className=' bg-primary px-6 py-2 rounded-md'>
                        Back to Log In
                    </Link>
             </>
              )
          
          }
       
      </div>
    </div>
  )
}

export default EmailVerification
 