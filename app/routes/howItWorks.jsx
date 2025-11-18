import { Link } from "react-router";

export default function HowItWorks() {
  const steps = [
    {
      title: "Discover Events",
      description:
        "Browse thousands of local events, concerts, church gatherings, campus activities, corporate events, and more. Filter by category, location, and date to find what interests you.",
      icon: "🔍",
      features: [
        "Smart recommendations",
        "Location-based discovery",
        "Personalized feeds",
        "Trending events",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Create & Share",
      description:
        "Event organizers can easily create events with images, descriptions, and ticket options. Share your event link directly or post it to VibeLink for maximum visibility.",
      icon: "📝",
      features: [
        "Drag-and-drop builder",
        "Multi-platform sharing",
        "Custom branding",
        "Instant publishing",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Engage & Attend",
      description:
        "Attendees can RSVP, buy tickets, or save events to their personal calendar. Receive reminders and updates to never miss out on events you care about.",
      icon: "🎟️",
      features: [
        "One-click RSVP",
        "Digital tickets",
        "Calendar integration",
        "Real-time notifications",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Track & Analyze",
      description:
        "Organizers can track engagement, ticket sales, and clicks. Use analytics to optimize your events and improve audience reach for future activities.",
      icon: "📊",
      features: [
        "Real-time analytics",
        "Revenue tracking",
        "Audience insights",
        "Performance reports",
      ],
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* HERO SECTION */}
      <section className="relative py-24 px-6 text-center bg-linear-to-r from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-10 w-24 h-24 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 right-20 w-32 h-32 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-green-400 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Join 50,000+ successful event organizers
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
            How VibeLink Works
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            From discovery to success - your complete event journey simplified
            with intelligent tools
          </p>
        </div>
      </section>

      {/* STEPS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-linear-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent mb-4">
            Your Event Success Journey
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Four simple steps to transform your event ideas into unforgettable
            experiences
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-linear-to-r from-blue-200 via-purple-200 to-green-200 transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`group relative ${
                  index % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"
                } lg:w-11/12`}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white border-4 border-slate-100 rounded-2xl flex items-center justify-center shadow-lg z-20">
                  <span className="text-lg font-bold text-slate-700">
                    {index + 1}
                  </span>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-slate-200 transition-all duration-500 group-hover:transform group-hover:scale-105 h-full">
                  {/* Icon with linear */}
                  <div
                    className={`w-20 h-20 bg-linear-to-r ${step.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-3xl">{step.icon}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3 text-sm text-slate-600"
                      >
                        <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Hover Effect Border */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-linear-to-r ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USER JOURNEY VISUALIZATION */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-slate-200">
          <h3 className="text-3xl font-bold text-center text-slate-800 mb-12">
            Two Perspectives, One Platform
          </h3>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Attendee Journey */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">👤</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-4">
                For Attendees
              </h4>
              <div className="space-y-4 text-left">
                {[
                  "Discover personalized event recommendations",
                  "Save and organize favorite events",
                  "Secure ticket purchases in seconds",
                  "Receive smart reminders and updates",
                  "Share events with friends and community",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-slate-600"
                  >
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Organizer Journey */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🏢</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-4">
                For Organizers
              </h4>
              <div className="space-y-4 text-left">
                {[
                  "Create professional event pages in minutes",
                  "Reach targeted audiences with smart promotion",
                  "Manage tickets and registrations seamlessly",
                  "Track real-time analytics and insights",
                  "Grow your community and build loyalty",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-slate-600"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="bg-linear-to-r from-slate-800 to-blue-900 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-cyan-300 rounded-full"></div>
          </div>

          <h2 className="text-4xl font-bold mb-4 relative z-10">
            Ready to Start Your Event Journey?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto relative z-10">
            Join thousands who have transformed their event ideas into
            successful realities
          </p>

          <div className="flex col sm:row gap-4 justify-center items-center relative z-10">
            <Link
              to="/add-event"
              className="inline-flex items-center justify-center bg-white text-slate-900 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              <span className="mr-3">🎉</span>
              Create Your First Event
              <span className="ml-3 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>

            <Link
              to="/events"
              className="inline-flex items-center justify-center border border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300 group"
            >
              <span className="mr-3">🔍</span>
              Explore Events
              <span className="ml-3 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>

          <div className="mt-8 text-blue-200 text-sm relative z-10">
            <div className="flex wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Average setup time: <strong>5 minutes</strong>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                No technical skills required
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Free to get started
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
