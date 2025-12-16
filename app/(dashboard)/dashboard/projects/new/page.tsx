import { getUserClients } from "@/actions/clients";
import ProjectForm from "@/components/Forms/ProjectForm";
import { authOptions } from "@/config/auth";
import { getAuthUser } from "@/config/useAuth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
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
      <ProjectForm clients={userClients} userId={userId}/>
    </div>
  );
}
