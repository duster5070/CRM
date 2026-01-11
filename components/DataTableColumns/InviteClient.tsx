import React, { useState } from "react";
import { Button } from "../ui/button";
import { User } from "@prisma/client";
import { InvitationProps } from "../Email-Templates/ClientInvitation";
import { sendClientInvitation } from "@/actions/emails";
import toast from "react-hot-toast";
import { ProjectData } from "@/types/types";

export default function InviteClient({ row }: { row: any }) {
  // Handle both cases: row could be ProjectData directly or { projectData: ProjectData }
  const projectData: ProjectData = row.projectData || row;
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  async function inviteClient() {
    // Check if client exists before proceeding
    if (!projectData?.client) {
      toast.error("Client information is missing");
      return;
    }

    const data: InvitationProps = {
      clientName: projectData.client.name,
      projectName: projectData.name ?? "",
      message:
        "We're excited to have you on board! Please use the following credentials to log in and start collaborating on the project.",
      loginEmail: projectData.client.email,
      loginPassword: projectData.client?.plain ?? "",
      loginLink: `${baseUrl}/login?returnUrl=/project/${projectData.slug}`,
    };
    setLoading(true);
    try {
      const res = await sendClientInvitation(data);
      setLoading(false);
      toast.success("Email sent successfully");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
    console.log("invite sent");
  }
  return (
    <Button disabled={loading} variant={"outline"} onClick={inviteClient} className="">
      {loading ? "Sending..." : "Send Invite"}
    </Button>
  );
}
