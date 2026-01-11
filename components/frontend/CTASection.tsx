import { CheckCircle2 } from "lucide-react";

export function CTASection() {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-2 text-center sm:px-6 lg:px-2">
        {/* Heading */}
        <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Ready to Streamline Your Business?
        </h2>

        {/* Subheading with logo */}
        <div className="mb-8 text-2xl font-semibold">
          Join 1,000+ teams already using
          <img src="/logo.svg" alt="CRM Logo" className="mx-2 inline-block h-8" />
        </div>

        {/* CTA Button */}
        <button className="mb-8 rounded-full border border-primary bg-transparent px-8 py-2 text-primary transition-colors duration-300 hover:bg-blue10">
          Start Free Trial
        </button>

        {/* Benefits */}
        <div className="flex flex-col justify-center gap-6 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
            <span>Free 14-day trial</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
            <span>Instant activation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
