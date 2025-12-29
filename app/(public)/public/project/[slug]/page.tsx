import { getProjectDetailsBySlug } from "@/actions/projects";
import PublicProjectDetailPage from "@/components/Projects/PublicProjectDetailPage";
import { notFound } from "next/navigation";
import React from "react";

export default async function ProjectDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const projectData = await getProjectDetailsBySlug(slug);

  if (!projectData) {
    notFound();
  }

  return <PublicProjectDetailPage projectData={projectData} />;
}
