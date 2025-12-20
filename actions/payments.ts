"use server";

import { generateInvoiceNumber } from "@/lib/genrateinvoiveNum";
import { db } from "@/prisma/db";
import { PaymentProps } from "@/types/types";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

// CREATE
export async function createPayment(data: PaymentProps) {
  try {
    const payment = await db.payment.create({
    data: {
      ...data,
      invoiceNumber: generateInvoiceNumber(),
    }
    });

    revalidatePath("/dashboard/projects");
    return payment;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// READ ALL
export async function getAllPayments() {
  try {
    const payments = await db.payment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return payments;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// READ ONE
export async function getPaymentById(id: string) {
  try {
    return await db.payment.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

// UPDATE
export async function updatePaymentById(
  id: string,
  data: Prisma.PaymentUncheckedUpdateInput
) {
  try {
    const updatedPayment = await db.payment.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard/projects");
    return updatedPayment;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// DELETE
export async function deletePayment(id: string) {
  try {
    const deletedPayment = await db.payment.delete({
      where: { id },
    });

    revalidatePath("/dashboard/projects");

    return {
      ok: true,
      data: deletedPayment,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error,
    };
  }
}
