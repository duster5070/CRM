import { CheckCircle2 } from "lucide-react";

export function CTASection() {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-2 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
          Ready to Streamline Your Business?
        </h2>

        {/* Subheading with logo */}
        <div className="text-2xl  mb-8 font-semibold">
          Join 1,000+ teams already using
          <img
            src="/logo.svg"
            alt="CRM Logo"
            className="h-8 inline-block mx-2"
          />
        </div>

        {/* CTA Button */}
        <button
          className="mb-8 px-8 py-2 border border-primary transition-colors bg-transparent duration-300 rounded-full text-primary hover:bg-blue10"
        >
          Start Free Trial
        </button>

        {/* Benefits */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <span>Free 14-day trial</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <span>Instant activation</span>
          </div>
        </div>
      </div>
    </section>
  )
}