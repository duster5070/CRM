

"use client";

import { useState } from "react";
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

if(!folderId && !userId){
    console.log("there is no folder id or useId")

}

  const [uploaded, setUploaded] = useState(false);

  if (!open) return null;
 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
       
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
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
      res.map((file) =>
        
        { 
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
        })}
       
      )
    );

    setUploaded(true);
    toast.success(`${res.length} files uploaded successfully`);
    onClose();
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



























// "use client";

// import { useState } from "react";
// import { X, UploadCloud, CheckCircle, File, Trash2 } from "lucide-react";

// type Props = {
//   open: boolean;
//   onClose: () => void;
// };

// type PreviewFile = {
//   file: File;
//   preview: string | null;
//   id: string;
// };

// export default function MultipleFileUploader({ open, onClose }: Props) {
//   const [consent, setConsent] = useState(false);
//   const [uploaded, setUploaded] = useState(false);
//   const [previews, setPreviews] = useState<PreviewFile[]>([]);
//   const [uploading, setUploading] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);

//   if (!open) return null;

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     addFiles(files);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
    
//     if (!consent) return;
    
//     const files = Array.from(e.dataTransfer.files);
//     addFiles(files);
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     if (consent) {
//       setIsDragging(true);
//     }
//   };

//   const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const addFiles = (files: File[]) => {
//     const newPreviews: PreviewFile[] = files.map((file) => {
//       const id = Math.random().toString(36).substr(2, 9);
//       let preview: string | null = null;

//       // Create preview for images
//       if (file.type.startsWith("image/")) {
//         preview = URL.createObjectURL(file);
//       }

//       return { file, preview, id };
//     });

//     setPreviews((prev) => [...prev, ...newPreviews]);
//   };

//   const removeFile = (id: string) => {
//     setPreviews((prev) => {
//       const filtered = prev.filter((p) => p.id !== id);
//       // Revoke URL to prevent memory leaks
//       const removed = prev.find((p) => p.id === id);
//       if (removed?.preview) {
//         URL.revokeObjectURL(removed.preview);
//       }
//       return filtered;
//     });
//   };

//   const handleUpload = async () => {
//     if (previews.length === 0) return;
    
//     setUploading(true);
    
//     // Simulate upload - replace with your actual upload logic
//     try {
//       // Example: Upload to your endpoint
//       // const formData = new FormData();
//       // previews.forEach((p) => formData.append("files", p.file));
//       // await fetch("/api/upload", { method: "POST", body: formData });
      
//       await new Promise((resolve) => setTimeout(resolve, 2000));
      
//       setUploaded(true);
//       setUploading(false);
      
//       // Clear previews after successful upload
//       previews.forEach((p) => {
//         if (p.preview) URL.revokeObjectURL(p.preview);
//       });
//       setPreviews([]);
//     } catch (error) {
//       console.error("Upload failed:", error);
//       setUploading(false);
//       alert("Upload failed");
//     }
//   };

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB", "GB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-xl bg-white p-6 shadow-xl">
//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 text-gray-500 hover:text-black"
//         >
//           <X size={18} />
//         </button>

//         {/* Header */}
//         <div className="mb-4 flex items-center gap-2">
//           <UploadCloud className="h-5 w-5 text-blue-600" />
//           <h2 className="text-lg font-semibold">Upload files</h2>
//         </div>

//         {/* Consent */}
//         <label className="mb-4 flex cursor-pointer items-start gap-2 text-sm text-gray-600">
//           <input
//             type="checkbox"
//             className="mt-1"
//             checked={consent}
//             onChange={(e) => setConsent(e.target.checked)}
//           />
//           <span>
//             I confirm these files are safe and I have permission to upload them.
//           </span>
//         </label>

//         {/* File Input */}
//         <div
//           className={`mb-4 transition ${
//             !consent ? "pointer-events-none opacity-50" : ""
//           }`}
//         >
//           <label 
//             className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition ${
//               isDragging 
//                 ? "border-blue-500 bg-blue-50" 
//                 : "border-blue-300 hover:border-blue-500"
//             }`}
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//           >
//             <UploadCloud className="mb-2 h-10 w-10 text-blue-600" />
//             <span className="text-sm text-gray-600">
//               {isDragging ? "Drop files here" : "Click to select files or drag and drop"}
//             </span>
//             <span className="mt-1 text-xs text-gray-400">
//               Multiple files supported
//             </span>
//             <input
//               type="file"
//               multiple
//               className="hidden"
//               onChange={handleFileSelect}
//               disabled={!consent}
//             />
//           </label>
//         </div>

//         {/* Preview Section */}
//         {previews.length > 0 && (
//           <div className="mb-4">
//             <h3 className="mb-2 text-sm font-medium text-gray-700">
//               Selected Files ({previews.length})
//             </h3>
//             <div className="max-h-64 space-y-2 overflow-y-auto rounded-lg border border-gray-200 p-3">
//               {previews.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
//                 >
//                   {/* Preview */}
//                   <div className="flex-shrink-0">
//                     {item.preview ? (
//                       <img
//                         src={item.preview}
//                         alt={item.file.name}
//                         className="h-12 w-12 rounded object-cover"
//                       />
//                     ) : (
//                       <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-100">
//                         <File className="h-6 w-6 text-blue-600" />
//                       </div>
//                     )}
//                   </div>

//                   {/* File Info */}
//                   <div className="flex-1 min-w-0">
//                     <p className="truncate text-sm font-medium text-gray-900">
//                       {item.file.name}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {formatFileSize(item.file.size)}
//                     </p>
//                   </div>

//                   {/* Remove Button */}
//                   <button
//                     onClick={() => removeFile(item.id)}
//                     className="flex-shrink-0 text-red-500 hover:text-red-700"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Upload Button */}
//         {previews.length > 0 && (
//           <button
//             onClick={handleUpload}
//             disabled={uploading || !consent}
//             className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {uploading ? "Uploading..." : `Upload ${previews.length} file${previews.length > 1 ? "s" : ""}`}
//           </button>
//         )}

//         {/* Success */}
//         {uploaded && (
//           <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-600">
//             <CheckCircle size={16} />
//             Upload completed successfully
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }








