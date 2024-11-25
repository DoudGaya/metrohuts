'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle } from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
 } from "@/components/ui/table"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger } from "@/components/ui/dialog"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue } from "@/components/ui/select"
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
 } from "@/components/ui/pagination"
import { Home, Plus, Edit, Trash2, Search } from "lucide-react"

// This would typically come from your backend
const initialProperties = [
  { id: 1, name: "Sunny Apartment", location: "Downtown", price: 1200, type: "Apartment", bedrooms: 2, bathrooms: 1 },
  { id: 2, name: "Spacious House", location: "Suburbs", price: 2000, type: "House", bedrooms: 4, bathrooms: 3 },
  { id: 3, name: "Studio Loft", location: "City Center", price: 900, type: "Studio", bedrooms: 1, bathrooms: 1 },
  // ... add more properties to test pagination
]

export default function AdminDashboard() {
  const [properties, setProperties] = useState(initialProperties)
  const [filteredProperties, setFilteredProperties] = useState(initialProperties)
  const [newProperty, setNewProperty] = useState({
    name: '',
    location: '',
    price: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    description: ''
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  useEffect(() => {
    const results = properties.filter(property =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProperties(results)
    setCurrentPage(1)
  }, [searchTerm, properties])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProperty(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewProperty(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = properties.length + 1
    const newPropertyList = [...properties, { id, ...newProperty, price: Number(newProperty.price) }]
    // @ts-ignore
    setProperties(newPropertyList)
    setNewProperty({ name: '', location: '', price: '', type: '', bedrooms: '', bathrooms: '', description: '' })
    setIsDialogOpen(false)
  }

  const handleDelete = (id: number) => {
    setProperties(properties.filter(property => property.id !== id))
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredProperties.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-yellow-400 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <CardTitle className="text-2xl font-bold">Property Listings</CardTitle>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-yellow-400 text-gray-900 hover:bg-yellow-500">
                        <Plus className="mr-2 h-4 w-4" /> Add Property
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Property</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Property Name</Label>
                          <Input id="name" name="name" value={newProperty.name} onChange={handleInputChange} required />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" name="location" value={newProperty.location} onChange={handleInputChange} required />
                        </div>
                        <div>
                          <Label htmlFor="price">Price (per month)</Label>
                          <Input id="price" name="price" type="number" value={newProperty.price} onChange={handleInputChange} required />
                        </div>
                        <div>
                          <Label htmlFor="type">Property Type</Label>
                          <Select name="type" value={newProperty.type} onValueChange={(value) => handleSelectChange('type', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Apartment">Apartment</SelectItem>
                              <SelectItem value="House">House</SelectItem>
                              <SelectItem value="Studio">Studio</SelectItem>
                              <SelectItem value="Condo">Condo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="bedrooms">Bedrooms</Label>
                          <Input id="bedrooms" name="bedrooms" type="number" value={newProperty.bedrooms} onChange={handleInputChange} required />
                        </div>
                        <div>
                          <Label htmlFor="bathrooms">Bathrooms</Label>
                          <Input id="bathrooms" name="bathrooms" type="number" value={newProperty.bathrooms} onChange={handleInputChange} required />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" name="description" value={newProperty.description} onChange={handleInputChange} />
                        </div>
                        <Button type="submit" className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500">
                          Add Property
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Bedrooms</TableHead>
                      <TableHead>Bathrooms</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell>{property.name}</TableCell>
                        <TableCell>{property.location}</TableCell>
                        <TableCell>${property.price}</TableCell>
                        <TableCell>{property.type}</TableCell>
                        <TableCell>{property.bedrooms}</TableCell>
                        <TableCell>{property.bathrooms}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleDelete(property.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredProperties.length > itemsPerPage && (
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => paginate(currentPage - 1)}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                          />
                        </PaginationItem>
                        {[...Array(Math.ceil(filteredProperties.length / itemsPerPage))].map((_, index) => (
                          <PaginationItem key={index}>
                            <PaginationLink
                              onClick={() => paginate(index + 1)}
                              isActive={currentPage === index + 1}
                            >
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => paginate(currentPage + 1)}
                            className={currentPage === Math.ceil(filteredProperties.length / itemsPerPage) ? 'pointer-events-none opacity-50' : ''}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}