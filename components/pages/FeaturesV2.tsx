"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Globe, BarChart2, Clock } from "lucide-react";

const FeaturesV2: React.FC = () => {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center md:flex-row-reverse">
        <motion.div
          className="mb-8 md:mb-0 md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/bg/bg-1.jpg"
            alt="Agrikkom Digital Platform"
            width={500}
            height={400}
            className="rounded-lg"
          />
        </motion.div>
        <motion.div
          className="md:w-1/2 md:pr-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="mb-2 text-sm font-semibold text-lime-600">Digital Excellence</h2>
          <h3 className="mb-4 text-4xl font-bold text-green-900">
            Streamlined Digital Solutions for Agricultural Exports
          </h3>
          <p className="mb-6 text-gray-600">
            Experience seamless export management with Agrikkom's cutting-edge digital platform. We
            leverage technology to simplify processes, provide real-time insights, and enhance your
            export operations.
          </p>
          <ul className="mb-8 text-gray-600">
            <li className="mb-4 flex items-center">
              <Globe className="mr-3 h-6 w-6 text-lime-600" />
              <span>Global market access and insights</span>
            </li>
            <li className="mb-4 flex items-center">
              <BarChart2 className="mr-3 h-6 w-6 text-lime-600" />
              <span>Real-time price tracking and demand analysis</span>
            </li>
            <li className="mb-4 flex items-center">
              <Clock className="mr-3 h-6 w-6 text-lime-600" />
              <span>Efficient order processing and tracking</span>
            </li>
          </ul>
          <motion.button
            className="flex items-center rounded-full bg-lime-500 px-6 py-3 text-white transition duration-300 hover:bg-lime-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">Explore Our Digital Platform</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesV2;
