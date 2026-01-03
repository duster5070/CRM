import { getInvoiceById } from "@/actions/payments";
import { Invoice } from "@/components/Invoice";

import { Button } from "@/components/ui/button";
import { getAuthUser } from "@/config/useAuth";
import { getNormalDate } from "@/lib/getNormalDate";
import { ChevronLeft, CloudDownload, Mail, Printer } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const { project } = await searchParams;
  const user = await getAuthUser();
  const role = user?.role;

  if (!id) {
    notFound();
  }

  const invoiceDetails = await getInvoiceById(id);

  if (!invoiceDetails) {
    notFound();
  }

  return <Invoice role={role ?? ""} invoiceDetails={invoiceDetails} project={project as string} />;
}
