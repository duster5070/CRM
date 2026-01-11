import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import SectionHeading from "./global/SectionHeading";

export function FAQ() {
  return (
    <div className="grid grid-cols-1 gap-8 dark:text-slate-900 lg:grid-cols-2">
      <SectionHeading title="Frequently Asked Questions" />
      <div className="text-xl">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Why do i need ZenVoice?</AccordionTrigger>
            <AccordionContent>
              When you sell one-time payment products,{" "}
              <Link className="underline" href="#">
                Stripe takes a 0.4% cut (up to $2.00)
              </Link>{" "}
              per sale. With ZenVoice, you only pay once, and never again. And if you don't pay for
              Stripe Invoicing, you will get customer requests asking for invoices. Stripe receipts
              aren't enough for most countries' regulations. Finally, Stripe invoices aren't
              editable. Your customers can't add VAT, Tax ID, or fix typos after the purchase is
              done. ZenVoice fixes all that.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
