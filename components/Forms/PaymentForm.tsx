import { createPayment } from "@/actions/payments";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { generateInvoiceNumber } from "@/lib/genrateinvoiveNum";
import { PaymentProps } from "@/types/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import toast from "react-hot-toast";
import router from "next/router";

const PaymentForm = ({
  projectId,
  userId,
  clientId,
  remainingAmount,
}: {
  projectId: string;
  userId: string;
  clientId: string;
  remainingAmount: string | number;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentProps>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function saveCategory(data: PaymentProps) {
    data.invoiceNumber = generateInvoiceNumber();
    data.projectId = projectId;
    data.userId = userId;
    data.clientId = clientId;
    data.tax = Number(data.tax);
    data.amount = Number(data.amount);
    data.date = new Date(data.date).toISOString();

    try {
      setLoading(true);
      await createPayment(data);
      toast.success("Successfully Created!");
      reset();
      setOpen(false);
      router.push("/dashboard/categories");
    } catch (error) {
      console.log(error);
    
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>+ Add new Payment</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Payment</DialogTitle>
          <DialogDescription>
            the payment remains to be paid ${remainingAmount.toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(saveCategory)}>
          <div className="grid grid-cols-12 gap-6 py-8">
            <div className="col-span-full space-y-3">
              <Card>
                <CardContent>
                  <div className="grid gap-6 mt-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Payment title"
                      name="title"
                    />

                    {/* Amount + Date on same line */}
                    <div className="grid grid-cols-2 gap-3">
                      <TextInput
                        register={register}
                        errors={errors}
                        label="Paid amount"
                        name="amount"
                        type="number"
                      />
                      <TextInput
                        register={register}
                        errors={errors}
                        label="Payment date"
                        name="date"
                        type="date"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <TextInput
                        register={register}
                        errors={errors}
                        label="tax amount"
                        name="tax"
                        type="number"
                      />
                      <TextInput
                        register={register}
                        errors={errors}
                        label="Payment Method"
                        name="method"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <SubmitButton title="Save Payment" loading={loading} />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentForm;