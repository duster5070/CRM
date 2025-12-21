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
export async function getAllCategories() {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
    return null;
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
export async function getCategoryById(id: string) {
  try {
    const category = await db.category.findUnique({
      where: {
        id,
      },
    });
    return category;
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
