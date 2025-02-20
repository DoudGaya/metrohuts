import { Resend } from 'resend';
// import { createEmailTemplate } from './emailTemplates';
import { createEmailTemplate } from './email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

const env = process.env.NODE_ENV
let baseUrl;


if (env === 'production') {
    baseUrl = 'https://metrohuts.com'
} else {
    baseUrl = 'http://localhost:3000'
}


export const sendTwoFactorEmail = async (email: string, token: string) => {
  const content = `
    <h2 style="color: #f97316;">Two-Factor Authentication</h2>
    <p>Your two-factor authentication code is:</p>
    <p style="font-size: 24px; font-weight: bold; color: #f97316;">${token}</p>
    <p>This code will expire in 10 minutes. If you didn't request this code, please ignore this email.</p>
  `;

  await resend.emails.send({
    from: "Metrohuts <noreply@metrohuts.com>",
    to: email,
    subject: "Your Two-Factor Authentication Code",
    html: createEmailTemplate(content),
  });
};

export const sendPropertyRequestMailToCompany = async (email: string, propertyDetails: string) => {
  const content = `
    <h2 style="color: #f97316;">New Property Request</h2>
    <p>A new property request has been submitted:</p>
    <ul>
      <li>Requester's Email: ${email}</li>
      <li>Property Details: ${propertyDetails}</li>
    </ul>
    <p>Please review and respond to this request as soon as possible.</p>
  `;

  await resend.emails.send({
    from: "Metrohuts <noreply@metrohuts.com>",
    to: 'metrohuts.ng@gmail.com',
    subject: "New Property Request",
    html: createEmailTemplate(content),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${baseUrl}/new-password?token=${token}`;
  const content = `
    <h2 style="color: #f97316;">Password Reset Request</h2>
    <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <a href="${resetLink}" style="display: inline-block; background-color: #f97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">Reset Password</a>
  `;

  await resend.emails.send({
    from: 'Metrohuts <noreply@metrohuts.com>',
    to: email,
    subject: "Reset Your Password",
    html: createEmailTemplate(content),
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${baseUrl}/email-verification?token=${token}`;
  const content = `
    <h2 style="color: #f97316;">Welcome to Metrohuts!</h2>
    <p>Thank you for creating an account with Metrohuts. To complete your registration, please verify your email address by clicking the button below:</p>
    <a href="${confirmationLink}" style="display: inline-block; background-color: #f97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">Verify Email</a>
    <p>If you didn't create an account with us, you can safely ignore this email.</p>
  `;

  await resend.emails.send({
    from: 'Metrohuts <noreply@metrohuts.com>',
    to: email,
    subject: "Verify your Metrohuts Account",
    html: createEmailTemplate(content),
  });
};


export const sendEnquiryEmail = async (
  email: string | null, 
  name: string | null,
  message: string | undefined, 
  propertyTitle: string,
  phone: string | null,
  propertyDetails: string
) => {
  const content = `
    <h2 style="color: #f97316;">New Enquiry From Metrohuts</h2>
    <p>A new enquiry has been submitted:</p>
    <ul>
      <li>Enquirer's Email: ${email}</li>
      <li>Enquirer's Email: ${name}</li>
      <li>Property: ${propertyTitle}</li>
      <li>Enquirer's Phone: ${phone}</li>
      <li>Property Details: ${propertyDetails}</li>
    </ul>
    <p>Please review and respond to this enquiry as soon as possible.</p>
    <h3>Message</h3>
    <p>${message}</p>
  `;

  await resend.emails.send({
    from: 'Metrohuts <noreply@metrohuts.com>',
    to: `metrohuts.ng@gmail.com`,
    subject: `Enquiry for ${propertyTitle}`,
    html: createEmailTemplate(content),
  });
} 



export const sendBookingMailToAdmin = async (
  email: string | null, 
  name: string | null,
  checkInDate: Date | undefined, 
  checkOutData: Date | undefined, 
  propertyTitle: string,
  phone: string | null,
  propertyDetails: string
) => {
  const content = `
    <h2 style="color: #f97316;">New Enquiry From Metrohuts</h2>
    <p>A new Booking has been submitted:</p>
    <ul>
      <li>User's Email: ${email}</li>
      <li>User's Name: ${name}</li>
      <li>Apartment: ${propertyTitle}</li>
      <li>User's Phone: ${phone}</li>
      <li>Checkin Date : ${checkInDate?.toLocaleDateString()}</li>
      <li>Chechout Date: ${checkOutData?.toLocaleDateString()}</li>
      <li>Apartment Details: ${propertyDetails}</li>
    </ul>
    <p>Please review and respond to this enquiry as soon as possible.</p>
  `;

  await resend.emails.send({
    from: 'Metrohuts <noreply@metrohuts.com>',
    to: `metrohuts.ng@gmail.com`,
    subject: `Enquiry for ${propertyTitle}`,
    html: createEmailTemplate(content),
  });
} 