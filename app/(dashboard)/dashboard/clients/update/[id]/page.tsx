import { getCategoryById } from "@/actions/categories";
import { getUserById } from "@/actions/users";
import CategoryForm from "@/components/Forms/CategoryForm";
import ClientForm from "@/components/Forms/ClientForm";
import React from "react";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const user = await getUserById(id);
  return (
    <div className="p-8">
      <ClientForm initialData={user} editingId={id} />
    </div>
  );
}
