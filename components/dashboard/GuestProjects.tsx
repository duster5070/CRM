import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { GuestProject } from "@prisma/client";

export default function GuestProjects({
  projects,
  isOwner = false,
}: {
  projects: GuestProject[];
  isOwner?: boolean;
}) {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>{isOwner ? "Members" : "Guest Projects"}</CardTitle>
          <CardDescription>
            {isOwner
              ? "These are the members you have invited to collaborate on your projects"
              : "These are Project you have been invited to collaborate on"}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                {isOwner ? "Member Name" : "Project Details"}
              </TableHead>
              <TableHead className="text-right">Project Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => {
              const link = project.projectLink.split("=")[1];
              return (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="font-medium">
                      {isOwner ? project.guestName : project.projectName}
                    </div>
                    {isOwner ? (
                      <div className="text-sm text-muted-foreground">
                        Member: {project.guestName}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        From: {project.projectOwner}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" className="ml-auto gap-1">
                      <Link href={link}>
                        View Project
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
