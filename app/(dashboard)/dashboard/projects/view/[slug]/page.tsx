"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import parse from 'html-react-parser';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  ChevronLeft,
  DollarSign,
  Edit,
  Eye,
  MessageSquare,
  Plus,
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

export default function ProjectDeatilPage({
  projectData,
}: {
  projectData: ProjectData;
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      {/*back to projects button*/}
      <Button
        onClick={() => router.push("/dashboard/projects")}
        variant="outline"
        className="mb-4"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to All Projects
      </Button>

      {/*project banner*/}
      <div className="relative h-64 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 mb-8 overflow-hidden group">
        {projectData.bannerImage ? (
          <img
            src={projectData.bannerImage}
            alt="Project Banner"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        ) : (
          <img
            src="/placeholder.svg?height=256&width=1024"
            alt="Project Banner"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        )}

        <div className="absolute inset-0 flex justify-center items-center">
          <h1 className="text-4xl font-bold text-white">{projectData.name}</h1>
        </div>
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>

      {/*main content*/}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/*left column*/}
        <div className="lg:col-span-2 space-y-8">
          {/*project description*/}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Project Description</CardTitle>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="ghost"
                size="icon"
              >
                {isEditing ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Edit className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <DescriptionForm
                  editingId={projectData.id}
                  initialDescription={projectData.description}
                />
              ) : (
                <p>{projectData.description || "No description available."}</p>
              )}
            </CardContent>
          </Card>

          {/*notes*/}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Notes</CardTitle>
              <Button
                onClick={() => setIsEditingNotes(!isEditingNotes)}
                variant="ghost"
                size="icon"
              >
                {isEditingNotes ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Edit className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="prose lg:prose-xl">
                {isEditingNotes ? (
                  <NotesForm
                    isEditable={true}
                    editingId={projectData.id}
                    initialNotes={JSON.parse(projectData.notes)??""}
                  />
                ) : projectData.notes ? (
                  <NotesForm
                    isEditable={false}
                    editingId={projectData.id}
                    initialNotes={JSON.parse(projectData.notes)}
                  />
                ) : (
                  <p>No notes available.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/*comments*/}
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projectData.comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {comment.content.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">User</p>
                    <p className="text-sm text-gray-500">{comment.content}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Add Comment
              </Button>
            </CardFooter>
          </Card>

          {/*Modules*/}
          <Card>
            <CardHeader>
              <CardTitle>Project Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                {projectData.modules.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {projectData.modules.map((module) => (
                      <Card
                        key={module.id}
                        className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-indigo-50 to-cyan-50"
                      >
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm">
                            {module.name}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <div className="space-y-4">
                      <Image
                        src={emptyFolder}
                        alt="No Modules"
                        className="w-36 h-auto"
                      />
                      <Button variant="outline">Add New Module</Button>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/*right column*/}
        <div className="space-y-8">
          {/*Project Info Card*/}
          <Card>
            <CardHeader>
              <CardTitle>Project Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-green-500" />
                <span className="font-semibold">Budget:</span>
                <span className="ml-2">
                  ${projectData.budget?.toLocaleString() || "N/A"}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 text-blue-500" />
                  <span className="font-semibold">Timeline:</span>
                </div>
                <div className="ml-6 space-y-1">
                  <div className="text-sm">
                    Start:{" "}
                    {new Date(projectData.startDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm">
                    End:{" "}
                    {projectData.endDate
                      ? new Date(projectData.endDate).toLocaleDateString()
                      : "Ongoing"}
                  </div>
                  <div className="text-sm">
                    Remaining: {projectData.deadline} days
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Users className="mr-2 h-4 w-4 text-purple-500" />
                  <span className="font-semibold">Members:</span>
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
                  ):(
                    <div>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4"/>
                        Invite Member
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/*Client Card*/}
          <Card>
            <CardHeader>
              <CardTitle>Client Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  {projectData.client.image ? (
                    <AvatarImage src={projectData.client.image} />
                  ) : (
                    <AvatarFallback>
                      {projectData.client.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-semibold">{projectData.client.name}</p>
                  <p className="text-sm text-gray-500">
                    {projectData.client.companyName || "Individual Client"}
                  </p>
                </div>
              </div>
              <div className="text-sm">
                <p>
                  <span className="font-semibold">Contact:</span>
                  {projectData.client.firstName} {projectData.client.lastName}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {projectData.client.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {projectData.client.phone}
                </p>
              </div>
            </CardContent>
          </Card>

          {/*Invoices and Payments*/}
          <Card>
            <CardHeader>
              <CardTitle>Invoices & Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="invoices">Invoices</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                </TabsList>
                <TabsContent value="invoices" className="space-y-4">
                  {projectData.invoices.length > 0 ? (
                    projectData.invoices.map((invoice) => (
                      <div
                        key={invoice.id}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="font-semibold">
                            {invoice.invoiceNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            Due:{" "}
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">
                            ${invoice.amount.toLocaleString()}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No Invoices Yet.</p>
                  )}
                </TabsContent>
                <TabsContent value="payments" className="space-y-4">
                  {projectData.payments.length > 0 ? (
                    projectData.payments.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex justify-between items-center"
                      >
                        <span>
                          {new Date(payment.date).toLocaleDateString()}
                        </span>
                        <Badge variant="outline" className="bg-green-100">
                          ${payment.amount.toLocaleString()}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No Payments Yet.</p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Progress value={50} className="w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
