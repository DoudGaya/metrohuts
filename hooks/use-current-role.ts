"use client"
import { useSession } from "next-auth/react";


export const useCurrentRole = (): string | null  => {
    const session = useSession()

    if (session.data) {
        return session.data.user.role
    } else {
        return null
    }
}