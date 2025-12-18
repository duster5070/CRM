"use server";

import axios from "axios";
import { db } from "@/prisma/db";
import { UserProps } from "@/types/types";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";
export async function createUser(data: UserProps) {
  const { email,
          password,
          firstName,
          lastName,
          name,
          phone,
          image,
          role,
          country,
          location,
          userId,
          companyName,
          companyDescription
    } = data;
  try {
    // Hash the PAASWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return {
        error: `Email already exists`,
        status: 409,
        data: null,
      };
    }
    
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        name,
        phone,
        image,
        role:role ?? UserRole.CLIENT,
        country,
        location,
        userId,
        companyName,
        companyDescription 
      },
    });
    revalidatePath("/dashboard/clients");
    revalidatePath("/dashboard/users");
    console.log("this is the new user",newUser);
    return {
      error: null,
      status: 200,
      data: newUser,
    };
  } catch (error) {
    console.log(error);
    return {
      error: `Something Went wrong, Please try again`,
      status: 500,
      data: null,
    };
  }
}
export type KitResponseData = { fkUsers: number; hsaUsers: number };



export async function deleteUser(id: string) {
  try {
    const deletedUser = await db.user.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
      data: deletedUser,
    };
  } catch (error) {
    console.log(error);
  }
}


export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserById(id: string, data: UserProps) {
  try {
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data,
    });

    revalidatePath("/dashboard/clients");

    revalidatePath("/dashboard/users");

    return updatedUser;
  } catch (error) {
    console.log(error);
  }


}




