import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
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
import { useState } from "react";

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
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-400 via-purple-500 to-pink-500 font-sans p-4">
      <div className="w-full max-w-md">
        <div
          className="bg-white/30 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-2xl border-t-8 border-b-8 border-white/50"
          style={{ borderColor: primaryColor }}
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
              Welcome Back
            </h1>
            <p className="text-lg text-white/90 drop-shadow-md">
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
                className="block text-sm font-medium text-white mb-1 drop-shadow-sm"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-white/70" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 text-white bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition duration-150 placeholder:text-white/60"
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-300 drop-shadow-sm">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-1 drop-shadow-sm"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-white/70" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 text-white bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition duration-150 placeholder:text-white/60"
                />
                {/* Password visibility toggle button */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 p-1 text-white/70 hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {fieldErrors.password && (
                  <p className="mt-1 text-sm text-red-300 drop-shadow-sm">
                    {fieldErrors.password}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm font-semibold text-white/90 hover:text-white transition-colors drop-shadow-sm"
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
                className="w-full flex justify-center items-center py-3 px-4 border border-white/30 rounded-xl shadow-lg text-base font-medium text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 transition duration-200 transform hover:scale-[1.01] backdrop-blur-sm"
                style={{
                  backgroundColor: primaryColor + "CC",
                  boxShadow: `0 4px 15px rgba(255, 255, 255, 0.3)`,
                }}
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign in to your account
              </button>
            </div>
          </Form>

          <div className="mt-8 text-center text-sm">
            <p className="text-white/90 drop-shadow-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold hover:underline text-white"
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
