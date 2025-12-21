import { deleteTask } from "@/actions/tasks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export function DeleteTask() {
  async function handleDeleteTask({ id }: { id: string }) {
    try {
      const res = await deleteTask(id);
      if (res.ok) {
        toast.success("Task Deleted Successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    // <AlertDialog>
    //   <AlertDialogTrigger asChild>
    //     <Button variant="outline">Delete Task</Button>
    //   </AlertDialogTrigger>
    //   <AlertDialogContent>
    //     <AlertDialogHeader>
    //       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
    //       <AlertDialogDescription>
    //         This action cannot be undone. This will permanently delete your
    //         account and remove your data from our servers.
    //       </AlertDialogDescription>
    //     </AlertDialogHeader>
    //     <AlertDialogFooter>
    //       <AlertDialogCancel>Cancel</AlertDialogCancel>
    //       <AlertDialogAction>Continue</AlertDialogAction>
    //     </AlertDialogFooter>
    //   </AlertDialogContent>
    // </AlertDialog>
    <Button onClick={() => handleDeleteTask({ id: "1" })}>Delete Task</Button>
  );
}
