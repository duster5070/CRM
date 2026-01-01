'use client';
import React from 'react'
import { motion, useScroll, MotionValue, useTransform } from 'framer-motion'

export default function StickyScreens({ i, src, name, id, range, target, progress }: { i: number, src: string, name: string, id: string, range: number[], target: number, progress: MotionValue<number> }) {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(progress, range, [1, target]);
    return (
        <div id={id} className='container mx-auto px-4 h-[100vh] flex items-center justify-center sticky top-[20vh]'>
            <div className={`relative overflow-hidden`} style={{ top: `calc(-10% + ${i * 25}px)` }} >
                <motion.img src={src} alt={name} className='w-full h-auto' style={{ scale }} />
            </div>
        </div>
    )
}