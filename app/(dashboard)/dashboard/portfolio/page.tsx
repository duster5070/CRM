import { getPortfolioByUserId } from "@/actions/portfolio";
import { getUserProjectsCount } from "@/actions/projects";
import ShareLink from "@/components/dashboard/ShareLink";
import PortfolioForm from "@/components/Forms/PortfolioForm";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/config/auth";
import { getAuthUser } from "@/config/useAuth";
import { generateSlug } from "@/lib/generateSlug";
import { Copy, Eye } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);
  const user = await getAuthUser();
  const slug = generateSlug(user?.name ?? "slug");
  const count = (await getUserProjectsCount(user?.id)) ?? 0;
  const initialData = await getPortfolioByUserId(user?.id ?? "");
  const baseUrl = process.env.NEXT_PUBLEC_BASE_URL;
  const link = `${baseUrl}/portfolio/${slug}?id={user?.id}`;
  return (
    <div className="p-8">
      <div className="b flex items-center justify-between border p-3">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          Customize your Protfolio
        </h2>
        <div className="flex gap-4">
          <Button asChild>
            <Link target="_blank" href={`/portfolio/${slug}?id=${user?.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Link>
          </Button>
          <ShareLink link={link} />
        </div>
      </div>
      <div className="py-6">
        <PortfolioForm
          editingId={initialData?.id}
          initialData={initialData}
          session={session}
          count={count}
        />
      </div>
    </div>
  );
}

export default page;
