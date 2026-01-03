import { deletePayment } from "@/actions/payments";
import { Trash2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

export default function PaymentDeleteButton({ paymentId }: { paymentId: string }) {
  const handleDelete = async () => {
    try {
      const deletedPayment = await deletePayment(paymentId);
      if (deletedPayment?.ok) {
        toast.success("Payment deleted successfully");
      }
    } catch (error) {}
  };

  return (
    <button onClick={handleDelete} className="ml-2 text-red-500 hover:text-red-600">
      <Trash2 className="h-4 w-5" />
    </button>
  );
}
