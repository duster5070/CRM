"use server";

import { db } from "@/prisma/db";
import { ModuleProps, TaskProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createTask(data: TaskProps) {
  try {
    const newTask = await db.task.create({
      data,
    });
    revalidatePath("/dashboard/projects");
    return newTask;
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
          createdAt: "desc",
        },
        where: {
          projectId,
        },
        include: {
          tasks: true,
        },
      });
      return modules;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export async function getModuleById(id: string) {
  try {
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

export async function updateTaskById(id: string, data: TaskProps) {
  try {
    const updatedTask = await db.task.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/projects");
    return updatedTask;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTask(id: string) {
  try {
    const deletedTask = await db.task.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/projects");

    return {
      ok: true,
      data: deletedTask,
    };
  } catch (error) {
    return {
      ok: false,
      data: null,
    };
  }
}
