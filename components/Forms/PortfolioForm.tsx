"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { generateSlug } from "@/lib/generateSlug";
import toast from "react-hot-toast";
import { PortfolioProfile, User as PrismaUser, UserRole } from "@prisma/client";
import { CategoryProps, PortfolioProps, UserProps } from "@/types/types";
import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import ImageInput from "../FormInputs/ImageInput";
import FormFooter from "./FormFooter";
import {
  Headset,
  Mail,
  User,
  Lock,
  Flag,
  MapPin,
  Pencil,
  Building,
  LayoutGrid,
  Link,
  Linkedin,
  XIcon,
  Instagram,
  X,
  Twitter,
  Youtube,
  Github,
} from "lucide-react";
import PasswordInput from "../FormInputs/PasswordInput";
import { createUser, updateUserById } from "@/actions/users";
import { createPortfolioProfile, updatePortfolioById } from "@/actions/portfolio";
import { Session } from "next-auth";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type ClientFormProps = {
  editingId?: string | undefined;
  initialData?: PortfolioProfile | undefined | null;
  session: Session | null;
  count: number;
};
export default function PortfolioForm({ editingId, initialData, session, count }: ClientFormProps) {
  const user = session?.user;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PortfolioProps>({
    defaultValues: {
      email: initialData?.email || user?.email,
      location: initialData?.location || "",
      description: initialData?.description || "",
      name: initialData?.name || user?.name,
      projectCount: initialData?.projectCount || count,
      bookingLink: initialData?.bookingLink || "",
      twitterUrl: initialData?.twitterUrl || "",
      youtubeUrl: initialData?.youtubeUrl || "",
      linkedinUrl: initialData?.linkedinUrl || "",
      instagramUrl: initialData?.instagramUrl || "",
      githubUrl: initialData?.githubUrl || "",
    },
  });
  const [loading, setLoading] = useState(false);
  const initialImage =
    initialData?.profileImage || "https://utfs.io/f/59b606d1-9148-4f50-ae1c-e9d02322e834-2558r.png";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [emailErr, setEmailErr] = useState<string | null>(null);

  async function onSubmit(data: PortfolioProps) {
    setLoading(true);
    data.profileImage = imageUrl;
    data.userId = user.id;
    data.projectCount = Number(data.projectCount);
    try {
      if (editingId) {
        await updatePortfolioById(editingId, data);
        setLoading(false);
        // Toast
        toast.success("Updated Successfully!");
        //reset
        reset();
        //route
      } else {
        const res = await createPortfolioProfile(data);
        setLoading(false);
        toast.success("updated Successfully");
        reset();
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
                    label="Email address"
                    name="email"
                    icon={Mail}
                    placeholder=""
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
                    label="Full Name"
                    name="name"
                    icon={User}
                    placeholder="John Doe"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Number of Projects"
                    name="projectCount"
                    icon={LayoutGrid}
                    type="number"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Google Calender Booking Link"
                    name="bookingLink"
                    icon={Link}
                    placeholder=""
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Twitter Link"
                    name="twitterUrl"
                    icon={Twitter}
                    placeholder=""
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Linkedin Link"
                    name="linkedinUrl"
                    icon={Linkedin}
                    placeholder=""
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Instagram Link"
                    name="instagramUrl"
                    icon={Instagram}
                    placeholder=""
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Youtube Link"
                    name="youtubeUrl"
                    icon={Youtube}
                    placeholder=""
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Github Link"
                    name="githubUrl"
                    icon={Github}
                    placeholder=""
                  />
                </div>
                <div className="space-y-4">
                  <TextArea
                    register={register}
                    errors={errors}
                    label="Write a summary Statement"
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
              title="Profile Image"
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
        title="Protfolio Profile"
        parent=""
      />
    </form>
  );
}
