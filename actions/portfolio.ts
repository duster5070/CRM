"use server";

import { db } from "@/prisma/db";
import { PortfolioProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createPortfolioProfile(data: PortfolioProps) {
  try {
    const newPortfolio = await db.portfolioProfile.create({ data });
    // FIX: Revalidate the current module page, not the dashboard
    revalidatePath("/portfolio");
    return { ok: true, data: newPortfolio }; // FIX: Return consistent object
  } catch (error) {
    console.log(error);
    return { ok: false, error };
  }
}
export async function updatePortfolioById(id: string, data: PortfolioProps) {
  try {
    const updatedPortfolio = await db.portfolioProfile.update({
      where: { id },
      data,
    });
    // FIX: Revalidate the current module page
    revalidatePath("/portfolio");
    return { ok: true, data: updatedPortfolio }; // FIX: Return consistent object
  } catch (error) {
    console.log(error);
    return { ok: false, error };
  }
}
export async function getPortfolioByUserId(userId: string) {
  try {
    const data = await db.portfolioProfile.findUnique({
      where: { userId },
    });
    return data; // FIX: Return consistent object
  } catch (error) {
    console.log(error);
  }
}
