import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  ShieldCheck,
  CheckCircle,
  Send,
  Star,
} from "lucide-react";
import emailjs from "emailjs-com";
import { useState } from "react";

export default function Contact() {
  let [loading, setLoading] = useState(false);

  let handleSubmit = (e) => {
    e.preventDefault();
    let form = e.target;
    setLoading(true);

    emailjs
      .sendForm(
        "service_j2yapuj",
        "template_5gub2mj",
        form,
        "DnLKydGW4We3AZmtj"
      )
      .then(() => {
        form.reset();
        setLoading(false);
        alert("✅ Message sent successfully!");
      })
      .catch(() => {
        setLoading(false);
        alert("❌ Failed to send message.");
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a1a2f] via-[#0c1f38] to-[#08101d] text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#f3c13a] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#f3c13a] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1e3a5c] opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative text-center py-28 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0f2035]/50 border border-[#1e3a5c] mb-6">
            <Star className="w-4 h-4 text-[#f3c13a]" />
            <span className="text-sm text-gray-300">Get in Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Connect With <span className="text-[#f3c13a]">VibeLink</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We're here to bring your events to life. Share your vision, and
            let's create unforgettable experiences together.
          </p>
        </motion.div>
      </section>

      {/* Contact Info + Form */}
      <section className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 mb-28">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="bg-linear-to-br from-[#0f2035] to-[#0a1829] rounded-2xl p-8 border border-[#1e3a5c] shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-8 bg-[#f3c13a] rounded-full"></div>
              <h2 className="text-2xl font-bold">Contact Information</h2>
            </div>

            <ul className="space-y-6">
              {[
                {
                  icon: MapPin,
                  text: "VibeLink HQ, Meru, Kenya",
                  desc: "Our headquarters",
                },
                {
                  icon: Phone,
                  text: "+254 790 649 106",
                  desc: "Mon-Fri, 9AM-5PM",
                },
                {
                  icon: Mail,
                  text: "support@vibelink.co.ke",
                  desc: "We'll respond within 24 hours",
                },
                {
                  icon: Clock,
                  text: "Mon–Fri: 9:00am – 5:00pm",
                  desc: "East Africa Time",
                },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#091628]/50 hover:bg-[#091628] transition-colors"
                >
                  <div className="p-2 bg-[#0f2035] rounded-lg border border-[#1e3a5c]">
                    <item.icon className="text-[#f3c13a]" size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{item.text}</p>
                    <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Social Icons */}
            <div className="mt-10 pt-8 border-t border-[#1e3a5c]">
              <h3 className="text-lg font-semibold mb-5">Follow Our Journey</h3>
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <motion.a
                    key={i}
                    whileHover={{ scale: 1.1, y: -2 }}
                    href="#"
                    className="p-3 bg-[#0f2035] border border-[#1e3a5c] rounded-xl text-[#f3c13a] hover:bg-[#f3c13a] hover:text-[#0a1a2f] transition-all"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-linear-to-br from-[#0f2035] to-[#0a1829] rounded-2xl p-6 border border-[#1e3a5c]"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <ShieldCheck className="text-[#f3c13a]" size={20} />
              Why Choose VibeLink
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={16} />
                <span>100+ Events Successfully Organized</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={16} />
                <span>24/7 Customer Support</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={16} />
                <span>Professional Event Planning Team</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-linear-to-br from-[#0f2035] to-[#0a1829] rounded-2xl p-8 border border-[#1e3a5c] shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-[#f3c13a] rounded-full"></div>
            <h2 className="text-2xl font-bold">Send Us a Message</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Your Name"
                  className="w-full p-4 rounded-xl bg-[#091628] border border-[#1e3a5c] focus:outline-none focus:border-[#f3c13a] focus:ring-1 focus:ring-[#f3c13a] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Email Address
                </label>
                <input
                  name="user_email"
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="w-full p-4 rounded-xl bg-[#091628] border border-[#1e3a5c] focus:outline-none focus:border-[#f3c13a] focus:ring-1 focus:ring-[#f3c13a] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Subject
              </label>
              <select
                name="subject"
                required
                className="w-full p-4 rounded-xl bg-[#091628] border border-[#1e3a5c] focus:outline-none focus:border-[#f3c13a] focus:ring-1 focus:ring-[#f3c13a] transition-all"
              >
                <option value="">Select a subject</option>
                <option value="partnership">Partnership</option>
                <option value="event-support">Event Support</option>
                <option value="feedback">Feedback</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Message
              </label>
              <textarea
                rows="5"
                name="message"
                required
                placeholder="Tell us about your event or inquiry..."
                className="w-full p-4 rounded-xl bg-[#091628] border border-[#1e3a5c] focus:outline-none focus:border-[#f3c13a] focus:ring-1 focus:ring-[#f3c13a] transition-all resize-none"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all
    ${
      loading
        ? "bg-[#b8932f]/70 cursor-not-allowed"
        : "bg-linear-to-r from-[#f3c13a] to-[#d4a82e] text-[#0a1a2f] hover:shadow-lg hover:shadow-[#f3c13a]/20"
    }`}
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-5 h-5" /> Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* Footer Quote */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative text-center pb-16 px-6"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-3xl font-light italic text-gray-300 mb-4">
            "At VibeLink, every event is a story — let's make yours
            unforgettable."
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} VibeLink. Crafting memorable
            experiences.
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
