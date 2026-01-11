"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getInitials } from "@/lib/generateInitials";
import {
  Headset,
  LogOut,
  Mail,
  MessageSquareMore,
  PhoneCall,
  Presentation,
  Settings,
  User,
  UserRound,
} from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AvatarMenuButton({ session }: { session: Session }) {
  const user = session.user;
  const initials = getInitials(user.name ?? "");
  const router = useRouter();
  async function handleLogout() {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }
  const menuLinks = [
    {
      name: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
    {
      name: "Profile",
      icon: UserRound,
      href: "/dashboard/profile",
    },
    {
      name: "POS",
      icon: Presentation,
      href: "/dashboard/pos",
    },
  ];
  const assistanceLinks = [
    {
      name: "Free 2 hour set-up assistance",
      icon: Headset,
      href: "/dashboard/settings",
    },
    {
      name: "Chat with Our experts",
      icon: MessageSquareMore,
      href: "/dashboard/profile",
    },
    {
      name: "Send an Email",
      icon: Mail,
      href: "/dashboard/pos",
    },
    {
      name: "Talk to Us - 256 784 143 872",
      icon: PhoneCall,
      href: "/dashboard/pos",
    },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Avatar>
          <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center space-x-3 border-b pb-3">
            <Avatar>
              <AvatarImage src={user?.image ?? ""} alt={user.name ?? ""} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="">
              <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0">
                {user?.name}
              </h2>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 border-b py-6">
            <Button asChild variant={"outline"}>
              <Link href="/dashboard/account">
                <User className="mr-2 h-4 w-4" />
                <span>Manage Account</span>
              </Link>
            </Button>
            <Button onClick={handleLogout} variant={"outline"}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </SheetHeader>
        {/* CONTENT HWRE */}
        <div className="">
          <div className="grid grid-cols-3 gap-4 border-b py-6">
            {menuLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link key={i} href={item.href} className="flex flex-col items-center">
                  <Icon className="mr-2 h-8 w-8" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="py-6">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0">
              Need Assistance?
            </h2>
            <div className="py-2">
              {assistanceLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Button className="" key={i} size={"sm"} asChild variant={"ghost"}>
                    <Link href={item.href}>
                      <Icon className="mr-2 h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
