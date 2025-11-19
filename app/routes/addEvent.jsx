import { useState } from "react";
import { motion } from "framer-motion";
import { Form, redirect, useActionData, useLoaderData } from "react-router";
import { addEvent } from "../models/events";
import { getSession } from "../.server/session";

export async function action({ request }) {
  let formData = await request.formData();
  let errors = [];

  let requiredFields = [
    "title",
    "category",
    "date",
    "locationName",
    "locationCity",
    "organizer",
    "contact",
    "durationMinutes",
    "description",
    "isFree",
    "imageUrl", // Now imageUrl is required
  ];

  requiredFields.forEach((field) => {
    if (!formData.get(field)) errors.push(`${field} is required`);
  });

  let isFree = formData.get("isFree") === "true";
  let ticketPrice = formData.get("ticketPrice");
  if (!isFree && (!ticketPrice || Number(ticketPrice) <= 0)) {
    errors.push(
      "Ticket price must be provided and greater than 0 for paid events"
    );
  }

  // Validate image URL format
  let imageUrl = formData.get("imageUrl");
  if (imageUrl) {
    try {
      new URL(imageUrl); // This will throw if not a valid URL
    } catch (error) {
      errors.push("Please enter a valid image URL");
    }
  }

  if (errors.length > 0) return { errors };

  // Now create the event with imageUrl instead of image upload
  let newEvent = {
    title: formData.get("title"),
    category: formData.get("category"),
    date: new Date(formData.get("date")),
    location: {
      name: formData.get("locationName"),
      city: formData.get("locationCity"),
    },
    organizer: formData.get("organizer"),
    contact: formData.get("contact"),
    durationMinutes: Number(formData.get("durationMinutes")),
    description: formData.get("description"),
    isFree,
    feeStructure: isFree
      ? []
      : [{ tier: "Standard", price: Number(ticketPrice) }],
    status: "pending",
    imageUrl: imageUrl, // Simple URL string instead of complex image object
    createdAt: new Date(),
  };

  await addEvent(newEvent);

  return redirect("/");
}

export async function loader({ request }) {
  // Get cookies from request
  let cookieHeader = request.headers.get("Cookie");
  let session = await getSession(cookieHeader);

  let user = session?.get("user");

  if (!user) {
    return redirect("/login");
  }

  return { user };
}

export default function AddEvent() {
  let [imagePreview, setImagePreview] = useState(null);
  let actionData = useActionData();
  let { user } = useLoaderData();

  let handleImageUrlChange = (e) => {
    let url = e.target.value;
    if (url) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 to-blue-50/30">
      {/* Hero Section - unchanged */}
      <section
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-[#095075]/90 to-[#095075]/70"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#b8932f]/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#095075]/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center text-white px-6 max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-1 bg-linear-to-r from-[#b8932f] to-[#d4af37] mx-auto mb-6 rounded-full"></div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Share Your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#b8932f] to-[#d4af37]">
              Event
            </span>{" "}
            with the World
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
            At VibeLink, we connect people through moments that matter —
            concerts, meetups, church gatherings, and more.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8"
          >
            <button className="group bg-linear-to-r from-[#b8932f] to-[#d4af37] hover:from-[#a58327] hover:to-[#c19b30] text-white font-semibold px-8 py-4 rounded-xl shadow-2xl shadow-[#b8932f]/30 hover:shadow-[#b8932f]/40 transition-all duration-300 transform hover:-translate-y-1">
              <span className="flex items-center gap-2">Start Creating</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Intro Section - unchanged */}
      <section className="py-20 px-6 md:px-20 text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-[#b8932f]/20 rounded-full"></div>
        <div className="absolute bottom-20 right-16 w-6 h-6 bg-[#095075]/10 rounded-full"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-100">
            <div className="w-2 h-2 bg-[#b8932f] rounded-full"></div>
            <span className="text-sm font-semibold text-[#095075] uppercase tracking-wide">
              Why Choose VibeLink
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            Amplify Your <span className="text-[#095075]">Event's</span> Reach
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Every great event starts with a spark — and sharing it on VibeLink
            helps that spark grow into a flame. Whether it's an intimate
            gathering or a grand celebration, our platform ensures your event
            gets the attention it deserves.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "500+", label: "Events Monthly" },
              { number: "95%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="text-2xl font-bold text-[#095075] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Add Event Form */}
      <section className="py-20 px-6 md:px-20 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-linear-to-br from-white to-blue-50/50"></div>

        <div className="max-w-2xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Create Your <span className="text-[#095075]">Event</span>
            </h3>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Fill in the details below to share your event with our community
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="p-8 md:p-12">
              {/* Display Validation Errors */}
              {actionData?.errors && actionData.errors.length > 0 && (
                <div className="mb-6 bg-red-100 border border-red-300 text-red-800 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1">
                    {actionData.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              <Form
                method="post"
                className="space-y-8" // Remove encType="multipart/form-data"
              >
                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Event Title */}
                  <div className="md:col-span-2">
                    <label className="block text-gray-800 font-semibold mb-3 text-lg">
                      Event Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter a captivating event title"
                      className="w-full border text-gray-600 border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#b8932f]/20 focus:border-[#b8932f] outline-none transition-all bg-white/50 backdrop-blur-sm shadow-sm"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-gray-800 font-semibold mb-3 text-lg">
                      Category
                    </label>
                    <select
                      name="category"
                      className="w-full border text-gray-600 border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#b8932f]/20 focus:border-[#b8932f] outline-none transition-all bg-white/50 backdrop-blur-sm shadow-sm appearance-none"
                      required
                    >
                      <option value="">Select Category</option>
                      <option>Concerts & Nightlife</option>
                      <option>Charity & Community</option>
                      <option>Wellness & Fitness</option>
                      <option>Education & Skills</option>
                      <option>Student & Campus</option>
                      <option>Adventure & Travel</option>
                      <option>Offers & Discounts</option>
                      <option>Sports</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-gray-800 font-semibold mb-3 text-lg">
                      Date
                    </label>
                    <input
                      type="datetime-local"
                      name="date"
                      className="w-full border text-gray-600 border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#b8932f]/20 focus:border-[#b8932f] outline-none transition-all bg-white/50 backdrop-blur-sm shadow-sm"
                      required
                    />
                  </div>

                  {/* Location Name */}
                  <div>
                    <label className="block text-gray-800 font-semibold mb-3 text-lg">
                      Venue Name
                    </label>
                    <input
                      type="text"
                      name="locationName"
                      placeholder="Venue or place of event"
                      className="w-full border text-gray-600 border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#b8932f]/20 focus:border-[#b8932f] outline-none transition-all bg-white/50 backdrop-blur-sm shadow-sm"
                      required
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-gray-800 font-semibold mb-3 text-lg">
                      City
                    </label>
                    <input
                      type="text"
                      name="locationCity"
                      placeholder="City where the event takes place"
                      className="w-full border text-gray-600 border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#b8932f]/20 focus:border-[#b8932f] outline-none transition-all bg-white/50 backdrop-blur-sm shadow-sm"
                      required
                    />
                  </div>

                  {/* Organizer */}
                  <div>
                    <label className="block text-gray-800 font-semibold mb-3 text-lg">
                      Organizer Name
                    </label>
                    <input
                      type="text"
                      name="organizer"
                      defaultValue={user.name}
                      placeholder="Who is organizing this event?"
                      className="w-full border text-gray-600 border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#b8932f]/20 focus:border-[#b8932f] outline-none transition-all bg-white/50 backdrop-blur-sm shadow-sm"
                      required
                    />
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="block text-gray-800 font-semibold mb-3 text-lg">
                      Contact (Email/Phone)
                    </label>
                    <input
                      type="text"
                      name="contact"
                      defaultValue={user.email}
                      placeholder="Organizer contact information"
                      className="w-full border text-gray-600 border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#b8932f]/20 focus:border-[#b8932f] outline-none transition-all bg-white/50 backdrop-blur-sm shadow-sm"
                      required
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-gray-800 font-semibold mb-3 text-lg">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      name="durationMinutes"
                      placeholder="e.g., 120"
                      className="w-full border text-gray-600 border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#b8932f]/20 focus:border-[#b8932f] outline-none transition-all bg-white/50 backdrop-blur-sm shadow-sm"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-gray-800 font-semibold mb-3 text-lg">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows="5"
                      placeholder="Describe your event in detail..."
                      className="w-full border text-gray-600 border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#b8932f]/20 focus:border-[#b8932f] outline-none transition-all bg-white/50 backdrop-blur-sm shadow-sm resize-none"
                      required
                    ></textarea>
                  </div>

                  {/* Fee */}
                  <div>
                    <label className="block text-gray-800 font-semibold mb-3 text-lg">
                      Free Event?
                    </label>
                    <select
                      name="isFree"
                      className="w-full border text-gray-600 border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#b8932f]/20 focus:border-[#b8932f] outline-none transition-all bg-white/50 backdrop-blur-sm shadow-sm appearance-none"
                      required
                    >
                      <option value="">Select Option</option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>

                  {/* Fee Structure (optional) */}
                  <div>
                    <label className="block text-gray-800 font-semibold mb-3 text-lg">
                      Ticket Price (if not free)
                    </label>
                    <input
                      type="number"
                      name="ticketPrice"
                      placeholder="Enter ticket price"
                      className="w-full border text-gray-600 border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#b8932f]/20 focus:border-[#b8932f] outline-none transition-all bg-white/50 backdrop-blur-sm shadow-sm"
                    />
                  </div>

                  {/* Image URL - REPLACED FILE UPLOAD */}
                  <div className="md:col-span-2">
                    <label className="block text-gray-800 font-semibold mb-3 text-lg">
                      Event Image URL
                    </label>
                    <input
                      type="url"
                      name="imageUrl"
                      placeholder="https://example.com/event-image.jpg"
                      onChange={handleImageUrlChange}
                      className="w-full border text-gray-600 border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#b8932f]/20 focus:border-[#b8932f] outline-none transition-all bg-white/50 backdrop-blur-sm shadow-sm"
                      required
                    />
                    <p className="text-gray-500 text-sm mt-2">
                      Enter a direct URL to your event image
                    </p>
                  </div>
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 text-center"
                  >
                    <p className="text-gray-800 font-semibold mb-3">
                      Image Preview
                    </p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="rounded-2xl shadow-lg max-h-80 w-full object-cover border border-gray-200 mx-auto"
                    />
                  </motion.div>
                )}

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <button
                    type="submit"
                    className="group bg-linear-to-r from-[#095075] to-[#0a6b9a] hover:from-[#07405d] hover:to-[#095075] text-white font-semibold text-lg px-12 py-4 rounded-2xl shadow-2xl shadow-[#095075]/30 hover:shadow-[#095075]/40 transition-all duration-300 transform hover:-translate-y-1 min-w-48"
                  >
                    <span className="flex items-center justify-center gap-3">
                      Publish Event
                    </span>
                  </button>
                </div>
              </Form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
