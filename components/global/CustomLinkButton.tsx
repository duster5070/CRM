"use client";
import React from "react";
import { Button } from "@/components/ui/moving-border";
import Link from "next/link";
type CustomLinkButton = {
  href: string;
  title: string;
};
export function CustomLinkButton({ href, title }: CustomLinkButton) {
  return (
    <div>
      <Button
        borderRadius="1.75rem"
        className="border-neutral-200 bg-white px-6 text-black dark:border-slate-800 dark:bg-slate-900 dark:text-white"
      >
        <Link href={href}>{title}</Link>
      </Button>
    </div>
  );
}
