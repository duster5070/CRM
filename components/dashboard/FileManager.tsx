"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  Upload,
  Plus,
  MoreHorizontal,
  FileText,
  Grid,
  ChevronDown,
  Paperclip,
  Smile,
 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import FolderForm from "../Forms/FolderForm"
import { UserFolder } from "@/types/types"

// --- Types ---
interface Folder {
  id: string
  name: string
  items: number
  size: string
}

interface File {
  id: string
  name: string
  type: "PDF" | "XLS"
  size: string
  created: string
  format: string
  modified: string
}

// --- Mock Data ---


const FILES: File[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `file-${i}`,
  name: "Contracts 320_2022.pdf",
  type: i % 2 === 0 ? "PDF" : "XLS",
  size: "120,5 MB",
  created: "2 / 10 / 2022",
  format: i % 2 === 0 ? "PDF" : "XLS",
  modified: "11 / 10 / 2022 - 10:30",
}))

// --- Main Component ---
export function FileManager({ userId,userFolders }: { userId: string | undefined , userFolders: UserFolder[]}) {
  const searchParams = useSearchParams()
  const currentFolderId = searchParams.get("fId")
  const currentFolder = currentFolderId 
    ? userFolders.find((f) => f.id === currentFolderId) 
    : userFolders[0]

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)

  const usedGB = 74 // Example: > 50% for testing
  const totalGB = 128
  const usagePercent = Math.round((usedGB / totalGB) * 100)
  const isHighUsage = usagePercent > 50

  return (
    <div className="flex h-screen bg-white font-sans text-slate-900">
      {/* Left Sidebar - Folder List */}
      <aside className="w-56 border-r border-slate-100 flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight">Folders</h2>
      <FolderForm userId={userId??""}  />
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          <div className="space-y-0.5">
            {userFolders.map((folder) => (
              <Link
                key={folder.id}
                href={`/dashboard/file-manager?fId=${folder.id}`}
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-lg transition-colors group",
                  currentFolder?.id === folder.id
                    ? "bg-slate-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    currentFolder?.id === folder.id ? "bg-amber-100" : "bg-amber-50 group-hover:bg-amber-100",
                  )}
                >
                  <span className="text-lg">📁</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm truncate">{folder.name}</p>
                    <MoreHorizontal className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-slate-400">
                    {folder.files.length} items • {250} MB
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="p-4 flex items-center justify-between border-b border-slate-50">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-slate-400 w-8 h-8">
              <ArrowLeft className="w-4 h-4" />
              <span className="sr-only">Back</span>
            </Button>
            <span className="text-xs font-medium text-slate-400">Back</span>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-full shadow-lg shadow-blue-100 h-9 text-xs">
              <Upload className="w-3.5 h-3.5 mr-1.5" />
              Upload
            </Button>
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 px-4 rounded-full hover:bg-blue-50 h-9 bg-transparent text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Create
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">{currentFolder?.name}</h1>

            {/* Storage Summary Card */}
            <div className="bg-lime-50 rounded-2xl p-6 border border-lime-100/50 relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div className="space-y-1">
                  <p className="text-slate-500 text-sm font-medium">
                    Folders / <span className="text-slate-900 font-bold">{currentFolder?.name}</span>
                  </p>
                  <p className="text-xl font-bold">
                    <span className={isHighUsage ? "text-red-600" : "text-emerald-600"}>{usedGB} GB</span> of {totalGB}{" "}
                    GB used
                  </p>
                  <Button variant="link" className="text-blue-600 p-0 h-auto font-semibold text-sm">
                    View Details
                  </Button>
                </div>

                {/* Circular Progress Indicator */}
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
                      strokeDashoffset={2 * Math.PI * 34 * (1 - usagePercent / 100)}
                      fill="transparent"
                      className={cn("transition-all duration-500", isHighUsage ? "text-red-500" : "text-emerald-500")}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={cn("text-base font-bold", isHighUsage ? "text-red-600" : "text-emerald-600")}>
                      {usagePercent}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter & View Controls */}
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
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900 w-8 h-8">
                <Grid className="w-5 h-5" />
              </Button>
            </div>

            {/* File Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {FILES.map((file) => (
                <button
                  key={file.id}
                  onClick={() => setSelectedFile(file)}
                  className={cn(
                    "group relative p-4 rounded-2xl transition-all duration-200 text-left border",
                    selectedFile?.id === file.id
                      ? "bg-blue-50/50 border-blue-200 ring-1 ring-blue-200"
                      : "bg-white border-slate-50 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100",
                  )}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div
                      className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                        selectedFile?.id === file.id ? "bg-blue-600 border-blue-600" : "border-slate-200",
                      )}
                    >
                      {selectedFile?.id === file.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="flex justify-center mb-4">
                    <div
                      className={cn(
                        "w-14 h-18 relative rounded-lg flex flex-col items-center justify-center",
                        file.type === "PDF" ? "bg-rose-50 text-rose-500" : "bg-emerald-50 text-emerald-500",
                      )}
                    >
                      <FileText className="w-7 h-7 mb-1" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{file.type}</span>
                    </div>
                  </div>

                  <p className="text-xs font-bold text-slate-900 text-center mb-1 truncate">{file.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Document Details Sheet */}
      <Sheet open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <SheetContent className="w-full sm:max-w-sm p-0 flex flex-col border-l border-slate-100">
          <SheetHeader className="p-4 border-b border-slate-50 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <SheetTitle className="text-base font-bold truncate">{selectedFile?.name}</SheetTitle>
              <div className="flex gap-0.5">
                <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-900">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            {/* File Preview */}
            <div className="p-6 flex flex-col items-center border-b border-slate-50">
              <div
                className={cn(
                  "w-24 h-32 rounded-xl flex flex-col items-center justify-center mb-6 shadow-sm",
                  selectedFile?.type === "PDF" ? "bg-rose-50 text-rose-500" : "bg-emerald-50 text-emerald-500",
                )}
              >
                <FileText className="w-12 h-12 mb-1" />
                <span className="text-base font-black uppercase tracking-tighter">{selectedFile?.type}</span>
              </div>

              {/* Information List */}
              <div className="w-full space-y-4">
                <h3 className="text-base font-bold">Information</h3>
                <div className="grid grid-cols-2 gap-y-3 text-xs">
                  <span className="text-slate-400 font-medium">Created</span>
                  <span className="text-slate-900 font-bold text-right">{selectedFile?.created}</span>

                  <span className="text-slate-400 font-medium">Size</span>
                  <span className="text-slate-900 font-bold text-right">{selectedFile?.size}</span>

                  <span className="text-slate-400 font-medium">Format</span>
                  <span className="text-slate-900 font-bold text-right">{selectedFile?.format}</span>

                  <span className="text-slate-400 font-medium">Last Modified</span>
                  <span className="text-slate-900 font-bold text-right">{selectedFile?.modified}</span>
                </div>
              </div>
            </div>

            {/* Internal Chat Section */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold">Internal chat</h3>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>

              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-2.5">
                    <Avatar className="w-8 h-8 shrink-0 ring-2 ring-white shadow-sm">
                      <AvatarImage src="/diverse-woman-avatar.png" />
                      <AvatarFallback>JM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">Jessica May</span>
                        <span className="text-[9px] text-slate-300 font-medium uppercase">22/01/2022 - 11:27 AM</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {i === 1
                          ? "Sometimes that's just the way it has to be. Sure, there were probably other options, but he didn't let them enter his mind."
                          : "Sometimes that's just the way it has to be"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-slate-50 bg-white">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300">
                <Paperclip className="w-4 h-4 cursor-pointer hover:text-slate-500 transition-colors" />
              </div>
              <Input
                placeholder="Add new comment"
                className="bg-slate-50/50 border-slate-100 rounded-lg py-5 pl-10 pr-10 focus:ring-blue-100 placeholder:text-slate-400 text-xs"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300">
                <Smile className="w-4 h-4 cursor-pointer hover:text-slate-500 transition-colors" />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}