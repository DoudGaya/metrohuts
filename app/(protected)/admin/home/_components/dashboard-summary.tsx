import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import Link from 'next/link'
// import { fetchSummary } from '@/app/actions'

// interface DashboardSummaryProps {
//   type: PoliciesType[] | GalleryType[] | NewsType[] | ActivitiesType[]
// }

export async function DashboardSummary({ 
    count,
    title,
 }: {
    count: number
    title: string
}) {
//   const summary = await fetchSummary(type)
  return (
    <Card className=' bg-white space-y-2 dark:border-stone-800 dark:bg-dark dark:text-gray-300'>
      <CardHeader>
        <CardTitle className="capitalize flex items-center justify-between">
            <p className=' text-sm'>{title}</p>
            <p className='text-xl font-semibold'>{count}</p>
        </CardTitle>
      </CardHeader>
            <Link className='' href={`/user/${title.toLocaleLowerCase()}`}> 
                <CardFooter className=' w-full text-sm font-poppins duration-75 dark:text-gray-300 font-medium transition-all ease-in-out delay-75 dark:bg-stone-700/30 border dark:border-stone-800 rounded-b-lg py-1' >
                    visit page
                </CardFooter>
            </Link>
    </Card>
  )
}

