'use client';

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

export default function StackedCard({ index, step, onDragEnd, isDraggable, onDragStart }: StackedCardProps) {
    const scale = 1 - (index * 0.05);
    const opacity = index === 0 ? 1 : 0.4;
    const translateY = index * 15; // Reduced for smaller screens
    const translateX = index * 10; // Reduced for smaller screens

    const shadowFilters: Record<string, string> = {
        'One': 'drop-shadow(0 2px 4.5px rgba(1, 87, 155, 0.58))',
        'Two': 'drop-shadow(0 2px 4.5px rgba(13, 166, 31, 0.58))',
        'Three': 'drop-shadow(0 2px 4.5px rgba(174, 37, 37, 0.58))',
    };

    const textColors: Record<string, string> = {
        'One': '#01579B',
        'Two': '#0DA61F',
        'Three': '#AE2525',
    };

    const shadowFilter = shadowFilters[step.number] || shadowFilters['One'];
    const textColor = textColors[step.number] || textColors['One'];

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
                className="relative bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between border border-primary cursor-grab active:cursor-grabbing w-[280px] h-[360px] sm:w-[320px] sm:h-[420px] md:w-[400px] md:h-[520px] lg:w-[490px] lg:h-[636px]"
                whileDrag={{ cursor: 'grabbing' }}
            >
                <div className="text-center">
                    <h3
                        className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold"
                        style={{
                            color: textColor,
                            filter: shadowFilter,
                        }}
                    >
                        {step.number}
                    </h3>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                    <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center">{step.title}</h4>
                    {step.number === 'Two' ? (
                        <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gray-600" />
                    ) : (
                        <FolderMinus className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gray-600" />
                    )}
                </div>

                <div className="flex justify-center">
                    <button className="bg-gray-800 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-7 md:py-3 lg:px-8 lg:py-4 rounded-xl flex items-center gap-2 sm:gap-3 shadow-lg hover:bg-gray-700 transition-colors">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full bg-white/20 flex items-center justify-center">
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                        </div>
                        <span className="font-semibold text-sm sm:text-base lg:text-lg">{step.buttonText}</span>
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

