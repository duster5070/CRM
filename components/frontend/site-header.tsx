"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import Logo from "../global/Logo";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/generateInitials";
import { useTheme } from "next-themes";

const navItems = [
  { id: "home", label: "Home", href: "#home" },
  { id: "features", label: "Features", href: "#features" },
  { id: "howItWorks", label: "How it works", href: "#howItWorks" },
  // { id: "pricing", label: "Pricing", href: "#pricing" },
];

export default function SiteHeader({ session }: { session: Session | null }) {
  const [activeSection, setActiveSection] = useState("home");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const observers: IntersectionObserver[] = [];
    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(entries => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        });
      },
        {
          rootMargin: "-50% 0px -50% 0px",
          threshold: 0,
        }
      );
      observer.observe(element);
      observers.push(observer);
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 50;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="sticky top-5 z-50 bg-[var(--pika-navBackground)] backdrop-blur-md text-white p-4 rounded-full mx-[10rem] px-[3.75rem] py-1 border border-gray-300">
      <div className="flex  justify-between items-center py-[16px]">
        <div className="flex items-center space-x-4">
          <Logo variant={mounted && resolvedTheme === "dark" ? "dark" : "light"} />
        </div>
        <ul className="flex space-x-[51px] cursor-pointer text-2xl font-semibold">
          {navItems.map(({ id, label, href }) => (
            <li key={id}>
              <Link
                href={href}
                onClick={(e) => handleClick(e, href)}
                className={activeSection === id ? "text-[var(--pika-secondary)] underline font-bold" : "text-[var(--pika-primary)]"}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        {session ? (
          <Button asChild variant={'ghost'} className="flex items-center space-x-2 py-[32px] rounded-full">
            <Link href="/dashboard">
              <Avatar>
                <AvatarImage
                  src={session?.user?.image ?? ""}
                  alt={session?.user?.name ?? ""}
                />
                <AvatarFallback>
                  {getInitials(session?.user?.name)}
                </AvatarFallback>
              </Avatar>
              <span className="ml-3 text-[var(--pika-primary)]">Dashboard</span>
            </Link>
          </Button>
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="default" className="py-[16px] px-[16px] text-lg">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild variant="outline" className="text-[var(--pika-primary)]">
              <Link href="/register">Signup</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>

  );
}