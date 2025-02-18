import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { EnquiryType } from "@/typings"
import { CalendarIcon, HomeIcon, MessageSquareIcon, UserIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function EnquiriesItem({ enquiry }: { enquiry: EnquiryType }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-orange-500 text-white">
        <CardTitle className="text-lg font-semibold">Enquiry for {enquiry.home.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4">
          <div className="flex items-center space-x-2">
            <UserIcon className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-700">{enquiry.user.fullName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <HomeIcon className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-700">
              {enquiry.home.address}, {enquiry.home.lga}, {enquiry.home.state}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-700">
              {formatDistanceToNow(new Date(enquiry.date), { addSuffix: true })}
            </span>
          </div>
          {enquiry.message && (
            <div className="mt-2">
              <div className="flex items-center space-x-2 mb-1">
                <MessageSquareIcon className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Message:</span>
              </div>
              <p className="text-sm text-gray-600 pl-7">{enquiry.message}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}



// import { 
//   Card, 
//   CardContent, 
//   CardHeader, 
// } from "@/components/ui/card"
// import { EnquiryType } from "@/typings"

// export function EnquiriesItem({ enquiries  }: {
//  enquiries: EnquiryType
// }) {


//   return (
//     <Card className="overflow-hidden">
     
//     </Card>
//   )
// }

