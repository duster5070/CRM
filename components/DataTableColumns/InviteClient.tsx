import React from "react";
import { Button } from "../ui/button";

export default function InviteClient({
  row,
}: {
  row: any;
}) {
  const data = row.original;
  async function inviteClient() {
    console.log("invite sent")
  }
  return <Button variant={'outline'} onClick={inviteClient} className="">
    Send Invite
  </Button>;
}
