import ComposeMail from "@/components/dashboard/ComposeMail";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compose Email",
  description: "Send emails to your clients and team members",
};

export default function EmailsPage() {
  return (
    <div className="container mx-auto py-6">
      <ComposeMail />
    </div>
  );
}
