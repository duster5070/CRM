import { Check } from "lucide-react";
import React from "react";
import { CustomLinkButton } from "./global/CustomLinkButton";
import { cn } from "@/lib/utils";

export default function Pricing() {
  const plans = [
    {
      price: 49,
      discountedPrice: 99,
      features: ["ZenVoice link", "Unlimited self-serve invoices", "1 Stripe account"],
      recommended: false,
    },
    {
      price: 69,
      discountedPrice: 119,
      features: ["ZenVoice link", "Unlimited self-serve invoices", "Unlimited Stripe accounts"],
      recommended: true,
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-8 dark:text-slate-900 lg:grid-cols-2">
      {plans.map((plan, i) => {
        const isRecommended = plan.recommended;
        return (
          <div
            key={i}
            className={cn(
              "rounded-lg border p-6",
              isRecommended && "border-b-2 border-l-2 border-r border-t border-green-500 shadow",
            )}
          >
            <div className="flex items-end gap-2">
              <del>${plan.discountedPrice}</del>
              <span className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                ${plan.price}
              </span>
              <span className="uppercase">usd</span>
            </div>
            <div className="space-y-2 py-10">
              {plan.features.map((item, i) => {
                return (
                  <div key={i} className="flex items-center">
                    <Check className="mr-2 h-4 w-5 flex-shrink-0" />
                    <p>{item}</p>
                  </div>
                );
              })}
            </div>
            <div className="">
              <CustomLinkButton href="#" title="Get Started Now" />
              <p className="py-3">
                One-time payment, <span className="underline">then it's yours forever</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
