import React from "react";
import Logo from "../global/Logo";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <section className="bg-background py-10 sm:pt-16 lg:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-12 gap-y-16 md:col-span-3 lg:grid-cols-6">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <Logo />
            <p className="mt-7 text-base leading-relaxed text-gray-600">
              A powerful project management system built for teams that want clarity,
              accountability, and faster execution — without the clutter.
            </p>

            <ul className="mt-9 flex items-center space-x-3">
              {/* SOCIALS — unchanged icons */}
              <li>
                <a
                  href="#"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-200 hover:bg-blue-600"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-200 hover:bg-blue-600"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-200 hover:bg-blue-600"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-200 hover:bg-blue-600"
                >
                  <Github className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>

          {/* ------------------ COLUMN 2 ------------------ */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">Company</p>

            <ul className="mt-6 space-y-4 text-primary">
              <li>
                <a className="flex text-base hover:text-blue-600">About Us</a>
              </li>
              <li>
                <a className="flex text-base hover:text-blue-600">Features</a>
              </li>
              <li>
                <a className="flex text-base hover:text-blue-600">How It Works</a>
              </li>
              <li>
                <a className="flex text-base hover:text-blue-600">Careers</a>
              </li>
            </ul>
          </div>

          {/* ------------------ COLUMN 3 ------------------ */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">Help</p>

            <ul className="mt-6 space-y-4 text-primary">
              <li>
                <a className="flex text-base hover:text-blue-600">Support Center</a>
              </li>
              <li>
                <a className="flex text-base hover:text-blue-600">Documentation</a>
              </li>
              <li>
                <a className="flex text-base hover:text-blue-600">Terms & Conditions</a>
              </li>
              <li>
                <a className="flex text-base hover:text-blue-600">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* ------------------ NEWSLETTER ------------------ */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
              Subscribe to newsletter
            </p>

            <form className="mt-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="block w-full rounded-md border border-gray-200 bg-white p-4 text-black placeholder-gray-500 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-3 inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="mb-10 mt-16 border-gray-200" />

        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Your Project Management System — All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
