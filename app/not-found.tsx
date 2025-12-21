import { ArrowLeft, Briefcase, Home, Settings, Users } from "lucide-react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function NotFound() {
  // const router = useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
          <p className="mt-2 text-4xl font-bold text-gray-900 tracking-tight">Page not found</p>
          <p className="mt-4 text-lg text-gray-600">Oops! It seems you've ventured into uncharted territory.</p>
        </div>

        <div className="mt-8 space-y-4">
          <p className="text-md text-gray-600">Here are some helpful links to get you back on track:</p>
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

        <div className="mt-8">
          <Button /*onClick={() => router.back()}*/ className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </div>
    </div>
  )
}