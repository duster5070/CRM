import Problems from "@/components/Problems";
import HowItWorks from "@/components/HowItWorks";
import Solution from "@/components/frontend/Solution";
import HeroSection from "@/components/frontend/hero-section";
import { CTASection } from "@/components/frontend/CTASection";
export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex-1">
        <section id="home" className="w-full">
          <HeroSection />
        </section>
        <section className="w-full">
          <Problems />
        </section>
        <section className="w-full py-20" id="features">
          <Solution />
        </section>
        <section className="w-full py-20" id="howItWorks">
          <HowItWorks />
        </section>
        <section className="w-full py-20">
          <CTASection />
        </section>
      </div>
    </div>
  );
}
