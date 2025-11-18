import { Link } from "react-router";

export default function PricingSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-8">
      <div className="bg-white shadow-xl p-10 rounded-3xl max-w-lg text-center border border-[#095075]/30">
        <h1 className="text-4xl font-bold text-[#095075] mb-4">
          Subscription Successful 🎉
        </h1>
        <p className="text-gray-700 mb-6">
          Your subscription is now active. You can now enjoy full access to
          VibeLink features!
        </p>

        <Link
          to="/"
          className="px-10 py-3 rounded-xl bg-[#095075] hover:bg-[#0a6b9a] text-white font-semibold transition-all"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
