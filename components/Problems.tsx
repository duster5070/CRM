"use client";

import React from "react";
import * as LucideIcons from "lucide-react";
import { AlertCircle } from "lucide-react";

type IconName = keyof typeof LucideIcons;

const problemData: { iconName: string; title: string }[] = [
  // Top row
  { iconName: "Mail", title: "Lost Client Conversations" },
  { iconName: "Target", title: "No Profit Visibility" },
  { iconName: "Dizzy", title: "Projects Falling Through Cracks" },
  { iconName: "PenTool", title: "Manual Time Tracking Hell" },
  { iconName: "Ruler", title: "Scope Creep Nightmares" },
  { iconName: "CircleHelp", title: "Clients Asking 'What's the Status?'" },
  { iconName: "ThumbsDown", title: "Unprofessional Client Experience" },
  // Left middle
  { iconName: "RefreshCcw", title: "Switching Between 5+ Tools" },
  { iconName: "Target", title: "Chaotic Client Onboarding" },
  // Bottom row
  { iconName: "Search", title: "Zero Team Visibility" },
  { iconName: "Cloud", title: "Context Switching Kills Focus" },
  { iconName: "Hand", title: "Handoff Nightmares" },
  { iconName: "BarChart4", title: "Reporting Takes Forever" },
  { iconName: "Clock", title: "Missed Deadlines Kill Your Reputation" },
  { iconName: "Link", title: "Growing Pains Holding You Back" },
  { iconName: "Flame", title: "Burnout from Manual Work" },
  // Right middle
  { iconName: "CreditCard", title: "Late Invoice = Late Payment" },
  { iconName: "Theater", title: "Lost Proposals & Quotes" },
];

export default function Problems() {
  return (
    <section id="problems" className="py-24 bg-[var(--pika-background)] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative grid grid-cols-[0.5fr_repeat(7,1fr)_0.5fr] md:grid-cols-[0.5fr_repeat(7,1fr)_0.5fr] lg:grid-cols-[0.5fr_repeat(7,1fr)_0.5fr]">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={`r0-${i}`}
              className={`border-b border-gray-200 min-h-[60px] md:min-h-[100px] ${i !== 8 ? "border-r" : ""}`}
            />
          ))}

          <div className="border-b border-r border-gray-200" />
          {problemData.slice(0, 7).map((p, i) => (
            <ProblemCell key={i} iconName={p.iconName} title={p.title}/>
          ))}
          <div className="border-b border-gray-200" />

          <div className="border-b border-r border-gray-200" />
          <ProblemCell iconName={problemData[7].iconName} title={problemData[7].title}/>
          <div className="col-span-1 md:col-span-5 row-span-2 flex items-center justify-center border-b border-r border-gray-200 bg-[var(--pika-background)] relative z-0">
            <h2 className="text-[105px] text-[var(--pika-primary)] text-center px-4">
              A lot of Problems
            </h2>
          </div>
          <ProblemCell iconName={problemData[16].iconName} title={problemData[16].title}/>
          <div className="border-b border-gray-200" />

          <div className="border-b border-r border-gray-200" />
          <ProblemCell iconName={problemData[8].iconName} title={problemData[8].title}/>
          <ProblemCell iconName={problemData[17].iconName} title={problemData[17].title}/>
          <div className="border-b border-gray-200" />

          <div className="border-b border-r border-gray-200" />
          {problemData.slice(9, 16).map((p, i) => (
            <ProblemCell key={i} iconName={p.iconName} title={p.title}/>
          ))}
          <div className="border-b border-gray-200" />

          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={`r5-${i}`}
              className={`min-h-[60px] md:min-h-[100px] ${i !== 8 ? "border-r border-gray-200" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemCell({ iconName, title, noBorderRight }: { iconName: string; title: string; noBorderRight?: boolean }) {
  // @ts-ignore
  const Icon = LucideIcons[iconName] || AlertCircle;

  if (!Icon) return null;

  return (
    <div className={`group relative flex flex-col items-center justify-center p-6 border-b border-gray-200 min-h-[160px] md:min-h-[200px] bg-white transition-all duration-300 hover:z-20 ${!noBorderRight ? "border-r" : ""}`}>
      <div className="absolute inset-0 bg-background opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-1" />

      <div className="absolute inset-[-1px] border-2 border-transparent group-hover:border-[var(--pika-secondary)] transition-colors duration-300 pointer-events-none z-10" />

      <div className="mb-4 text-gray-400 group-hover:text-[var(--pika-secondary)] transition-colors relative z-0">
        <Icon size={40} strokeWidth={1.2} />
      </div>
      <p className="text-sm md:text-base font-medium text-gray-500 text-center leading-tight transition-colors group-hover:text-[var(--pika-secondary)] relative z-0">
        {title}
      </p>
    </div>
  );
}
