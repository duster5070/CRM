import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import SidebarV2 from "@/components/pages/SidebarV2";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const role = session.user.role;
  if (role !== "USER") {
    return notFound();
  }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      {/* <SidebarV2 /> */}
      <div className="flex flex-col">
        <Navbar session={session} />
        {children}
      </div>
    </div>
  );
}
