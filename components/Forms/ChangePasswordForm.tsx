"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Lock, LockOpen } from "lucide-react";

import { updateUserPassword } from "@/actions/users";
import TextInput from "../FormInputs/TextInput";
import PasswordInput from "../FormInputs/PasswordInput";
import FormFooter from "./FormFooter";

export type PasswordProps = {
  oldPassword: string;
  newPassword: string;
};

type ClientFormProps = {
  editingId?: string;
};

export default function ChangePasswordForm({ editingId }: ClientFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordProps>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [passErr, setPassErr] = useState<string | null>(null);

  async function onSubmit(data: PasswordProps) {
    if (!editingId) {
      toast.error("Invalid user");
      return;
    }

    setLoading(true);
    setPassErr(null);

    try {
      const res = await updateUserPassword(editingId, data);

      if (!res) {
        throw new Error("No response from server");
      }

      if (res.status === 401) {
        setPassErr(res.error);
        return;
      }

      if (res.status === 200) {
        toast.success("Password updated successfully");
        reset();
        return;
      }

      throw new Error("Unexpected response");
    } catch (error) {
      console.error("Change password error:", error);
      toast.error("Something went wrong. Try again." + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="col-span-full space-y-3 lg:col-span-8">
          <Card>
            <CardContent>
              <div className="grid gap-6 pt-4">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Old Password"
                  name="oldPassword"
                  icon={LockOpen}
                  placeholder="••••••••"
                />

                <PasswordInput
                  register={register}
                  errors={errors}
                  label="New Password"
                  name="newPassword"
                  icon={Lock}
                  placeholder="••••••••"
                />

                {passErr && <p className="text-xs text-red-500">{passErr}</p>}

                <FormFooter
                  href="/change-password"
                  editingId={editingId}
                  loading={loading}
                  title="Change Password"
                  parent=""
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
