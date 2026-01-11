"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  ChevronLeft,
  DollarSign,
  Edit,
  Eye,
  Plus,
  Trash,
  TriangleAlert,
  Users,
  X,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { ProjectData } from "@/types/types";
import emptyFolder from "@/public/empty-folder.png";
import Image from "next/image";
import DescriptionForm from "@/components/Forms/DescriptionForm";
import NotesForm from "@/components/Forms/NotesForm";
import ProjectBanner from "./ProjectBanner";
import { Session } from "next-auth";
import { getInitials } from "@/lib/generateInitials";
import { ModeToggle } from "../mode-toggle";
import AuthenticatedAvatar from "../global/AuthenticatedAvatar";
import PaymentForm from "../Forms/PaymentForm";
import Link from "next/link";
import BudgetProgressBar from "./BudgetProgressBar";
import CommentForm from "../Forms/CommentForm";
import parse from "html-react-parser";

import ModuleForm from "../Forms/ModuleForm";
import toast from "react-hot-toast";
import { deleteModule } from "@/actions/module";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import InviteClient from "../DataTableColumns/InviteClient";
import LogoutBtn from "../global/LogoutBtn";
import InviteMembersModal from "./InviteMember";
import { ExistingUser } from "@/actions/users";

import { DomainCard } from "./DomainCard";
import PaymentDeleteButton from "./PaymentDeleteButton";

export default function ProjectDetailClient({
  projectData,
  session,
  existingUsers,
}: {
  projectData: ProjectData;
  session: Session | null;
  existingUsers: ExistingUser[];
}) {
  // const [activeTab, setActiveTab] = useState("overview");

  const user = session?.user;
  let role = user?.role;
  if (user.id !== projectData.user.id) {
    role = "Member";
  }

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [open, setOpen] = useState(false);

  // Helper function to safely parse notes JSON
  const parseNotes = (notes: string) => {
    if (!notes || notes.trim() === "") {
      return null;
    }
    try {
      return JSON.parse(notes);
    } catch (error) {
      console.error("Failed to parse notes:", error);
      return null;
    }
  };
  const paidAmount = projectData.payments.reduce((total, payment) => total + payment.amount, 0);
  const remainingAmount = projectData.budget ? projectData.budget - paidAmount : 0;
  //==========================================
  function calculateDaysDifference(endDate: Date | string): number {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  //   function calculateDaysDifference(endDate: Date | string): number {
  //   const end = new Date(endDate).setHours(0, 0, 0, 0)
  //   const now = new Date().setHours(0, 0, 0, 0)

  //   return Math.ceil((end - now) / (1000 * 60 * 60 * 24))
  // }

  function formatDaysDifference(days: number): string {
    if (days === 0) {
      return "Deadline is today";
    }

    if (days > 0) {
      const years = Math.floor(days / 365);
      const remainingDays = days % 365;

      if (years > 0 && remainingDays > 0) {
        return `${years} year${
          years !== 1 ? "s" : ""
        } and ${remainingDays} day${remainingDays !== 1 ? "s" : ""} remaining`;
      } else if (years > 0) {
        return `${years} year${years !== 1 ? "s" : ""} remaining`;
      } else {
        return `${days} day${days !== 1 ? "s" : ""} remaining`;
      }
    }

    if (days < 0) {
      const absDays = Math.abs(days);
      const years = Math.floor(absDays / 365);
      const remainingDays = absDays % 365;

      if (years > 0 && remainingDays > 0) {
        return `${years} year${years !== 1 ? "s" : ""} and ${remainingDays} day${
          remainingDays !== 1 ? "s" : ""
        } past deadline`;
      } else if (years > 0) {
        return `${years} year${years !== 1 ? "s" : ""} past deadline`;
      } else {
        return `${absDays} day${absDays !== 1 ? "s" : ""} past deadline`;
      }
    }

    return "Ongoing";
  }
  const [daysDifference, setDaysDifference] = useState<number | null>(null);
  useEffect(() => {
    if (projectData.endDate) {
      setDaysDifference(calculateDaysDifference(projectData.endDate));
    }
    const intervalId = setInterval(
      () => {
        if (projectData.endDate) {
          setDaysDifference(calculateDaysDifference(projectData.endDate));
        }
      },
      24 * 60 * 60 * 1000,
    );
    return () => clearInterval(intervalId); //////////////////////////////////////////////////////////////////////////////////////
  }, [projectData.endDate]);
  //==========================

  async function handleDeleteModule(id: string) {
    try {
      const res = await deleteModule(id);
      if (res.ok) {
        toast.success("Module deleted successfully");
        return;
      }
      toast.error("Failed to delete module");
    } catch (error) {
      console.error("Error deleting module:", error);
      toast.error("Failed to delete module");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8 dark:from-slate-950 dark:via-black dark:to-slate-950">
      {/*back to projects button*/}
      <div className="flex items-center justify-between">
        {role === "USER" ? (
          <Button
            // onClick={() => router.push("/dashboard/projects")}
            variant="outline"
            className="mb-4"
            asChild
          >
            <Link href={"/dashboard/projects"}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to All Projects
            </Link>
          </Button>
        ) : (
          <div className="my-2 rounded-md bg-slate-800 px-4 py-2 text-white dark:border dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100">
            <LogoutBtn />
          </div>
        )}
        <div className="hidden space-x-2 lg:flex lg:flex-1 lg:justify-end">
          <ModeToggle />
          <AuthenticatedAvatar session={session} />
        </div>
      </div>

      {/*project banner*/}
      <ProjectBanner
        name={projectData.name}
        bannerImage={projectData.bannerImage}
        editingId={projectData.id}
        bg={projectData.gradient}
      />

      {/*main content*/}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/*left column*/}
        <div className="space-y-8 lg:col-span-2">
          {/*project description*/}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="dark:text-slate-100">Project Description</CardTitle>
              <Button onClick={() => setIsEditing(!isEditing)} variant="ghost" size="icon">
                {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <DescriptionForm
                  editingId={projectData.id}
                  initialDescription={projectData.description}
                />
              ) : (
                <p className="dark:text-slate-100">
                  {projectData.description || "No description available."}
                </p>
              )}
            </CardContent>
          </Card>
          <Tabs defaultValue="modules" className="w-full">
            <TabsList>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>
            <TabsContent value="modules">
              {" "}
              {/*Modules*/}
              <Card>
                <CardHeader>
                  {/* changed the style here ya hassan i had to change it */}

                  <CardTitle className="dark:text-slate-100">
                    {" "}
                    <div className="flex items-center justify-between">
                      <h2>Project Modules</h2>

                      <div className="flex-shrink-0">
                        <ModuleForm
                          projectId={projectData.id}
                          userId={user.id}
                          userName={user.name}
                        />
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    {projectData.modules.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {projectData.modules.map((module) => (
                          <Card
                            key={module.id}
                            className="group cursor-pointer bg-gradient-to-br from-indigo-50 to-cyan-50 p-3 transition-shadow hover:shadow-md dark:border-slate-600/50 dark:bg-slate-800 dark:from-slate-800/90 dark:to-slate-700/90 dark:hover:shadow-xl dark:hover:shadow-indigo-500/10"
                          >
                            <CardHeader className="p-3">
                              <CardTitle className="group flex items-center justify-between pl-5 text-sm dark:text-slate-100">
                                <span>{module.name}</span>

                                <div className="flex items-center gap-2">
                                  <ModuleForm
                                    editingId={module.id}
                                    initialContent={module.name}
                                    projectId={projectData.id}
                                    userId={user.id}
                                    userName={user.name}
                                  />
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <button className="opacity-0 transition-opacity group-hover:opacity-100">
                                        <Trash className="h-4 w-4 text-red-500 dark:text-red-400" />
                                      </button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          <div className="flex text-red-600 dark:text-red-400">
                                            <TriangleAlert className="mr-2 h-5 w-5" />
                                            Are you absolutely sure?
                                          </div>
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action cannot be undone. This will permanently delete
                                          your Module.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel className="bg-gray-600 text-white hover:bg-gray-700 hover:text-white dark:bg-gray-700 dark:hover:bg-gray-600">
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                          <Button
                                            onClick={() => handleDeleteModule(module.id)}
                                            className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
                                          >
                                            Delete
                                          </Button>
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                  <Link
                                    className="opacity-0 transition-opacity group-hover:opacity-100"
                                    href={`/project/modules/${module.id}?projectId=${module.projectId}`}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Link>
                                </div>
                              </CardTitle>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="space-y-4">
                          <Image src={emptyFolder} alt="No Modules" className="h-auto w-36" />
                          <ModuleForm
                            projectId={projectData.id}
                            userId={user.id}
                            userName={user.name}
                          />
                        </div>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notes">
              {" "}
              {/*notes*/}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="dark:text-slate-100">Notes</CardTitle>
                  <Button
                    onClick={() => setIsEditingNotes(!isEditingNotes)}
                    variant="ghost"
                    size="icon"
                  >
                    {isEditingNotes ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert lg:prose-xl">
                    {projectData.notes && projectData.notes.trim() !== "" ? (
                      <NotesForm
                        key={isEditingNotes ? "editing" : "viewing"}
                        isEditable={isEditingNotes}
                        editingId={projectData.id}
                        initialNotes={parseNotes(projectData.notes)}
                      />
                    ) : isEditingNotes ? (
                      <NotesForm isEditable={true} editingId={projectData.id} initialNotes={null} />
                    ) : (
                      <p className="dark:text-slate-100">No notes available.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="comments">
              {" "}
              {/*comments*/}
              <Card>
                <CardHeader>
                  <CardTitle className="dark:text-slate-100">
                    <div className="flex items-center justify-between">
                      <h2>Comments</h2>
                      <div>
                        <CommentForm
                          projectId={projectData.id}
                          userId={user.id}
                          userName={user.name}
                          userRole={user.role}
                        />
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>

                {projectData.comments.length > 0 ? (
                  <CardContent className="space-y-4">
                    {projectData.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="group flex cursor-pointer items-start space-x-4"
                      >
                        <Avatar>
                          <AvatarFallback>{getInitials(comment.userName)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex space-x-3">
                            <p className="font-semibold dark:text-slate-100">{comment.userName}</p>
                            <CommentForm
                              projectId={projectData.id}
                              userId={user.id}
                              userName={user.name}
                              userRole={user.role}
                              editingId={comment.id}
                              initialContent={comment.content}
                            />
                          </div>
                          <div className="prose dark:prose-invert">{parse(comment.content)}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                ) : (
                  <CardFooter>
                    <p className="dark:text-slate-100">No comments available.</p>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            <TabsContent value="payments">
              {" "}
              {/*Invoices and Payments*/}
              <div className="mx-auto max-w-3xl">
                <Card>
                  <CardHeader>
                    <CardTitle className="dark:text-slate-100">
                      <div className="flex items-center justify-between">
                        <h2>Payments</h2>
                        {role === "USER" && (
                          <PaymentForm
                            projectId={projectData.id}
                            userId={projectData.userId}
                            clientId={projectData.clientId}
                            remainingAmount={remainingAmount}
                          />
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs
                      defaultValue="payments"
                      // value={activeTab}
                      // onValueChange={setActiveTab}
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="payments">Payments</TabsTrigger>
                        <TabsTrigger value="invoices">Invoices</TabsTrigger>
                      </TabsList>
                      <TabsContent value="invoices" className="space-y-4">
                        {projectData.payments.length > 0 ? (
                          projectData.payments.map((invoice) => (
                            <div key={invoice.id} className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold dark:text-slate-100">
                                  #{invoice.invoiceNumber}
                                </p>

                                <p className="text-sm text-gray-500 dark:text-gray-300">
                                  Due: {new Date(invoice.date).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <h2 className="dark:text-slate-100"> {invoice.title}</h2>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary">
                                  ${invoice.amount.toLocaleString()}
                                </Badge>
                                <Button variant="outline" size="sm" asChild>
                                  <Link
                                    href={`/project/invoice/${invoice.id}?project=${projectData.slug}`}
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    view
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            No Invoices Yet.
                          </p>
                        )}
                      </TabsContent>
                      <TabsContent value="payments" className="space-y-4">
                        {projectData.payments.length > 0 ? (
                          projectData.payments.map((payment) => (
                            <div key={payment.id} className="flex items-center justify-between">
                              <span>{new Date(payment.date).toLocaleDateString()}</span>

                              <Badge variant="outline" className="">
                                {payment.title}
                              </Badge>
                              <div className="flex items-center">
                                <Badge
                                  variant="outline"
                                  className="bg-green-100 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300"
                                >
                                  ${payment.amount.toLocaleString()}
                                </Badge>
                                <PaymentDeleteButton paymentId={payment.id} />
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            No Payments Yet.
                          </p>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter>
                    {projectData.budget && (
                      <BudgetProgressBar budget={projectData.budget} paidAmount={paidAmount} />
                    )}
                  </CardFooter>
                </Card>{" "}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/*right column*/}
        <div className="space-y-8">
          {/*Project Info Card*/}
          <Card>
            <CardHeader>
              <CardTitle className="dark:text-slate-100">Project Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3 dark:border-slate-600">
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span className="font-semibold dark:text-slate-200">Budget:</span>
                  <span className="ml-2 dark:text-slate-200">
                    ${projectData.budget?.toLocaleString() || "N/A"}
                  </span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span className="font-semibold dark:text-slate-200">Total Paid:</span>
                  <span className="ml-2 dark:text-slate-200">
                    ${paidAmount?.toLocaleString() || "N/A"}
                  </span>
                </div>
              </div>
              <div className="space-y-2 border-b pb-3 dark:border-slate-600">
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 text-blue-500 dark:text-blue-400" />
                  <span className="font-semibold dark:text-slate-200">Timeline:</span>
                </div>
                <div className="ml-6 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm dark:text-slate-200">
                      Start: {new Date(projectData.startDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm dark:text-slate-200">
                      End:{" "}
                      {projectData.endDate
                        ? new Date(projectData.endDate).toLocaleDateString()
                        : "Ongoing"}
                    </div>
                  </div>
                  {/* ============================= */}
                  <div
                    className={`text-sm font-medium ${
                      daysDifference !== null && daysDifference < 0
                        ? "text-red-600 dark:text-red-400" // Past deadline - RED
                        : daysDifference === 0
                          ? "text-orange-600 dark:text-orange-400" // Today - ORANGE
                          : "text-green-600 dark:text-green-400" // Future - GREEN
                    }`}
                  >
                    Status:{""}{" "}
                    {projectData.endDate && daysDifference !== null
                      ? formatDaysDifference(daysDifference)
                      : "Ongoing"}
                  </div>
                  {/* ================================= */}
                </div>
              </div>
              {role === "USER" && (
                <div>
                  <div className="mb-2 flex items-center">
                    <Users className="mr-2 h-4 w-4 text-purple-500 dark:text-purple-400" />
                    <span className="font-semibold dark:text-slate-200">Members:</span>
                  </div>
                  <div className="flex -space-x-2">
                    {projectData.members.length > 0 ? (
                      projectData.members.map((member, index) => (
                        <Avatar key={member.id}>
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32&text=${member.id}`}
                          />
                          <AvatarFallback>
                            {member.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ))
                    ) : (
                      <>
                        <div>
                          <Button onClick={() => setOpen(true)} variant="outline" size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Invite Member
                          </Button>
                        </div>

                        <InviteMembersModal
                          projectData={projectData}
                          isOpen={open}
                          onClose={() => setOpen(false)}
                          members={existingUsers.filter((member) => member.id !== user.id)}
                        />
                      </>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/*Client Card*/}
          <Card>
            <CardHeader>
              <CardTitle className="dark:text-slate-100">
                {role === "USER" ? "Client" : "User"} Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {role === "USER" ? (
                    <Avatar className="h-12 w-12">
                      {projectData.client.image ? (
                        <AvatarImage src={projectData.client.image} />
                      ) : (
                        <AvatarFallback>
                          {projectData.client.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  ) : (
                    <Avatar className="h-12 w-12">
                      {user.id ? (
                        <AvatarImage src={projectData.user.image ?? "/placeholder.svg"} />
                      ) : (
                        <AvatarFallback>
                          {projectData.user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  )}
                  {role === "USER" ? (
                    <div>
                      <p className="font-semibold dark:text-slate-100">{projectData.client.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {projectData.client.companyName || "Individual Client"}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold dark:text-slate-100">{projectData.user.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {projectData.user.companyName || "Individual User"}
                      </p>
                    </div>
                  )}
                </div>
                {role === "USER" && <InviteClient row={{ projectData }} />}
              </div>
              {role === "USER" ? (
                <div className="text-sm">
                  <p className="dark:text-slate-200">
                    <span className="font-semibold">Contact:</span>
                    {projectData.client.firstName} {projectData.client.lastName}
                  </p>
                  <p className="dark:text-slate-200">
                    <span className="font-semibold">Email:</span> {projectData.client.email}
                  </p>
                  <p className="dark:text-slate-200">
                    <span className="font-semibold">Phone:</span> {projectData.client.phone}
                  </p>
                </div>
              ) : (
                <div className="text-sm">
                  <p className="dark:text-slate-200">
                    <span className="font-semibold">Contact:</span>
                    {projectData.user.firstName} {projectData.user.lastName}
                  </p>
                  <p className="dark:text-slate-200">
                    <span className="font-semibold">Email:</span> {projectData.user.email}
                  </p>
                  <p className="dark:text-slate-200">
                    <span className="font-semibold">Phone:</span> {projectData.user.phone}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          <DomainCard projectData={projectData} />
        </div>
      </div>
    </div>
  );
}
