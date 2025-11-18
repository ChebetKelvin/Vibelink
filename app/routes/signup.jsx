import { Mail, Lock, User } from "lucide-react";
import { Form, Link, redirect, useActionData, useNavigate } from "react-router"; // Fixed import
import {
  validateEmail,
  validatePassword,
  validateText,
  validateConfirmPassword,
} from "../.server/validation";
import bcrypt from "bcryptjs";
import { addUser, getUserByEmail } from "../models/user";

const primaryColor = "#095075"; // Dark Blue
const accentColor = "#b8932f"; // Gold/Bronze

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = (formData.get("email") || "").trim().toLowerCase();
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  let fieldErrors = {
    name: validateText(name),
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(password, confirmPassword),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return { errors: fieldErrors };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let user = {
    name,
    email,
    password: hashedPassword,
    role: "user",
    createdAt: new Date(),
  };

  try {
    // Check if email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { errors: { email: "Email already in use" } };
    }

    const result = await addUser(user);
    if (result.acknowledged) {
      return redirect("/login");
    }

    return { errors: { form: "Failed to create account. Please try again." } };
  } catch (error) {
    console.error("Error creating user:", error);
    return { errors: { form: "An error occurred. Please try again." } };
  }
}

export default function SignUpPage() {
  const actionData = useActionData();
  const errors = actionData?.errors || {};
  const success = actionData?.success;
  const navigate = useNavigate();
  const isSubmitting = navigate.state === "submitting";

  // DRY focus/blur handlers
  const handleFocus = (e) => {
    e.target.classList.add("ring-2", "ring-offset-1", "ring-yellow-300");
  };

  const handleBlur = (e, error) => {
    e.target.classList.remove("ring-2", "ring-offset-1", "ring-yellow-300");
    if (error) {
      e.target.classList.add("border-red-500");
    } else {
      e.target.classList.add("border-gray-300");
    }
  };

  // Input class generator
  const inputClass = (error) =>
    `w-full pl-10 pr-4 py-3 text-gray-700 border rounded-xl focus:outline-none transition duration-150 ${
      error ? "border-red-500" : "border-gray-300"
    }`;

  // Success view
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 font-sans p-4">
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl text-center max-w-md w-full border border-gray-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Account Created Successfully!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Welcome to VibeLink! You can now sign in to your account.
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-3 bg-[#095075] text-white rounded-xl shadow-md hover:bg-[#063f5b] transition duration-200 font-semibold"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Form error view (general form error)
  if (errors.form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 font-sans p-4">
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl text-center max-w-md w-full border border-gray-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-red-600 mb-4">
            Error Creating Account
          </h1>
          <p className="text-lg text-gray-600 mb-6">{errors.form}</p>
          <Link
            to="/signup"
            className="inline-block px-8 py-3 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition duration-200 font-semibold"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  // Main signup form
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 font-sans p-4">
      <div className="w-full max-w-md">
        <div
          className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border-t-4"
          style={{ borderColor: primaryColor }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-lg text-gray-600">
              Join now to unlock all{" "}
              <span
                className="italic font-semibold"
                style={{ color: accentColor }}
              >
                Vibes
              </span>
            </p>
          </div>

          <Form method="post" className="space-y-6">
            {/** Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className={inputClass(errors.name)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  onFocus={handleFocus}
                  onBlur={(e) => handleBlur(e, errors.name)}
                />
              </div>
              {errors.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/** Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
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
                  className={inputClass(errors.email)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  onFocus={handleFocus}
                  onBlur={(e) => handleBlur(e, errors.email)}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/** Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
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
                  className={inputClass(errors.password)}
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  onFocus={handleFocus}
                  onBlur={(e) => handleBlur(e, errors.password)}
                />
              </div>
              {errors.password && (
                <p id="password-error" className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/** Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  className={inputClass(errors.confirmPassword)}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={
                    errors.confirmPassword ? "confirmPassword-error" : undefined
                  }
                  onFocus={handleFocus}
                  onBlur={(e) => handleBlur(e, errors.confirmPassword)}
                />
              </div>
              {errors.confirmPassword && (
                <p
                  id="confirmPassword-error"
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/** Sign Up Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-base font-medium text-white hover:bg-[#063f5b] focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: primaryColor }}
              >
                {isSubmitting ? "Creating..." : "Create Account"}
              </button>
            </div>
          </Form>

          {/** Already have account */}
          <div className="mt-8 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold hover:underline transition duration-150"
                style={{ color: accentColor }}
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
