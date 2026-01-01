import Problems from "@/components/Problems";
import HowItWorks from "@/components/HowItWorks";
import Solution from "@/components/frontend/Solution";
import HeroSection from "@/components/frontend/hero-section";
import { CTASection } from "@/components/frontend/CTASection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex-1">
        <section id="home" className="w-full">
          <HeroSection session={session} />
        </section>
        <section className="w-full">
          <Problems />
        </section>
        <Solution />
        <HowItWorks />
        <CTASection />
      </div>
    </div>
  );
}
