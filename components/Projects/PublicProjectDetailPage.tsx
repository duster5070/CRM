"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Edit, Eye, Trash, TriangleAlert, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectData } from "@/types/types";
import emptyFolder from "@/public/empty-folder.png";
import Image from "next/image";
import DescriptionForm from "@/components/Forms/DescriptionForm";
import NotesForm from "@/components/Forms/NotesForm";
import ProjectBanner from "./ProjectBanner";
import { getInitials } from "@/lib/generateInitials";
import Link from "next/link";
import parse from "html-react-parser";
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
import { DomainCard } from "./DomainCard";

export default function PublicProjectDetailPage({ projectData }: { projectData: ProjectData }) {
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
      {/*project banner*/}
      <ProjectBanner
        name={projectData.name}
        bannerImage={projectData.bannerImage}
        editingId={projectData.id}
        bg={projectData.gradient}
        isPrivate={false}
      />

      {/*main content*/}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/*left column*/}
        <div className="space-y-8 lg:col-span-2">
          {/*project description*/}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="dark:text-slate-100">Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="dark:text-slate-100">
                {projectData.description || "No description available."}
              </p>
            </CardContent>
          </Card>
          <Tabs defaultValue="modules" className="w-full">
            <TabsList>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
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
                              </CardTitle>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="space-y-4">
                          <Image src={emptyFolder} alt="No Modules" className="h-auto w-36" />
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
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert lg:prose-xl">
                    {projectData.notes && projectData.notes.trim() !== "" ? (
                      <NotesForm
                        isEditable={false}
                        editingId={projectData.id}
                        initialNotes={parseNotes(projectData.notes)}
                      />
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
            </CardContent>
          </Card>

          {/*Client Card*/}
          <Card>
            <CardHeader>
              <CardTitle className="dark:text-slate-100">User Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {projectData.user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold dark:text-slate-100">{projectData.user.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {projectData.user.companyName || "Individual User"}
                    </p>
                  </div>
                </div>
              </div>
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
            </CardContent>
          </Card>
          <DomainCard projectData={projectData} />
        </div>
      </div>
    </div>
  );
}
