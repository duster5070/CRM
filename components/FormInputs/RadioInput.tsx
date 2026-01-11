import React from "react";

type RadioOption = {
  label: string;
  id: string;
};

type RadioInputProps = {
  radioOptions: RadioOption[];
  register: any;
  label: string;
  name: string;
  errors: any;
};
export default function RadioInput({
  radioOptions,
  register,
  label,
  name,
  errors,
}: RadioInputProps) {
  return (
    <div className="grid gap-3 pt-4">
      <h3 className="font-semibold text-gray-900 dark:text-white">{label}</h3>
      <ul className="w-full items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:flex">
        {radioOptions.map((item, i) => {
          return (
            <li
              key={i}
              className="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r"
            >
              <div className="flex items-center ps-3">
                <input
                  {...register(`${name}`, { required: true })}
                  name={`${name}`}
                  id={item.id}
                  type="radio"
                  value={item.id}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                />
                <label
                  htmlFor={item.id}
                  className="ms-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {item.label}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
      {errors[`${name}`] && <span className="text-sm text-red-600">{label} is required</span>}
    </div>
  );
}
