import React from "react";
import { columns } from "./columns";
import { User } from "@prisma/client";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "../../../../components/dashboard/Tables/TableHeader";
import { getAuthUser } from "@/config/useAuth";
import { getUserClients } from "@/actions/clients";
export default async function page() {
  const user = await getAuthUser();
  console.log("my user is"+user)
  const clients: User[] = user?.id ? await getUserClients(user.id) : [];
  return (
    <div className="p-8">
      <TableHeader
        title="Clients"
        linkTitle="Add Client"
        href="/dashboard/clients/new"
        data={clients}
        model="clients"
      />
      <div className="py-8">
        <DataTable data={clients} columns={columns} />
      </div>
    </div>
  );
}
