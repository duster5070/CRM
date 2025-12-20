"use server";

import { db } from "@/prisma/db";
import { CommentProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createComment(data: CommentProps) {
  try {
    const newComment = await db.projectComment.create({
      data,
    });
    // console.log(newCategory);
    revalidatePath("/dashboard/projects");
    return newComment;
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
export async function updateCommentById(id: string, data: CommentProps) {
  try {
    const updatedComment = await db.projectComment.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/projects");
    return updatedComment;
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
export async function deleteCategory(id: string) {
  try {
    const deletedCategory = await db.category.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
      data: deletedCategory,
    };
  } catch (error) {
    console.log(error);
  }
}
