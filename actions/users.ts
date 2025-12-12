"use server";

import axios from "axios";
import { db } from "@/prisma/db";
import { UserProps } from "@/types/types";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
export async function createUser(data: UserProps) {
  const { email, password, firstName, lastName, name, phone, image } = data;
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
      },
    });
    // revalidatePath("/dashboard/users");
    // console.log(newUser);
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
export async function getKitUsers() {
  if (!process.env.KIT_API_ENDPOINT) {
    console.error("KIT_API_ENDPOINT is not defined");
    return null;
  }
  const endpoint = process.env.KIT_API_ENDPOINT as string;
  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 0 }, // Revalidate immediately
    });
    const response = await res.json();
    const data = response.data;
    return data as KitResponseData;
  } catch (error) {
    console.error("Error fetching the count:", error);
    return null;
  }
}
