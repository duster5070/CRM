"use client";
import { Button } from "@/components/ui/button";
import { updateProjectById } from "@/actions/projects";
import { CategoryProps, ProjectProps } from "@/types/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextInput from "../FormInputs/TextInput";
import { Link, Mail } from "lucide-react";
import SubmitButton from "../FormInputs/SubmitButton";
import { createSubscription } from "@/actions/subscribe";

export type SelectOptionProps = {
  label: string;
  value: string;
};
export type SubscriberProps = {
  email: string;
  userId: string;
};
export default function SubscribeForm({
  userId,
}: {
  userId: string | undefined;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubscriberProps>();
  const [loading, setLoading] = useState(false);
  async function subscribe(data: SubscriberProps) {
    data.userId = userId ?? "";
    try {
      setLoading(true);
      const res = await createSubscription({ ...data });
      setLoading(false);
      if (res?.status === 201) {
        toast.success("Subscribed successfully!");
        reset();
      } else {
        toast.error(res?.error ?? "Something went wrong");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <form className="" onSubmit={handleSubmit(subscribe)}>
      <div className="flex items-center gap-3 pb-4">
        <TextInput
          register={register}
          errors={errors}
          label=""
          name="email"
          icon={Mail}
          placeholder="johndoe@gmail.com"
        />
        <SubmitButton
          className="rounded-r-lg bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 font-semibold"
          size={"sm"}
          title="Subscribe"
          buttonIcon={Mail}
          loading={loading}
        />
      </div>
    </form>
  );
}
