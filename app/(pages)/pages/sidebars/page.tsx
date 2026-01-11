import SidebarV1 from "@/components/pages/SidebarV1";
import SidebarV2 from "@/components/pages/SidebarV2";
import React from "react";

export default function page() {
  return (
    <div className="grid grid-cols-12 gap-4 lg:grid-cols-4">
      <SidebarV1 />
      <SidebarV2 />
    </div>
  );
}
