export default function PricingError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-8">
      <div className="bg-white shadow-xl p-10 rounded-3xl max-w-lg text-center border border-yellow-400">
        <h1 className="text-4xl font-bold text-yellow-600 mb-4">
          Something Went Wrong
        </h1>

        <p className="text-gray-700 mb-6">
          We encountered an issue while processing your payment. Please try
          again or contact support if this continues.
        </p>

        <a
          href="/pricing"
          className="px-10 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-700 text-white font-semibold transition-all"
        >
          Back to Pricing
        </a>
      </div>
    </div>
  );
}
