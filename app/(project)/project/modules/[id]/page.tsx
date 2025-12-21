import { getModuleById, getProjectModules } from "@/actions/module";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Delete, Edit, MoreVertical, Plus, Trash2 } from "lucide-react";
import { notFound } from "next/navigation";
import { handleCommandNavigation } from "novel/extensions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import TaskForm from "@/components/Forms/TaskForm";
import { DeleteTask } from "@/components/Forms/DeleteTask";
export default async function Page({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { projectId } = searchParams;
  const modules = (await getProjectModules(projectId as string)) || [];
  const activeModule = modules.find((module, i) => module.id === id);
  if (!activeModule || modules?.length < 0) {
    return notFound();
  }
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow min-h-96">
        <div className="grid grid-cols-12">
          <div className="col-span-3 p-8">
            <h2 className="py-2 text-xl font-bold">Project Modules</h2>
            <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
              {modules.map((module) => (
                <Link
                  href={`/project/modules/${module.id}?projectId=${module.projectId}`}
                  key={module.id}
                  className={`p-2 mb-2 cursor-pointer rounded-lg flex items-center ${
                    activeModule?.id === module.id
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span>{module.name}</span>
                </Link>
              ))}
            </ScrollArea>
            <Button>
              <Plus className="mr-2 w-4 h-4" />
              Add Project
            </Button>
          </div>
          <div className="col-span-9 bg-gray-100 p-8">
            <div className="flex-1 p-8">
              {activeModule && (
                <>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="">
                      <h1 className="text-3xl font-bold mb-2">
                        {activeModule.name}
                      </h1>
                      <div className="flex item-center">
                        <Progress value={50} className="w-64 mr-4" />
                        <span className="texr-sm text-gray-500">
                          {50}% complete
                        </span>
                      </div>
                    </div>
                    <div>
                      {activeModule.tasks.length > 0 && (
                        <p>({activeModule.tasks.length} Tasks)</p>
                      )}
                      <TaskForm
                        moduleId={activeModule.id}
                        initialStatus="TODO"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    {(["TODO", "INPROGRESS", "COMPLETE"] as const).map(
                      (status) => (
                        <Card key={status}>
                          <CardHeader
                            className={cn(
                              "flex flex-row items-center justify-between space-y-0 pb-2 rounded-t-lg",
                              status === "TODO"
                                ? "bg-orange-50"
                                : status === "INPROGRESS"
                                ? "bg-blue-50"
                                : status === "COMPLETE"
                                ? "bg-green-50"
                                : ""
                            )}
                          >
                            <CardTitle className="text-sm font-medium">
                              {status
                                .split("-")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join("")}
                            </CardTitle>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ScrollArea className="h-[calc(100vh-16rem)]">
                              {activeModule.tasks
                                .filter((task) => task.status === status)
                                .map((task) => (
                                  <div
                                    key={task.id}
                                    className="mb-2 p-3 bg-white rounded-lg shadow"
                                  >
                                    <div className=" flex justify-between items-start mb-2">
                                      <span className="font-medium">
                                        {task.title}
                                      </span>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" className="">
                                            <MoreVertical className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                          </DropdownMenuItem>
                                          <DropdownMenuItem asChild>
                                            <DeleteTask id={task.id} />
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </div>
                                ))}
                            </ScrollArea>
                          </CardContent>
                        </Card>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
