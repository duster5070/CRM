"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Leaf, Globe, Award } from "lucide-react";
import Link from "next/link";

const backgroundImages = [
  "/bg/bg-1.jpg",
  "/bg/bg-2.jpg",
  "/bg/bg-3.jpg",
  "/bg/bg-4.jpg",
  "/bg/bg-5.jpg",
  "/bg/bg-6.jpg",
  "/bg/bg-7.jpg",
  "/bg/bg-8.jpg",
];

export default function HeroV1() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-900 to-green-700 text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={backgroundImages[currentImageIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={backgroundImages[currentImageIndex]}
            alt="Ugandan farm landscape"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="opacity-20"
          />
        </motion.div>
      </AnimatePresence>
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            From Uganda's Finest Farms
            <br />
            <span className="text-green-300">To the World's Tables</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-green-100 md:text-2xl">
            Agrikkom connects global markets with premium Ugandan produce, ensuring freshness,
            quality, and sustainability in every export.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0"
        >
          <Link
            href="/products"
            className="inline-flex items-center rounded-full bg-lime-500 px-8 py-3 font-bold text-white transition duration-300 hover:bg-lime-400"
          >
            Explore Our Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <a
            href="/contact"
            className="rounded-full border-2 border-green-300 bg-transparent px-8 py-3 font-bold text-green-300 transition duration-300 hover:bg-green-300 hover:text-green-900"
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 gap-8 text-center md:grid-cols-3"
        >
          <div className="rounded-xl bg-white bg-opacity-10 p-6 backdrop-blur-lg backdrop-filter">
            <Leaf className="mx-auto mb-4 h-12 w-12 text-green-300" />
            <h3 className="mb-2 text-xl font-semibold">100+ Varieties</h3>
            <p className="text-green-100">Diverse range of fresh fruits and vegetables</p>
          </div>
          <div className="rounded-xl bg-white bg-opacity-10 p-6 backdrop-blur-lg backdrop-filter">
            <Globe className="mx-auto mb-4 h-12 w-12 text-green-300" />
            <h3 className="mb-2 text-xl font-semibold">Global Reach</h3>
            <p className="text-green-100">Exporting to 30+ countries worldwide</p>
          </div>
          <div className="rounded-xl bg-white bg-opacity-10 p-6 backdrop-blur-lg backdrop-filter">
            <Award className="mx-auto mb-4 h-12 w-12 text-green-300" />
            <h3 className="mb-2 text-xl font-semibold">Certified Quality</h3>
            <p className="text-green-100">Meeting international standards for excellence</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
