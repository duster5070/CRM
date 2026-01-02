"use client";

import { CreditCard } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import StackedCard, { StepCard } from "./ui/StackedCards";

const initialSteps: StepCard[] = [
  {
    id: "step1",
    number: "One",
    title: "Create Your Project",
    buttonText: "Add Project",
  },
  {
    id: "step2",
    number: "Two",
    title: "Invite Your Team",
    buttonText: "Invite Member",
  },
  {
    id: "step3",
    number: "Three",
    title: "Add Your Clients",
    buttonText: "Add Client",
  },
];

export default function HowItWorks() {
  const [steps, setSteps] = useState<StepCard[]>(initialSteps);
  const [isDragging, setIsDragging] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const handleDragEnd = useCallback(() => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      const firstCard = newSteps.shift();
      if (firstCard) {
        newSteps.push(firstCard);
      }

      return newSteps;
    });
  }, []);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!isDragging) {
      intervalRef.current = setInterval(() => {
        handleDragEnd();
      }, 2000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isDragging, handleDragEnd]);
  return (
    <section id="howItWorks" className="py-20 bg-background">
      <div className="container mx-auto text-center mb-4 sm:mb-8 md:mb-12 lg:mb-16">
        <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[105px] text-primary text-center px-4 font-bold">
          How It Works
        </h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] text-primary">
          Get Started in <span className="text-secondaryBlue">3</span>{" "}
          Simple Steps
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 py-2">
          <p className="text-lg text-gray-500">No credit card required</p>
          <CreditCard className="w-10 h-10 text-gray-500" />
          <p className="text-lg text-gray-500">Setup in 5 minutes</p>
        </div>
      </div>

      <div className="relative flex items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:w-[490px] h-auto lg:h-[636px]">
          {steps.map((step, index) => (
            <StackedCard
              key={step.id}
              index={index}
              step={step}
              onDragEnd={() => {
                handleDragEnd();
                handleDragStop();
              }}
              onDragStart={handleDragStart}
              isDraggable={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
