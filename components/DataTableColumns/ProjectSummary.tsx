import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type Project = {
  revenue?: number;
};

const ProjectSummary = ({ data }: { data: any[] }) => {
  console.log("data:", data);

  const totalRevenue = data.reduce((total, project) => {
    return total + Number(project.budget);
  }, 0);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 pt-4 sm:!py-0">
          <CardTitle>Project Summary</CardTitle>
          <CardDescription>Showing total projects and revenue</CardDescription>
        </div>

        <div className="flex">
          <button className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Total Projects</span>
            <span className="text-lg font-bold sm:text-3xl">
              {String(data.length).padStart(2, "0")}
            </span>
          </button>
        </div>

        <div className="flex">
          <button className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Total Revenue</span>
            <span className="text-lg font-bold sm:text-3xl">${totalRevenue.toLocaleString()}</span>
          </button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProjectSummary;
