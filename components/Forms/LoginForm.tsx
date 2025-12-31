"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import { Mail, Lock, Loader2 } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { Button } from "../ui/button";
import TextInput from "../FormInputs/TextInput";
import PasswordInput from "../FormInputs/PasswordInput";
import SubmitButton from "../FormInputs/SubmitButton";
import Logo from "../global/Logo";
import CustomCarousel from "../frontend/custom-carousel";

import { LoginProps } from "@/types/types";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [passErr, setPassErr] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<LoginProps>();

  /**
   * ✅ SAFE callbackUrl
   * - must exist
   * - must NOT point to /login
   */
  const callbackUrl = useMemo(() => {
    const raw = searchParams.get("callbackUrl");
    if (!raw) return "/dashboard";
    if (raw.includes("/login")) return "/dashboard";
    return raw;
  }, [searchParams]);

  async function onSubmit(data: LoginProps) {
    if (loading) return;

    try {
      setLoading(true);
      setPassErr("");

      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!result || result.error) {
        setPassErr("Invalid email or password");
        toast.error("Invalid credentials");
        return;
      }

      reset();
      toast.success("Login successful");
      router.replace(callbackUrl);
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Unexpected error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 relative">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6 mt-10 md:mt-0">
          <div className="absolute left-1/3 top-14 md:top-5 md:left-5">
            <Logo />
          </div>

          <div className="grid gap-2 text-center mt-10 md:mt-0">
            <h1 className="text-3xl font-bold">Login to your Account</h1>
          </div>

          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              register={register}
              errors={errors}
              label="Email Address"
              name="email"
              icon={Mail}
              placeholder="email"
            />

            <PasswordInput
              register={register}
              errors={errors}
              label="Password"
              name="password"
              icon={Lock}
              placeholder="password"
              forgotPasswordLink="/forgot-password"
            />

            {passErr && <p className="text-red-500 text-xs">{passErr}</p>}

            <SubmitButton
              title="Sign In"
              loadingTitle="Signing in..."
              loading={loading}
              className="w-full"
              loaderIcon={Loader2}
              showIcon={false}
            />
          </form>

          <div className="flex items-center py-4 justify-center space-x-1">
            <div className="h-[1px] w-full bg-slate-200" />
            <span className="uppercase text-sm">Or</span>
            <div className="h-[1px] w-full bg-slate-200" />
          </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Button
                onClick={() => signIn("google")}
                variant={"outline"}
                className="w-full"
              >
                <FaGoogle className="mr-2 w-6 h-6 text-red-500" />
                Login with Google
              </Button>
              <Button
                onClick={() => signIn("github")}
                variant={"outline"}
                className="w-full"
              >
                <FaGithub className="mr-2 w-6 h-6 text-slate-900 dark:text-white" />
                Login with Github
              </Button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-500">
              Not a Registered ?{" "}
              <Link
                href="/register"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <CustomCarousel />
      </div>
      </>
  );
}
