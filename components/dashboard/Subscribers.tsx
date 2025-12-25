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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Subscriber } from "@prisma/client";
import { email } from "zod";

export function Subscribers({ subscribers }: { subscribers: Subscriber[] }) {
  const list = subscribers.map((item) => {
    const username = item.email.split("@")[0];
    return {
      username,
      email: item.email,
    };
  });
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
              <TableHead className="text-right">View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>
                    <div className="font-medium">
                    {item.username}
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {item.email}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
<Button size={"sm"}>Send Mail</Button>
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
