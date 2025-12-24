"use server";

import { db } from "@/prisma/db";
import {
  CategoryProps,
  ProjectData,
  ProjectProps,
  ProjectWithPayments,
} from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createProject(data: ProjectProps) {
  const slug = data.slug;
  try {
    const existingProject = await db.project.findUnique({
      where: {
        slug,
      },
    });
    if (existingProject) {
      return {
        status: 409,
        error: `project  ${data.name} already exists`,
        data: null,
      };
    }
    const newProject = await db.project.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        thumbnail: data.thumbnail,
        startDate: data.startDate,
        clientId: data.clientId,
        userId: data.userId,
        budget: data.budget,
        deadline: data.deadline,
        endDate: data.endDate,
      },
    });
    // console.log(newProject);
    revalidatePath("/dashboard/projects");
    return {
      status: 200,
      error: null,
      data: newProject,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getRecentUserProjects(userId: string | undefined) {
  if (userId) {
    try {
      const projects = await db.project.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId,
        },
        take: 3,
      });

      return projects;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export async function getUserPublicProjects(userId: string | undefined) {
  if (userId) {
    try {
      const projects = await db.project.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId,
          isPublic: true,
        },
        include: {
          user: true,
        },
      });

      return projects;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export async function getUserProjects(userId: string | undefined) {
  if (userId) {
    try {
      const projects = await db.project.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId,
        },
      });

      return projects;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export async function getUserGuestProjects(userId: string | undefined) {
  if (userId) {
    try {
      const projects = await db.guestProject.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          guestId: userId,
        },
      });

      return projects;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export async function getUserMembers(userId: string | undefined) {
  if (userId) {
    try {
      const projects = await db.guestProject.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          ownerId: userId,
        },
      });

      return projects;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export async function getDetailedUserProjects(userId: string | undefined) {
  if (userId) {
    try {
      const projects = await db.project.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          status: true,
          thumbnail: true,

          payments: true,
        },
      });

      return projects;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export async function updateProjectById(id: string, data: ProjectProps) {
  try {
    const updatedProject = await db.project.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/projects");
    return updatedProject;
  } catch (error) {
    console.log(error);
  }
}
export async function getProjectById(id: string) {
  try {
    const project = await db.project.findUnique({
      where: {
        id,
      },
    });
    return project;
  } catch (error) {
    console.log(error);
  }
}

export async function getProjectDetailsBySlug(
  slug: string
): Promise<ProjectData | null> {
  console.log(`[getProjectDetailsBySlug] Fetching project with slug: ${slug}`);
  try {
    // clientId
    const project = await db.project.findUnique({
      where: {
        slug,
      },
      include: {
        modules: true,
        comments: true,
        members: true,
        invoices: true,
        payments: true,
        user: true,
      },
    });

    if (!project) {
      console.log(
        `[getProjectDetailsBySlug] Project not found for slug: ${slug}`
      );
      return null;
    }
    console.log(
      `[getProjectDetailsBySlug] Project found: ${project.name}, ClientID: ${project.clientId}`
    );

    const client = await db.user.findFirst({
      where: {
        id: project?.clientId,
        role: "CLIENT",
      },
      select: {
        id: true,
        name: true,
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        image: true,
        country: true,
        location: true,
        plain: true,
        role: true,
        companyName: true,
        companyDescription: true,
      },
    });
    if (!client) {
      console.log(
        `[getProjectDetailsBySlug] Client not found for ID: ${project.clientId}`
      );
      // throw new Error('client not found') // Don't throw, just log. The page likely needs client data though.
      // If client is mandatory, we might want to return null or partial data.
      // For now, let's see if this is the failure point.
      throw new Error("client not found");
    }
    console.log(`[getProjectDetailsBySlug] Client found: ${client.name}`);

    if (!project.name) {
      return null;
    }

    const mappedInvoices = project.invoices.map((inv: any) => ({
      ...inv,
      dueDate: inv.duedate || inv.dueDate,
    }));

    const mappedPayments = project.payments.map((pay: any) => ({
      ...pay,
      date: pay.data || pay.date, // Handle likely typo in DB 'data' vs 'date'
    }));

    return {
      ...project,
      invoices: mappedInvoices,
      payments: mappedPayments,
      notes: project.notes ?? "",
      gradient: project.gradient ?? "",
      client,
    };
  } catch (error) {
    console.error("Error fetching project details", error);
    return null;
  }
}

export async function deleteProject(id: string) {
  try {
    const deletedProject = await db.project.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
      data: deleteProject,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function updateProjectPublicity(id: string, isPublic: boolean) {
  try {
    const updatedProject = await db.project.update({
      where: {
        id,
      },
      data: {
        isPublic,
      },
    });
    revalidatePath("/dashboard/projects");
    return {
      data: updatedProject,
      ok: true,
    };
  } catch (error) {
    return {
      data: null,
      ok: true,
    };
  }
}
