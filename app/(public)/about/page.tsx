import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { teamMembers } from "@/lib/team"
import { Home, Key, DollarSign, Users, Star, PhoneCall } from "lucide-react"

export default function AboutUs() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-black text-tert h-[70vh] py-36 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to <span className="text-primary">MetroHuts</span>
          </h1>
          <p className="mt-6 max-w-3xl text-xl">
            Your trusted partner in finding the perfect home. With years of experience and a passion for real estate,
            we're here to make your property dreams a reality.
          </p>
          <div className="mt-10">
            <Button className="bg-primary text-white hover:bg-gray-800">Explore Our Listings</Button>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Home, title: "Property Sales", description: "Find your dream home or sell your property with ease." },
              { icon: Key, title: "Rentals", description: "Discover the perfect rental property for your needs." },
              { icon: DollarSign, title: "Property Management", description: "Let us handle the complexities of property management." },
            ].map((service, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Why Choose Metrohuts?</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Expert Knowledge", description: "Our team has in-depth local market knowledge." },
              { title: "Personalized Service", description: "We tailor our approach to your unique needs." },
              { title: "Proven Track Record", description: "Years of success in the real estate industry." },
              { title: "Cutting-edge Technology", description: "We leverage the latest tec h for optimal results." },
              { title: "Transparency", description: "Clear communication and honest dealings, always." },
              { title: "After-sales Support", description: "Our relationship continues beyond the transaction." },
            ].map((reason, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">{reason.title}</h3>
                  <p className="mt-2 text-base text-gray-600">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className=" bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12"> 
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  className="mx-auto h-40 w-40 border-[4px] border-primary object-cover object-center rounded-full xl:h-56 xl:w-56"
                  src={member.image.src}
                  alt={member.name}
                />
                <div className="mt-6">
                  <h3 className="text-xl font-medium text-gray-900">{member.name}</h3>
                  <p className="text-base text-yellow-600 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              { quote: "Metrohuts made finding our dream home a breeze. Their expertise and dedication are unmatched!", author: "Mustapha Atiku J." },
              { quote: "As a first-time seller, I was nervous, but the team at Metrohuts guided me through every step. Highly recommended!", author: "Sadiq Kabeer M." },
              { quote: "The property management services from Metrohuts have been exceptional. They truly care about their clients.", author: "Abdulrahman Dauda Gaya." },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                  <p className="text-gray-900 font-semibold">- {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Ready to Find Your Golden Opportunity?</h2>
          <p className="text-xl text-gray-800 mb-8">Contact us today and let's start your journey to the perfect property.</p>
          <Button className="bg-gray-900 text-white hover:bg-gray-800">
            <PhoneCall className="mr-2 h-4 w-4" /> Contact Us Now
          </Button>
        </div>
      </section>
    </div>
  )
}