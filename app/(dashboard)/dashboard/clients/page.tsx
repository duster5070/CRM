import React from "react";
import { columns } from "./columns";
import {  User } from "@prisma/client";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "../../../../components/dashboard/Tables/TableHeader";
import { getAuthUser } from "@/config/useAuth";
import { getUserClients } from "@/actions/clients";
export default async function page() {
  const user = await getAuthUser()
  const clients: User[] = (await getUserClients(user?.id)) || [];
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
