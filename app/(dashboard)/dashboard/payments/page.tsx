import { getDetailedUserProjects } from "@/actions/projects";
import NotFound from "@/app/not-found";
import PaymentsPage from "@/components/dashboard/PaymentsPage";
import { getAuthUser } from "@/config/useAuth";

export default async function Page() {
  const user = await getAuthUser();

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Please sign in to view your payments.
      </div>
    );
  }

  const userProjects = await getDetailedUserProjects(user.id);

  if (!userProjects || userProjects.length === 0) {
    return (
     <NotFound/>
    );
  }

  return <PaymentsPage userProjects={userProjects??[]} />;
}
