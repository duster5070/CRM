"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  MoreHorizontal,
  FileText,
  Grid,
  ChevronDown,
  Edit,
  Delete,
  FolderPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import FolderForm from "../Forms/FolderForm";
import FileForm from "../Forms/FileForm";
import { UserFile, UserFolder } from "@/types/types";
import MultipleFileUploader from "../FormInputs/MultipleFileUploader";
import { useState } from "react";
import { deleteFolder } from "@/actions/filemanager";
import toast from "react-hot-toast";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface FileView {
  id: string;
  name: string;
  type: "PDF" | "XLS" | "FILE";
  size: string;
  created: string;
  format: string;
  modified: string;
}

type UserFolderWithSize = UserFolder & {
  sizeMB: number;
};

export function FileManager({
  userId,
  userFolders,
}: {
  userId: string | undefined;
  userFolders: UserFolder[];
}) {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const currentFolderId = searchParams.get("fId");

  const [selectedFile, setSelectedFile] = React.useState<FileView | null>(null);
  const [folderToDelete, setFolderToDelete] = useState<UserFolder | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingFile, setEditingFile] = useState<UserFile | null>(null);

  const userFoldersWithSize: UserFolderWithSize[] = React.useMemo(() => {
    return userFolders.map((folder) => {
      const totalBytes = folder.files.reduce(
        (acc, file) => acc + (Number(file.size) || 0),
        0
      );

      return {
        ...folder,
        sizeMB: Number((totalBytes / 1024 / 1024).toFixed(2)),
      };
    });
  }, [userFolders]);

  const totalMBUsed = userFoldersWithSize.reduce(
    (acc, folder) => acc + folder.sizeMB,
    0
  );

  const usedMB = Number(totalMBUsed.toFixed(2));
  const totalMB = 128 * 1024;
  const usagePercent = Math.round((usedMB / totalMB) * 100);
  const isHighUsage = usagePercent > 50;

  const currentFolder = currentFolderId
    ? userFoldersWithSize.find((f) => f.id === currentFolderId)
    : userFoldersWithSize[0];

  const [createOpen, setCreateOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<UserFolder | null>(null);

  const handleEdit = (folder: UserFolder) => {
    setEditingFolder(folder);
  };

  const handleDelete = async () => {
    if (!folderToDelete) return;

    try {
      setIsDeleting(true);
      const response = await deleteFolder(folderToDelete.id);

      if (response.ok) {
        toast.success("Folder deleted successfully");
      } else {
        toast.error("Error deleting folder");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
      setFolderToDelete(null);
    }
  };

  return (
    <div className="flex h-screen dark:bg-gray-900 dark:text-white bg-white font-sans text-slate-900">
      <aside className="w-56 border-r border-slate-100 flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight">Folders</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCreateOpen(true)}
          >
            <FolderPlus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          <div className="space-y-0.5">
            {userFoldersWithSize.map((folder) => (
              <Link
                key={folder.id}
                href={`/dashboard/file-manager?fId=${folder.id}`}
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-lg transition-colors group",
                  currentFolder?.id === folder.id
                    ? "bg-slate-50 text-black dark:text-black"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    currentFolder?.id === folder.id
                      ? "bg-amber-100 dark:bg-amber-500"
                      : "bg-amber-50 group-hover:bg-amber-100 dark:bg-amber-500"
                  )}
                >
                  <span className="text-lg">📁</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm truncate">
                      {folder.name}
                    </p>

                    <div className="flex items-center gap-1">
                      <Edit
                        onClick={(e) => {
                          e.preventDefault();
                          setEditingFolder(folder);
                        }}
                        className="w-4 h-4 opacity-0 group-hover:opacity-100"
                      />
                      <Delete
                        onClick={(e) => {
                          e.preventDefault();
                          setFolderToDelete(folder);
                        }}
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-red-500"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-900">
                    {folder.files.length} items . {folder.sizeMB} MB
                  </p>
                </div>
              </Link>
            ))}

            <AlertDialog.Root
              open={!!folderToDelete}
              onOpenChange={() => setFolderToDelete(null)}
            >
              <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/40" />

                <AlertDialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
                  <AlertDialog.Title className="text-lg font-bold">
                    Delete Folder
                  </AlertDialog.Title>

                  <AlertDialog.Description className="mt-2 text-sm text-slate-500">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">
                      {folderToDelete?.name}
                    </span>
                    ? This action cannot be undone.
                  </AlertDialog.Description>

                  <div className="mt-6 flex justify-end gap-3">
                    <AlertDialogCancel className="rounded-md border px-4 py-2">
                      Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="rounded-md bg-red-600 px-4 py-2 text-white disabled:opacity-50"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="p-4 flex items-center justify-between border-b border-slate-50">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 w-8 h-8 dark:text-slate-100"
              >
                <ArrowLeft className="w-4 h-4 " />
                <span className="sr-only text-black dark:text-slate-100">Back</span>
              </Button>
            </Link>

            <span className="text-xs font-medium text-slate-400 dark:text-slate-100">Back</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              disabled={!currentFolder || !userId}
              className="rounded-full bg-blue-600 px-4 py-2 text-sm text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Upload Files
            </button>

            {currentFolder && userId && (
              <MultipleFileUploader
                open={open}
                onClose={() => setOpen(false)}
                folderId={currentFolder.id}
                userId={userId}
              />
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">{currentFolder?.name}</h1>

            <div className="bg-lime-50 rounded-2xl p-6 border border-lime-100/50 relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div className="space-y-1">
                  <p className="text-slate-500 text-sm font-medium">
                    Folders /{" "}
                    <span className="text-slate-900 font-bold">
                      {currentFolder?.name}
                    </span>
                  </p>
                  <p className="text-xl font-bold">
                    <span
                      className={
                        isHighUsage ? "text-red-600" : "text-emerald-600"
                      }
                    >
                      {currentFolder?.sizeMB} MB
                    </span>{" "}
                    <span className="dark:text-black">
                      of {totalMB / 1024} GB used
                    </span>
                  </p>
                  <Button
                    variant="link"
                    className="text-blue-600 p-0 h-auto font-semibold text-sm"
                  >
                    View Details
                  </Button>
                </div>

                <div className="relative w-20 h-20">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-slate-200/60"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeDasharray={2 * Math.PI * 34}
                      strokeDashoffset={
                        2 * Math.PI * 34 * (1 - usagePercent / 100)
                      }
                      fill="transparent"
                      className={cn(
                        "transition-all duration-500",
                        isHighUsage ? "text-red-500" : "text-emerald-500"
                      )}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={cn(
                        "text-base font-bold",
                        isHighUsage ? "text-red-600" : "text-emerald-600"
                      )}
                    >
                      {usagePercent}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="h-8 rounded-lg border-slate-100 text-slate-600 bg-white shadow-sm text-xs"
                >
                  All Type <ChevronDown className="w-3 h-3 ml-1.5" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 rounded-lg border-slate-100 text-slate-600 bg-white shadow-sm text-xs"
                >
                  Lastest <ChevronDown className="w-3 h-3 ml-1.5" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-slate-900 w-8 h-8"
              >
                <Grid className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {currentFolder?.files.map((file) => (
                <button
                  key={file.id}
                  onClick={() =>
                    setSelectedFile({
                      id: file.id,
                      name: file.name,
                      type: file.type.includes("pdf") ? "PDF" : "FILE",
                      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                      created: new Date(file.createdAt).toLocaleDateString(),
                      format: file.type.split("/")[1]?.toUpperCase() ?? "FILE",
                      modified: new Date(file.updatedAt).toLocaleString(),
                    })
                  }
                  className={cn(
                    "group relative p-4 rounded-2xl transition-all duration-200 text-left border",
                    selectedFile?.id === file.id
                      ? "bg-blue-50/50 border-blue-200 ring-1 ring-blue-200"
                      : "bg-white border-slate-50 hover:border-slate-200 hover:shadow-md hover:shadow-slate-100"
                  )}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div
                      className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                        selectedFile?.id === file.id
                          ? "bg-blue-600 border-blue-600"
                          : "border-slate-200"
                      )}
                    >
                      {selectedFile?.id === file.id && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Edit
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingFile(file);
                        }}
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      />
                      <Delete
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingFile(file);
                        }}
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center mb-4">
                    <div
                      className={cn(
                        "w-14 h-18 relative rounded-lg flex flex-col items-center justify-center",
                        file.type === "PDF"
                          ? "bg-rose-50 text-rose-500"
                          : "bg-emerald-50 text-emerald-500"
                      )}
                    >
                      <FileText className="w-7 h-7 mb-1" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {file.type.split(".")[1]}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-bold text-slate-900 text-center mb-1 truncate">
                    {file.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Sheet open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <SheetContent className="w-full sm:max-w-sm p-0 flex flex-col border-l border-slate-100">
          <SheetHeader className="p-4 border-b border-slate-50 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <SheetTitle className="text-base font-bold truncate">
                {selectedFile?.name}
              </SheetTitle>
              <div className="flex gap-0.5">
                <Edit
                  onClick={() => {
                    const file = currentFolder?.files.find(
                      (f) => f.id === selectedFile?.id
                    );
                    if (file) setEditingFile(file);
                  }}
                  className="w-4 h-4 text-slate-400 hover:text-slate-900 cursor-pointer m-2"
                />

                <Delete
                  onClick={() => {
                    const file = currentFolder?.files.find(
                      (f) => f.id === selectedFile?.id
                    );
                    if (file) setEditingFile(file);
                  }}
                  className="w-4 h-4 text-red-500 hover:text-red-600 cursor-pointer m-2"
                />
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 flex flex-col items-center border-b border-slate-50">
              <div
                className={cn(
                  "w-24 h-32 rounded-xl flex flex-col items-center justify-center mb-6 shadow-sm",
                  selectedFile?.type === "PDF"
                    ? "bg-rose-50 text-rose-500"
                    : "bg-emerald-50 text-emerald-500"
                )}
              >
                <FileText className="w-12 h-12 mb-1" />
                <span className="text-base font-black uppercase tracking-tighter">
                  {selectedFile?.type}
                </span>
              </div>

              <div className="w-full space-y-4">
                <h3 className="text-base font-bold">Information</h3>
                <div className="grid grid-cols-2 gap-y-3 text-xs">
                  <span className="text-slate-400 font-medium">Created</span>
                  <span className="text-slate-900 font-bold text-right">
                    {selectedFile?.created}
                  </span>

                  <span className="text-slate-400 font-medium">Size</span>
                  <span className="text-slate-900 font-bold text-right">
                    {selectedFile?.size}
                  </span>

                  <span className="text-slate-400 font-medium">Format</span>
                  <span className="text-slate-900 font-bold text-right">
                    {selectedFile?.format.split(".")[1]}
                  </span>

                  <span className="text-slate-400 font-medium">
                    Last Modified
                  </span>
                  <span className="text-slate-900 font-bold text-right">
                    {selectedFile?.modified}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Create Folder */}
      <FolderForm
        userId={userId ?? ""}
        open={createOpen}
        onOpenChange={setCreateOpen}
      />

      {/* Edit Folder */}
      <FolderForm
        userId={userId ?? ""}
        open={!!editingFolder}
        onOpenChange={(open) => !open && setEditingFolder(null)}
        editingId={editingFolder?.id}
        initialContent={editingFolder?.name}
      />

      {/* Edit/Delete File */}
      {editingFile && (
        <FileForm
          userId={userId ?? ""}
          open={!!editingFile}
          onOpenChange={(open) => !open && setEditingFile(null)}
          fileId={editingFile.id}
          initialName={editingFile.name}
          onDeleted={() => {
            setEditingFile(null);
            setSelectedFile(null);
          }}
        />
      )}
    </div>
  );
}