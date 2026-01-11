import { cn } from "@/lib/utils";
import React from "react";
type TextAreaProps = {
  register: any;
  errors: any;
  label: string;
  name: string;
  helperText?: string;
};
export default function TextArea({
  register,
  errors,
  label,
  name,
  helperText = "",
}: TextAreaProps) {
  return (
    <div className="col-span-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={name}
          {...register(`${name}`, { required: true })}
          rows={3}
          className={cn(
            "block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm sm:leading-6",
            errors[`${name}`] && "focus:ring-red-500",
          )}
        />
        {errors[`${name}`] && <span className="text-xs text-red-600">Description is required</span>}
      </div>
      {helperText && <p className="mt-1 text-sm leading-6 text-gray-600">{helperText}</p>}
    </div>
  );
}
