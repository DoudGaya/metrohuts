'use client'

import { logOut } from "@/actions/logout"
import { LockOpen1Icon } from "@radix-ui/react-icons"


export default function LogoutButton() {
  const handleLogout = async () => {
    // Clear any client-side storage first
    localStorage.clear()
    sessionStorage.clear()
    
    try {
      await logOut()
      
      localStorage.clear()
      sessionStorage.clear()
      // Force a complete page reload to clear any remaining state
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
     <button  onClick={handleLogout} className=" flex text-sm bg-gray-200 dark:bg-gray-800 dark:text-stone-400 text-stone-900 rounded-xl px-3 py-1 items-center space-x-2">
       <p className=" text-xs">Log Out</p>
       <LockOpen1Icon className=" h-3 w-3" />
   </button> 
  )
}



// 'use client'
// // import { signOut } from "@/auth"
// import { signOut } from "next-auth/react"


// export default function LogoutButton() {
//   const handleLogout = () => {
//     try {
//        signOut()
//        // clear all session and local storage data
//       // Force a complete page reload to clear any remaining state
//       window.location.href = '/'
//     } catch (error) {
//       console.error('Logout failed:', error)
//     }
//   }

//   return (

//     <button  onClick={handleLogout} className=" flex text-sm bg-gray-200 dark:bg-gray-800 dark:text-stone-400 text-stone-900 rounded-xl px-3 py-1 items-center space-x-2">
//       <p className=" text-xs">Log Out</p>
//       <LockOpen1Icon className=" h-3 w-3" />
//   </button> 
//   )
// }



// // "use client"

// // import React from 'react'



// // interface logOutButtonProps {
// //     children?: React.ReactNode;
// // }

// // export const LogOutButton = ( {children}: logOutButtonProps) => {
// //   return (
// //     <div>{children}</div>
// //   )
// // }
