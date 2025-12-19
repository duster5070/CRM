import { db } from "@/prisma/db";
import { User, UserRole } from "@prisma/client";


export async function getUserClients(
  ownerId: string
): Promise<User[]> {
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


