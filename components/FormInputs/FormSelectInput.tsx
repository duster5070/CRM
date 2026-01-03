"use client";
import AddNewButton from "@/components/FormInputs/AddNewButton";
import React, { useState } from "react";
import Select from "react-tailwindcss-select";
import { Option, Options } from "react-tailwindcss-select/dist/components/type";
type FormSelectInputProps = {
  options: Options;
  label: string;
  option: Option;
  setOption: any;
  href?: string;
  labelShown?: boolean;
  toolTipText?: string;
};
export default function FormSelectInput({
  options,
  label,
  option,
  setOption,
  href,
  toolTipText,
  labelShown = true,
}: FormSelectInputProps) {
  return (
    <div className="">
      {labelShown && (
        <h2 className="block pb-2 text-sm font-medium leading-6 text-gray-900 dark:text-white">
          Select {label}
        </h2>
      )}
      <div className="flex items-center space-x-2">
        <div className="w-full dark:[&_*]:!bg-gray-800 dark:[&_*]:!text-white dark:[&_button]:!border-gray-600 dark:[&_li:hover]:!bg-gray-700 dark:[&_ul]:!bg-gray-800">
          <Select
            isSearchable
            primaryColor="blue"
            value={option}
            onChange={(item) => setOption(item)}
            options={options}
            placeholder={label}
          />
        </div>
        {href && toolTipText && <AddNewButton toolTipText={toolTipText} href={href} />}
      </div>
    </div>
  );
}
