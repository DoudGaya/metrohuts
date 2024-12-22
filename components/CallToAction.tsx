'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { testimonials } from '@/lib/customer-records'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const CallToAction = () => {


    const [email, setEmail] = React.useState('')


    
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  }

  const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  }

  return (
    
<div className=" flex flex-col space-y-6">
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
            <Card className=' rounded-'>
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


<motion.section
initial="hidden"
whileInView="visible"
viewport={{ once: true }}
variants={fadeIn}
className="py-16 bg-black text-white"
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
</div>

  )
}

export default CallToAction