"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FeaturesV1: React.FC = () => {
  return (
    <section className="bg-green-900 px-4 py-16 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center md:flex-row">
        <motion.div
          className="mb-8 md:mb-0 md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/bg/bg-2.jpg"
            alt="Fresh Ugandan Produce"
            width={500}
            height={300}
            className="rounded-xl shadow"
          />
        </motion.div>
        <motion.div
          className="md:w-1/2 md:pl-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="mb-2 text-sm font-semibold text-lime-400">Premium Exports</h2>
          <h3 className="mb-4 text-4xl font-bold">
            The Ultimate Fresh Produce Experience Across Borders
          </h3>
          <p className="mb-6">
            Enjoy the quality of Ugandan fresh produce. Export anytime, to anywhere around the
            world.
          </p>
          <ul className="mb-8">
            <li className="mb-2 flex items-center">
              <span className="mr-2 text-lime-400">✓</span> Globally Accepted Standards
            </li>
            <li className="mb-2 flex items-center">
              <span className="mr-2 text-lime-400">✓</span> Track Shipments in Real-time
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-lime-400">✓</span> Flexible Export Volumes
            </li>
          </ul>
          <button className="rounded-full bg-lime-400 px-6 py-2 text-green-900 transition duration-300 hover:bg-lime-500">
            Learn more
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesV1;
