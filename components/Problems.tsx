"use client";

import React, { useState } from "react";
import * as LucideIcons from "lucide-react";
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

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

// Most important problems to show on mobile (top 6)
const topProblems = [0, 2, 5, 7, 13, 16]; // Indices of most impactful problems

export default function Problems() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section
      id="problems"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-2 md:px-4 lg:px-6">
        {/* Mobile Layout - Simplified List */}
        <div className="md:hidden">
          <h2 className="text-3xl sm:text-4xl text-primary text-center mb-6 font-bold">
            A lot of Problems
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            {problemData.length} common challenges agencies face
          </p>

          {/* Top Problems - Always Visible */}
          <div className="space-y-3 mb-4">
            {topProblems.map((index) => {
              const p = problemData[index];
              return (
                <ProblemCell
                  key={index}
                  iconName={p.iconName}
                  title={p.title}
                  isMobile
                  isCompact
                />
              );
            })}
          </div>

          {/* Show More/Less Toggle */}
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full flex items-center justify-center gap-2 py-3 text-primary font-medium text-sm hover:text-secondaryBlue transition-colors"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp size={18} />
              </>
            ) : (
              <>
                Show {problemData.length - topProblems.length} More Problems{" "}
                <ChevronDown size={18} />
              </>
            )}
          </button>

          {/* Additional Problems - Collapsible */}
          {showAll && (
            <div className="space-y-3 mt-4 transition-all duration-300">
              {problemData
                .map((p, i) => ({ ...p, index: i }))
                .filter((_, i) => !topProblems.includes(i))
                .map((p) => (
                  <ProblemCell
                    key={p.index}
                    iconName={p.iconName}
                    title={p.title}
                    isMobile
                    isCompact
                  />
                ))}
            </div>
          )}
        </div>

        {/* Desktop Layout - Original Complex Grid */}
        <div className="hidden md:block relative">
          <div className="relative grid grid-cols-[0.3fr_repeat(7,1fr)_0.3fr] md:grid-cols-[0.5fr_repeat(7,1fr)_0.5fr] lg:grid-cols-[0.5fr_repeat(7,1fr)_0.5fr]">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={`r0-${i}`}
                className={`border-b border-gray-200 min-h-[80px] md:min-h-[100px] ${i !== 8 ? "border-r" : ""}`}
              />
            ))}

            <div className="border-b border-r border-gray-200" />
            {problemData.slice(0, 7).map((p, i) => (
              <ProblemCell key={i} iconName={p.iconName} title={p.title} />
            ))}
            <div className="border-b border-gray-200" />

            <div className="border-b border-r border-gray-200" />
            <ProblemCell
              iconName={problemData[7].iconName}
              title={problemData[7].title}
            />
            <div className="col-span-5 row-span-2 flex items-center justify-center border-b border-r border-gray-200 bg-background relative z-0">
              <h2 className="text-4xl md:text-6xl lg:text-8xl xl:text-[6.5rem] text-primary text-center px-2 md:px-4">
                A lot of Problems
              </h2>
            </div>
            <ProblemCell
              iconName={problemData[16].iconName}
              title={problemData[16].title}
            />
            <div className="border-b border-gray-200" />

            <div className="border-b border-r border-gray-200" />
            <ProblemCell
              iconName={problemData[8].iconName}
              title={problemData[8].title}
            />
            <ProblemCell
              iconName={problemData[17].iconName}
              title={problemData[17].title}
            />
            <div className="border-b border-gray-200" />

            <div className="border-b border-r border-gray-200" />
            {problemData.slice(9, 16).map((p, i) => (
              <ProblemCell key={i} iconName={p.iconName} title={p.title} />
            ))}
            <div className="border-b border-gray-200" />

            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={`r5-${i}`}
                className={`min-h-[80px] md:min-h-[100px] ${i !== 8 ? "border-r border-gray-200" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemCell({
  iconName,
  title,
  noBorderRight,
  isMobile = false,
  isCompact = false,
}: {
  iconName: string;
  title: string;
  noBorderRight?: boolean;
  isMobile?: boolean;
  isCompact?: boolean;
}) {
  // @ts-ignore
  const Icon = LucideIcons[iconName] || AlertCircle;

  if (!Icon) return null;

  if (isMobile && isCompact) {
    return (
      <div className="group relative flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 transition-all duration-300 hover:border-secondaryBlue hover:shadow-sm active:scale-[0.98]">
        <div className="flex-shrink-0 text-gray-400 group-hover:text-secondaryBlue transition-colors">
          <Icon size={24} strokeWidth={1.2} />
        </div>
        <p className="text-sm font-medium text-gray-600 group-hover:text-secondaryBlue transition-colors flex-1 text-left">
          {title}
        </p>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="group relative flex flex-col items-center justify-center p-3 sm:p-4 bg-white rounded-lg border border-gray-200 min-h-[120px] sm:min-h-[140px] transition-all duration-300 hover:border-secondaryBlue hover:shadow-md">
        <div className="mb-2 sm:mb-3 text-gray-400 group-hover:text-secondaryBlue transition-colors">
          <Icon size={28} strokeWidth={1.2} className="sm:w-8 sm:h-8" />
        </div>
        <p className="text-xs sm:text-sm font-medium text-gray-500 text-center leading-tight transition-colors group-hover:text-secondaryBlue">
          {title}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`group relative flex flex-col items-center justify-center p-3 md:p-6 border-b border-gray-200 min-h-[150px] md:min-h-[200px] bg-background transition-all duration-300 hover:z-20 ${!noBorderRight ? "border-r" : ""}`}
    >
      <div className="absolute inset-0 bg-background opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-1" />

      <div className="absolute inset-[-1px] border-2 border-transparent group-hover:border-secondaryBlue transition-colors duration-300 pointer-events-none z-10" />

      <div className="mb-2 md:mb-4 text-gray-400 group-hover:text-secondaryBlue transition-colors relative z-0">
        <Icon size={36} strokeWidth={1.2} />
      </div>
      <p className="text-sm md:text-base font-medium text-gray-500 text-center leading-tight transition-colors group-hover:text-secondaryBlue relative z-0 px-1">
        {title}
      </p>
    </div>
  );
}
