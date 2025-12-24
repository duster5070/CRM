"use client";
import { deleteTask } from "@/actions/tasks";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export function DeleteTask({ id }: { id: string }) {
  async function handleDeleteTask() {
    try {
      const res = await deleteTask(id);
      if (res.ok) {
        toast.success("Task Deleted Successfully!");
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Button
      variant="ghost"
      className="w-full text-red-500 hover:text-red-600"
      onClick={handleDeleteTask}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      Delete
    </Button>
  );
}
