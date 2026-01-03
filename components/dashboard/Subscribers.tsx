"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowUp, Trash2 } from "lucide-react";
import { Subscriber } from "@prisma/client";
import { email } from "zod";
import { deleteSubscriber } from "@/actions/subscribe";
import toast from "react-hot-toast";
import { timeAgo } from "@/lib/timeAgo";

export function Subscribers({ subscribers }: { subscribers: Subscriber[] }) {
  const list = subscribers.map((item) => {
    const username = item.email.split("@")[0];
    return {
      username,
      email: item.email,
      id: item.id,
      createdAt: item.createdAt,
    };
  });

  async function handleDelete(id: string) {
    try {
      const res = await deleteSubscriber(id);
      if (res.ok) {
        toast.success("Subscriber deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Mail Subscribers</CardTitle>
          <CardDescription>Your Subscribers</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subscriber</TableHead>
              <TableHead>When</TableHead>
              <TableHead className="text-right">View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>
                    <div className="font-medium">{item.username}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {item.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{timeAgo(item.createdAt.toString())}</div>
                  </TableCell>
                  <TableCell className="flex items-center justify-end space-x-3 text-right">
                    <Button size={"sm"}>Send Mail</Button>
                    <button onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
export default Subscribers;
