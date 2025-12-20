import { getProjectDetailsBySlug } from "@/actions/projects";
import ProjectDetailClient from "@/components/Projects/ProjectDetailClient";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const projectData = await getProjectDetailsBySlug(slug);
  console.log(`[ProjectDetailPage] Received project data for slug ${slug}:`, projectData ? "FOUND" : "NULL");
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect(
      `/login?callbackUrl=${encodeURIComponent(`/project/${slug}`)}`
    );
  }
  if (!projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">Project Not Found</h1>
      </div>
    );
  }

  return <ProjectDetailClient projectData={projectData}  session={session}/>;
}
