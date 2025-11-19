export default function Privacy() {
  let privacySections = [
    {
      title: "Information Collection",
      icon: "📥",
      content:
        "We collect information you provide when creating an account, posting events, or purchasing tickets. This may include your name, email address, payment information, and event details.",
      details: [
        "Account registration data",
        "Event creation and management information",
        "Payment and transaction records",
        "Communication preferences",
        "Device and usage analytics",
      ],
    },
    {
      title: "Use of Information",
      icon: "🔍",
      content:
        "Your information is used to provide and improve our services, process payments, communicate updates, and personalize your experience.",
      details: [
        "Service delivery and optimization",
        "Payment processing and security",
        "Personalized event recommendations",
        "Platform improvements and updates",
        "Customer support and communication",
      ],
    },
    {
      title: "Data Sharing",
      icon: "🤝",
      content:
        "We do not sell your personal information. We may share data with trusted service providers for payment processing and email notifications or if required by law.",
      details: [
        "Payment processors (Stripe, PayPal)",
        "Email service providers",
        "Cloud infrastructure partners",
        "Legal compliance requirements",
        "Business transfers (mergers/acquisitions)",
      ],
    },
    {
      title: "Cookies & Tracking",
      icon: "🍪",
      content:
        "VibeLink uses cookies and similar technologies to enhance your browsing experience and collect analytics for improving the platform.",
      details: [
        "Essential functional cookies",
        "Analytics and performance tracking",
        "Personalization preferences",
        "Security and fraud prevention",
        "Third-party service integrations",
      ],
    },
    {
      title: "Data Security",
      icon: "🛡️",
      content:
        "We implement industry-standard measures to protect your information. However, no method of transmission over the Internet is 100% secure.",
      details: [
        "End-to-end encryption",
        "Regular security audits",
        "Access controls and authentication",
        "Data backup and recovery",
        "Compliance with industry standards",
      ],
    },
    {
      title: "Your Rights",
      icon: "⚖️",
      content:
        "You can access, update, or delete your personal information by contacting us. You may also opt-out of marketing communications at any time.",
      details: [
        "Right to access your data",
        "Right to correction and updates",
        "Right to deletion and erasure",
        "Right to data portability",
        "Right to marketing preferences",
      ],
    },
    {
      title: "Policy Updates",
      icon: "🔄",
      content:
        "We may update this Privacy Policy from time to time. Changes will be posted on this page with the effective date.",
      details: [
        "30-day notice for major changes",
        "Email notifications for significant updates",
        "Clear version history tracking",
        "User consent for material changes",
        "Archive of previous policies",
      ],
    },
    {
      title: "International Data",
      icon: "🌍",
      content:
        "Your data may be processed in facilities located outside your country, but we ensure adequate protection through standard contractual clauses.",
      details: [
        "GDPR compliance for EU users",
        "Cross-border data transfer safeguards",
        "Regional data protection compliance",
        "International privacy standards",
        "Data localization where required",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* HERO SECTION */}
      <section className="relative py-20 px-6 text-center bg-linear-to-r from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-24 h-24 bg-blue-300 rounded-full"></div>
          <div className="absolute bottom-10 right-20 w-32 h-32 bg-green-300 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-purple-300 rounded-full"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Last Updated: December 2023
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Your trust is our priority. Learn how we protect and handle your
            data with transparency and care.
          </p>
        </div>
      </section>

      {/* QUICK SUMMARY */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">
            At a Glance
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-2xl">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🔒</span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">We Protect</h3>
              <p className="text-slate-600 text-sm">
                Your data with enterprise-grade security measures
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-2xl">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🚫</span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                We Don't Sell
              </h3>
              <p className="text-slate-600 text-sm">
                Your personal information to third parties
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-2xl">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">You Control</h3>
              <p className="text-slate-600 text-sm">
                Your privacy settings and data preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED CONTENT */}
      <section className="max-w-5xl mx-auto px-6 mt-16 space-y-8">
        {privacySections.map((section, index) => (
          <div
            key={index}
            className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-slate-200 transition-all duration-500 hover:transform hover:scale-[1.02]"
          >
            <div className="flex items-start gap-6">
              {/* Icon */}
              <div className="shrink-0 w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">{section.icon}</span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-slate-800">
                    {section.title}
                  </h2>
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-sm font-semibold">
                    {index + 1}
                  </div>
                </div>

                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  {section.content}
                </p>

                {/* Details List */}
                <div className="grid md:grid-cols-2 gap-3">
                  {section.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="flex items-center gap-3 text-slate-600"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full shrink-0"></div>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* DATA RETENTION */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Data Retention Periods
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Active Data</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Account Information</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    While Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Event Data</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    3 Years
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Payment Records</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    7 Years
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Inactive Data</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Analytics Data</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    2 Years
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Backup Data</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    1 Year
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Marketing Data</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    Opt-out
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT & ACTIONS */}
      <section className="max-w-4xl mx-auto px-6 mt-16 mb-20">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-slate-200 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Your Privacy Matters
          </h2>
          <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
            We're committed to being transparent about our data practices. If
            you have any questions or need to exercise your privacy rights,
            we're here to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="mailto:privacy@vibelink.com"
              className="inline-flex items-center justify-center bg-linear-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span className="mr-3">📧</span>
              Email Privacy Team
            </a>

            <a
              href="/settings/privacy"
              className="inline-flex items-center justify-center border border-slate-300 text-slate-700 px-8 py-4 rounded-2xl font-semibold hover:bg-slate-50 transition-all duration-300"
            >
              <span className="mr-3">⚙️</span>
              Privacy Settings
            </a>
          </div>

          <div className="text-sm text-slate-500">
            <p>Response time: Typically within 24-48 hours</p>
            <p className="mt-2">
              Data Protection Officer: privacy@vibelink.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
