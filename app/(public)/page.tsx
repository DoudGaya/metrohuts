
import { FaHome, FaHotel, FaSearch, FaStar, FaCheckCircle } from 'react-icons/fa'

import servicesBanner from '@/assets/services-banner.jpg'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { PublicNavigations } from '@/components/PublicNavigations'
import { homeListings, marketingTextMore, testimonials } from '@/lib/customer-records'

import HomeListing from '@/components/home/HomeListing'
import ApaprtmentListing from '@/components/home/ApartmentListing'
import CallToAction from '@/components/CallToAction'
import { getAllhomes } from '@/actions/homes'
import { getAllApartments } from '@/actions/apartments'
import { ApartmentType, Homes } from '@/typings'
import HomeHeroSection from '@/components/HomeHeroSection'

export default async function LandingPage() {
  
  const homeListings = await getAllhomes() as Homes[]
  const apartmentListing = await getAllApartments() as ApartmentType[]


  return (
    <div className="min-h-screen bg-blend-overlay">
      <PublicNavigations />
      <main className="">
        <HomeHeroSection />
        {
          homeListings.length > 0 ? (
            <HomeListing homeListings={homeListings} />
          ) : (
            <div className="text-center py-16">
              <h2 className="text-3xl font-bold mb-4">No Listings Available</h2>
              <p className="text-lg text-gray-600">
                There are currently no listings available. Please check back later.
              </p>
            </div>
          )
        }
        <section
          style={{
            backgroundImage: `url(${servicesBanner.src})`,
          }}
         
          className="py-16 h-screen flex bg-no-repeat bg-cover bg-fixed items-center"
        >
          <div className="container mx-auto bg-gray-950/50 py-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8">
              {[

                { icon: <FaHome className="text-4xl mb-4 text-primary" />, 
                  title: 'Property Acquisition', 
                  description: 'Our expert team navigates the luxury real estate market to find your perfect property, handling negotiations and due diligence with discretion.' },
                { icon: <FaHotel className="text-4xl mb-4 text-primary" />, 
                  title: 'Lifestyle Management', 
                  description: 'From private chefs to yacht charters, we curate experiences that complement your lifestyle in your new home.' },
                { icon: <FaSearch className="text-4xl mb-4 text-primary" />, 
                  title: 'Investment Advisory', 
                  description: 'Maximize your real estate portfolio with our market insights and tailored investment strategies.' },
              ].map((service) => (
                <div key={service.title} >
                  <Card className="text-center h-full">
                    <CardContent className="pt-6 flex flex-col space-y-4 justify-center w-full items-center h-full">
                      {service.icon}
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-gray-600">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
        {
          homeListings.length > 0 ? (
            <ApaprtmentListing apartments={apartmentListing} />
          ) : (
            <div className="text-center py-16">
              <h2 className="text-3xl font-bold mb-4">No Listings Available</h2>
              <p className="text-lg text-gray-600">
                There are currently no listings available. Please check back later.
              </p>
            </div>
          )
        }
        <CallToAction />
        <section
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
        </section>
      </main>
    </div>
  )
}