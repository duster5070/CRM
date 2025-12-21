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
import { Check, Pen, Plus } from "lucide-react";
import TextInput from "../FormInputs/TextInput";

import { createTask, updateTaskById } from "@/actions/tasks";

const TaskForm = ({
  moduleId,
  initialTitle,
  initialStatus,
  editingId,
}: {
  moduleId: string;
  initialTitle?: string;
  initialStatus: TaskStatus;
  editingId?: string;
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {editingId ? (
          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Pen className="h-4 w-4 text-green-500" />
          </button>
        ) : (
          <Button className="">
            <Plus className="mr-2 h-4 w-4" />
            Add New Task
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
  );
};

export default TaskForm;
