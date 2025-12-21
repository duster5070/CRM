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
import { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../FormInputs/SubmitButton";
import toast from "react-hot-toast";
import router from "next/router";
import { UserRole } from "@prisma/client";
import { createComment, updateCommentById } from "@/actions/comments";
import { Button } from "../ui/button";
import { MessageSquare, Pen } from "lucide-react";
import Tiptap from "@/components/FormInputs/QuillEditor";
import { set } from "date-fns";

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

  function isRichTextEmpty(html?: string) {
    if (!html) return true;

    const text = html
      .replace(/<(.|\n)*?>/g, "") // remove HTML tags
      .replace(/&nbsp;/g, " ")
      .trim();

    return text.length === 0;
  }

  async function saveComment(data: CommentProps) {
    if (isRichTextEmpty(content)) {
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
        setOpen(false);
        // Toast
        toast.success("Updated Successfully!");
      } else {
        await createComment(data);
        setLoading(false);
        setOpen(false);
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
        {editingId ? (
          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Pen className="h-4 w-4" />
          </button>
        ) : (
          <Button variant="outline" className="w-full">
            <MessageSquare className="mr-2 h-4 w-4" />
            Add Comment
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingId ? "Edit Comment" : "Add New Comment"}
          </DialogTitle>
          <DialogDescription>
            Please write your Comment here, with respect
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(saveComment)}>
          <div className="grid grid-cols-12 gap-6 py-8">
            <div className="col-span-full space-y-3">
              <Tiptap value={content} onChange={setContent} />
            </div>
          </div>

          <SubmitButton
            className="w-full"
            title={editingId ? "Update Comment" : "Add Comment"}
            loading={loading}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommentForm;
