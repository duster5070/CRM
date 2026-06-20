"use server";

import { SubscriberProps } from "@/components/Forms/SubscribeForm";
import { isEmailBlackListed } from "@/lib/isEmailBlackListed";
import { db } from "@/prisma/db";
import { PortfolioProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createSubscription(data: SubscriberProps) {
  const { userId, email } = data;
  if (userId) {
    if (isEmailBlackListed(email)) {
      return {
        error: "Please use a valid, non-temporary email address.",
        status: 409,
        data: null,
      };
    }
    const existingSubscriber = await db.subscriber.findFirst({
      where: { email },
    });
    if (existingSubscriber) {
      return {
        error: "You have already subscribed.",
        status: 409,
        data: null,
      };
    }

    try {
      const subscriber = await db.subscriber.create({ data });
      // FIX: Revalidate the current module page, not the dashboard
      revalidatePath("/dashboard/subscribers");
      return {
        data: subscriber,
        status: 201,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "Something went wrong",
        status: 500,
        data: null,
      };
    }
  }
}
export async function getUserSubscribers(userId: string) {
  // Ensure userId is a valid 24-character hex MongoDB ObjectId
  if (!userId || userId.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(userId)) {
    return [];
  }

  try {
    const data = await db.subscriber.findMany({
      where: { userId },
    });
    return data; // FIX: Return consistent object
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function deleteSubscriber(id: string) {
  try {
    // This will log in your development terminal
    console.log("SERVER: --- Deleting Task Process Started ---");
    console.log("SERVER: Targeted Task ID:", id);

    const deletedSubscriber = await db.subscriber.delete({
      where: {
        id,
      },
    });

    console.log("SERVER: Subscriber successfully deleted from DB:", deletedSubscriber.email);

    revalidatePath("/dashboard/subscribers");

    return {
      ok: true,
      data: deletedSubscriber,
    };
  } catch (error) {
    console.log("SERVER: Error during deletion:", error);
    return {
      ok: false,
      data: null,
    };
  }
}
