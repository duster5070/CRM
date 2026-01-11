"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { CommentProps, ModuleProps } from "@/types/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../FormInputs/SubmitButton";
import toast from "react-hot-toast";
import router from "next/router";
import { UserRole } from "@prisma/client";
import { createComment, updateCommentById } from "@/actions/comments";
import { Button } from "../ui/button";
import { Check, MessageSquare, Pen, Plus } from "lucide-react";
import Tiptap from "@/components/FormInputs/QuillEditor";
import TextInput from "../FormInputs/TextInput";
import Module from "module";
import { createModule, updateModuleById } from "@/actions/module";

const ModuleForm = ({
  projectId,
  userId,
  userName,

  initialContent,
  editingId,
}: {
  projectId: string;
  userId: string;
  userName: string;

  initialContent?: string;
  editingId?: string;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ModuleProps>({
    defaultValues: {
      name: initialContent || "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  function isRichTextEmpty(html?: string) {
    if (!html) return true;

    const text = html
      .replace(/<(.|\n)*?>/g, "") // remove HTML tags
      .replace(/&nbsp;/g, " ")
      .trim();

    return text.length === 0;
  }

  async function saveModule(data: ModuleProps) {
    data.userName = userName;
    data.projectId = projectId;

    data.userId = userId;

    try {
      setLoading(true);
      if (editingId) {
        await updateModuleById(editingId, data);
        setLoading(false);
        setOpen(false);
        // Toast
        toast.success("Updated Successfully!");
      } else {
        await createModule(data);
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
          <button className="opacity-0 transition-opacity group-hover:opacity-100">
            <Pen className="h-4 w-4 text-green-500" />
          </button>
        ) : (
          <Button variant="outline" className="w-full dark:bg-gray-900">
            <Plus className="mr-2 h-4 w-4" />
            Add New Module
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingId ? "Edit Module" : "Add New Module"}</DialogTitle>
          {/* <DialogDescription>
            Please write your Comment here, with respect
          </DialogDescription> */}
        </DialogHeader>

        <form onSubmit={handleSubmit(saveModule)}>
          <div className="grid grid-cols-12 gap-6 py-8">
            <div className="col-span-full space-y-3">
              {/* <Tiptap value={content} onChange={setContent} /> */}
              <div className="grid gap-3">
                <TextInput register={register} errors={errors} label="" name="name" icon={Check} />
              </div>
            </div>
          </div>

          <SubmitButton
            className="w-full"
            title={editingId ? "Update Module" : "Add Module"}
            loading={loading}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModuleForm;
