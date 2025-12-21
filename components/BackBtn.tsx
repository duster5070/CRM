import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackBtn({ title = "Back" }: { title?: string }) {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      asChild
      variant="outline"
      className="mb-4"
    >
      <ChevronLeft className="mr-2 h-4 w-4" />
      {title}
    </Button>
  );
}
