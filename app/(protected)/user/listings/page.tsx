// import {  } from './_components/UserHomeActionArea'
import { UserHomeActionArea } from './_components/UserHomeActionArea'
import { getAllApartments } from '@/actions/apartments'
import { getAllhomes } from '@/actions/homes'
import { Homes } from '@/typings'

const AdminCasePage = async () => {

const homes = await getAllhomes() as Homes[]

  return (
    <div className='flex bg-white dark:bg-dark-bg'>
        <UserHomeActionArea homes={homes} />
    </div>
    )
}

export default AdminCasePage