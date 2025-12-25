"use server";

import { SubscriberProps } from "@/components/Forms/SubscribeForm";
import { db } from "@/prisma/db";
import { PortfolioProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createSubscription(data: SubscriberProps) {
  const userId = data.userId;
  if (userId) {
    try {
      const subscriber = await db.subscriber.create({ data });
      // FIX: Revalidate the current module page, not the dashboard
      revalidatePath("/dashboard/subscribers");
      return subscriber; // FIX: Return consistent object
    } catch (error) {
      console.log(error);
      return { ok: false, error };
    }
  }
}
export async function getUserSubscribers(userId: string) {
  try {
    const data = await db.subscriber.findMany({
      where: { userId },
    });
    return data; // FIX: Return consistent object
  } catch (error) {
    console.log(error);
  }
}
