import { BookingActionArea } from './_components/BookingActionArea'
import { userEnquiries } from '@/data/user'
import { BookingType, EnquiryType } from '@/typings'
import { auth } from '@/auth'
import { getBookingsByUserId } from '@/actions/apartments'

const userEnquiriesPage = async () => {

  const session = await auth()

  const userId = session?.user.id as string


// const apartments = await getAllApartments() as ApartmentType[]

const booking = await getBookingsByUserId(userId)  as unknown as BookingType[]


  return (
    <div className='flex bg-white dark:bg-dark'>
        <BookingActionArea bookings={booking} />
    </div>
    )
}

export default userEnquiriesPage