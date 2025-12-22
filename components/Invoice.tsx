"use client"

import { InvoiceDetails } from '@/types/types'
import React from 'react'
import { getInvoiceById } from "@/actions/payments";
import { Button } from "@/components/ui/button";
import { getNormalDate } from "@/lib/getNormalDate";
import { ChevronLeft, CloudDownload, Mail, Printer } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useReactToPrint } from "react-to-print"; 
import { useRef } from "react";
import { sendEmail } from '@/actions/emails';
import toast from 'react-hot-toast';



export const Invoice = ({invoiceDetails,project,role}:{invoiceDetails:InvoiceDetails,project:string,role:string}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });



  const [loading, setLoading] = React.useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_APP_URL is not defined");
    }
    const invoiceLink = `${baseUrl}/project/invoice/${invoiceDetails?.invoice.id}?project=${project}`
  const handleSendEmail = async () => {
   
    setLoading(true);
    try{
      console.log("start sending email"+invoiceDetails);
  const res =  await sendEmail(invoiceDetails,invoiceLink);
 

setLoading(false);
toast.success("Email sent successfully");

    }
    catch(error){
      console.error(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  }

  return (
      <div className="max-w-2xl mx-auto p-8" >
      <div className="flex justify-between items-center py-3">
        <Button variant="outline" className="mb-4" asChild>
          <Link href={`/project/${project}`} className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Project
          </Link>
        </Button>
        <div className=" flex justify-end gap-x-2">

          {role === "USER" && (
            <button disabled={loading} onClick={() => handleSendEmail()} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
           {!loading &&  <Mail className="shrink-0 size-4" />}
            {loading ? "Sending..." : "Send to Client"}
          </button>
          )}
      
          
          <button onClick={reactToPrintFn} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
            <Printer className="shrink-0 size-4" />
            Print
          </button>
        </div>
      </div>
      <div ref={contentRef} className="relative flex flex-col bg-white shadow-lg rounded-xl pointer-events-auto dark:bg-neutral-800">
        <div className="relative overflow-hidden min-h-32 bg-gray-900 text-center rounded-t-xl dark:bg-neutral-950">
          <figure className="absolute inset-x-0 bottom-0 -mb-px">
            <svg
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 1920 100.1"
            >
              <path
                fill="currentColor"
                className="fill-white dark:fill-neutral-800"
                d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
              ></path>
            </svg>
          </figure>
        </div>

        <div className="relative z-10 -mt-12">
          {/* <span className="mx-auto flex justify-center items-center size-15.5 rounded-full border border-gray-200 bg-white text-gray-700 shadow-2xs dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
          <svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
            <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </span> */}
          <img
            src={invoiceDetails?.user?.userLogo ?? "/placeholder.svg"}
            alt=""
            className="mx-auto flex justify-center items-center size-[62px] rounded-full border border-gray-200 bg-white text-gray-700 shadow-2xs dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400"
          />
        </div>

        <div className="p-4 sm:p-7 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div className="">
              <h3
                id="hs-ai-modal-label"
                className="text-lg font-semibold text-gray-800 dark:text-neutral-200"
              >
                Bill From
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                {invoiceDetails?.user?.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                {invoiceDetails?.user?.email}
              </p>
              <p className="text-sm font-medium dark:text-neutral-500 pt-3">
                Invoice Date:{" "}
                <span className="text-muted-foreground">
                  {getNormalDate(invoiceDetails?.invoice.date ?? new Date())}
                </span>
              </p>
            </div>
            <div className="">
              <h3
                id="hs-ai-modal-label"
                className="text-lg font-semibold text-gray-800 dark:text-neutral-200"
              >
                Bill To
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                {invoiceDetails?.client?.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                {invoiceDetails?.client?.email}
              </p>
              <p className="text-sm font-medium dark:text-neutral-500 pt-3">
                Invoice #{" "}
                <span className="text-muted-foreground">
                  {invoiceDetails?.invoice.invoiceNumber}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-5 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-5">
            <div>
              <span className="block text-xs uppercase text-gray-500 dark:text-neutral-500">
                Amount paid:
              </span>
              <span className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                {invoiceDetails?.invoice.amount.toLocaleString()}
              </span>
            </div>

            <div>
              <span className="block text-xs uppercase text-gray-500 dark:text-neutral-500">
                Date paid:
              </span>
              <span className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                {" "}
                {getNormalDate(invoiceDetails?.invoice.date ?? new Date())}
              </span>
            </div>

            <div>
              <span className="block text-xs uppercase text-gray-500 dark:text-neutral-500">
                Payment method:
              </span>
              <div className="flex items-center gap-x-2">
                <span className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                  {invoiceDetails?.invoice.method}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-10">
            <h4 className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
              Summary
            </h4>

            <ul className="mt-3 flex flex-col">
              <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-neutral-700 dark:text-neutral-200">
                <div className="flex items-center justify-between w-full">
                  <span>{invoiceDetails?.invoice.title}</span>
                  <span>
                    {(
                      invoiceDetails!.invoice.amount -
                      invoiceDetails!.invoice.tax
                    ).toLocaleString()}
                  </span>
                </div>
              </li>
              <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-neutral-700 dark:text-neutral-200">
                <div className="flex items-center justify-between w-full">
                  <span>Tax fee</span>
                  <span>{invoiceDetails!.invoice.tax.toLocaleString()}</span>
                </div>
              </li>
              <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-gray-50 border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                <div className="flex items-center justify-between w-full">
                  <span>Total Amount paid</span>
                  <span>{invoiceDetails!.invoice.amount.toLocaleString()}</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-5 sm:mt-10">
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              If you have any questions, please contact us at{" "}
              <a
                className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
                href={`mailto:${invoiceDetails?.user?.email}`}
              >
                {invoiceDetails?.user?.email}
              </a>{" "}
              or call at{" "}
              <a
                className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
                href={`tel:${invoiceDetails?.user?.phone}`}
              >
                {invoiceDetails?.user?.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
