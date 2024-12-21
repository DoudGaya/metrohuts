// // 
// import { getAllAuthors } from '@/actions/author'
// import { getAllNews } from '@/actions/news'
import React from 'react'
// import { GalleryActionArea } from './_components/GalleryActionArea'
import { ApartmentActionArea } from './_components/ApartmentActionArea'
// import { getAllGalleries } from '@/actions/galleries'
// import { GalleryType } from '@/typings'
import { getAllApartments } from '@/actions/apartments'

const AdminCasePage = async () => {

  // const galleries = await getAllGalleries() as GalleryType[]
const apartments = await getAllApartments() as ApartmentType[]

  return (
    <div className='flex bg-white dark:bg-dark-bg'>
        <ApartmentActionArea apartments={apartments} />
    </div>
    )
}

export default AdminCasePage