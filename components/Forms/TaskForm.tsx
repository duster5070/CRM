"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TaskProps } from "@/types/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../FormInputs/SubmitButton";
import toast from "react-hot-toast";

import { TaskStatus } from "@prisma/client";
import { Button } from "../ui/button";
import { Check, Edit, Pen, Plus } from "lucide-react";
import TextInput from "../FormInputs/TextInput";

import { createTask, updateTaskById } from "@/actions/tasks";

const TaskForm = ({
  moduleId,
  initialTitle,
  initialStatus,
  isDefault = false,
  editingId,
}: {
  moduleId: string;
  initialTitle?: string;
  initialStatus: TaskStatus;
  editingId?: string;
  isDefault?: boolean;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskProps>({
    defaultValues: {
      title: initialTitle || "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function saveModule(data: TaskProps) {
    data.moduleId = moduleId;
    data.status = initialStatus;

    try {
      setLoading(true);
      if (editingId) {
        await updateTaskById(editingId, data);
        setLoading(false);
        setOpen(false);
        // Toast
        toast.success("Updated Successfully!");
      } else {
        await createTask(data);
        setLoading(false);
        setOpen(false);
        // Toast
        toast.success("Successfully Created!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-1">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {editingId ? (
            <Button variant={"ghost"} className="flex w-full items-center">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          ) : (
            <Button
              variant={isDefault ? "default" : "ghost"}
              className="h-8 w-8 rounded-md bg-background text-primary"
            >
              <Plus className="h-4 w-4" />
              {isDefault && <span>Add New Task</span>}
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Task" : "Add New Task"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(saveModule)}>
            <div className="grid grid-cols-12 gap-6 py-8">
              <div className="col-span-full space-y-3">
                <div className="grid gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label=""
                    name="title"
                    icon={Check}
                  />
                </div>
              </div>
            </div>

            <SubmitButton
              className="w-full"
              title={editingId ? "Update Task" : "Add Task"}
              loading={loading}
            />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskForm;
