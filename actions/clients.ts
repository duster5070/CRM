"use server";

import { CategoryProps } from "@/types/types";
import axios from "axios";
import { db } from "@/prisma/db";
import { UserProps } from "@/types/types";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";

export async function getUserClients(userId:string|undefined){
   if(userId){
    try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where:{
        role:"CLIENT",
        userId
      }
   }
  );
    console.log(users)
    return users;
  } catch (error) {
    console.log(error);
    return null;
  }
  }
}





