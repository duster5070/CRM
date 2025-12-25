import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function ProjectLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="">{children}</div>;
}
