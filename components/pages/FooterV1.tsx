import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function FooterV1() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-green-400 to-blue-500 text-white">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-10"></div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:underline">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:underline">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:underline">
                  Press Releases
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">For Patients</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/find-doctor" className="hover:underline">
                  Find a Doctor
                </Link>
              </li>
              <li>
                <Link href="/book-appointment" className="hover:underline">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/patient-resources" className="hover:underline">
                  Patient Resources
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">For Doctors</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/join-network" className="hover:underline">
                  Join Our Network
                </Link>
              </li>
              <li>
                <Link href="/doctor-resources" className="hover:underline">
                  Doctor Resources
                </Link>
              </li>
              <li>
                <Link href="/telemedicine" className="hover:underline">
                  Telemedicine
                </Link>
              </li>
              <li>
                <Link href="/doctor-faq" className="hover:underline">
                  Doctor FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect With Us</h3>
            <div className="mb-4 flex space-x-4">
              <a href="#" className="transition-colors hover:text-blue-200">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="transition-colors hover:text-blue-200">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="transition-colors hover:text-blue-200">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="transition-colors hover:text-blue-200">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
            <Button
              variant="secondary"
              className="w-full bg-white text-blue-500 transition-colors hover:bg-blue-100"
            >
              <Link href="/join/doctors">Become a Doctor</Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between border-t border-white/20 pt-8 md:flex-row">
          <p className="mb-4 text-sm md:mb-0">
            &copy; {new Date().getFullYear()} AskDoc. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="hover:underline">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 -mb-32 -mr-32 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute left-0 top-0 -ml-32 -mt-32 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
    </footer>
  );
}
