"use server";

import { CategoryProps } from "@/types/types";
import axios from "axios";
import { db } from "@/prisma/db";
import { UserProps } from "@/types/types";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";

export async function getClients(): Promise<User[]>  {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      // where:{
      //   role:"CLIENT"
      // }
    });
    return users;
  } catch (error) {
    console.log(error);
    return [];
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


