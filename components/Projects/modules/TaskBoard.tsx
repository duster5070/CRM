// components/Taskboard
"use client";
import { moduleData, Task } from "@/types/types";
import React, { useEffect, useState } from "react";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "./Column";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { TaskStatus } from "@prisma/client";
import { updateTaskStatus } from "@/actions/tasks";
import TaskForm from "@/components/Forms/TaskForm";
import { Progress } from "@/components/ui/progress";
import DraggableItem from "./DraggableItem";
 
export default function TaskBoard({
  activeModule,
}: {
  activeModule: moduleData;
}) {
  function calculatePercentageCompletion(tasks: Task[]): number {
    const allTasks = tasks.length;
    const completedTasks = tasks.filter(
      (task) => task.status === "COMPLETED"
    ).length;
    return allTasks === 0 ? 0 : Math.round((completedTasks / allTasks) * 100);
  }
 
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );
 
  const [module, setModule] = useState<moduleData>(activeModule);
  const percentageCompletion = calculatePercentageCompletion(module.tasks);
 useEffect(() => {
  setModule(activeModule);
 }, [activeModule]);
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };
 
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (over && active.id !== over.id) {
      const activeTask = module.tasks.find((task) => task.id === active.id);
      const overContainer = over.id as TaskStatus;
      if (activeTask && activeTask.status !== overContainer) {
        const updatedTasks = module.tasks.map((task) =>
          task.id === activeTask.id ? { ...task, status: overContainer } : task
        );
        setModule((prevModule) => ({
          ...prevModule,
          tasks: updatedTasks,
        }));
 
        try {
          // Update the database
          await updateTaskStatus(active.id as string, overContainer);
        } catch (error) {
          console.error("Error updating task status:", error);
          // Revert the optimistic update if the API call fails
          setModule((prevModule) => ({
            ...prevModule,
            tasks: activeModule.tasks,
          }));
        }
      }
    }
    setActiveId(null);
  };
 
  const activeTask = activeId
    ? module.tasks.find((task) => task.id === activeId)
    : null;
 
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="mb-6 flex items-center justify-between flex-wrap">
        <div className="">
          <h1 className="text-3xl font-bold mb-2">{activeModule.name}</h1>
          <div className="flex items-center">
            <Progress value={percentageCompletion} className="w-64 mr-4" />
            <span className="text-sm text-gray-500">
              {percentageCompletion}% complete
            </span>
          </div>
        </div>
        <div className="">
          {activeModule.tasks.length > 0 && (
            <p>({activeModule.tasks.length} Tasks)</p>
          )}
 
          <TaskForm
            moduleId={activeModule.id}
            initialStatus="TODO"
            isDefault={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {(["TODO", "INPROGRESS", "COMPLETED"] as const).map((status) => (
          <Column
            key={status}
            moduleId={activeModule.id}
            tasks={module.tasks}
            status={status}
            activeId={activeId}
          />
        ))}
      </div>
      <DragOverlay>
        {activeId && activeTask ? (
          <DraggableItem id={activeId} task={activeTask} isDragging={false} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
