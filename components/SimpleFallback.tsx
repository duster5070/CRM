"use client";
import Lottie from "lottie-react";
import React from "react";
import LoaderAnimation from "../public/loader.json";
export default function SimpleFallback() {
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-[200px]">
          <Lottie animationData={LoaderAnimation} />
        </div>
        <div className="pt-4">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    </div>
  );
}
