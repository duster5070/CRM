import RegisterForm from "@/components/Forms/RegisterForm";
import React from "react";

export default function page() {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="w-full px-4 md:px-0">
        <div className="border-gray-200 dark:border-gray-700 max-w-xl mx-auto border shadow rounded-md ">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
