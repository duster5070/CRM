"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import SearchBarV1 from "./SearchBarV1";

const specialties = ["Doctor", "Dermatologist", "Dentist", "Psychiatrist", "Pediatrician"];

export default function HeroV2() {
  const [specialty, setSpecialty] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpecialty((prev) => (prev + 1) % specialties.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.webp')",
          filter: "brightness(0.7)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl"
        >
          Find the right <span className="text-blue-500">{specialties[specialty]}</span>
          <br />
          right now
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-8 max-w-3xl text-xl text-gray-200"
        >
          AskDoc connects you with top healthcare professionals. Book appointments instantly and
          take control of your health journey.
        </motion.p>
        <SearchBarV1 />
      </div>
    </div>
  );
}
