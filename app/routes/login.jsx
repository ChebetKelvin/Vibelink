import { Mail, Lock, LogIn } from "lucide-react";
import { Form, Link, redirect } from "react-router";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../models/user";
import {
  getSession,
  commitSession,
  setErrorMessage,
  setSuccessMessage,
} from "../.server/session";
import { validateText, validatePassword } from "../.server/validation";

const primaryColor = "#095075"; // Dark Blue
const accentColor = "#b8932f"; // Gold/Bronze

export async function action({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  // ✅ Validate input fields
  const fieldErrors = {
    email: validateText(email),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return { fieldErrors };
  }

  // ✅ Check if user exists
  const user = await getUserByEmail(email);
  if (!user) {
    setErrorMessage(session, "Invalid credentials. Try again.");
    return redirect("/login", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  // ✅ Compare password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    setErrorMessage(session, "Invalid credentials. Try again.");
    return redirect("/login", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  // ✅ Add user to session
  session.set("user", {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  setSuccessMessage(session, `Welcome back, ${user.name}!`);

  // ✅ Redirect based on role
  const redirectTo = user.role === "admin" ? "/admin" : "/";
  return redirect(redirectTo, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export default function LoginPage({ actionData }) {
  let fieldErrors = actionData?.fieldErrors || {};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-4">
      <div className="w-full max-w-md">
        <div
          className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border-t-8 border-b-8"
          style={{ borderColor: primaryColor }}
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-lg text-gray-600">
              Sign in to discover more{" "}
              <span
                className="italic font-semibold"
                style={{ color: accentColor }}
              >
                Vibes
              </span>
            </p>
          </div>

          <Form method="post" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 text-gray-600 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[${accentColor}] focus:border-[${accentColor}] outline-none transition duration-150`}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-3  text-gray-600  border border-gray-300 rounded-xl focus:ring-2 focus:ring-[${accentColor}] focus:border-[${accentColor}] outline-none transition duration-150`}
                />
                {fieldErrors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.password}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm font-semibold hover:underline transition-colors"
                style={{ color: primaryColor }}
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset link sent (simulated).");
                }}
              >
                Forgot password?
              </a>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-base font-medium text-white hover:bg-[#063f5b] focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 transform hover:scale-[1.01]"
                style={{
                  backgroundColor: primaryColor,
                  boxShadow: `0 4px 10px rgba(9, 80, 117, 0.4)`,
                }}
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign in to your account
              </button>
            </div>
          </Form>

          <div className="mt-8 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold hover:underline"
                style={{ color: accentColor }}
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
