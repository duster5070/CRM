import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";

type FeatureCardProps = {
  title: string;
  features: string[];
  className?: string;
};
export default function FeaturesCard({ title, features, className }: FeatureCardProps) {
  return (
    <div className={cn("space-y-3 rounded-md border p-12", className)}>
      <h2 className="pb-3 text-left text-xl font-bold">{title}</h2>
      {features.map((item, i) => {
        return (
          <div key={i} className="flex items-center">
            <X className="mr-2 h-4 w-4 flex-shrink-0" />
            <span>{item}</span>
          </div>
        );
      })}
    </div>
  );
}
