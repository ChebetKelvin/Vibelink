import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import "./app.css";
import { useState } from "react";
import { Menu, X, User, ChevronDown, Link } from "lucide-react";
import logo from "/vibelink-logo.png";
import Footer from "./components/Footer";
import { getSession, commitSession } from "./.server/session";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }) {
  let session = await getSession(request.headers.get("Cookie"));
  let user = session.get("user") || null;

  return data(
    { user },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export function Layout({ children }) {
  let { user } = useLoaderData();
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const categories = [
    "Concerts & Nightlife",
    "Charity & Community",
    "Wellness & Fitness",
    "Education & Skills",
    "Student & Campus",
    "Adventure & Travel",
  ];

  const slugify = (cat) =>
    cat.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2">
              <img
                src={logo}
                alt="VibeLink logo"
                className="h-8 w-auto object-contain"
              />
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="/" className="text-gray-700 hover:text-[#095075]">
                Home
              </a>

              <div className="relative">
                <button
                  onClick={() => setShowCategories(!showCategories)}
                  className="flex items-center text-gray-700 hover:text-[#095075] focus:outline-none"
                >
                  Categories
                  <ChevronDown
                    size={18}
                    className={`ml-1 transition-transform ${
                      showCategories ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showCategories && (
                  <div className="absolute bg-white shadow-lg rounded-lg mt-2 py-2 w-56">
                    {categories.map((cat) => (
                      <a
                        key={cat}
                        href={`/categories/${slugify(cat)}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-[#b8932f]/10 hover:text-[#095075]"
                        onClick={() => setShowCategories(false)}
                      >
                        {cat}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="/add-event"
                className="text-gray-700 hover:text-[#095075]"
              >
                Add Event
              </a>
              <a href="/contact" className="text-gray-700 hover:text-[#095075]">
                Contact
              </a>
            </div>

            {/* User Dropdown or Login */}
            {user ? (
              <div className="hidden md:flex items-center relative group">
                <button className="flex items-center gap-2 bg-[#095075] text-white px-4 py-2 rounded-full hover:bg-[#b8932f] transition focus:outline-none">
                  <User size={18} />
                  <span>{user.name.split(" ")[0]}</span>
                  <ChevronDown size={16} className="text-white" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-40 bg-white border rounded-xl shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transform transition-all duration-200">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-xl"
                  >
                    Profile
                  </a>
                  <a
                    href="/logout"
                    className="block px-4 py-2 text-gray-700 hover:bg-red-100 hover:text-red-600 rounded-b-xl"
                  >
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <a
                href="/login"
                className="hidden md:flex items-center space-x-2 bg-[#095075] text-white px-4 py-2 rounded-full hover:bg-[#b8932f] transition"
              >
                <User size={18} />
                <span>Login</span>
              </a>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-[#095075]"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="flex flex-col px-6 py-4 space-y-3">
                <a href="/" className="text-gray-700 hover:text-[#095075]">
                  Home
                </a>

                <details>
                  <summary className="cursor-pointer text-gray-700 hover:text-[#095075]">
                    Categories
                  </summary>
                  <div className="mt-2 space-y-1">
                    {categories.map((cat) => (
                      <a
                        key={cat}
                        href={`/categories/${slugify(cat)}`}
                        className="block text-gray-600 pl-4 hover:text-[#095075]"
                        onClick={() => setIsOpen(false)}
                      >
                        {cat}
                      </a>
                    ))}
                  </div>
                </details>

                <a
                  href="/add-event"
                  className="text-gray-700 hover:text-[#095075]"
                >
                  Add Event
                </a>
                <a
                  href="/contact"
                  className="text-gray-700 hover:text-[#095075]"
                >
                  Contact
                </a>

                <a
                  href={user ? "/profile" : "/login"}
                  className="flex items-center space-x-2 bg-[#095075] text-white px-2 py-2 rounded-full hover:bg-[#b8932f] transition"
                >
                  <User size={18} />
                  <span>{user ? user.name : "Login"}</span>
                </a>
              </div>
            </div>
          )}
        </nav>

        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
