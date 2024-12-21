import React from 'react'
import { getAllhomes } from '@/actions/homes'
import { HomeActionArea } from './_components/HomeActionArea'


const AdminCasePage = async () => {


  const homes = await getAllhomes() as Homes[]

  return (
    <div className='flex bg-white dark:bg-dark-bg'>
        <HomeActionArea homes={homes} />
    </div>
    )
}

export default AdminCasePage