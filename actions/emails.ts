import { GuestProject } from "./../node_modules/.prisma/client/index.d";
("use server");

import { InvoiceDetails } from "@/types/types";

import { Resend } from "resend";

import { getNormalDate } from "@/lib/getNormalDate";
import { InvoiceLink } from "@/components/Email-Templates/invoice";
import ClientInvititation, {
  InvitationProps,
} from "@/components/Email-Templates/ClientInvitation";
import { ExistingUser } from "./users";
import MemberInvitation from "@/components/Email-Templates/MemberInvitation";
import { db } from "@/prisma/db";
export async function sendEmail(data: InvoiceDetails, invoiceLink: string) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not defined");
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const date = getNormalDate(data.invoice.date);
    const title = `Payment for ${data.invoice.title} made on ${date}`;
    const clientMail = data.client?.email ?? "desishub.info@gmail.com";

    const response = await resend.emails.send({
      from: "Project X <noreply@yourdomain.com>",
      to: data.client?.email ?? "", //tarekanwer2345@gmail.com to test email
      subject: `Invoice for your project made on ${date}`,
      react: InvoiceLink({
        invoiceLink,
        previewText: `Invoice for your project made on ${date}`,
        title,
        userName: data.user?.name ?? "",
      }),
    });
    console.log(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function sendClientInvitation(data: InvitationProps) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const loginLink = data.loginLink;
    const response = await resend.emails.send({
      from: "Project X <no-reply@yourdomain.com>",
      to: data?.loginEmail ?? "", //tarekanwer2345@gmail.com to test email
      subject: `Invitation to collaborate on project ${data.projectName}`,
      react: ClientInvititation({
        clientName: data.clientName,
        projectName: data.projectName,
        message: data.message,
        loginEmail: data.loginEmail,
        loginPassword: data.loginPassword,
        loginLink,
      }),
    });
    console.log(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

type InvitationPayload = {
  members: ExistingUser[];
  memberName: string;
  projectName: string;
  projectOwner: string;
  projectOwnerId: string;
  message?: string;
  loginLink: string;
};
export async function sendMemberInvitation({
  members,
  memberName,
  projectName,
  loginLink,
  projectOwner,
  projectOwnerId,
}: InvitationPayload) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is missing");
  }

  const message =
    "We're excited to have you on board! Please use the following credentials to log in and start collaborating on the project.";

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    //create the guest project
    members.map(async (user) => {
      const guestProject = await db.guestProject.create({
        data: {
          projectLink: loginLink,
          guestName: user.name,
          projectName: projectName,
          projectOwner: projectOwner,
          guestId: user.id,
          ownerId: projectOwnerId,
        },
      });
      console.log(guestProject);
    });
    const batch = members.map((user) => ({
      from: "Project X <onboarding@resend.dev>",
      to: user.email,
      subject: `Invitation to ${projectName}`,
      react: MemberInvitation({
        memberName,
        projectName,
        message,
        loginLink,
      }),
    }));

    const { data, error } = await resend.batch.send(batch);

    if (error) {
      console.error("Failed to send invitations:", error);
      throw error;
    }

    console.log("Invitations sent successfully:", data);
  } catch (error) {
    console.error("Failed to send invitations:", error);
    throw error;
  }
}
