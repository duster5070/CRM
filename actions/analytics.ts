import { db } from "@/prisma/db";
import { User, UserRole } from "@prisma/client";
import { title } from "process";
import { is, tr } from "zod/v4/locales";
import { LayoutGrid, DollarSign, Users, Handshake } from "lucide-react";

export async function getDashboardOverview(userId: string) {
  if (userId) {
    try {
      const projects = await db.project.findMany({
        where: {
          userId: userId,
        },
      });
      const clients = await db.user.count({
        where: {
          // userId: userId,
          // role:UserRole.CLIENT
        },
      });

      const totalRevenue = projects.reduce((total, project) => {
        return total + Number(project?.budget);
      }, 0);
      const analytics = [
        {
          title: "Projects",
          total: projects.length.toString().padStart(2, "0"),
          href: "/dashboard/projects",
          icon: LayoutGrid,
        },
        {
          title: "total Revenue",
          total: totalRevenue.toString().padStart(2, "0"),
          href: "/dashboard/projects",
          icon: DollarSign,
          isCurrency: true,
        },
        {
          title: "Clients",
          total: clients.toString().padStart(2, "0"),
          href: "/dashboard/clients",
          icon: Handshake,
        },
      ];

      return analytics;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
