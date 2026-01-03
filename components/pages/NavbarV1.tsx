"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ShoppingBag,
  Play,
  MapPin,
  Users,
  Briefcase,
  FileText,
  Newspaper,
  Image,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaPuzzlePiece } from "react-icons/fa";

const menuItems = [
  {
    title: "Features",
    href: "#",
    children: [
      {
        title: "Marketplace",
        description: "Browse templates",
        icon: ShoppingBag,
      },
      { title: "Academy", description: "Watch lessons", icon: Play },
      { title: "Plugins", description: "Ecosystem", icon: FaPuzzlePiece },
    ],
  },
  {
    title: "Resources",
    href: "#",
    children: [
      { title: "Meetups", description: "Upcoming events", icon: MapPin },
      { title: "Partners", description: "Affiliate program", icon: Users },
      { title: "Experts", description: "Jobs", icon: Briefcase },
    ],
  },
  {
    title: "Support",
    href: "#",
    children: [
      { title: "Updates", description: "Changelog", icon: FileText },
      { title: "Blog", description: "Posts", icon: Newspaper },
      { title: "Gallery", description: "Top sites", icon: Image },
    ],
  },
  { title: "Enterprise", href: "#" },
  { title: "Pricing", href: "#" },
  { title: "Contact", href: "#" },
];

export default function NavbarV1() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-black text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold">
          Framer
        </Link>
        <nav className="hidden items-center space-x-4 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.children ? (
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  ) : (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                  {item.children && (
                    <NavigationMenuContent>
                      <div className="w-[400px] p-4 md:w-[500px] lg:w-[600px]">
                        <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                        <ul className="grid gap-3 md:grid-cols-2">
                          {item.children.map((child) => (
                            <ListItem key={child.title} title={child.title} href="#">
                              <div className="flex items-center">
                                <div className="mr-3 rounded-md bg-gray-800 p-2">
                                  <child.icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <div className="font-medium">{child.title}</div>
                                  <p className="text-sm text-gray-400">{child.description}</p>
                                </div>
                              </div>
                            </ListItem>
                          ))}
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="hidden items-center space-x-4 lg:flex">
          <Button variant="ghost">Login</Button>
          <Button variant="outline">Sign up</Button>
        </div>
        <div className="flex items-center space-x-4 lg:hidden">
          <Button variant="ghost" size="sm">
            Login
          </Button>
          <Button variant="outline" size="sm">
            Sign up
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-black text-white sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <div key={item.title}>
                    <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                    {item.children && (
                      <ul className="ml-4 space-y-2">
                        {item.children.map((child) => (
                          <li key={child.title} className="flex items-center space-x-2">
                            <div className="rounded-md bg-gray-800 p-1">
                              <child.icon className="h-4 w-4" />
                            </div>
                            <Link href="#" className="text-sm hover:underline">
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white",
              className,
            )}
            {...props}
          >
            {children}
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
