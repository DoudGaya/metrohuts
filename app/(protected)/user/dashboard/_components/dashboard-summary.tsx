import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import Link from 'next/link'


export async function DashboardSummary({ 
    count,
    title,
 }: {
    count: number
    title: string
}) {
  return (
    <Card className=' space-y-2 border-b-2 border-x-0 border-t-0 border-primary  dark:text-gray-300 dark:bg-black/30'>
      <CardHeader>
        <CardTitle className="capitalize py-4 flex items-center justify-between">
            <p className=' text-sm'>{title}</p>
            <p className='text-2xl font-semibold'>{count}</p>
        </CardTitle>
      </CardHeader>
            <Link className='' href={`/user/${title.toLocaleLowerCase()}`}> 
                <CardFooter className=' w-full text-sm font-poppins duration-75 font-medium transition-all ease-in-out delay-75 border-t dark:hover:text-yellow-300 border-primary rounded-b-lg hover:bg-yelow-300/30 hover:text-yellow-800 py-2' >
                    visit page
                </CardFooter>
            </Link>
    </Card>
  )
}

