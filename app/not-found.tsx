import { ArrowLeft, Briefcase, Home, Settings, Users } from "lucide-react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BackBtn from "@/components/BackBtn";
import { getAuthUser } from "@/config/useAuth";

export default async function NotFound() {
  const user = await getAuthUser();
  const role = user?.role;
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900">Page not found</p>
          <p className="mt-4 text-lg text-gray-600">
            Oops! It seems you've ventured into uncharted territory.
          </p>
        </div>

        {role === "USER" && (
          <div className="mt-8 space-y-4">
            <p className="text-md text-gray-600">
              Here are some helpful links to get you back on track:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/dashboard" passHref>
                <Button variant="outline" className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/projects" passHref>
                <Button variant="outline" className="w-full">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Projects
                </Button>
              </Link>
              <Link href="/dashboard/clients" passHref>
                <Button variant="outline" className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Clients
                </Button>
              </Link>
              <Link href="/dashboard/settings" passHref>
                <Button variant="outline" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8">
          <BackBtn title="Go Back" />
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            If you believe this is an error, please contact support or check the URL for mistakes.
          </p>
        </div>
      </div>
    </div>
  );
}
