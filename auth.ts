import NextAuth, { type DefaultSession } from "next-auth"
import { db } from "./lib/db"
import authConfig from "./auth.config"
import {PrismaAdapter } from '@auth/prisma-adapter'
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
import { redirect } from "next/navigation"
import { getAccountByUserId } from "./actions/account"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/login",
        error: '/error' 
    },
    events: {
        async linkAccount( { user }) {
            if (!user.id) throw new Error("User ID is missing");
            
            await db.user.update({
                where: {  id: user.id, }, // typscrpt error
                data: {
                    emailVerified: new Date()
                }
            })
        },
    },
    callbacks: {

        async signIn({ user, account }) {
            // allow login
            if (account?.provider !== 'credentials') return true
            
            // @ts-ignore
            const existingUser = await getUserById(user.id)
            if (!existingUser?.emailVerified) return false 

            // TODO: 2FA Authenication
            if (existingUser.isTwoFactorEnabled) {
                
                const twofactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
                if (!twofactorConfirmation) return false
                await db.twoFactorConfirmation.delete({
                    where: {id: twofactorConfirmation.id }
                })
            }
            return true
        }, 

        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub // typscrpt error
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }

             if (session.user) {
                    session.user.name = token.name as string
                    session.user.email = token.email as string
                    session.user.phone = token.phone as string
                    session.user.role = token.role as UserRole
                    session.user.image = token.image as string 
                    session.user.isOAuth = token.isOAuth as boolean
                    session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
                    session.user.password = token.password as string

             }
            return session
        },
        
        async jwt({ token}) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token

            const existingAccount = await getAccountByUserId(existingUser.id) 

            token.isOAuth == !!existingAccount
            token.name = existingUser.name
            token.email = existingUser.email
            token.phone = existingUser.phone
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
            token.password = existingUser.password
            token.image = existingUser.image
            token.role = existingUser.role;
            return token
        },
       
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig, 
})