"use client";

import React, { useEffect, useRef, useState } from "react";
import StickyScreens from "@/components/ui/StickyScreens";
import { motion, useScroll } from "framer-motion";
import Lenis from "lenis";
import Link from "next/link";
import LogoBig from "../global/LogoBigger";

interface TabItem {
  id: string;
  name: string;
  src: string;
  href: string;
}

const tabs: TabItem[] = [
  {
    id: "projectList",
    name: "Project List",
    src: "/Project List.svg",
    href: "projectList",
  },
  {
    id: "projectOverview",
    name: "Project Overview",
    src: "/Project Overview.svg",
    href: "projectOverview",
  },
  {
    id: "projectModules",
    name: "Project Modules",
    src: "/Project Modules.svg",
    href: "projectModules",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    src: "/Portfolio.svg",
    href: "portfolio",
  },
  {
    id: "paymentList",
    name: "Payment List",
    src: "/Payment List.svg",
    href: "paymentList",
  },
  {
    id: "clientList",
    name: "Client List",
    src: "/Client List.svg",
    href: "clientList",
  },
];

export default function Solution() {
  const container = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [activeSection, setActiveSection] = useState("projectList");
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const sectionSize = 1 / tabs.length;
      const clampedProgress = Math.max(0, Math.min(1, latest));
      let sectionIndex = Math.floor(
        (clampedProgress + sectionSize / 2) / sectionSize
      );
      sectionIndex = Math.max(0, Math.min(sectionIndex, tabs.length - 1));
      const newActiveId = tabs[sectionIndex].id;
      setActiveSection((prev) => (prev !== newActiveId ? newActiveId : prev));
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", (e) => {
      console.log(e);
    });
    return () => {
      lenis.destroy();
    };
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(href);
    if (!element || !container.current) {
      console.log("Element or container not found", {
        href,
        element,
        container: container.current,
      });
      return;
    }
    setActiveSection(href);

    const tabIndex = tabs.findIndex((tab) => tab.id === href);
    if (tabIndex === -1) {
      console.log("Tab index not found", { href });
      return;
    }

    const containerRect = container.current.getBoundingClientRect();
    const containerTop = containerRect.top + window.pageYOffset;
    const targetY =
      containerTop + tabIndex * window.innerHeight - window.innerHeight * 0.2;

    console.log("Scrolling to", { href, tabIndex, targetY, containerTop });

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetY, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto text-center flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl mb-8">one solution</h2>
        <LogoBig />
        <p className="text-2xl sm:text-3xl md:text-4xl pt-7 mb-16">
          The All-in-One Client & Project Platform
        </p>
      </div>

      {/* Container to limit sticky behavior */}
      <div className="relative">
        {/* Tab Navigation - Sticky at top */}
        <div className="pt-6 pb-0 lg:pb-[48.5rem] md:pb-[22rem] lg:mb-[50px] md:mb-[125px] lg:top-[4.5rem] md:top-[5.5rem] sticky z-20"> {/* top done large and mid*/}
          <div className="flex flex-wrap justify-center gap-3">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={`#${tab.id}`}
                onClick={(e) => handleClick(e, tab.id)}
                className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                  activeSection === tab.id
                    ? "bg-secondaryBlue text-white shadow-lg"
                    : "bg-transparent text-primary border border-primary hover:bg-blue10"
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Stacked Screenshots */}
        <div className="relative hidden lg:mt-[-44%] md:mt-[-48%] md:flex md:flex-col md:justify-start md:gap-[17rem]" ref={container}>
          {tabs.map((tab, index) => {
            const targetScale = 1 - (tabs.length - index) * 0.05;
            return (
              <StickyScreens
                key={index}
                i={index}
                {...tab}
                range={[index * (1 / tabs.length), 1]}
                target={targetScale}
                progress={scrollYProgress}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
