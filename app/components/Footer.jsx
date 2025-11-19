// src/components/Footer.jsx
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

let primaryColor = "#095075";
let accentColor = "#b8932f";
let links = {
  discover: [
    { name: "All Events", href: "/events" },
    { name: "Upcoming", href: "/events" },
    { name: "Trending", href: "/" },
    { name: "Local Hubs", href: "/categories/charity-community" },
  ],
  company: [
    { name: "About VibeLink", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Contact Us", href: "/contact" },
  ],
  organizers: [
    { name: "Post Your Event", href: "/add-event" },
    { name: "Organizer Tools", href: "/tools" },
    { name: "Pricing Plans", href: "/pricing" },
    { name: "FAQ for Hosts", href: "/host-faq" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="bg-gray-900 text-white pt-16 pb-8 border-t-4"
      style={{ borderColor: accentColor }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-16">
          {/* Column 1: Logo and Socials */}
          <div className="col-span-2 md:col-span-1">
            <a
              href="/"
              className="flex items-center mb-4 text-2xl font-bold"
              style={{ color: accentColor }}
            >
              {/* Replace with your actual logo component/image */}
              VibeLink<span className="text-sm">⚡️</span>
            </a>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Experience Every Vibe Near You. Discover concerts, festivals, and
              local gatherings, all in one place.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-[#b8932f] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-[#b8932f] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-[#b8932f] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Discover */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Discover
            </h4>
            <ul className="space-y-3">
              {links.discover.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#b8932f] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Organizers */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              For Organizers
            </h4>
            <ul className="space-y-3">
              {links.organizers.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#b8932f] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Company
            </h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#b8932f] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- */}

        {/* Bottom Bar: Copyright and Legal */}
        <div className="mt-12 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} VibeLink Inc. All rights
              reserved.
            </p>

            <p className="mt-2 md:mt-0">{"Chebet.dev"}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="/privacy"
                className="hover:text-[#b8932f] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="hover:text-[#b8932f] transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
