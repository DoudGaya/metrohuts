"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Homes } from '@/typings'


const HomeListing = ( {homeListings}: {
  homeListings: Homes[]
} ) => {

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
    className="py-16 bg-white"
  >
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Current Listings</h2>
      <div className="grid grid-cols-1 h-full md:grid-cols-2 lg:grid-cols-4 gap-8">
        {homeListings.map((home) => (
          <motion.div key={home.id} whileHover={{ y: -10 }} className=' h-full'>
            <Card className=' h-full flex flex-col'>
              <Image
                src={home.heroImage}
                alt={home.title}
                width={400}
                height={300}
                className="w-full h-[250px] object-cover rounded-t-lg"
              />

              <CardHeader className=' flex flex-col'>
                <CardTitle className=' text-xl'>{home.title}</CardTitle>
                <p className="text-sm text-gray-500">{home.state} {home.lga} </p>
                <span className=' text-sm italic font-poppins'> {home.address} </span>
              </CardHeader>


              <CardContent className=' flex flex-col justify-between'>
                <p className="text-gray-600 text-justify h-[100px] overflow-hidden text-sm mb-4">
                  {home.description} ...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 text-sm font-bold">{home.price}</span>
                  <Button variant={'link'} className=" text-yellow-500 bg-transparent font-semibold font-poppins">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
  )
}

export default HomeListing