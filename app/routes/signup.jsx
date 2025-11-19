import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Form, Link, redirect, useActionData, useNavigate } from "react-router";
import { useState } from "react";
import {
  validateEmail,
  validatePassword,
  validateText,
  validateConfirmPassword,
} from "../.server/validation";
import bcrypt from "bcryptjs";
import { addUser, getUserByEmail } from "../models/user";

let primaryColor = "#095075"; // Dark Blue
let accentColor = "#b8932f"; // Gold/Bronze

export async function action({ request }) {
  let formData = await request.formData();
  let name = formData.get("name");
  let email = (formData.get("email") || "").trim().toLowerCase();
  let password = formData.get("password");
  let confirmPassword = formData.get("confirmPassword");

  let fieldErrors = {
    name: validateText(name),
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(password, confirmPassword),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return { errors: fieldErrors };
  }

  let hashedPassword = await bcrypt.hash(password, 10);

  let user = {
    name,
    email,
    password: hashedPassword,
    role: "user",
    createdAt: new Date(),
  };

  try {
    // Check if email already exists
    let existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { errors: { email: "Email already in use" } };
    }

    let result = await addUser(user);
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
  let actionData = useActionData();
  let errors = actionData?.errors || {};
  let success = actionData?.success;
  let navigate = useNavigate();
  let isSubmitting = navigate.state === "submitting";

  // State for password visibility
  let [showPassword, setShowPassword] = useState(false);
  let [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  let toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // DRY focus/blur handlers
  let handleFocus = (e) => {
    e.target.classList.add("ring-2", "ring-offset-1", "ring-yellow-300");
  };

  let handleBlur = (e, error) => {
    e.target.classList.remove("ring-2", "ring-offset-1", "ring-yellow-300");
    if (error) {
      e.target.classList.add("border-red-500");
    } else {
      e.target.classList.add("border-gray-300");
    }
  };

  // Success view
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-400 via-blue-500 to-purple-600 font-sans p-4">
        <div className="bg-white/30 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-2xl text-center max-w-md w-full border border-white/50">
          <div className="w-16 h-16 bg-green-100/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
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
          <h1 className="text-3xl font-extrabold text-white mb-4 drop-shadow-lg">
            Account Created Successfully!
          </h1>
          <p className="text-lg text-white/90 mb-6 drop-shadow-md">
            Welcome to VibeLink! You can now sign in to your account.
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-3 bg-white/30 backdrop-blur-sm text-white rounded-xl shadow-lg hover:bg-white/40 transition duration-200 font-semibold border border-white/30"
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
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-400 via-blue-500 to-purple-600 font-sans p-4">
        <div className="bg-white/30 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-2xl text-center max-w-md w-full border border-white/50">
          <div className="w-16 h-16 bg-red-100/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
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
          <h1 className="text-3xl font-extrabold text-red-300 mb-4 drop-shadow-lg">
            Error Creating Account
          </h1>
          <p className="text-lg text-white/90 mb-6 drop-shadow-md">
            {errors.form}
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-3 bg-red-500/80 backdrop-blur-sm text-white rounded-xl shadow-lg hover:bg-red-600/80 transition duration-200 font-semibold border border-red-300/50"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  // Main signup form
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-400 via-blue-500 to-purple-600 font-sans p-4">
      <div className="w-full max-w-md">
        <div
          className="bg-white/30 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-2xl border-t-4 border-white/50"
          style={{ borderColor: primaryColor + "CC" }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
              Create Account
            </h1>
            <p className="text-lg text-white/90 drop-shadow-md">
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
                className="block text-sm font-medium text-white mb-2 drop-shadow-sm"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-white/70" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 text-white bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition duration-150 placeholder:text-white/60"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  onFocus={handleFocus}
                  onBlur={(e) => handleBlur(e, errors.name)}
                />
              </div>
              {errors.name && (
                <p
                  id="name-error"
                  className="text-red-300 text-sm mt-1 drop-shadow-sm"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/** Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2 drop-shadow-sm"
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
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  onFocus={handleFocus}
                  onBlur={(e) => handleBlur(e, errors.email)}
                />
              </div>
              {errors.email && (
                <p
                  id="email-error"
                  className="text-red-300 text-sm mt-1 drop-shadow-sm"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/** Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-2 drop-shadow-sm"
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
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  onFocus={handleFocus}
                  onBlur={(e) => handleBlur(e, errors.password)}
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
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  className="text-red-300 text-sm mt-1 drop-shadow-sm"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/** Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white mb-2 drop-shadow-sm"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-white/70" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 text-white bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition duration-150 placeholder:text-white/60"
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={
                    errors.confirmPassword ? "confirmPassword-error" : undefined
                  }
                  onFocus={handleFocus}
                  onBlur={(e) => handleBlur(e, errors.confirmPassword)}
                />
                {/* Confirm Password visibility toggle button */}
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-3 p-1 text-white/70 hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p
                  id="confirmPassword-error"
                  className="text-red-300 text-sm mt-1 drop-shadow-sm"
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
                className="w-full flex justify-center items-center py-3 px-4 border border-white/30 rounded-xl shadow-lg text-base font-medium text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 transition duration-200 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 backdrop-blur-sm"
                style={{
                  backgroundColor: primaryColor + "CC",
                  boxShadow: `0 4px 15px rgba(255, 255, 255, 0.3)`,
                }}
              >
                {isSubmitting ? "Creating..." : "Create Account"}
              </button>
            </div>
          </Form>

          {/** Already have account */}
          <div className="mt-8 text-center text-sm">
            <p className="text-white/90 drop-shadow-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold hover:underline transition duration-150 text-white"
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
