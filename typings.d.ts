import { ApartmentStatus, HomeStatus } from "@prisma/client"


interface User {
    id: string
    fullName: string 
    email: string
    password: string
    image: string 
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


interface EnquiryType {
    id:                 number
    user:               User
    userId:             string
    home:               Homes
    message:            string
    homeId:             number
}

interface BookingType {
    id: number;
    title: string;
    price: string;
    date: Date;
    checkInDate: Date;
    checkOutDate: Date;
    userId: string;
    apartmentId: number;
}