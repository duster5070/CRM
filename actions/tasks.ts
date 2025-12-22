"use server";

import { db } from "@/prisma/db";
import { ModuleProps, TaskProps } from "@/types/types";
import { TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createTask(data: TaskProps) {
  try {
    const newTask = await db.task.create({ data });
    // FIX: Revalidate the current module page, not the dashboard
    revalidatePath("/project/modules/[id]", "page");
    return { ok: true, data: newTask }; // FIX: Return consistent object
  } catch (error) {
    console.log(error);
    return { ok: false, error };
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
      where: { id },
      data,
    });
    // FIX: Revalidate the current module page
    revalidatePath("/project/modules/[id]", "page");
    return { ok: true, data: updatedTask }; // FIX: Return consistent object
  } catch (error) {
    console.log(error);
    return { ok: false, error };
  }
}
export async function updateTaskStatus(id: string, status: TaskStatus) {
  try {
    const updatedTask = await db.task.update({
      where: { id },
      data: { status },
    });
    // FIX: Even dragging needs the correct revalidation path
    revalidatePath("/project/modules/[id]", "page");
    return { ok: true, data: updatedTask };
  } catch (error) {
    console.log(error);
    return { ok: false, error };
  }
}

export async function deleteTask(id: string) {
  try {
    // This will log in your development terminal
    console.log("SERVER: --- Deleting Task Process Started ---");
    console.log("SERVER: Targeted Task ID:", id);

    const deletedTask = await db.task.delete({
      where: {
        id,
      },
    });

    console.log("SERVER: Task successfully deleted from DB:", deletedTask.title);

    revalidatePath("/project/modules/[id]", "page");

    return {
      ok: true,
      data: deletedTask,
    };
  } catch (error) {
    console.log("SERVER: Error during deletion:", error);
    return {
      ok: false,
      data: null,
    };
  }
}
