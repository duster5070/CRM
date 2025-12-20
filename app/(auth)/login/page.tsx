import LoginForm from "@/components/Forms/LoginForm";
import { authOptions } from "@/config/auth";
import { Lock, Mail } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams?:{
    callbackUrl?:string
 
  }
}

export default async function page({ searchParams }:  Props) {
  const session = await getServerSession(authOptions);
  const callbackUrl = searchParams?.callbackUrl || "/dashboard";
 
  if (session) {
    redirect(callbackUrl);
  }
  return (
    <section>
      <LoginForm  />
    </section>
  );
}
