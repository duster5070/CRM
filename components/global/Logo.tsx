import Link from "next/link";
import React from "react";

export default function Logo({
  variant = "light",
  size = "md",
}: {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}) {
  if (variant === "light") {
    return (
      <Link href={"/#home"} className="flex items-center space-x-2">
          <img
            src="/Logo.svg"
            alt="CRM Logo"
            className="h-8 inline-block mr-2"
          />
      </Link>
    );
  } else {
    return (
      <Link href={"/#home"} className="flex items-center space-x-2">
          <img
            src="/Logo-Dark.svg"
            alt="CRM Logo"
            className="h-8 inline-block mr-2"
          />
      </Link>
    );
  }
}
