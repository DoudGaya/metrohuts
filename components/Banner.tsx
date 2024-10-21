import React from 'react'
import { PublicNavigations } from './PublicNavigations'
import bannerImage from '@/public/img/banner-image.jpg'
import bannerMan from '@/public/img/file.png'
import Image from 'next/image'
import Link from 'next/link'
import { LoginButton } from './auth/loginButton'

export const Banner = () => {
  return (
    <>  
    <div className=" h-[100vh] bg-black/60 overflow-hidden bg-no-repeat bg-cover bg-center bg-blend-multiply" style={{
        backgroundImage: `url(${bannerImage.src})`
    }} >
        <div className=" h-full w-full grid grid-cols-1 text-center text-yellow-200 justify-center px-8 pt-20 lg:py-0 max-w-6xl mx-auto ">
            <div className=" h-full flex flex-col space-y-3 items-center text-center justify-center mx-auto">
                <h1 className=' font-poppins text-4xl font-semibold'>Make yourself at Home, because You are Home</h1>
                <p className=' text-white text-2xl '>Find a Home the meets your confort</p>
                <div className=" flex w-full  justify-center">
                  <LoginButton>
                        <Link className=' rounded-md bg-black font-semibold text-lg border-2 px-8 py-2' href={''}>
                                Fund a Project
                        </Link>
                  </LoginButton>
                </div>
            </div>
        </div>
    </div>
</>
)
}
