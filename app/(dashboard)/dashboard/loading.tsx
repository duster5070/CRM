"use client";

import dynamic from "next/dynamic";
import LoaderAnimation from "@/public/loader.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-gray-800">
      <div className="w-[200px]">
        <Lottie animationData={LoaderAnimation} loop />
      </div>
      <p className="mt-4 text-sm text-muted-foreground dark:text-gray-200">Loading...</p>
    </div>
  );
}
