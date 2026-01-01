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
    const translateY = index * 30;
    const translateX = index * 20;

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
            dragConstraints={{ left: -200, right: 200, top: -200, bottom: 400 }}
            dragElastic={0.2}
            onDragStart={onDragStart}
            onDragEnd={(event, info) => {
                const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
                if (distance > 150) {
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
                className="relative bg-white rounded-2xl shadow-2xl p-10 flex flex-col justify-between border border-primary cursor-grab active:cursor-grabbing"
                style={{ width: '490px', height: '636px' }}
                whileDrag={{ cursor: 'grabbing' }}
            >
                <div className="text-center">
                    <h3
                        className="text-5xl font-bold"
                        style={{
                            color: textColor,
                            filter: shadowFilter,
                        }}
                    >
                        {step.number}
                    </h3>
                </div>

                <div className="flex items-center justify-center gap-3">
                    <h4 className="text-4xl font-bold text-gray-800">{step.title}</h4>
                    {step.number === 'Two' ? (
                        <Users className="w-8 h-8 text-gray-600" />
                    ) : (
                        <FolderMinus className="w-8 h-8 text-gray-600" />
                    )}
                </div>

                <div className="flex justify-center">
                    <button className="bg-gray-800 text-white px-8 py-4 rounded-xl flex items-center gap-3 shadow-lg hover:bg-gray-700 transition-colors">
                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                            <Plus className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-lg">{step.buttonText}</span>
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

