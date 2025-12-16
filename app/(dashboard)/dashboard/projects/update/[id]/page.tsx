import { getCategoryById } from "@/actions/categories";
import { getUserClients } from "@/actions/clients";
import { getProjectById } from "@/actions/projects";
import CategoryForm from "@/components/Forms/CategoryForm";
import ProjectForm from "@/components/Forms/ProjectForm";
import { getAuthUser } from "@/config/useAuth";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const project = await getProjectById(id);
  const user = await getAuthUser();
    const userId = user?.id??""
    const clients = await getUserClients(userId)
    const userClients = clients?.map((user)=>{
      return {
        label:user.name,
        value:user.id
      }
    })||[]
  return (
    <div className="p-8">
      <ProjectForm clients={userClients} userId={userId} initialData={project} editingId={id} />
    </div>
  );
}
