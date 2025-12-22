"use server";

import { InvoiceDetails } from "@/types/types";

import { Resend } from 'resend';

import { getNormalDate } from "@/lib/getNormalDate";
import { InvoiceLink } from "@/components/Email-Templates/invoice";
export async function sendEmail(data:InvoiceDetails,invoiceLink:string) {
    try {
if(!process.env.RESEND_API_KEY){
  throw new Error("RESEND_API_KEY is not defined");
}
const resend = new Resend(process.env.RESEND_API_KEY);
const date = getNormalDate(data.invoice.date);
const title=`Payment for ${data.invoice.title} made on ${date}`


 const response = await resend.emails.send({
  from: 'Project X <onboarding@resend.dev>',
  to: "tarekanwer2345@gmail.com", 
  subject: `Invoice for your project made on ${date}`,
  react: InvoiceLink({
    invoiceLink,
    previewText: `Invoice for your project made on ${date}`,
    title,
    userName: data.user?.name??"",
  }),
});
console.log("Email sent successfully:", response);
  } catch (error) {
    console.error(error);
     throw error; 
   
  }
}
