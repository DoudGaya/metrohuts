import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-full" />
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-6 w-full" />
      </CardFooter>
    </Card>
  )
}

