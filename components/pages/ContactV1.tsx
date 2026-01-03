"use client";
import React, { useState } from "react";

const ContactV1: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the form data to your backend
  };

  return (
    <section className="bg-gray-100 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-2 text-3xl font-bold text-green-900 lg:text-5xl">Get In Touch</h2>
        <p className="mb-8 pb-4 text-gray-600">
          Streamline your processes and empower your team with our products. Effortlessly manage
          employee data, and more.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="col-span-1 space-y-4">
            <div className="rounded-2xl bg-green-800 p-6 text-white">
              <h3 className="mb-2 text-xl font-semibold">Speak to someone in sales</h3>
              <p className="mb-4 py-4 text-sm">
                To create a more value-added solution, is essential to an analysis of the
                possibilities of improvement.
              </p>
              <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-green-800 transition duration-300 hover:bg-gray-100">
                Book Appointment
              </button>
            </div>
            <div className="rounded-2xl bg-lime-400 p-6">
              <h3 className="mb-2 text-xl font-semibold">Contact to our team</h3>
              <p className="mb-4 py-4 text-sm">
                To create a more value-added solution, is essential to an analysis of the
                possibilities of improvement.
              </p>
              <button className="rounded-full bg-green-800 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:bg-green-700">
                Send a Mail
              </button>
            </div>
          </div>

          <div className="col-span-2 rounded-2xl bg-white p-6 shadow">
            <h3 className="mb-4 text-xl font-semibold">Send us a message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="rounded border border-gray-300 p-2"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="rounded border border-gray-300 p-2"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="mb-4 w-full rounded border border-gray-300 p-2"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="mb-4 w-full rounded border border-gray-300 p-2"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                className="mb-4 w-full rounded border border-gray-300 p-2"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button
                type="submit"
                className="rounded-full bg-green-800 px-6 py-2.5 font-semibold text-white transition duration-300 hover:bg-green-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactV1;
