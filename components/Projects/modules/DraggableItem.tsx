// components/DraggableItem.tsx
import React, { CSSProperties, memo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { GripVertical, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TaskForm from "@/components/Forms/TaskForm";
import { DeleteTask } from "@/components/Forms/DeleteTask";
import { Task } from "@/types/types";

interface DraggableProps {
  id: string;
  task: Task;
  isDragging: boolean;
}

export default memo(function DraggableItem({ id, task, isDragging }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style: CSSProperties | undefined = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`my-2 cursor-move rounded-md bg-white p-3 shadow transition-all duration-200 ${
        isDragging ? "opacity-0" : ""
      }`}
    >
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab rounded p-1 hover:bg-gray-100 active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>
      <div className="flex items-center justify-between">
        <span className="line-clamp-1 text-sm font-medium">{task.title}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <TaskForm
                moduleId={task.moduleId}
                initialStatus={task.status}
                initialTitle={task.title}
                editingId={task.id}
              />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteTask id={task.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
});
