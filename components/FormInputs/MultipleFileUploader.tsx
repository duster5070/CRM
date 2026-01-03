"use client";

import { useState, useEffect } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { X, UploadCloud, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { createFile } from "@/actions/filemanager";

type Props = {
  open: boolean;
  onClose: () => void;
  folderId: string;
  userId: string;
};

export default function MultipleFileUploader({ open, onClose, folderId, userId }: Props) {
  if (!folderId && !userId) {
    console.log("there is no folder id or useId");
  }

  const [uploaded, setUploaded] = useState(false);

  // Reset uploaded state when modal opens
  useEffect(() => {
    if (open) {
      setUploaded(false);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-black">
          <X size={18} />
        </button>

        <div className="mb-4 flex items-center gap-2">
          <UploadCloud className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Upload files</h2>
        </div>
        <div
          className={`transition duration-300 ease-in-out ${
            uploaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <UploadDropzone
            endpoint="fileUploads"
            onClientUploadComplete={async (res) => {
              if (!res || res.length === 0) return;

              try {
                await Promise.all(
                  res.map((file) => {
                    console.log("=== DEBUG START ===");
                    console.log("res:", JSON.stringify(res, null, 2));
                    console.log("folderId:", folderId);
                    console.log("userId:", userId);
                    console.log("=== DEBUG END ===");

                    createFile({
                      name: file.name,
                      type: file.type ?? "unknown",
                      size: file.size,
                      url: file.url,
                      folderId,
                      userId,
                      key: file.key,
                    });
                  }),
                );

                setUploaded(true);
                toast.success(`${res.length} files uploaded successfully`);

                setTimeout(() => {
                  onClose();
                }, 1500);
              } catch (err) {
                console.error(err);
                toast.error("Some files failed to save");
              }
            }}
            onUploadError={(error) => {
              console.error(error);
              toast.error("Failed to upload file");
            }}
            appearance={{
              container:
                "border-2 border-dashed border-blue-300 rounded-lg p-6 hover:border-blue-500 transition",
              label: "text-sm text-gray-600",
              allowedContent: "hidden",
            }}
          />
        </div>

        {uploaded && (
          <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
            <CheckCircle size={16} />
            Upload completed successfully
          </div>
        )}
      </div>
    </div>
  );
}
