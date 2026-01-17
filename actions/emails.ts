"use server";

import { InvoiceDetails } from "@/types/types";

// import { Resend } from "resend";

import { getNormalDate } from "@/lib/getNormalDate";
import { InvoiceLink } from "@/components/Email-Templates/invoice";
import ClientInvititation, { InvitationProps } from "@/components/Email-Templates/ClientInvitation";
import { ExistingUser } from "./users";
import MemberInvitation from "@/components/Email-Templates/MemberInvitation";
import { db } from "@/prisma/db";
import { da } from "zod/v4/locales";
import { transporter } from "@/lib/mail";
import { render } from "@react-email/render";
export async function sendEmail(data: InvoiceDetails, invoiceLink: string) {
  try {
    // if (!process.env.RESEND_API_KEY) {
    //   throw new Error("RESEND_API_KEY is not defined");
    // }
    // const resend = new Resend(process.env.RESEND_API_KEY);
    const date = getNormalDate(data.invoice.date);
    const title = `Payment for ${data.invoice.title} made on ${date}`;
    // const clientMail = data.client?.email ?? "desishub.info@gmail.com";

    const emailHtml = await render(
      InvoiceLink({
        invoiceLink,
        previewText: `Invoice for your project made on ${date}`,
        title,
        userName: data.user?.name ?? "",
      }),
    );

    const response = await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: data.client?.email ?? "",
      subject: `Invoice for your project made on ${date}`,
      html: emailHtml,
    });

    // const response = await resend.emails.send({
    //   from: "Project X <noreply@yourdomain.com>",
    //   to: data.client?.email ?? "", //tarekanwer2345@gmail.com to test email
    //   subject: `Invoice for your project made on ${date}`,
    //   react: InvoiceLink({
    //     invoiceLink,
    //     previewText: `Invoice for your project made on ${date}`,
    //     title,
    //     userName: data.user?.name ?? "",
    //   }),
    // });
    console.log(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function sendClientInvitation(data: InvitationProps) {
  try {
    // const resend = new Resend(process.env.RESEND_API_KEY);
    const loginLink = data.loginLink;

    const emailHtml = await render(
      ClientInvititation({
        clientName: data.clientName,
        projectName: data.projectName,
        message: data.message,
        loginEmail: data.loginEmail,
        loginPassword: data.loginPassword,
        loginLink,
      }),
    );

    const response = await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: data?.loginEmail ?? "",
      subject: `Invitation to collaborate on project ${data.projectName}`,
      html: emailHtml,
    });

    // const response = await resend.emails.send({
    //   from: "Project X <no-reply@yourdomain.com>",
    //   to: data?.loginEmail ?? "", //tarekanwer2345@gmail.com to test email
    //   subject: `Invitation to collaborate on project ${data.projectName}`,
    //   react: ClientInvititation({
    //     clientName: data.clientName,
    //     projectName: data.projectName,
    //     message: data.message,
    //     loginEmail: data.loginEmail,
    //     loginPassword: data.loginPassword,
    //     loginLink,
    //   }),
    // });
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
  // if (!process.env.RESEND_API_KEY) {
  //   throw new Error("RESEND_API_KEY is missing");
  // }

  const message =
    "We're excited to have you on board! Please use the following credentials to log in and start collaborating on the project.";

  try {
    // const resend = new Resend(process.env.RESEND_API_KEY);

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

    const promises = members.map(async (user) => {
      const emailHtml = await render(
        MemberInvitation({
          memberName,
          projectName,
          message,
          loginLink,
        }),
      );
      return transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: user.email,
        subject: `Invitation to ${projectName}`,
        html: emailHtml,
      });
    });

    const data = await Promise.all(promises);

    // const batch = members.map((user) => ({
    //   from: "Project X <onboarding@resend.dev>",
    //   to: user.email,
    //   subject: `Invitation to ${projectName}`,
    //   react: MemberInvitation({
    //     memberName,
    //     projectName,
    //     message,
    //     loginLink,
    //   }),
    // }));

    // const { data, error } = await resend.batch.send(batch);

    // if (error) {
    //   console.error("Failed to send invitations:", error);
    //   throw error;
    // }

    console.log("Invitations sent successfully:", data);
  } catch (error) {
    console.error("Failed to send invitations:", error);
    throw error;
  }
}

// New function for sending custom composed emails
export type ComposedEmailData = {
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  message: string;
  htmlMessage?: string;
  attachments?: Array<{
    filename: string;
    content: string;
  }>;
  broadcast?: boolean;
};

export async function sendComposedEmail(data: ComposedEmailData) {
  // if (!process.env.RESEND_API_KEY) {
  //   throw new Error("RESEND_API_KEY is missing");
  // }

  try {
    // const resend = new Resend(process.env.RESEND_API_KEY);

    // If broadcast is enabled, send to all recipients individually
    if (data.broadcast && data.to.length > 1) {
      const promises = data.to.map((recipient) => {
        return transporter.sendMail({
          from: data.from || process.env.SMTP_EMAIL, // Use authenticated email as helper
          to: recipient,
          cc: data.cc,
          bcc: data.bcc,
          subject: data.subject,
          html: data.htmlMessage || `<p>${data.message.replace(/\n/g, "<br>")}</p>`,
        });
      });

      const batchData = await Promise.all(promises);

      // const batch = data.to.map((recipient) => ({
      //   from: data.from || "Project X <onboarding@resend.dev>",
      //   to: recipient,
      //   cc: data.cc,
      //   bcc: data.bcc,
      //   subject: data.subject,
      //   html: data.htmlMessage || `<p>${data.message.replace(/\n/g, "<br>")}</p>`,
      // }));

      // const { data: batchData, error } = await resend.batch.send(batch);

      // if (error) {
      //   console.error("Failed to send batch emails:", error);
      //   throw error;
      // }

      console.log("Batch emails sent successfully:", batchData);
      return { success: true, data: batchData };
    } else {
      // Send single email to all recipients
      const response = await transporter.sendMail({
        from: data.from || process.env.SMTP_EMAIL,
        to: data.to,
        cc: data.cc,
        bcc: data.bcc,
        subject: data.subject,
        html: data.htmlMessage || `<p>${data.message.replace(/\n/g, "<br>")}</p>`,
      });

      // const response = await resend.emails.send({
      //   from: data.from || "Project X <onboarding@resend.dev>",
      //   to: data.to,
      //   cc: data.cc,
      //   bcc: data.bcc,
      //   subject: data.subject,
      //   html: data.htmlMessage || `<p>${data.message.replace(/\n/g, "<br>")}</p>`,
      // });

      console.log("Email sent successfully:", response);
      return { success: true, data: response };
    }
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
