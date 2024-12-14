'use client'

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
import Listing from '@/components/home/Listing'
import { Footer } from '@/components/Footer'

export default function LandingPage() {
  const [email, setEmail] = useState('')


  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  }

  const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  }

  const menuItems = ['Home', 'Exclusive Listings', 'Services', 'About Us']
  const SideNav = () => (
    <div className="flex flex-row space-x-6 font-poppins items-center">
      {menuItems.map((item) => (
        <motion.a
          key={item}
          href="#"
          className="text-gray-600 hover:text-primary transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item}
        </motion.a>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-blend-overlay">
      {/* Header */}
      <PublicNavigations />
      {/* Main Content */}
      <main className="">
        {/* Hero Section */}
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

        {/* Listings */}

        <Listing />
     
        {/* Services */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="py-16 bg-gray-50"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <FaHome className="text-4xl mb-4 text-primary" />, title: 'Property Acquisition', description: 'Our expert team navigates the luxury real estate market to find your perfect property, handling negotiations and due diligence with discretion.' },
                { icon: <FaHotel className="text-4xl mb-4 text-primary" />, title: 'Lifestyle Management', description: 'From private chefs to yacht charters, we curate experiences that complement your lifestyle in your new home.' },
                { icon: <FaSearch className="text-4xl mb-4 text-primary" />, title: 'Investment Advisory', description: 'Maximize your real estate portfolio with our market insights and tailored investment strategies.' },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                >
                  <Card className="text-center h-full">
                    <CardContent className="pt-6 flex flex-col space-y-4 justify-center w-full items-center h-full">
                      {service.icon}
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-gray-600">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="py-16 bg-white"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }}>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={50}
                          height={50}
                          className="rounded-full h-14 object-cover object-center w-14 mr-4"
                        />
                        <div>
                          <h3 className="font-bold">{testimonial.name}</h3>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">
                        "{testimonial.quote}"
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="py-16 bg-gray-800 text-white"
        >
          <div className="container mx-auto px-4 flex flex-col space-y-4 justify-center text-center">
            <h2 className="text-3xl font-bold mb-4">Elevate Your Lifestyle</h2>
            <p className="text-xl mb-8">Join our exclusive network of discerning property owners and investors.</p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white text-gray-800"
                />
                <Button className="bg-primary text-white hover:bg-primary">
                  Get VIP Access
                </Button>
              </div>
              <p className="text-sm mt-2">Receive curated property listings and insider market insights.</p>
            </div>
          </div>
        </motion.section>

        {/* Trust Indicators */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="py-16 bg-white"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Metrohuts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {marketingTextMore.map((item, index) => (
                <div key={index} className="text-center flex flex-col space-y-2 items-center justify-center">
                  {item.icon}
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

    </div>
  )
}