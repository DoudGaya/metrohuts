import Listing from "@/components/home/Listing"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import { Home, Key, DollarSign, Search, Briefcase, ClipboardList } from "lucide-react"

export default function Services() {
  return (
    <div className="bg-white mt-10">
      {/* Hero Section */}
      <section className="relative bg-yellow-400 py-36 h-[70vh] px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Our <span className="text-yellow-600">Services</span> & Properties
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-800">
            Discover our wide range of real estate services and explore our curated selection of properties.
            Whether you're buying, selling, or renting, we've got you covered.
          </p>
          <div className="mt-10">
            <Button className="bg-gray-900 text-white hover:bg-gray-800">Explore Services</Button>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}

      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Featured Properties</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Modern Downtown Apartment",
                type: "For Sale",
                price: "$450,000",
                beds: 2,
                baths: 2,
                sqft: 1200,
                image: "/placeholder.svg?height=400&width=600"
              },
              {
                title: "Spacious Suburban Home",
                type: "For Rent",
                price: "$2,500/mo",
                beds: 4,
                baths: 3,
                sqft: 2500,
                image: "/placeholder.svg?height=400&width=600"
              },
              {
                title: "Luxury Beachfront Villa",
                type: "For Sale",
                price: "$1,200,000",
                beds: 5,
                baths: 4,
                sqft: 3500,
                image: "/placeholder.svg?height=400&width=600"
              },
            ].map((property, index) => (
              <Card key={index} className="overflow-hidden">
                <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-2xl font-bold text-yellow-600 mb-4">{property.price}</p>
                  <div className="flex justify-between text-gray-600">
                    <span>{property.beds} beds</span>
                    <span>{property.baths} baths</span>
                    <span>{property.sqft} sqft</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" className="border-yellow-400 text-yellow-600 hover:bg-yellow-50">
              View All Properties
            </Button>
          </div>
        </div>
      </section> */}

      {/* Detailed Services Section */}
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
                  <service.icon className="h-12 w-12 text-yellow-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500">Learn More</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Listing />

      {/* Call-to-Action Section */}
      <section className="bg-yellow-400 py-20">
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