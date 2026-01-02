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
import { Check, CheckCheck, ChevronLeft, Delete, Edit, MoreVertical, Plus, Trash2 } from "lucide-react";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import TaskForm from "@/components/Forms/TaskForm";
import { DeleteTask } from "@/components/Forms/DeleteTask";
import TaskBoard from "@/components/Projects/modules/TaskBoard";
import AuthenticatedAvatar from "@/components/global/AuthenticatedAvatar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import ModuleForm from "@/components/Forms/ModuleForm";
import { ModeToggle } from "@/components/mode-toggle";
import BackBtn from "@/components/BackBtn";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const {id} = await params
  const { projectId } = await searchParams;
   const session = await getServerSession(authOptions)
  const user = session?.user
  const modules = (await getProjectModules(projectId as string)) || [];
  const activeModule = modules.find((module, i) => module.id === id);
  if (!activeModule || modules?.length < 0) {
    return notFound();
  }
 
  let percentageCompletion = 0;
  let allTasks = activeModule.tasks.length ?? 0;
  const completedTasks =activeModule.tasks.length > 0 ? activeModule.tasks.filter((task,i)=>task.status=="COMPLETED").length:0
  if(allTasks==0 || completedTasks==0){
    percentageCompletion=0;
  } else {
    percentageCompletion = (completedTasks/allTasks)*100
  }
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-500 p-8">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gradient-to-br from-gray-600 to-gray-900 rounded-xl shadow min-h-96">
         <div className="flex items-center p-4 justify-between">
                <BackBtn title="Back to Project"/>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-2">
                  <ModeToggle />
                  <AuthenticatedAvatar session={session} />
                </div>
              </div>
        <div className="grid grid-cols-12">
          <div className="col-span-full lg:col-span-3 px-8 py-4">
            <h2 className="py-2 text-xl font-bold">Project Modules</h2>
            <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
              {modules.map((module) => (
                <Link
                  href={`/project/modules/${module.id}?projectId=${module.projectId}`}
                  key={module.id}
                  className={`p-2 mb-2 cursor-pointer rounded-lg flex items-center
                      ${
                    activeModule?.id === module.id
                      ? "bg-blue-100 dark:bg-gray-600"
                      : "hover:bg-gray-100 dark:hover:bg-gray-900"
                  }`}
                >
                    { activeModule?.id === module.id?
                    (<CheckCheck className="w-4 h-4 mr-2 text-blue-500"/>):
                    (<Check className="w-4 h-4 mr-2 text-muted-foreground"/>)}
                    
                  <span>{module.name}</span>
                </Link>
              ))}
            </ScrollArea>
            <ModuleForm
              projectId={projectId as string}
              userId={user.id}
              userName={user.name}
            />
          </div>
          <div className="col-span-full lg:col-span-9 dark:bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg bg-gray-100 px-8 py-4 dark:bg-gray-900">
            <div className="flex-1 p-8">
              {activeModule && (
                <>
                  <TaskBoard activeModule={activeModule}/>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
