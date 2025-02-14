import React from 'react'
import { PublicNavigations } from '@/components/PublicNavigations'
import { Footer } from '@/components/Footer'

const AuthLayout = ({ children }: { children:  React.ReactNode}) => {
  return (

     <>
    <PublicNavigations />
    <div className=' flex flex-row  items-center max-w-7xl mx-auto w-full justify-center h-screen'>
      <div className=" hidden lg:block ">
        {/* <Image src={authImage} className='h-[400px] object-contain' alt='' /> */}
      </div>
        <div className=" flex lg:w-5/12 h-full my-auto w-full  items-center rounded-md  justify-center px-4 py-10">
            {/* <div className=" w-full py-6 border-2 px-6 rounded-lg border-yellow-500"> */}
                {children}
            {/* </div> */}
        </div>
    </div>
    <Footer />
    </>
  )
}

export default AuthLayout