import { getUserGuestProjects } from "@/actions/projects";
import GuestProjects from "@/components/dashboard/GuestProjects";
import { getAuthUser } from "@/config/useAuth";
import React from "react";

export default async function page() {
  const user = await getAuthUser();
  const projects = (await getUserGuestProjects(user?.id)) || [];
  return (
    <>
      {projects.length > 0 ? (
        <div className="max-w-3xl p-8">
          <GuestProjects projects={projects} />
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center text-xl">
          <h2>You don't have any guest projects yet</h2>
        </div>
      )}
    </>
  );
}
