import Footer from "@/components/frontend/site-footer";
import SiteHeader from "@/components/frontend/site-header";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-white antialiased min-h-screen w-full">
      <SiteHeader session={session} />
      <main className="w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
