import React from 'react'
import { Suspense } from 'react'

import { DashboardSummary } from './_components/dashboard-summary'
import { CardSkeleton } from './_components/card-skeleton'
import { getAllRecords } from '@/actions/admin'

const HomeDashboard = async () => {
  const {
    homes,
    apartments,
    users,
    bookings
  } = await getAllRecords()



  type CardType = {
    id: number;
    title: string;
    count: number;
  }


  const cards: CardType[] = [
    {
      id: 1,
      title: "Homes",
      count: homes.length
    },
  
    {
      id: 2,
      title: "Apartments",
      count: apartments.length
    },
    {
      id: 3,
      title: "Bokings",
      count: bookings.length
    },
    {
      id: 4,
      title: "Users",
      count: users.length
    },
  ]


  return (
    <div className="p-6 bg-white dark:bg-dark w-full border-t dark:text-gray-300 dark:border-stone-800 dark:bg-dark-bg min-h-[calc(100vh-5vh)] ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Suspense key={card.id} fallback={<CardSkeleton />}>
            <DashboardSummary  count={card.count} title={card.title} />
          </Suspense>
        ))}
      </div>
    </div>
    )
}

export default HomeDashboard