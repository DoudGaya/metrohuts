"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import bannerImage from '@/public/img/banner-image.jpg'
import Image from 'next/image'

const HomeHeroSection = () => {


    
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
    animate="visible"
    variants={fadeIn}
    className="relative h-screen flex items-center justify-center text-center text-white"
  >
    <Image
      src={bannerImage}
      alt="Nigerian Luxury Homes "
      layout="fill"
      objectFit="cover"
      className="absolute inset-0"
      priority
    />
    <div className="absolute inset-0 bg-stone-900 opacity-70"></div>
    <div className="relative z-10 max-w-3xl mx-auto px-4">
      <motion.h2
        variants={slideIn}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        Welcome to Metrohuts, Your Dream Home Awaits 
      </motion.h2>
      <motion.p variants={slideIn} className="text-xl mb-8">
        Discover unparalleled luxury living in the Nigeria's most coveted locations
      </motion.p>
      <motion.div
        variants={fadeIn}
        className="flex flex-col sm:flex-row justify-center gap-4"
      >
        <Button
          size="lg"
          className="bg-primary text-white hover:bg-primary"
        >
          Explore Exclusive Listings
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-800"
        >
          Schedule a Private Viewing
        </Button>
      </motion.div>
    </div>
  </motion.section>

  )
}

export default HomeHeroSection