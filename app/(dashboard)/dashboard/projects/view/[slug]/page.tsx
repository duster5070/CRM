import { getProjectDetailsBySlug } from "@/actions/projects";
import ProjectDetailClient from "@/components/Projects/ProjectDetailClient";
import React from "react";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectData = await getProjectDetailsBySlug(slug);
  console.log(
    `[ProjectDetailPage] Received project data for slug ${slug}:`,
    projectData ? "FOUND" : "NULL"
  );

  if (!projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">Page Not Found</h1>
      </div>
    );
  }

  return <ProjectDetailClient projectData={projectData} />;
}
