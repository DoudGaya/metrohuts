import { ApartmentActionArea } from './_components/EnquiryActionArea'
import { userEnquiries } from '@/data/user'
import { EnquiryType } from '@/typings'
import { auth } from '@/auth'

const userEnquiriesPage = async () => {

  const session = await auth()

  const userId = session?.user.id as string


// const apartments = await getAllApartments() as ApartmentType[]

const enquiries = await userEnquiries(userId)  as unknown as EnquiryType[]


  return (
    <div className='flex bg-white dark:bg-dark'>
        <ApartmentActionArea enquiries={enquiries} />
    </div>
    )
}

export default userEnquiriesPage