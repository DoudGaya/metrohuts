import { getAllhomes } from "@/actions/homes"
import HomeListing from "@/components/home/HomeListing"
import Listing from "@/components/home/HomeListing"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Homes } from "@/typings"
// import { Badge } from "@/components/ui/badge"
import { Home, Key, DollarSign, Search, Briefcase, ClipboardList } from "lucide-react"

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

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Our Comprehensive Services</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Home,
                title: "Property Sales",
                description: "Whether you're looking to buy your dream home or sell your property for the best price, our experienced agents will guide you through every step of the process.",
                features: ["Market analysis", "Property valuation", "Negotiation support", "Closing assistance"]
              },
              {
                icon: Key,
                title: "Rental Services",
                description: "Find the perfect rental property or let us handle the leasing of your investment. We match tenants with landlords and ensure a smooth rental experience.",
                features: ["Tenant screening", "Lease preparation", "Rent collection", "Property inspections"]
              },
              {
                icon: Search,
                title: "Property Search",
                description: "Looking for a specific type of property? Let us know your requirements, and we'll conduct a thorough search to find options that match your criteria.",
                features: ["Customized searches", "Virtual tours", "Neighborhood insights", "Comparative market analysis"]
              },
              {
                icon: Briefcase,
                title: "Investment Advisory",
                description: "Make informed decisions about real estate investments. Our experts provide valuable insights and strategies to maximize your returns.",
                features: ["Market trend analysis", "Investment property identification", "ROI projections", "Portfolio diversification advice"]
              },
              {
                icon: DollarSign,
                title: "Property Management",
                description: "Leave the day-to-day operations of your rental properties to us. We handle everything from maintenance to tenant relations, ensuring your investment runs smoothly.",
                features: ["Rent collection", "Maintenance coordination", "Financial reporting", "Tenant communication"]
              },
              {
                icon: ClipboardList,
                title: "Real Estate Consulting",
                description: "Get expert advice on various aspects of real estate. Whether you're a first-time buyer or a seasoned investor, we provide the guidance you need.",
                features: ["Market analysis", "Development feasibility", "Legal compliance advice", "Exit strategy planning"]
              },
            ].map((service, index) => (
              <Card key={index} className="flex flex-col">
                <CardContent className="p-6 flex-grow">
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full bg-primary text-gray-900 hover:bg-primary">Learn More</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* <Listing  /> */}
      <HomeListing homeListings={listing} />

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