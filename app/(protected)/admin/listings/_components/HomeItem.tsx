import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaHome, FaHotel, FaSearch, FaStar, FaCheckCircle } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import bannerImage from '@/public/img/banner-image.jpg'
import { Input } from "@/components/ui/input"
import { PublicNavigations } from '@/components/PublicNavigations'

export function HomeItem({ home }:{
  home:  Homes
}) {

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  }

  const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  }

  
return (
<motion.section
initial="hidden"
whileInView="visible"
viewport={{ once: true }}
variants={fadeIn}
className=" px-0"
>
<div className="">
  {/* <h2 className="text-3xl font-bold text-center mb-12">Current Listings</h2> */}
  <div className="h-full px-0">

      <motion.div whileHover={{ y: -10 }} className=' h-full'>
        <Card className=' h-full flex px-0 flex-col'>
          <Image
            src={home?.heroImage}
            alt={home.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover rounded-t-lg"
          />

          <CardHeader>
            <CardTitle className=' text-xl'>{home?.title}</CardTitle>
           <div className=" flex flex-col">
           <p className="text-sm text-gray-500">{home.state + ' '+ home.lga }</p>
           <small> {home.address} </small>
           </div>
          </CardHeader>


          <CardContent className=' h-full flex flex-col justify-between'>
            <p className="text-gray-600 text-sm h-[100px] mb-4">
              {home.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-gray-800 text-sm font-bold">{home.price}</span>
              <Button variant={'link'} className=" text-yellow-500 bg-transparent font-semibold font-poppins">
                Request Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

  </div>
</div>
</motion.section>
)
}

