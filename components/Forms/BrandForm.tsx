"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { generateSlug } from "@/lib/generateSlug";
import toast from "react-hot-toast";
import { User as PrismaUser, UserRole } from "@prisma/client";
import { CategoryProps, UserProps } from "@/types/types";
import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import ImageInput from "../FormInputs/ImageInput";
import FormFooter from "./FormFooter";
import { Headset, Mail, User, Lock, Flag, MapPin, Pencil, Building } from "lucide-react";
import PasswordInput from "../FormInputs/PasswordInput";
import { createUser, updateUserById } from "@/actions/users";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type ClientFormProps = {
  editingId?: string | undefined;

  initialData?: PrismaUser | undefined | null;
};
export default function BrandForm({
  editingId,

  initialData,
}: ClientFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProps>({
    defaultValues: {
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      country: initialData?.country || "",
      location: initialData?.location || "",
      companyName: initialData?.companyName || "",
      companyDescription: initialData?.companyDescription || "",
    },
  });

  const [loading, setLoading] = useState(false);
  const initialImage =
    initialData?.userLogo || "https://utfs.io/f/59b606d1-9148-4f50-ae1c-e9d02322e834-2558r.png";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [emailErr, setEmailErr] = useState<string | null>(null);

  async function onSubmit(data: UserProps) {
    setLoading(true);
    data.userLogo = imageUrl;

    try {
      if (editingId) {
        await updateUserById(editingId, data);
        setLoading(false);
        // Toast
        toast.success("Updated Successfully!");
        //reset
        reset();
        //route
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong, try again");
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="col-span-full space-y-3 lg:col-span-8">
          <Card>
            <CardContent>
              <div className="grid gap-6 pt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Country"
                    name="country"
                    icon={Flag}
                    placeholder="eg EGP"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Location"
                    name="location"
                    icon={MapPin}
                    placeholder="Cairo"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="email address"
                    name="email"
                    icon={Mail}
                    placeholder=""
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="phone number"
                    name="phone"
                    icon={Headset}
                    placeholder=""
                  />
                </div>

                <div className="space-y-4">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Company Name"
                    name="companyName"
                    icon={Building}
                    placeholder="Space Corp"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Company Description"
                    name="companyDescription"
                    icon={Pencil}
                    placeholder="Leading Space Exploration Company"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-full lg:col-span-4">
          <div className="grid auto-rows-max items-start gap-4">
            <ImageInput
              title="Brand Logo"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="clientProfileImage"
            />
          </div>
        </div>
      </div>
      <FormFooter
        href="/brand-settings"
        editingId={editingId}
        loading={loading}
        title="Brand Settings"
        parent=""
      />
    </form>
  );
}
