"use server";

import { db } from "@/prisma/db";
import { ModuleProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createModule(data: ModuleProps) {
  try {
    const newModule = await db.module.create({
      data,
    });
    // console.log(newCategory);
    revalidatePath("/dashboard/projects");
    return newModule;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProjectModules(projectId: string | undefined) {
  if (projectId) {
    try {
      const modules = await db.module.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          projectId
        },
        include: {
          tasks: true
        },
      });
      return modules
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export async function getModuleById(id: string) {
  try {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module = await db.module.findUnique({
      where: {
        id,
      },
    });
    return module;
  } catch (error) {
    console.log(error);
  }
}

export async function updateModuleById(id: string, data: ModuleProps) {
  try {
    const updatedModule = await db.module.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/projects");
    return updatedModule;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteModule(id: string) {
  try {
    const deletedModule = await db.module.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/projects");

    return {
      ok: true,
      data: deletedModule,
    };
  } catch (error) {
    return {
      ok: false,
      data: null,
    };
  }
}
