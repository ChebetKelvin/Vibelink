import { Link } from "react-router";

export default function About() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* HERO SECTION */}
      <section className="relative py-24 px-6 text-center bg-linear-to-r from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-blue-300 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-indigo-300 rounded-full"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Trusted by 50,000+ event organizers
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
            About VibeLink
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing how communities discover, create, and experience
            unforgettable events
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-blue-200 text-sm">Events Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1M+</div>
              <div className="text-blue-200 text-sm">Tickets Sold</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">200+</div>
              <div className="text-blue-200 text-sm">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-blue-200 text-sm">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-linear-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent mb-6">
            Our Story
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-indigo-600 mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
            VibeLink was born from a simple observation: while the world is
            filled with amazing events, discovering and managing them was
            unnecessarily complicated. We set out to create a platform that not
            only connects people with events that inspire, educate, and
            entertain, but also empowers organizers with enterprise-grade tools
            previously available only to large corporations.
          </p>
        </div>

        {/* Timeline */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              The Vision
            </h3>
            <p className="text-slate-600">
              Create a unified platform where every event, from local gatherings
              to major festivals, gets the visibility it deserves.
            </p>
          </div>

          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              The Launch
            </h3>
            <p className="text-slate-600">
              Built with cutting-edge technology to deliver seamless experiences
              for both organizers and attendees.
            </p>
          </div>

          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌍</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              The Impact
            </h3>
            <p className="text-slate-600">
              Transforming how communities connect through events, one
              successful gathering at a time.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section className="max-w-6xl mx-auto px-6 mt-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold bg-linear-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              To democratize event management by providing organizers of all
              sizes with powerful, intuitive tools to showcase their events,
              reach the right audience, and maximize their impact. We believe
              that meaningful connections happen when great events meet engaged
              audiences.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Innovation</h4>
                  <p className="text-slate-600 text-sm">
                    letantly evolving to meet organizer needs
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">
                    Accessibility
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Tools that work for everyone, everywhere
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Our Core Values</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white">✦</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Simplicity First
                  </h4>
                  <p className="text-blue-100">
                    Complex problems deserve elegant, simple solutions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white">✦</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Fair Visibility
                  </h4>
                  <p className="text-blue-100">
                    Every event deserves its moment in the spotlight
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white">✦</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Community Focus
                  </h4>
                  <p className="text-blue-100">
                    Building tools that bring people together
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white">✦</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Excellence</h4>
                  <p className="text-blue-100">
                    Never settling for anything less than exceptional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE VIBELINK */}
      <section className="max-w-7xl mx-auto px-6 mt-28">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-linear-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent mb-4">
            Why Event Organizers Love VibeLink
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Built with precision, designed for impact, trusted by thousands
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: "🎯",
              title: "Intuitive Event Creation",
              description:
                "Create stunning event pages in minutes with our drag-and-drop builder and smart templates",
            },
            {
              icon: "📊",
              title: "Advanced Analytics",
              description:
                "Real-time insights into ticket sales, audience engagement, and revenue performance",
            },
            {
              icon: "🌐",
              title: "Maximum Visibility",
              description:
                "AI-powered promotion and multi-channel distribution to reach your ideal audience",
            },
            {
              icon: "💸",
              title: "Revenue Optimization",
              description:
                "Smart pricing tools, multiple payment options, and instant payout capabilities",
            },
            {
              icon: "👥",
              title: "Community Building",
              description:
                "Engage with attendees before, during, and after your events with built-in tools",
            },
            {
              icon: "🛡️",
              title: "Secure & Reliable",
              description:
                "Enterprise-grade security with 99.9% uptime guarantee for peace of mind",
            },
            {
              icon: "📱",
              title: "Mobile First",
              description:
                "Perfect experience on any device with dedicated mobile apps for organizers",
            },
            {
              icon: "🎨",
              title: "Brand Control",
              description:
                "Full customization options to maintain your brand identity across all touchpoints",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-slate-200 hover:border-blue-200 transition-all duration-500 hover:transform hover:scale-105"
            >
              <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-4xl mx-auto px-6 mt-28 mb-20">
        <div className="bg-linear-to-r from-slate-800 to-blue-900 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2"></div>

          <h2 className="text-4xl font-bold mb-4 relative z-10">
            Ready to Transform Your Events?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto relative z-10">
            Join thousands of successful organizers who trust VibeLink to power
            their events
          </p>

          <div className="flex col sm:row gap-4 justify-center items-center relative z-10">
            <Link
              to="/add-event"
              className="inline-flex items-center justify-center bg-white text-slate-900 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              <span className="mr-3">🚀</span>
              Start Creating Events
              <span className="ml-3 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center border border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300"
            >
              <span className="mr-3">💬</span>
              Book a Demo
            </Link>
          </div>

          <div className="mt-8 text-blue-200 text-sm relative z-10">
            <p>
              Average organizer revenue increase: <strong>67%</strong> in first
              3 months
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
