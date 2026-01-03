"use client";
import { MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchBarV1() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/search?query=${query}`);
    setQuery("");
  }
  return (
    <form className="" onSubmit={handleSearch}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex justify-center"
      >
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search for doctors..."
            className="w-full rounded-full px-6 py-4 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-blue-500 p-3 text-white transition duration-300 hover:bg-blue-600">
            <Search className="h-6 w-6" />
          </button>
        </div>
      </motion.div>
    </form>
  );
}
