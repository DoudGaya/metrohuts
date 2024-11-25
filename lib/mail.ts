import { Resend } from 'resend'


const env = process.env.NODE_ENV
const resend = new Resend(process.env.RESEND_API_KEY)
let baseUrl;


if (env === 'production') {
    baseUrl = 'https://metrohuts.com'
} else {
    baseUrl = 'http://localhost:3000'
}

export const sendTwoFactorEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "Metrohuts <noreply@metrohuts.com>",
        to: email,
        subject: "Confirm Your Email",
        html: `<p> Your 2FA code is ${token}`
    })
}


export const sendPropertyRequestMailToCompany = async (email: string, token: string) => {
    await resend.emails.send({
        from: "Metrohuts <noreply@metrohuts.com>",
        to: 'metrohuts.ng@gmail.com',
        subject: "Property Request",
        html: `Someone request a property in your company`
    })
}





export const sendPasswordResetEmail = async ( email: string, token: string) => {
    const resetLink =  `${baseUrl}/new-password?token=${token}`

    await resend.emails.send({
        from: 'Metrohuts <noreply@Metrohuts.com>',
        to: email,
        subject: "Forgot Password Request",
        html: `<p>Click the link to <a href="${resetLink}">Reset your password</a></p>`
    })
}

export const sendVrificationEmail = async ( 
    email: string, 
    token: string
) => {

    const confirmationLink = `${baseUrl}/email-verification?token=${token}`
    await resend.emails.send({
        from: 'MetroHutts <noreply@metrohuts.com>',
        to: email,
        subject: "Verify your Metrohuts Account",
        html: `<p>Click the link to <a href="${confirmationLink}">Confirm your Email </a></p>`
    })

}