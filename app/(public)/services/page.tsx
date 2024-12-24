import { getAllhomes } from "@/actions/homes"
import ComprehensiveServices from "@/components/ComprehensiveServices"
import HomeListing from "@/components/home/HomeListing"
import Listing from "@/components/home/HomeListing"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Homes } from "@/typings"
// import { Badge } from "@/components/ui/badge"


export default async function Services() {


  const listing = await getAllhomes() as Homes[]
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-black py-36 h-[70vh] px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <h1 className="text-4xl text-tert font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Our <span className="text-primary">Services</span> & Properties
          </h1>
          <p className="mt-6 max-w-3xl text-tert text-xl">
            Discover our wide range of real estate services and explore our curated selection of properties.
            Whether you're buying, selling, or renting, we've got you covered.
          </p>
          <div className="mt-10">
            <Button className="bg-primary text-white hover:bg-gray-800">Explore Services</Button>
          </div>
        </div>
      </section>



      <ComprehensiveServices  customStyle="py-20" />

      {
        listing.length > 0 ? (
          <HomeListing homeListings={listing} />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold mb-4">No Listings Available</h2>
            <p className="text-lg text-gray-600">
              There are currently no listings available. Please check back later.
            </p>
          </div>
        )
      }

      {/* Call-to-Action Section */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-800 mb-8">
            Whether you're looking to buy, sell, rent, or invest, our team is here to help you achieve your real estate goals.
          </p>
          <Button className="bg-gray-900 text-white hover:bg-gray-800">
            Contact Us Now
          </Button>
        </div>
      </section>
    </div>
  )
}