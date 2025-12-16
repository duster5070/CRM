"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ProjectProps } from "@/types/types";
import TextArea from "../FormInputs/TextAreaInput";
import { updateProjectById } from "@/actions/projects";
import SubmitButton from "../FormInputs/SubmitButton";

export type SelectOptionProps = {
  label: string;
  value: string;
};
export default function DescriptionForm({
  editingId,
  initialDescription,
}: {
  editingId?: string | undefined;
  initialDescription?: string | undefined | null;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectProps>({
    defaultValues: {
      description: initialDescription || "",
    },
  });

  const [loading, setLoading] = useState(false);

  async function updateDescription(data: ProjectProps) {
    try {
      setLoading(true);

      if (editingId) {
        await updateProjectById(editingId, data);
        setLoading(false);
        toast.success("Description Updated Successfully!");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(updateDescription)}>
      <div className="grid gap-3">
        <TextArea
          register={register}
          errors={errors}
          label=""
          name="description"
        />
        <SubmitButton size={"sm"} title="Update" loading={loading} />
      </div>
    </form>
  );
}
