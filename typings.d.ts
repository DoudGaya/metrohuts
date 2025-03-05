import { ApartmentStatus, HomeStatus, UserRole } from "@prisma/client"


interface User {
    id: string
    fullName: string 
    email: string
    password: string
    image: string 
    role: UserRole
    bookings: BookingType[]
    enquiries: EnquiryType[]
}

interface ApartmentType {
    id: number;
    title: string;
    state: string;
    lga: string;
    address: string;
    price: string;
    description: string;
    slug: string;
    heroImage: string;
    images: string[];
    status: ApartmentStatus 
}


interface Homes {
    id: number;
    title: string;
    state: string;
    lga: string;
    address: string;
    price: string;

    slug: string;
    description: string;
    heroImage: string;
    homeStatus: HomeStatus;
    images: string[];
}


interface TeamMemberType {
    id: number
    name: string
    image: string
    role: string

}


interface EnquiryType {
    id:                 number
    user:               User
    userId:             string
    home:               Homes
    message:            string
    date:               Date
    homeId:             number
}

interface BookingType {
    id: number;
    title: string;
    price: string;
    date: Date;
    checkInDate: Date;
    checkOutDate: Date;
    apartment: ApartmentType;
    user: User;
}