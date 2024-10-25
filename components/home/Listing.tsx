"use client"



import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaHome, FaHotel, FaSearch, FaStar, FaCheckCircle } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import bannerImage from '@/public/img/banner-image.jpg'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PublicNavigations } from '@/components/PublicNavigations'
import { homeListings, marketingTextMore, testimonials } from '@/lib/customer-records'


const Listing = () => {

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
        {homeListings.map((property, i) => (
          <motion.div key={i} whileHover={{ y: -10 }} className=' h-full'>
            <Card className=' h-full flex flex-col'>
              <Image
                src={property.image}
                alt={property.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />

              <CardHeader>
                <CardTitle className=' text-xl'>{property.name}</CardTitle>
                <p className="text-sm text-gray-500">{property.location}</p>
              </CardHeader>


              <CardContent className=' h-full flex flex-col justify-between'>
                <p className="text-gray-600 text-sm mb-4">
                  {property.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 text-sm font-bold">{property.price}</span>
                  <Button variant={'link'} className=" text-yellow-500 bg-transparent font-semibold font-poppins">
                    Request Details
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

export default Listing