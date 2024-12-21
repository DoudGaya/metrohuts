import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PoliciesType } from "@/typings"



// type DispatchItemProps = {
//   dispatch: inputDispatch | outPutDispatch
// }

export function PoliciesItem({ policy }:{
  policy:  PoliciesType
}) {



  return (
   <div className=" flex flex-col bg-white space-y-4">
      {policy?.title && (
        <div className="">{ policy.title }</div>
      )}
   </div>
  )
}

