"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Check } from "lucide-react"
import toast from "react-hot-toast"

import TextInput from "../FormInputs/TextInput"
import SubmitButton from "../FormInputs/SubmitButton"
import { createFolder, updateFolderById } from "@/actions/filemanager"
import { FolderProps } from "@/types/types"

interface FolderFormProps {
  userId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  editingId?: string
  initialContent?: string
}

const FolderForm = ({
  userId,
  open,
  onOpenChange,
  editingId,
  initialContent,
}: FolderFormProps) => {
  const isEdit = !!editingId
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FolderProps>({
    defaultValues: { name: "" },
  })

//  The core reason (short version)

// react-hook-form only applies defaultValues ONCE.

// When you switch from:

// editing Folder A → editing Folder B
// the input will NOT update automatically.

// This useEffect is what forces the form to reflect the currently selected folder.


  useEffect(() => {
    reset({ name: initialContent ?? "" })
  }, [initialContent, reset])

  async function onSubmit(data: FolderProps) {
    try {
      setLoading(true)

      if (isEdit && editingId) {
        await updateFolderById(editingId, { ...data, userId })
        toast.success("Folder updated")
      } else {
        await createFolder({ ...data, userId })
        toast.success("Folder created")
      }

      onOpenChange(false)
    } catch (err) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Folder" : "Create Folder"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextInput
            placeholder="Folder name"
            label=""
            register={register}
            errors={errors}
            name="name"
            icon={Check}
          />

          <SubmitButton
            className="w-full"
            title={isEdit ? "Update Folder" : "Create Folder"}
            loading={loading}
          />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FolderForm
