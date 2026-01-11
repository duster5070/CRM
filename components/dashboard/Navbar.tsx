"use client";
import React from "react";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  DollarSign,
  ExternalLink,
  Handshake,
  Home,
  LayoutGrid,
  LineChart,
  Lock,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  User2,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";
import { getInitials } from "@/lib/generateInitials";
import { ModeToggle } from "../mode-toggle";
import { AvatarMenuButton } from "./AvatarMenuButton";
import { usePathname } from "next/navigation";
import Logo from "../global/Logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";
export default function Navbar({ session }: { session: Session }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const sidebarLinks = [
    {
      title: "Dashboard",
      links: [
        {
          title: "Overview",
          href: "/dashboard",
          icon: Home,
        },
      ],
    },
    {
      title: "Clients & Projects",
      links: [
        {
          title: "Clients",
          href: "/dashboard/clients",
          icon: Users,
        },
        {
          title: "Projects",
          href: "/dashboard/projects",
          icon: LayoutGrid,
        },
      ],
    },
    {
      title: "Finance",
      links: [
        {
          title: "Invoices",
          href: "/dashboard/invoices",
          icon: DollarSign,
        },
        {
          title: "Payments",
          href: "/dashboard/payments",
          icon: Handshake,
        },
      ],
    },
    {
      title: "Team",
      links: [
        {
          title: "Members",
          href: "/dashboard/members",
          icon: User2,
        },
        {
          title: "Roles",
          href: "/dashboard/roles",
          icon: Lock,
        },
      ],
    },
    {
      title: "Communication",
      links: [
        {
          title: "Emails",
          href: "/dashboard/emails",
          icon: User2,
        },
        {
          title: "Bulk Emails",
          href: "/dashboard/bulk-emails",
          icon: Lock,
        },
      ],
    },
    {
      title: "Portfolio",
      links: [
        {
          title: "Generate Portfolio",
          href: "/dashboard/portfolio",
          icon: User2,
        },
      ],
    },
    {
      title: "Brand",
      links: [
        {
          title: "Settings",
          href: "/dashboard/brand-settings",
          icon: User2,
        },
        {
          title: "File Manager",
          href: "/dashboard/file-manager",
          icon: Lock,
        },
      ],
    },
    {
      title: "Reports",
      links: [
        {
          title: "Project Progress",
          href: "/dashboard/project-progress",
          icon: User2,
        },
        {
          title: "Financial Summary",
          href: "/dashboard/financial-summary",
          icon: Lock,
        },
        {
          title: "Time Tracking",
          href: "/dashboard/time-tracking",
          icon: Lock,
        },
      ],
    },
    {
      title: "Settings",
      links: [
        {
          title: "Account Settings",
          href: "/dashboard/account-settings",
          icon: User2,
        },
        {
          title: "Notifications",
          href: "/dashboard/notifications",
          icon: Lock,
        },
        {
          title: "Integrations",
          href: "/dashboard/notifications",
          icon: Lock,
        },
      ],
    },
  ];
  const pathname = usePathname();
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <div className="block border-r bg-muted/40">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="mt-6 flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Logo />
                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </div>
              <div className="flex-1">
                <ScrollArea className="h-[445px] w-full rounded-md px-4 py-2">
                  <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    {sidebarLinks.map((item, i) => {
                      return (
                        <div className="py-1" key={i}>
                          <h2 className="pb-1 font-semibold">{item.title}</h2>
                          {item.links.map((item, i) => {
                            const Icon = item.icon;
                            const isActive = item.href === pathname;
                            return (
                              <Link
                                onClick={() => setSheetOpen(false)}
                                key={i}
                                href={item.href}
                                className={cn(
                                  "flex items-center gap-3 rounded-lg px-3 py-1.5 text-muted-foreground transition-all hover:text-primary",
                                  isActive && "bg-muted text-primary",
                                )}
                              >
                                <Icon className="h-4 w-4" />
                                {item.title}
                              </Link>
                            );
                          })}
                        </div>
                      );
                    })}
                    <Link
                      href="/"
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      )}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Website
                    </Link>
                  </nav>
                </ScrollArea>
              </div>
              <div className="mt-auto p-4">
                <Card x-chunk="dashboard-02-chunk-0">
                  <Button size="sm" className="w-full">
                    Logout
                  </Button>
                </Card>
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex-shrink-0" asChild variant={"ghost"}>
            <Avatar>
              <AvatarImage
                src={session?.user?.image ?? ""}
                alt={session?.user?.name ?? ""}
              />
              <AvatarFallback>
                {getInitials(session?.user?.name)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
      <ModeToggle />
      <AvatarMenuButton session={session} />
    </header>
  );
}
