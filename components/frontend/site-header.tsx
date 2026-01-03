"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

import Logo from "../global/Logo";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/generateInitials";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
  { id: "home", label: "Home", href: "#home" },
  { id: "features", label: "Features", href: "#features" },
  { id: "howItWorks", label: "How it works", href: "#howItWorks" },
  // { id: "pricing", label: "Pricing", href: "#pricing" },
];

export default function SiteHeader({ session }: { session: Session | null }) {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: "-50% 0px -50% 0px",
          threshold: 0,
        },
      );
      observer.observe(element);
      observers.push(observer);
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 50;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-5 z-50 mx-4 rounded-full border border-gray-300 bg-glass px-4 text-white backdrop-blur-md sm:px-6 md:mx-8 md:px-[2rem] lg:mx-[18rem]">
      <div className="flex items-center justify-between sm:py-3">
        <div className="flex items-center space-x-4">
          <Logo />
        </div>
        <ul className="hidden cursor-pointer space-x-4 text-lg font-semibold md:space-x-[51px] lg:flex lg:text-2xl">
          {navItems.map(({ id, label, href }) => (
            <li key={id}>
              <Link
                href={href}
                onClick={(e) => handleClick(e, href)}
                className={
                  activeSection === id ? "font-bold text-secondaryBlue underline" : "text-primary"
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-5">
          {/* Theme Toggle - Large Screens Only */}
          <button
            className="hidden cursor-pointer items-center justify-center rounded-full p-2 text-primary transition-colors duration-200 hover:bg-blue10 lg:flex"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
          {session ? (
            <>
              <Button
                asChild
                variant={"ghost"}
                className="hidden items-center space-x-2 rounded-full py-2 sm:py-[32px] lg:flex"
              >
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Avatar>
                    <AvatarImage src={session?.user?.image ?? ""} alt={session?.user?.name ?? ""} />
                    <AvatarFallback>{getInitials(session?.user?.name)}</AvatarFallback>
                  </Avatar>
                  <span className="ml-3 text-primary">Dashboard</span>
                </Link>
              </Button>
              <div className="flex items-center gap-2 lg:hidden">
                {/* Theme Toggle - Medium and Small Screens */}
                <button
                  className="relative flex cursor-pointer items-center justify-center rounded-full p-2 text-primary transition-colors duration-200 hover:bg-blue10"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </button>
                <button
                  className="flex cursor-pointer items-center justify-center rounded-full p-2 text-primary transition-colors duration-200 hover:bg-blue10"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X size={24} />
                  ) : (
                    <Avatar>
                      <AvatarImage
                        src={session?.user?.image ?? ""}
                        alt={session?.user?.name ?? ""}
                      />
                      <AvatarFallback>{getInitials(session?.user?.name)}</AvatarFallback>
                    </Avatar>
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="hidden items-center space-x-4 lg:flex">
                <Button
                  asChild
                  variant="default"
                  className="px-4 py-2 text-base sm:px-[16px] sm:py-[16px] sm:text-lg"
                >
                  <Link href="/login">Log in</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="px-4 py-2 text-primary sm:px-6 sm:py-3"
                >
                  <Link href="/register">Signup</Link>
                </Button>
              </div>
              <div className="flex items-center gap-2 lg:hidden">
                {/* Theme Toggle - Medium and Small Screens */}
                <button
                  className="relative flex cursor-pointer items-center justify-center rounded-full p-2 text-primary transition-colors duration-200 hover:bg-blue10"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </button>
                <button
                  className="flex items-center justify-center rounded-full p-2 text-primary transition-colors duration-200 hover:bg-blue10"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-b-3xl border border-gray-300 bg-background p-4 lg:hidden">
          {session ? (
            <div className="mb-4 border-b border-gray-300 pb-4">
              <Button
                asChild
                variant={"ghost"}
                className="flex w-full items-center justify-start space-x-2 py-3"
              >
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Avatar>
                    <AvatarImage src={session?.user?.image ?? ""} alt={session?.user?.name ?? ""} />
                    <AvatarFallback>{getInitials(session?.user?.name)}</AvatarFallback>
                  </Avatar>
                  <span className="ml-3 text-primary">Dashboard</span>
                </Link>
              </Button>
            </div>
          ) : null}
          <ul className="flex flex-col space-y-4 text-lg font-semibold">
            {navItems.map(({ id, label, href }) => (
              <li key={id}>
                <Link
                  href={href}
                  onClick={(e) => {
                    handleClick(e, href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block py-2 ${activeSection === id ? "font-bold text-secondaryBlue underline" : "text-primary"}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          {!session && (
            <div className="mt-4 flex flex-col space-y-2">
              <Button asChild variant="default" className="w-full py-3 text-lg">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  Log in
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full text-primary">
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  Signup
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
