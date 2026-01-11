"use client";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Check,
  CloudUpload,
  Delete,
  File,
  ListFilter,
  Loader2,
  PlusCircle,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { RiFileExcel2Line } from "react-icons/ri";
// import { SiMicrosoftexcel } from "react-icons/si";
import Select from "react-tailwindcss-select";
import { Options, SelectValue } from "react-tailwindcss-select/dist/components/type";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatBytes } from "@/lib/formatBytes";
import { generateSlug } from "@/lib/generateSlug";
import { createBulkCategories } from "@/actions/categories";
import toast from "react-hot-toast";
import exportDataToExcel from "@/lib/exportDataToExcel";
import { FaFileExcel } from "react-icons/fa";

type TableHeaderProps = {
  title: string;
  href: string;
  linkTitle: string;
  data: any;
  model: string;
  showImport?: boolean;
};
export default function TableHeader({
  title,
  href,
  linkTitle,
  data,
  model,
  showImport = true,
}: TableHeaderProps) {
  const [status, setStatus] = useState<SelectValue>(null);
  const [date, setDate] = useState<SelectValue>(null);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState("");
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  let excelDownload = "#";
  if (model === "category") {
    excelDownload = "/Categories.xlsx";
  } else if (model === "brand") {
    excelDownload = "/Brands.xlsx";
  } else if (model === "warehouse") {
    excelDownload = "/Warehouses.xlsx";
  } else if (model === "supplier") {
    excelDownload = "/Suppliers.xlsx";
  } else if (model === "unit") {
    excelDownload = "/Units.xlsx";
  } else if (model === "product") {
    excelDownload = "/Products.xlsx";
  }
  console.log(excelFile);
  const options: Options = [
    { value: "true", label: "Active" },
    { value: "false", label: "Disabled" },
  ];
  const dateOptions: Options = [
    { value: "lastMonth", label: "Last Month" },
    { value: "thisMonth", label: "This Month" },
  ];
  const handleStatusChange = (item: SelectValue) => {
    console.log("value:", item);
    setStatus(item);
  };
  const handleDateChange = (item: SelectValue) => {
    console.log("value:", item);
    setDate(item);
  };

  function previewData() {
    setPreview(true);
    if (excelFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          // SheetName
          const sheetName = workbook.SheetNames[0];
          // Worksheet
          const workSheet = workbook.Sheets[sheetName];
          // Json
          const json = XLSX.utils.sheet_to_json(workSheet);
          setJsonData(JSON.stringify(json, null, 2));
        }
      };
      reader.readAsBinaryString(excelFile);
    }
  }
  function saveData() {
    setPreview(false);
    if (excelFile) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          // SheetName
          const sheetName = workbook.SheetNames[0];
          // Worksheet
          const workSheet = workbook.Sheets[sheetName];
          // Json
          const json = XLSX.utils.sheet_to_json(workSheet);
          setJsonData(JSON.stringify(json, null, 2));

          try {
            setLoading(true);
            if (model === "category") {
              const categories = json.map((item: any) => {
                return {
                  title: item.Title,
                  slug: generateSlug(item.Title),
                  description: item.Description,
                  imageUrl: item.Image,
                  mainCategoryId: item.mainCategoryId,
                  status: true,
                };
              });
              await createBulkCategories(categories);
            }
            setLoading(false);
            setUploadSuccess(true);
            // window.location.reload();
            // toast.success("All Data Synced Successfully with No errors 👍");
          } catch (error) {
            setUploadSuccess(false);
            setLoading(false);
            toast.error("Something went wrong, Please Try again 😢");
            console.log(error);
          }
        }
      };
      reader.readAsBinaryString(excelFile);
    }
  }
  function handleExportData() {
    console.log("data exported");
    const today = new Date();
    const filename = `Exported ${title} ${today.toDateString()}`;
    // console.log(filename);
    exportDataToExcel(data, filename);
  }
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between border-b border-gray-200 py-3 dark:border-gray-600">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">
          {title}({data.length})
        </h2>
        <div className="ml-auto flex items-center gap-2">
          <Button onClick={handleExportData} size="sm" variant="outline" className="h-8 gap-1">
            <FaFileExcel className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
          </Button>

          {showImport && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setUploadSuccess(false)}
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1"
                >
                  <RiFileExcel2Line className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Import</span>
                </Button>
              </DialogTrigger>
              {loading ? (
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Excel Upload</DialogTitle>
                    <DialogDescription className="text-xs">
                      You can Bring all your Data from excel, Please Download the Sample file First
                      to Make Sure you have Data Columns Named Correctly
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex h-60 w-full items-center justify-center rounded-md border">
                    <Button disabled className="items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Syncing Data Please wait ...
                    </Button>
                  </div>
                  {!loading && (
                    <DialogFooter className="justify-between">
                      {preview ? (
                        <Button onClick={() => setPreview(false)} variant={"outline"} type="button">
                          Stop Preview
                        </Button>
                      ) : (
                        <Button onClick={previewData} variant={"outline"} type="button">
                          Preview
                        </Button>
                      )}
                      <Button onClick={saveData} type="button">
                        Save Data
                      </Button>
                    </DialogFooter>
                  )}
                </DialogContent>
              ) : (
                <>
                  {uploadSuccess ? (
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Excel Upload</DialogTitle>
                        <DialogDescription className="text-xs">
                          You can Bring all your Data from excel, Please Download the Sample file
                          First to Make Sure you have Data Columns Required
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex h-72 w-full flex-col items-center justify-center rounded-md border">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                          <Check />
                        </div>
                        <h2 className="px-8 pt-2 text-center text-xs">
                          Data Synced Successfully. You can close the Window
                        </h2>
                      </div>

                      <DialogFooter className="justify-between">
                        <DialogClose asChild>
                          <Button
                            onClick={() => window.location.reload()}
                            type="button"
                            variant="secondary"
                          >
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  ) : (
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Excel Upload</DialogTitle>
                        <DialogDescription className="text-xs">
                          You can Bring all your Data from excel, Please Download the Sample file
                          First to Make Sure you have Data Columns Required
                        </DialogDescription>
                      </DialogHeader>
                      {preview && jsonData ? (
                        <ScrollArea className="h-72 w-full rounded-md border">
                          <div className="p-4">
                            <pre>{jsonData}</pre>
                          </div>
                        </ScrollArea>
                      ) : (
                        <div className="grid gap-4 py-4">
                          <Button asChild variant="outline">
                            <Link href={excelDownload} download>
                              Download {model} Sample Data
                            </Link>
                          </Button>

                          <div className="flex w-full items-center justify-center">
                            <label
                              htmlFor="dropzone-file"
                              className="dark:hover:bg-bray-800 flex h-16 w-full cursor-pointer flex-row items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 lg:h-36 lg:flex-col"
                            >
                              <div className="flex flex-row items-center justify-center gap-4 pb-6 pt-5 lg:flex-col lg:gap-0">
                                <CloudUpload className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" />

                                <p className="text-sm text-gray-500 dark:text-gray-400 lg:mb-2">
                                  <span className="font-semibold">Click to upload</span>{" "}
                                  <span className="hidden lg:inline"> or drag and drop</span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Only Excel Files (.xlsx)
                                </p>
                              </div>
                              <input
                                id="dropzone-file"
                                accept=".xls,.xlsx"
                                type="file"
                                className="hidden"
                                onChange={(e) =>
                                  setExcelFile(e.target.files ? e.target.files[0] : null)
                                }
                              />
                            </label>
                          </div>
                          {excelFile && (
                            <div className="flex items-center justify-between rounded-md bg-slate-100 px-6 py-2 shadow-lg dark:bg-slate-800 lg:py-3">
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-slate-300 p-2 dark:bg-slate-500 lg:h-14 lg:w-14 lg:p-4">
                                  <RiFileExcel2Line className="h-4 w-4" />
                                </div>
                                <div className="">
                                  <p className="text-sm font-semibold">{excelFile.name}</p>
                                  <span className="text-xs">{formatBytes(excelFile.size)}</span>
                                </div>
                              </div>
                              <button onClick={() => setExcelFile(null)}>
                                <X className="h-5 w-5 text-slate-600" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      <DialogFooter className="justify-between">
                        {preview ? (
                          <Button
                            onClick={() => setPreview(false)}
                            variant={"outline"}
                            type="button"
                          >
                            Stop Preview
                          </Button>
                        ) : (
                          <Button onClick={previewData} variant={"outline"} type="button">
                            Preview
                          </Button>
                        )}
                        <Button onClick={saveData} type="button">
                          Save Data
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  )}
                </>
              )}
            </Dialog>
          )}
          <Button size="sm" asChild className="h-8 gap-1">
            <Link href={href}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">{linkTitle}</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
