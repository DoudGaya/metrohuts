import React from 'react'
import { getAllhomes } from '@/actions/homes'
import { UserActionArea } from './_components/UserActionArea'
import { Homes, User } from '@/typings'
import { allUsers } from '@/data/user'


const AdminCasePage = async () => {


  // const homes = await getAllhomes() as Homes[]
  const users = await allUsers() as unknown as User[]

  return (
    <div className='flex bg-white dark:bg-dark'>
        <UserActionArea users={users} />
    </div>
    )
}

export default AdminCasePage