"use client";

import { FolderMinus, Plus, Users } from "lucide-react";
import { motion } from "framer-motion";

export interface StepCard {
  id: string;
  number: string;
  title: string;
  buttonText: string;
}

interface StackedCardProps {
  index: number;
  step: StepCard;
  onDragEnd: () => void;
  isDraggable: boolean;
  onDragStart: () => void;
}

export default function StackedCard({
  index,
  step,
  onDragEnd,
  isDraggable,
  onDragStart,
}: StackedCardProps) {
  const scale = 1 - index * 0.05;
  const opacity = index === 0 ? 1 : 0.4;
  const translateY = index * 15; // Reduced for smaller screens
  const translateX = index * 10; // Reduced for smaller screens

  const shadowFilters: Record<string, string> = {
    One: "drop-shadow(0 2px 4.5px rgba(1, 87, 155, 0.58))",
    Two: "drop-shadow(0 2px 4.5px rgba(13, 166, 31, 0.58))",
    Three: "drop-shadow(0 2px 4.5px rgba(174, 37, 37, 0.58))",
  };

  const textColors: Record<string, string> = {
    One: "#01579B",
    Two: "#0DA61F",
    Three: "#AE2525",
  };

  const shadowFilter = shadowFilters[step.number] || shadowFilters["One"];
  const textColor = textColors[step.number] || textColors["One"];

  return (
    <motion.div
      id={step.id}
      className="absolute inset-0 flex items-center justify-center"
      style={{
        zIndex: 3 - index,
        x: translateX,
        y: translateY,
        scale,
        opacity,
      }}
      drag={isDraggable}
      dragConstraints={{ left: -150, right: 150, top: -150, bottom: 300 }}
      dragElastic={0.2}
      onDragStart={onDragStart}
      onDragEnd={(event, info) => {
        const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
        if (distance > 100) {
          onDragEnd();
        }
      }}
      animate={{
        x: translateX,
        y: translateY,
        scale,
        opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <motion.div
        className="relative flex h-[360px] w-[280px] cursor-grab flex-col justify-between rounded-2xl border border-primary bg-white p-4 shadow-2xl active:cursor-grabbing sm:h-[420px] sm:w-[320px] sm:p-6 md:h-[520px] md:w-[400px] md:p-8 lg:h-[636px] lg:w-[490px] lg:p-10"
        whileDrag={{ cursor: "grabbing" }}
      >
        <div className="text-center">
          <h3
            className="text-3xl font-bold sm:text-4xl md:text-4xl lg:text-5xl"
            style={{
              color: textColor,
              filter: shadowFilter,
            }}
          >
            {step.number}
          </h3>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
          <h4 className="text-center text-xl font-bold text-gray-800 sm:text-2xl md:text-3xl lg:text-4xl">
            {step.title}
          </h4>
          {step.number === "Two" ? (
            <Users className="h-6 w-6 text-gray-600 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
          ) : (
            <FolderMinus className="h-6 w-6 text-gray-600 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
          )}
        </div>

        <div className="flex justify-center">
          <button className="flex items-center gap-2 rounded-xl bg-gray-800 px-4 py-2 text-white shadow-lg transition-colors hover:bg-gray-700 sm:gap-3 sm:px-6 sm:py-3 md:px-7 md:py-3 lg:px-8 lg:py-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 sm:h-6 sm:w-6 lg:h-7 lg:w-7">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
            </div>
            <span className="text-sm font-semibold sm:text-base lg:text-lg">{step.buttonText}</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
