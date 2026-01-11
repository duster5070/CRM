import { cn } from "@/lib/utils";
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { CircleHelp, Mail } from "lucide-react";
type TextInputProps = {
  register: any;
  errors: any;
  label: string;
  type?: string;
  name: string;
  toolTipText?: string;
  unit?: string;
  placeholder?: string;
  icon?: any;
  className?: string;
};
export default function TextInput({
  register,
  errors,
  label,
  type = "text",
  name,
  toolTipText,
  unit,
  icon,
  placeholder,
  className,
}: TextInputProps) {
  const Icon = icon;
  return (
    <div>
      <div className="flex items-center space-x-2">
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-primary">
          {label}
        </label>
        {toolTipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <CircleHelp className="h-4 w-4 text-slate-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{toolTipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="mt-2">
        <div className="relative rounded-md">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon className="h-4 w-4 text-slate-300" />
            </div>
          )}
          <input
            id={name}
            type={type}
            {...register(`${name}`, { required: true })}
            className={cn(
              "block w-full rounded-md border-0 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
              "dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:[color-scheme:dark] dark:placeholder:text-gray-500",
              (errors[`${name}`] && "pl-8 focus:ring-red-500") || (icon && "pl-8") || className,
            )}
            placeholder={placeholder || label}
          />
          {unit && (
            <p className="absolute inset-y-0 right-1 my-[2px] flex items-center rounded-br-md rounded-tr-md bg-white px-3 py-2">
              {unit}
            </p>
          )}
        </div>
        {errors[`${name}`] && <span className="text-xs text-red-600">{label} is required</span>}
      </div>
    </div>
  );
}
