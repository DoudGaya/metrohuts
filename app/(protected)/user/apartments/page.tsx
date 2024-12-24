import { ApartmentActionArea } from './_components/ApartmentActionArea'
import { getAllApartments } from '@/actions/apartments'
import { ApartmentType } from '@/typings'

const AdminCasePage = async () => {

const apartments = await getAllApartments() as ApartmentType[]

  return (
    <div className='flex bg-white dark:bg-dark-bg'>
        <ApartmentActionArea apartments={apartments} />
    </div>
    )
}

export default AdminCasePage