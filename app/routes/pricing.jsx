import { Form, useNavigation, redirect } from "react-router";
import { useState } from "react";
import { createCheckoutSession } from "../.server/stripe";

export async function action({ request }) {
  let stripeResponse = await createCheckoutSession(request);
  let data = await stripeResponse.json();

  if (data.url) {
    return redirect(data.url);
  }

  return redirect("/pricing/error");
}

export default function Pricing() {
  let navigation = useNavigation();
  let [selectedPlan, setSelectedPlan] = useState(
    "price_1SUV9e8RktIVJyUTAuaXiR1V"
  );

  let plans = [
    {
      id: "price_1SUV9e8RktIVJyUTAuaXiR1V",
      name: "Basic",
      price: 0,
      interval: "month",
      features: [
        "Post up to 2 events per month",
        "Basic event visibility",
        "Standard listing placement",
        "Upload 1 event image",
        "Basic organizer profile",
        "No analytics",
        "No priority support",
      ],
    },
    {
      id: "price_1SUVCI8RktIVJyUTnbiZDIwe",
      name: "Pro",
      price: 1000,
      interval: "month",
      features: [
        "Post up to 10 events per month",
        "High visibility in listings",
        "Priority placement on category pages",
        "Upload up to 5 event images",
        "Organizer verification badge",
        "Event analytics (views, clicks)",
        "Ticket sales enabled",
        "Email notifications to attendees",
        "Basic support (24–48 hrs response)",
      ],
    },
    {
      id: "price_1SUVEN8RktIVJyUTF6MeVK0d",
      name: "Enterprise",
      price: 5000,
      interval: "month",
      features: [
        "Unlimited event posting",
        "Maximum visibility & premium placement",
        "Upload unlimited event images",
        "Advanced organizer verification",
        "Full analytics dashboard (traffic, ticket clicks, conversions)",
        "Priority ticket listing on homepage",
        "Custom branding on event pages",
        "Automated attendee reminders",
        "Dedicated account manager",
        "Priority support (same-day response)",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-linear-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Select the perfect plan that fits your needs and unlocks premium
            features
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative p-8 rounded-3xl transition-all duration-500 group cursor-pointer ${
                selectedPlan === plan.id
                  ? "bg-white shadow-2xl border-2 border-blue-500 transform scale-105"
                  : "bg-white/80 backdrop-blur-sm shadow-xl border border-slate-200 hover:shadow-2xl hover:scale-102"
              }`}
            >
              {/* Premium Badge for Featured Plan */}
              {index === 1 && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-3">
                  {plan.name}
                </h2>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold text-slate-900">
                    KES {plan.price.toLocaleString()}
                  </span>
                  <span className="text-slate-500">/{plan.interval}</span>
                </div>
                <p className="text-slate-600 text-sm">
                  Billed {plan.interval === "month" ? "monthly" : "yearly"}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {plan.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Radio Selection */}
              <div className="flex items-center justify-center pt-6 border-t border-slate-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      checked={selectedPlan === plan.id}
                      onChange={() => setSelectedPlan(plan.id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        selectedPlan === plan.id
                          ? "border-blue-500 bg-blue-500"
                          : "border-slate-300 group-hover:border-blue-400"
                      }`}
                    >
                      {selectedPlan === plan.id && (
                        <div className="absolute inset-1 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <span
                    className={`font-medium transition-colors ${
                      selectedPlan === plan.id
                        ? "text-blue-600"
                        : "text-slate-500 group-hover:text-slate-700"
                    }`}
                  >
                    {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Form method="post">
            <input type="hidden" name="priceId" value={selectedPlan} />

            <button
              type="submit"
              disabled={navigation.state === "submitting"}
              className="relative px-16 py-5 rounded-2xl text-white font-semibold text-lg bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group overflow-hidden"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {navigation.state === "submitting" ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                "Subscribe Now"
              )}
            </button>

            {/* Security Note */}
            <p className="text-slate-500 text-sm mt-6 flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Secure payment · 256-bit SSL encrypted
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}
