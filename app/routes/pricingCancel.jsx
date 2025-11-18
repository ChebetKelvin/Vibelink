export default function PricingCancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-8">
      <div className="bg-white shadow-xl p-10 rounded-3xl max-w-lg text-center border border-red-300">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>

        <p className="text-gray-700 mb-6">
          It looks like you cancelled the checkout process. You can try
          subscribing again at any time.
        </p>

        <a
          href="/pricing"
          className="px-10 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all"
        >
          Try Again
        </a>
      </div>
    </div>
  );
}
