import RegisterForm from "@/components/Forms/RegisterForm";
import React from "react";

export default function page() {
  return (
    <section className="flex h-screen items-center justify-center">
      <div className="w-full px-4 md:px-0">
        <div className="mx-auto max-w-xl rounded-md border border-gray-200 shadow dark:border-gray-700">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
