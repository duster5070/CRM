import React from "react";
import Logo from "../global/Logo";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <section className="py-10 bg-background sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <Logo />
            <p className="text-base leading-relaxed text-gray-600 mt-7">
              A powerful project management system built for teams that want clarity,
              accountability, and faster execution — without the clutter.
            </p>

            <ul className="flex items-center space-x-3 mt-9">
              {/* SOCIALS — unchanged icons */}
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600"
                >
                  <Github className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>

          {/* ------------------ COLUMN 2 ------------------ */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Company
            </p>

            <ul className="mt-6 space-y-4 text-primary">
              <li>
                <a className="flex text-base hover:text-blue-600">
                  About Us
                </a>
              </li>
              <li>
                <a className="flex text-base hover:text-blue-600">
                  Features
                </a>
              </li>
              <li>
                <a className="flex text-base hover:text-blue-600">
                  How It Works
                </a>
              </li>
              <li>
                <a className="flex text-base hover:text-blue-600">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* ------------------ COLUMN 3 ------------------ */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Help
            </p>

            <ul className="mt-6 space-y-4 text-primary">
              <li>
                <a className="flex text-base hover:text-blue-600">
                  Support Center
                </a>
              </li>
              <li>
                <a className="flex text-base hover:text-blue-600">
                  Documentation
                </a>
              </li>
              <li>
                <a className="flex text-base hover:text-blue-600">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a className="flex text-base hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* ------------------ NEWSLETTER ------------------ */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
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
                  className="block w-full p-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />

        <p className="text-sm text-center text-gray-600">
          © {new Date().getFullYear()} Your Project Management System — All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
