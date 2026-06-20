import { db } from "@/prisma/db";
import { User, UserRole } from "@prisma/client";

export async function getUserClients(ownerId: string): Promise<User[]> {
  // Ensure ownerId is a valid 24-character hex MongoDB ObjectId
  if (!ownerId || ownerId.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(ownerId)) {
    return [];
  }

  return db.user.findMany({
    where: {
      role: "CLIENT",
      userId: ownerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getRecentUserClients(ownerId: string): Promise<User[]> {
  // Ensure ownerId is a valid 24-character hex MongoDB ObjectId
  if (!ownerId || ownerId.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(ownerId)) {
    return [];
  }

  return db.user.findMany({
    where: {
      role: "CLIENT",
      userId: ownerId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });
}

