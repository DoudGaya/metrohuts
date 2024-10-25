import Image from 'next/image'
import React from 'react'
import logo from '@/public/stable-bricks-white.png'
import Link from 'next/link'
const menuItems = ['Home', 'Exclusive Listings', 'Services', 'About Us']

interface SocialLinks {
    id: number,
    link: string 
    icon: string
}



export const Footer = () => {
  return (
    <footer className=" bg-black  text-white py-8">
        <div className="container mx-auto px-4">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Metrohuts</h3>
              <p className="text-gray-400">
                Redefining luxury living across the globe. We are committed to providing the best services to our clients.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Explore</h4>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-yellow-500 transition duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
              <p className="text-gray-400 mb-2">Block 31 Family House Estate, Darmanawa Kano.</p>
              <p className="text-gray-400 mb-2">Phone: (+234) 8039288578</p>
              <p className="text-gray-400 mb-2">Phone: (+234) 8039214704</p>
              <p className="text-gray-400 mb-2">Phone: (+234) 8099989997</p>
              <p className="text-gray-400 mb-2">Email: metrohuts.ng@gmail.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 Metrohuts. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
  )
}
