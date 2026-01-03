"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { generateSlug } from "@/lib/generateSlug";
import toast from "react-hot-toast";
import { Category, Project, User } from "@prisma/client";
import { CategoryProps, ProjectProps } from "@/types/types";
import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import ImageInput from "../FormInputs/ImageInput";
import FormFooter from "./FormFooter";
import { createCategory, updateCategoryById } from "@/actions/categories";
import FormSelectInput from "../FormInputs/FormSelectInput";
import { createProject, updateProjectById } from "@/actions/projects";
import { convertDateToIso } from "@/lib/converDateToIso";
import { set } from "date-fns";
import { convertIsoDateToStringDate } from "@/lib/converIsoDateToStringDate";

export type SelectOptionProps = {
  label: string;
  value: string;
};

type ProjectFormProps = {
  editingId?: string | undefined;
  initialData?: Project | undefined | null;
  userId: string;
  clients: SelectOptionProps[];
};

export default function ProjectForm({ editingId, initialData, userId, clients }: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectProps>({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      startDate: convertIsoDateToStringDate(initialData?.startDate ?? "") || null,
      endDate: convertIsoDateToStringDate(initialData?.endDate ?? "") || null,
      budget: initialData?.budget || 0,
      deadline: initialData?.deadline || 0,
      notes: initialData?.notes || "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialImage = initialData?.thumbnail || "/thumbnail.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  const initialClientId = initialData?.clientId;
  const initialClient = clients.find((user) => user.value === initialClientId);
  const [selectedClient, setSelectedClient] = useState<any>(initialClient);

  async function saveProject(data: ProjectProps) {
    try {
      setLoading(true);

      data.slug = generateSlug(data.name);
      data.thumbnail = imageUrl;
      data.userId = userId;
      data.clientId = selectedClient.value;
      data.startDate = convertDateToIso(data.startDate);

      data.endDate = convertDateToIso(data.endDate);
      data.budget = Number(data.budget);
      data.deadline = Number(data.deadline);
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      console.log(" days " + differenceInDays);

      if (editingId) {
        await updateProjectById(editingId, data);
        setLoading(false);
        toast.success("Updated Successfully!");
        reset();
        router.push("/dashboard/projects");
        setImageUrl("/placeholder.svg");
      } else {
        const res = await createProject(data);

        if (res?.status === 409) {
          setLoading(false);
          toast.error(res.error);
        } else if (res?.status === 200) {
          setLoading(false);
          toast.success("Successfully Created!");
          reset();
          setImageUrl("/thumbnail.png");
          router.push("/dashboard/projects");
        } else {
          setLoading(false);
          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(saveProject)}>
      <FormHeader
        href="/projects"
        parent=""
        title="Project"
        editingId={editingId}
        loading={loading}
      />

      <div className="ml-1 grid grid-cols-12 gap-6 py-8">
        <div className="col-span-full space-y-3 lg:col-span-8">
          <Card>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3 pt-4">
                  <TextInput register={register} errors={errors} label="Project Name" name="name" />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Project Budget"
                    name="budget"
                    placeholder="8000"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Deadline in Weeks"
                    name="deadline"
                    placeholder="eg: 4 weeks"
                  />
                </div>

                <div className="grid gap-3">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <TextInput
                      register={register}
                      errors={errors}
                      type="date"
                      label="Project start Date"
                      name="startDate"
                    />
                    <TextInput
                      register={register}
                      errors={errors}
                      type="date"
                      label="Project end Date"
                      name="endDate"
                    />
                  </div>
                </div>

                <div className="grid gap-3">
                  <FormSelectInput
                    label="Clients"
                    options={clients}
                    option={selectedClient}
                    setOption={setSelectedClient}
                    toolTipText="Add New Client"
                    href="/dashboard/clients/new"
                  />
                </div>

                <div className="grid gap-3">
                  <TextArea
                    register={register}
                    errors={errors}
                    label="Project Description"
                    name="description"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-full lg:col-span-4">
          <div className="grid auto-rows-max items-start gap-4">
            <ImageInput
              title="Project Thumbnail"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="projectThumbnail"
            />
          </div>
        </div>
      </div>

      <FormFooter
        href="/projects"
        editingId={editingId}
        loading={loading}
        title="Project"
        parent=""
      />
    </form>
  );
}
