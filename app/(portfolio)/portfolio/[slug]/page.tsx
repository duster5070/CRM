import { getPortfolioByUserId } from "@/actions/portfolio";
import { getUserPublicFeaturedProjects, getUserPublicOtherProjects } from "@/actions/projects";
import Portfolio from "@/components/PortfolioPage";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const id = Array.isArray(sp.id) ? sp.id[0] : sp.id;
  if (!id) {
    return notFound();
  }
  const featured = (await getUserPublicFeaturedProjects(id)) || [];
  const otherProjects = (await getUserPublicOtherProjects(id)) || [];
  const profile = await getPortfolioByUserId(id);
  if (!profile) {
    return notFound();
  }
  return (
    <div>
      {profile && profile.id && (
        <Portfolio profile={profile} projects={featured} otherProjects={otherProjects} />
      )}
    </div>
  );
}
