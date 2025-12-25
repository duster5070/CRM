import { File } from './../node_modules/.prisma/client/index.d';
"use server";

import { db } from "@/prisma/db";
import { FileProps, FolderProps, TaskProps, UserFolder } from "@/types/types";
import { TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createFolder(data: FolderProps) {
  try {
    const newFolder = await db.folder.create({ data });
    // FIX: Revalidate the current module page, not the dashboard
    revalidatePath("/project/file-manager");
    return { ok: true, data: newFolder }; // FIX: Return consistent object
  } catch (error) {
    console.log(error);
    return { ok: false, error };
  }
}
export async function createFile(data: FileProps) {
  try {
    const newFile= await db.file.create({ data });
   
    revalidatePath("/project/file-manager");
    return { ok: true, data: newFile }; // FIX: Return consistent object
  } catch (error) {
    console.log(error);
    return { ok: false, error };
  }
}

export async function updateFolderById(id: string, data: FolderProps) {
  try {
    const updatedFolder = await db.folder.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/file-manager");
    return updatedFolder;
  } catch (error) {
    console.log(error);
  }
}
export async function updateFileById(id: string, data: FileProps) {
  try {
    const updatedFile = await db.file.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/file-manager");
    return updatedFile;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserFolders(userId: string | undefined) {
  if (userId) {
    try {
      const folders = await db.folder.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId,
        },
        include: {
        files: true,
        },
      });
      return folders as UserFolder[];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}






export async function deleteFolder(id: string) {
  try {
    // This will log in your development terminal
  
    console.log("SERVER: Targeted folder ID:", id);

    const deletedFolder = await db.folder.delete({
      where: {
        id,
      },
    });



    revalidatePath("/project/file-manager");

    return {
      ok: true,
      data: deletedFolder,
    };
  } catch (error) {
    console.log("SERVER: Error during deletion:", error);
    return {
      ok: false,
      data: null,
    };
  }
}
export async function deleteFile(id: string) {
  try {
    // This will log in your development terminal
  
    console.log("SERVER: Targeted file ID:", id);

    const deletedFile = await db.file.delete({
      where: {
        id,
      },
    });



    revalidatePath("/project/file-manager");

    return {
      ok: true,
      data: deletedFile,
    };
  } catch (error) {
    console.log("SERVER: Error during deletion:", error);
    return {
      ok: false,
      data: null,
    };
  }
}
