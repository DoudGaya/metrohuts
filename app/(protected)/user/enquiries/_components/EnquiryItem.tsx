import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { EnquiryType } from "@/typings"

export function EnquiriesItem({ enquiries  }: {
 enquiries: EnquiryType
}) {


  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          {/* <Image
            src={apartment.heroImage}
            alt={apartment.title}
            layout="fill"
            objectFit="cover"
          /> */}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {/* <CardTitle className="text-lg font-semibold mb-2">{apartment.title}</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{apartment.description}</p>
        <div className=""> Book an Apartment</div> */}
      </CardContent>
    </Card>
  )
}

