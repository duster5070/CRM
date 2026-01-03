"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";

export default function LogoBig({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const variant = mounted && resolvedTheme === "dark" ? "dark" : "light";

  if (variant === "light") {
    return (
      <Link href={"/#home"} className="flex items-center space-x-2">
        <img src="/Logo-bigger.svg" alt="CRM Logo" className="mr-2 inline-block" />
      </Link>
    );
  } else {
    return (
      <Link href={"/#home"} className="flex items-center space-x-2">
        <img src="/Logo-bigger-Dark.svg" alt="CRM Logo" className="mr-2 inline-block" />
      </Link>
    );
  }
}
