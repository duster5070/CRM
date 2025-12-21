import { db } from "@/prisma/db";

export async function getProjectModules(projectId: string | undefined) {
    if (projectId) {
        try {
            const modules = await db.module.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
                where: {
                    projectId
                },
                include: {
                    tasks: true
                },
            });
            return modules
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export async function getModuleById(id: string) {
    try {
        const module = await db.module.findUnique({
            where: {
                id,
            },
        });
        return module;
    } catch (error) {
        console.log(error);
    }
}