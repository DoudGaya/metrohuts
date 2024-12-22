import { ApartmentStatus, HomeStatus } from "@prisma/client"

interface Project {
    id: string 
    title: string
    length: string
    description: string
    duration: DateTime
    valuation: string
    state: string
    city: string
    location: string 
    sharePrice: number 
    roi: number
}

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
    heroImage: string;
    images: string[];
    status: ApartmentStatus ;

    // id: number;
    // title: string;
    // state: string;
    // lga: string;
    // address: string;
    // price: string;
    // description: string;
    // heroImage: string;
    // images: string[];
}

interface Booking {
    id: number;
    title: string;
    price: string;
    date: Date;
    userId: string;
    apartmentId: number;
}


interface Homes {
    id: number;
    title: string;
    state: string;
    lga: string;
    address: string;
    price: string;
    description: string;
    heroImage: string;
    homeStatus: HomeStatus;
    images: string[];

    // id: number;
    // title: string;
    // state: string;
    // lga: string;
    // address: string;
    // price: string;
    // description: string;
    // heroImage: string;
    // images: string[];
}