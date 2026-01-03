"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ProjectProps } from "@/types/types";
import { updateProjectById } from "@/actions/projects";
import SubmitButton from "../FormInputs/SubmitButton";
import dynamic from "next/dynamic";
import { set } from "date-fns";

const Editor = dynamic(() => import("../Editor/advanced-editor"), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse rounded-xl border bg-muted p-4" />,
});

export type SelectOptionProps = {
  label: string;
  value: string;
};
export default function NotesForm({
  editingId,
  initialNotes,
  isEditable,
}: {
  editingId?: string | undefined;
  initialNotes?: string | undefined | null;
  isEditable: boolean;
}) {
  const [content, setContent] = useState<any>(initialNotes);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectProps>();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function updateDescription(data: ProjectProps) {
    try {
      data.notes = JSON.stringify(content);
      setLoading(true);

      if (editingId) {
        await updateProjectById(editingId, data);
        setLoading(false);
        setOpen(false);
        toast.success("Notes Updated Successfully!");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(updateDescription)}>
      <div className="grid gap-3">
        <Editor isEditable={isEditable} initialValue={content} onChange={setContent} />
        {isEditable && <SubmitButton size={"sm"} title="Update" loading={loading} />}
      </div>
    </form>
  );
}
