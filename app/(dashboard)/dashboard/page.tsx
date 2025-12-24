import { getDashboardOverview } from "@/actions/analytics";
import { getRecentUserClients } from "@/actions/clients";
import { getRecentUserProjects } from "@/actions/projects";
import { Dashboard01 } from "@/components/dashboard/dashboard-01";
import { getAuthUser } from "@/config/useAuth";

export default async function Dashboard() {
  const user = await getAuthUser();
  const recentProjects = await getRecentUserProjects(user?.id);
  const recentClients = await getRecentUserClients(user?.id ?? "") || []
  const analytics = await getDashboardOverview(user?.id ?? "")
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Dashboard01 projects={recentProjects ?? []} clients={recentClients ?? []} analytics={analytics ?? []} />
    </main>
  );
}
