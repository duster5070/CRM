import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Project, User } from "@prisma/client";
import Link from "next/link";
import { getInitials } from "@/lib/generateInitials";
import { analyticsProps } from "@/types/types";
import { OverviewCard } from "./OverViewCard";

export function Dashboard01({
  projects,
  clients,
  analytics,
}: {
  projects: Project[];
  clients: User[];
  analytics: analyticsProps[];
}) {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}

      <div className="flex items-center justify-center gap-4">
        {analytics.length === 0 ? (
          <p className="px-2 text-sm text-muted-foreground">
            No analytics found.
          </p>
        ) : (
          analytics.map((analytic) => (
            <OverviewCard key={analytic.title} {...analytic} /> //key to be changed
          ))
        )}
      </div>

      {/* Recent Sales Table here */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Recent Projects */}
        {projects.length > 0 && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <p className="text-sm text-muted-foreground">
                These are your recent projects
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-[1fr_140px] px-2 text-sm text-muted-foreground">
                <span>Name</span>
                <span />
              </div>

              {projects.length === 0 ? (
                <p className="px-2 text-sm text-muted-foreground">
                  No projects found.
                </p>
              ) : (
                projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between px-2 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={project.thumbnail ?? ""}
                        alt={project.name ?? ""}
                        width={48}
                        height={48}
                        className="rounded-md border"
                      />
                      <span className="font-medium">{project.name}</span>
                    </div>

                    <Button asChild>
                      <Link href={`/project/${project.slug}`}>View</Link>
                    </Button>
                  </div>
                ))
              )}

              <p className="text-sm text-muted-foreground">
                Showing {projects.length} projects
              </p>
            </CardContent>
          </Card>
        )}

        {/* Recent Clients */}
        {clients.length > 0 && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Recent Clients</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {clients.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No clients found.
                </p>
              ) : (
                clients.map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>
                          {getInitials(client.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="text-sm font-medium leading-none">
                          {client.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {client.email}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-medium">{client.location}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
