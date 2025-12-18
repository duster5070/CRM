"use server";

import { db } from "@/prisma/db";
import { CategoryProps, ProjectData, ProjectProps } from "@/types/types";
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
        error:`project  ${data.name} already exists`,
        data:null
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
          budget:data.budget,
          deadline:data.deadline,
          endDate:data.endDate
        },
    });
    // console.log(newProject);
    revalidatePath("/dashboard/projects");
    return {
      status:200,
      error:null,
      data:newProject
    };
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

export async function getProjectDetailsBySlug(slug: string):Promise<ProjectData|null> {
  try {
    // clientId
    const project = await db.project.findUnique({
      where: {
        slug,
      },
      include:{
        modules:true,
        comments:true,
        members:true,
        invoices:true,
        payments:true
      }
    });
    if(!project) return null

    const client = await db.user.findFirst({
      where:{
        id:project?.clientId,
        role:"CLIENT"
      },
      select:{
          id:true,
          name:true,
          firstName:true,
          lastName:true,
          phone:true,
          email:true,
          image:true,
          country:true,
          location:true,
          role:true,
          companyName:true,
          companyDescription:true
      }
    });
    if(!client)
    {
      throw new Error('client not found')
    }
    if(!project.name){
      return null
    }
    return{...project,client};
  } catch (error) {
    console.error('Error fetching project details',error);
    return null
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

