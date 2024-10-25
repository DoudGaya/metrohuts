import homeListing1 from '@/public/home-listing-1.jpg'
import homeListing2 from '@/public/home-listing-2.jpg'
import homeListing3 from '@/public/home-listing-3.jpg'
import { FaHome, FaHotel, FaSearch, FaStar, FaCheckCircle } from 'react-icons/fa'
import zaks from '@/public/img/ceo-zaks.jpeg'
// import daddy from '@/public/'
import homeListing4 from '@/public/home-listings-4.jpg'
import habib from '@/public/habib.jpg'

export const homeListings = [
    {
      name: "8 Bedroom Villa",
      location: "Railway Quaters, Kano",
      image: homeListing1,
      price: "NGN 12,500,000",
      description: "A stunning 8-bedroom villa with a private pool, gym, and home theater, located just 15 minutes from Kano government house, Railway quarters kano."
    },
    {
      name: "Luxury 4 bedroom duplex",
      location: "Nassarawa GRA, Kano",
      image: homeListing2,
      price: "NGN 28,000,000",
      description: "A beautiful 4-bedroom duplex with a private garden and home office, located in the heart of Nassarawa GRA, Kano."
    },
    {
      name: "24th Century Chateau",
      location: "Kabuga, Kano",
      image: homeListing3,
      price: "NGN 15,750,000",
      description: "A state-of-the-art 5-bedroom chateau with a private pool, gym, and home theater, located in the serene neighborhood of Kabuga, Kano."
    },
    {
        name: "4 Bedroom Bungalow",
        location: "Kofar Nassarawa, Kano",
        image: homeListing4,
        price: "NGN 8,500,000",
        description: "A cozy 4-bedroom bungalow with a private garden and boys quaters, located in the heart of Kofar Nassarawa, Kano."
    }
  ]


  export const testimonials = [
    { 
        name: "Muhammad M. Zakari", 
        role: "Tech Entrepreneur", 
        image: zaks,
        quote: "Metrohuts's attention to detail is unparalleled. They found me a Tuscan villa that exceeds all expectations – a true masterpiece." },
    { 
        name: "Abdulrahman G. Dauda", 
        role: "Art Collector", 
        image: habib,
        quote: "The Metrohuts team understood my vision perfectly. My New Hototo penthouse is not just a home, it's a canvas for my collection." },
    { 
        name: "Habib A. Adam", 
        role: "Finance Executive", 
        image: habib,
        quote: "I've worked with many real estate firms, but Metrohuts's investment insights and property management are in a league of their own." },
  ]

  export const marketingTextMore = [
    { icon: <FaCheckCircle className="text-4xl mb-4 text-yellow-500" />, title: 'Unrivaled Expertise', description: '25+ years of experience in luxury real estate' },
    { icon: <FaCheckCircle className="text-4xl mb-4 text-yellow-500" />, title: 'Global Network', description: 'Access to off-market properties in 50+ countries' },
    { icon: <FaCheckCircle className="text-4xl mb-4 text-yellow-500" />, title: 'Personalized Service', description: 'Dedicated concierge team available 24/7' },
    { icon: <FaCheckCircle className="text-4xl mb-4 text-yellow-500" />, title: 'Discretion Assured', description: 'Trusted by celebrities, executives, and royalty' },
  ]