// components/Column.tsx
import { DeleteTask } from "@/components/Forms/DeleteTask";
import TaskForm from "@/components/Forms/TaskForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Task } from "@/types/types";
import { useDroppable } from "@dnd-kit/core";
import { TaskStatus } from "@prisma/client";
import React from "react";
import DraggableItem from "./DraggableItem";
 
export default function Column({
  tasks,
  status,
  moduleId,
  activeId,
}: {
  tasks: Task[];
  status: TaskStatus;
  moduleId: string;
  activeId: string | null;
}) {
  const { setNodeRef } = useDroppable({
    id: status,
  });
  return (
    <div className="rounded-tl-lg rounded-tr-lg  border overflow-hidden bg-background text-black">
      <div
        className={cn(
          "flex flex-row items-center justify-between space-y-0  px-3 ",
          status === "TODO"
            ? "bg-orange-50 dark:bg-orange-300"
            : status === "INPROGRESS"
            ? "bg-blue-50 dark:bg-blue-300"
            : "bg-green-50 dark:bg-green-300"
        )}
      >
        <h2 className="text-sm font-bold">
          {status
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </h2>
        <div className="flex items-center space-x-2">
          <TaskForm moduleId={moduleId} initialStatus={status} />
        </div>
      </div>
      <div className="px-2">
        <ScrollArea ref={setNodeRef} className="h-[calc(100vh-16rem)]">
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <DraggableItem
                key={task.id}
                id={task.id}
                task={task}
                isDragging={activeId === task.id}
              />
            ))}
        </ScrollArea>
      </div>
    </div>
  );
}