import { cn } from "@/lib/utils";
import React from "react";

interface BudgetProgressBarProps {
  budget: number;
  paidAmount: number;
}

const BudgetProgressBar: React.FC<BudgetProgressBarProps> = ({ budget, paidAmount }) => {
  const remainingAmount = Math.max(budget - paidAmount, 0);
  const paidPercentage = Math.min((paidAmount / budget) * 100, 100);

  return (
    <div className="w-full border-t pt-3">
      <div className="mb-2 flex justify-between">
        <span className="text-sm font-medium text-gray-700">
          Payment Progress (<span className="text-xs">{`${paidPercentage.toFixed(0)}%`}</span>)
        </span>
        <span className="text-sm font-medium text-gray-700">
          {" "}
          {`$${paidAmount.toLocaleString()} / $${budget.toLocaleString()}`}{" "}
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-200">
        <div
          className={cn("h-2.5 rounded-full bg-yellow-400", paidPercentage > 50 && "bg-green-600")}
          style={{ width: `${paidPercentage}%` }}
        ></div>
      </div>
      <div className="mt-2 flex justify-between">
        <span className="text-sm text-gray-600">Paid: ${paidAmount.toLocaleString()}</span>
        <span className="text-sm text-gray-600">
          Remaining: ${remainingAmount.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default BudgetProgressBar;
