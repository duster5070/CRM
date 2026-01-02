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
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-5 z-50 bg-glass backdrop-blur-md text-white p-4 rounded-full mx-4 md:mx-8 lg:mx-[10rem] px-4 sm:px-6 md:px-[3.75rem] py-1 border border-gray-300">
      <div className="flex justify-between items-center py-2 sm:py-4">
        <div className="flex items-center space-x-4">
          <Logo />
        </div>
        <ul className="hidden lg:flex space-x-4 md:space-x-[51px] cursor-pointer text-lg lg:text-2xl font-semibold">
          {navItems.map(({ id, label, href }) => (
            <li key={id}>
              <Link
                href={href}
                onClick={(e) => handleClick(e, href)}
                className={
                  activeSection === id
                    ? "text-secondaryBlue underline font-bold"
                    : "text-primary"
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-5 items-center">

          {/* Theme Toggle - Large Screens Only */}
          <button
            className="hidden lg:flex p-2 cursor-pointer text-primary rounded-full hover:bg-blue10 transition-colors duration-200 items-center justify-center"
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
              className="hidden lg:flex items-center space-x-2 py-2 sm:py-[32px] rounded-full"
            >
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Avatar>
                  <AvatarImage
                    src={session?.user?.image ?? ""}
                    alt={session?.user?.name ?? ""}
                  />
                  <AvatarFallback>
                    {getInitials(session?.user?.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-3 text-primary">Dashboard</span>
              </Link>
            </Button>
            <div className="lg:hidden flex items-center gap-2">
              {/* Theme Toggle - Medium and Small Screens */}
              <button
                className="p-2 cursor-pointer text-primary rounded-full hover:bg-blue10 transition-colors duration-200 flex items-center justify-center relative"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </button>
              <button
                className="p-2 cursor-pointer text-primary rounded-full hover:bg-blue10 transition-colors duration-200 flex items-center justify-center"
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
                    <AvatarFallback>
                      {getInitials(session?.user?.name)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                asChild
                variant="default"
                className="py-2 sm:py-[16px] px-4 sm:px-[16px] text-base sm:text-lg"
              >
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="text-primary py-2 sm:py-3 px-4 sm:px-6"
              >
                <Link href="/register">Signup</Link>
              </Button>
            </div>
            <div className="lg:hidden flex items-center gap-2">
              {/* Theme Toggle - Medium and Small Screens */}
              <button
                className="p-2 cursor-pointer text-primary rounded-full hover:bg-blue10 transition-colors duration-200 flex items-center justify-center relative"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </button>
              <button
                className="p-2 text-primary rounded-full hover:bg-blue10 transition-colors duration-200 flex items-center justify-center"
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
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border border-gray-300 rounded-b-3xl mt-2 p-4">
          {session ? (
            <div className="mb-4 pb-4 border-b border-gray-300">
              <Button
                asChild
                variant={"ghost"}
                className="w-full flex items-center justify-start space-x-2 py-3"
              >
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Avatar>
                    <AvatarImage
                      src={session?.user?.image ?? ""}
                      alt={session?.user?.name ?? ""}
                    />
                    <AvatarFallback>
                      {getInitials(session?.user?.name)}
                    </AvatarFallback>
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
                  className={`block py-2 ${activeSection === id ? "text-secondaryBlue underline font-bold" : "text-primary"}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          {!session && (
            <div className="flex flex-col space-y-2 mt-4">
              <Button asChild variant="default" className="w-full py-3 text-lg">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  Log in
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full text-primary">
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
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
