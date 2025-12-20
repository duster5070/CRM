"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { CommentProps } from "@/types/types";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../FormInputs/SubmitButton";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { UserRole } from "@prisma/client";
import { createComment, updateCommentById } from "@/actions/comments";
import { Button } from "../ui/button";
import { MessageSquare } from "lucide-react";
const QuillEditor = dynamic(
  () => import("@/components/FormInputs/QuilEditor"),
  {
    ssr: false,
  }
);

const CommentForm = ({
  projectId,
  userId,
  userName,
  userRole,
  initialContent,
  editingId,
}: {
  projectId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  initialContent?: string;
  editingId?: string;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentProps>();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function saveComment(data: CommentProps) {
    if (!content) {
      toast.error("Please write something");
      return;
    }
    data.content = content ?? "";
    data.userName = userName;
    data.projectId = projectId;
    data.userRole = userRole;
    data.userId = userId;

    try {
      setLoading(true);
      if (editingId) {
        await updateCommentById(editingId, data);
        setLoading(false);
        // Toast
        toast.success("Updated Successfully!");
      } else {
        await createComment(data);
        setLoading(false);
        // Toast
        toast.success("Successfully Created!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <MessageSquare className="mr-2 h-4 w-4" />
          Add Comment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Comment</DialogTitle>
          <DialogDescription>
            Please write your Comment here, with respect
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(saveComment)}>
          <div className="grid grid-cols-12 gap-6 py-8">
            <div className="col-span-full space-y-3">
              <Card>
                <CardContent>
                  <div className="grid gap-6 mt-4">
                    {mounted && (
                      <QuillEditor
                        label="Write the Content of the Comment"
                        className=""
                        value={content}
                        onChange={setContent}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <SubmitButton title="Save Comment" loading={loading} />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommentForm;
