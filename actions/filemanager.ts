import { File } from './../node_modules/.prisma/client/index.d';
"use server";

import { db } from "@/prisma/db";
import { FileProps, FolderProps, TaskProps, UserFolder } from "@/types/types";
import { TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

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
export async function createFile(data: {
  name: string;
  type: string;
  size: number;
  url: string;
  folderId: string;
  userId: string;
  key: string;
}) {
  try {
    console.log("createFile received data:", data);

    // Validate required fields
    if (!data.name || !data.folderId || !data.userId ) {
      throw new Error("Missing required fields");
    }

    const newFile = await db.file.create({ 
      data: {
        name: data.name,
        type: data.type,
        size: data.size,
        url: data.url,
        key: data.key, // Include if you have this field
        folderId: data.folderId,
        userId: data.userId,
      }
    });
   
    console.log("File created:", newFile);
    revalidatePath("/dashboard/file-manager");
    
    return { ok: true, data: newFile };
  } catch (error) {
    console.error("Error creating file:", error);
    return { 
      ok: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
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
export async function updateFileById(
  id: string,
  data: { name: string }
) {

  const updated = await db.file.update({
    where: { id },
    data: { name: data.name }, 
  })

  revalidatePath("/dashboard/file-manager")
  return { ok: true, data: updated }
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
    console.log("SERVER: Targeted folder ID:", id);

   
    const files = await db.file.findMany({
      where: { folderId: id },
    });

   
    if (files.length > 0) {
      await utapi.deleteFiles(files.map((file) => file.key));
    }

  
    await db.file.deleteMany({
      where: { folderId: id },
    });


    const deletedFolder = await db.folder.delete({
      where: { id },
    });

 
    revalidatePath("/project/file-manager");

    return {
      ok: true,
      data: deletedFolder,
    };
  } catch (error) {
    console.error("SERVER: Error during folder deletion:", error);
    return {
      ok: false,
      data: null,
    };
  }
}



const utapi = new UTApi(); // Initialize UploadThing API client
export async function deleteFile(id: string) {
  try {
    console.log("SERVER: Targeted file ID:", id);

  
    const file = await db.file.findUnique({
      where: { id },
    });

    if (!file) {
      throw new Error("File not found");
    }

  
    await utapi.deleteFiles(file.key);

  
    const deletedFile = await db.file.delete({
      where: { id },
    });


    revalidatePath("/project/file-manager");

    return {
      ok: true,
      data: deletedFile,
    };
  } catch (error) {
    console.error("SERVER: Error during deletion:", error);
    return {
      ok: false,
      data: null,
    };
  }
}
