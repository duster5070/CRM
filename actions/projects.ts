"use server";

import { db } from "@/prisma/db";
import { CategoryProps, ProjectProps } from "@/types/types";
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
        status:409,
        error:`project  ${data.name} already exists`
      };
    }
    const newProject = await db.project.create({
      data:{
          name:data.name,
          slug:data.slug,
          description:data.description,
          thumbnail:data.thumbnail,
          startDate:data.startDate,
          clientId:data.clientId,
          userId:data.userId,
        },
    });
    // console.log(newProject);
    revalidatePath("/dashboard/projects");
    return newProject;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getUserProjects(userId:string | undefined) {
 if(userId){
   try {
    const projects = await db.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where:{
          userId
      }
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
    const updatedCategory = await db.category.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/projects");
    return updatedCategory;
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
export async function deleteProject(id: string) {
  try {
    const deletedCategory = await db.category.delete({
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

