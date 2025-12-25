import { getPortfolioByUserId } from "@/actions/portfolio";
import { getUserPublicProjects } from "@/actions/projects";
import Portfolio from "@/components/PortfolioPage";
import { getAuthUser } from "@/config/useAuth";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const id = Array.isArray(sp.id) ? sp.id[0] : sp.id;
  if (!id) {
    return notFound();
  }
  const projects = (await getUserPublicProjects(id)) || [];
  const profile = await getPortfolioByUserId(id);
  if (!profile) {
    return notFound();
  }
  return (
    <div>
      <Portfolio profile={profile} projects={projects} />
    </div>
  );
}
