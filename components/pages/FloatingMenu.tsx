"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";

interface ComponentPage {
  name: string;
  url: string;
  count: number;
}

export const componentPages: ComponentPage[] = [
  // { name: "All", count: 15, url: "/pages" },
  { name: "Navbars", count: 1, url: "/pages/navbars" },
  { name: "Heros", count: 3, url: "/pages/hero-sections" },
  { name: "Feature", count: 2, url: "/pages/feature-sections" },
  { name: "Why Us", count: 1, url: "/pages/why-us" },
  { name: "logos", count: 1, url: "/pages/logo-clouds" },
  { name: "Faqs", count: 1, url: "/pages/faqs" },
  { name: "Contacts", count: 1, url: "/pages/contact-sections" },
  { name: "Footers", count: 1, url: "/pages/footers" },
  { name: "Sidebars", count: 2, url: "/pages/sidebars" },
];

export const totalComponents = componentPages.reduce((acc, item) => {
  return acc + item.count;
}, 0);

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 overflow-hidden rounded-lg bg-white shadow-lg"
          >
            <ul className="py-2">
              {componentPages.map((page) => (
                <li key={page.name}>
                  <a
                    href={page.url}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-150 ease-in-out hover:bg-gray-100"
                  >
                    {page.name}
                    {page.count && (
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        {page.count}
                      </Badge>
                    )}
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-primary p-4 text-primary-foreground shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        aria-label={isOpen ? "Close components menu" : "Open components menu"}
      >
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.div>
      </motion.button>
    </div>
  );
}
