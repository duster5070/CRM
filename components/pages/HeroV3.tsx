import { Check } from "lucide-react";
import React from "react";
import CustomButton from "../CustomButton";
const features = [
  "Easy appointment scheduling",
  "Secure patient records",
  "Telemedicine capabilities",
  "Streamlined billing",
];
export default function HeroV3() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat px-4 py-20"
      style={{ backgroundImage: "url('/images/doctor.webp')" }}
    >
      <div className="absolute inset-0 bg-blue-900 bg-opacity-75"></div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="max-w-2xl space-y-8">
          <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
            Build a thriving <span className="font-semibold text-blue-300">direct-pay</span>{" "}
            practice with Medical App.
          </h2>
          <p className="text-lg text-blue-100">
            Welcome to Medical App, where connecting with patients is made easier than ever before.
            Our platform streamlines the process of managing appointments, providing care remotely,
            and keeping track of patient records.
          </p>
          <CustomButton
            title="List your Service"
            href="#"
            className="bg-white text-blue-900 transition-colors duration-200 hover:bg-blue-100"
          />
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <p key={i} className="flex items-center text-blue-100">
                <Check className="mr-2 h-5 w-5 flex-shrink-0 text-blue-300" />
                {feature}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
