"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { generateSlug } from "@/lib/generateSlug";
import toast from "react-hot-toast";
import {  User as PrismaUser, UserRole } from "@prisma/client";
import { CategoryProps, UserProps } from "@/types/types";
import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import ImageInput from "../FormInputs/ImageInput";
import FormFooter from "./FormFooter";
import { Headset, Mail, User,Lock, Flag, MapPin } from "lucide-react";
import PasswordInput from "../FormInputs/PasswordInput";
import { createUser, updateUserById } from "@/actions/users";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type CategoryFormProps = {
  editingId?: string | undefined;
  initialData?: PrismaUser | undefined | null;
};
export default function ClientForm({
  editingId,
  initialData,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProps>({
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      country: initialData?.country || "",
      location: initialData?.location || "",
      
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.image || "https://utfs.io/f/59b606d1-9148-4f50-ae1c-e9d02322e834-2558r.png";
  const [imageUrl, setImageUrl] = useState(initialImage);
    const [emailErr, setEmailErr] = useState<string | null>(null);
  

  async function onSubmit(data: UserProps) {
     setLoading(true);
     data.name = `${data.firstName} ${data.lastName}`;
     data.image =imageUrl;
     data.role = UserRole.CLIENT
     try {
    
         if (editingId) {
               await updateUserById(editingId, data);
               setLoading(false);
               // Toast
               toast.success("Updated Successfully!");
               //reset
               reset();
               //route
               router.push("/dashboard/clients");
             } else {
                  const res = await createUser(data);
       if (res.status === 409) {
         setLoading(false);
         setEmailErr(res.error);
       } else if (res.status === 200) {
         setLoading(false);
         toast.success("Client Created successfully");
         router.push("/dashboard/clients");
       } else {
         setLoading(false);
         toast.error("Something went wrong");
       }
             }
     } catch (error) {
       setLoading(false);
       console.error("Network Error:", error);
       toast.error("Its seems something is wrong, try again");
     }
   }
 
  console.log(status);

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        href="/clients"
        parent=""
        title="Client"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-8 col-span-full space-y-3">
          <Card>
            <CardContent>
              <div className="grid gap-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextInput
                              register={register}
                              errors={errors}
                              label="First Name"
                              name="firstName"
                              icon={User}
                              placeholder="first Name"
                            />
                            <TextInput
                              register={register}
                              errors={errors}
                              label="Last Name"
                              name="lastName"
                              icon={User}
                              placeholder="last Name"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextInput
                              register={register}
                              errors={errors}
                              label="Phone"
                              name="phone"
                              icon={Headset}
                              placeholder="phone"
                            />
                            <div className="">
                              <TextInput
                                type="email"
                                register={register}
                                errors={errors}
                                label="Email Address"
                                name="email"
                                icon={Mail}
                                placeholder="email"
                              />
                              {emailErr && (
                                <p className="text-red-500 text-xs mt-2">{emailErr}</p>
                              )}
                            </div>
                          </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                       {!editingId &&   <PasswordInput
                            register={register}
                            errors={errors}
                            label="Password"
                            name="password"
                            icon={Lock}
                            placeholder="password"
                            type="password"
                          />}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-full ">
          <div className="grid auto-rows-max items-start gap-4 ">
            <ImageInput
              title="Client Profile Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="clientProfileImage"
            />
          </div>
        </div>
      </div>
      <FormFooter
        href="/clients"
        editingId={editingId}
        loading={loading}
        title="Client"
        parent=""
      />
    </form>
  );
}
