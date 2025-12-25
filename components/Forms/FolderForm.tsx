"use client"
import {
  Dialog,
  DialogContent,
 
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {  FolderProps } from "@/types/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../FormInputs/SubmitButton";
import toast from "react-hot-toast";


import { Button } from "../ui/button";
import { Check, FolderPlus,  Pen } from "lucide-react";

import TextInput from "../FormInputs/TextInput";


import { createFolder, updateFolderById } from "@/actions/filemanager";

const FolderForm = ({

  userId,
 

  initialContent,
  editingId,
}: {
 
  userId: string;
 

  initialContent?: string;
  editingId?: string;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FolderProps>({
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

  async function saveFolder(data: FolderProps) {
    data.userId = userId;

    try {
      setLoading(true);
      if (editingId) {
        await updateFolderById(editingId, data);
        setLoading(false);
        setOpen(false);
        // Toast
        toast.success("Updated Successfully!");
      } else {
        await createFolder(data);
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
            <Button
          
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <FolderPlus className="w-4 h-4" />
            <span className="sr-only">New Folder</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingId ? "Edit Folder" : "Add New Folder"}
          </DialogTitle>
          {/* <DialogDescription>
            Please write your Comment here, with respect
          </DialogDescription> */}
        </DialogHeader>

        <form onSubmit={handleSubmit(saveFolder)}>
          <div className="grid grid-cols-12 gap-6 py-8">
            <div className="col-span-full space-y-3">
              {/* <Tiptap value={content} onChange={setContent} /> */}
              <div className="grid gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label=""
                  name="name"
                  icon={Check}
                />
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

export default FolderForm   ;
