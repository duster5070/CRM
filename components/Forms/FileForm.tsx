"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, Trash } from "lucide-react";
import toast from "react-hot-toast";

import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { updateFileById, deleteFile } from "@/actions/filemanager";

interface FormValues {
  name: string;
}

interface FileFormProps {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileId: string;
  initialName: string;
  onDeleted?: () => void;
}

const FileForm = ({ open, onOpenChange, fileId, initialName, onDeleted }: FileFormProps) => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { name: "" },
  });

  // 🔑 keep form in sync when switching files
  useEffect(() => {
    reset({ name: initialName });
  }, [initialName, reset]);

  async function onSubmit(data: FormValues) {
    try {
      setLoading(true);
      await updateFileById(fileId, { name: data.name });
      toast.success("File renamed");
      onOpenChange(false);
    } catch {
      toast.error("Failed to update file");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setDeleting(true);
      await deleteFile(fileId);
      toast.success("File deleted");
      onDeleted?.();
      onOpenChange(false);
    } catch {
      toast.error("Failed to delete file");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit File</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextInput
            label="File name"
            register={register}
            errors={errors}
            name="name"
            icon={Check}
          />

          <SubmitButton className="w-full" title="Rename File" loading={loading} />
        </form>

        {/* Destructive section */}
        <div className="mt-6 border-t pt-4">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            <Trash className="h-4 w-4" />
            {deleting ? "Deleting…" : "Delete file"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileForm;
