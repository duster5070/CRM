"use client";

import dynamic from "next/dynamic";
import LoaderAnimation from "@/public/loader.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-800">
      <div className="w-[200px]">
        <Lottie animationData={LoaderAnimation} loop />
      </div>
      <p className="text-muted-foreground text-sm mt-4 dark:text-gray-200">Loading...</p>
    </div>
  );
}
