"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "@/app/partical-assemble.css";

interface ParticleAssembleProps {
    children: React.ReactNode;
    width?: number;
    height?: number;
    particleCount?: number;
    duration?: number;
    delay?: number;
}

export default function ParticleAssemble({
    children,
    width = 320,
    height = 44,
    particleCount = 300,
    duration = 0.8,
    delay = 200,
}: ParticleAssembleProps) {
    const [phase, setPhase] = useState<"scattered" | "assembled">("scattered");

    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        const result = [];
        const centerX = width / 2;
        const pillRadius = height / 2;

        for (let i = 0; i < particleCount; i++) {
            // Final position in pill shape
            let finalX = Math.random() * width;
            let finalY = Math.random() * height;

            // Constrain to pill shape
            if (finalX < pillRadius) {
                const angle = Math.random() * Math.PI - Math.PI / 2;
                const r = Math.random() * pillRadius;
                finalX = pillRadius + Math.cos(angle) * r - pillRadius;
                finalY = height / 2 + Math.sin(angle) * r;
            } else if (finalX > width - pillRadius) {
                const angle = Math.random() * Math.PI + Math.PI / 2;
                const r = Math.random() * pillRadius;
                finalX = width - pillRadius + Math.cos(angle) * r + pillRadius;
                finalY = height / 2 + Math.sin(angle) * r;
            }

            // Start scattered - horizontal spread
            const spreadX = (Math.random() - 0.5) * 600;
            const spreadY = (Math.random() - 0.5) * 60;

            // Stagger delay based on distance
            const staggerDelay = Math.abs(spreadX) / 1000;

            result.push({
                id: i,
                finalX,
                finalY,
                spreadX,
                spreadY,
                size: 2 + Math.random() * 2,
                opacity: 0.5 + Math.random() * 0.4,
                delay: staggerDelay,
            });
        }
        setParticles(result);
    }, [width, height, particleCount]);

    useEffect(() => {
        const timer = setTimeout(() => setPhase("assembled"), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div className="particle-container" style={{ width, height }}>
            {/* Particles */}
            <div
                className="particles-wrapper"
                style={{
                    opacity: phase === "assembled" ? 0 : 1,
                    transition: `opacity 0.3s ease ${duration + 0.2}s`,
                }}
            >
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="particle"
                        style={{
                            "--final-x": `${p.finalX}px`,
                            "--final-y": `${p.finalY}px`,
                            "--spread-x": `${p.spreadX}px`,
                            "--spread-y": `${p.spreadY}px`,
                            "--size": `${p.size}px`,
                            "--opacity": p.opacity,
                            "--delay": `${p.delay}s`,
                            "--duration": `${duration}s`,
                            animationPlayState: phase === "assembled" ? "running" : "paused",
                        } as React.CSSProperties}
                    />
                ))}
            </div>

            {/* Content */}
            <motion.div
                className="content-wrapper"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{
                    opacity: phase === "assembled" ? 1 : 0,
                    scale: phase === "assembled" ? 1 : 0.97,
                }}
                transition={{ duration: 0.25, delay: duration + 0.1 }}
            >
                {children}
            </motion.div>
        </div>
    );
}