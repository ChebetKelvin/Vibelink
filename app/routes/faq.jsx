import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function HostFAQ() {
  let [open, setOpen] = useState(null);

  let toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  let faqs = [
    {
      q: "What is VibeLink and how does it help hosts?",
      a: "VibeLink allows event organizers to post and promote events easily. It gives your event visibility, helps you reach your audience, and allows you to track views and ticket clicks depending on your plan.",
    },
    {
      q: "Do I need to pay to post an event?",
      a: "You can post up to 2 free events per month with the Basic plan. For more visibility, analytics, and unlimited posting, you can upgrade to Pro or Enterprise.",
    },
    {
      q: "How do I upload event images?",
      a: "During event creation, simply upload an image directly from your device—no need for an image URL. Images are processed and optimized automatically.",
    },
    {
      q: "Can I edit my event after publishing?",
      a: "Yes! At any time, you can update event details, images, and schedules from your dashboard.",
    },
    {
      q: "Does VibeLink support ticket sales?",
      a: "Yes. Pro and Enterprise plans unlock ticketing integration, allowing attendees to book directly and helping you track engagement.",
    },
    {
      q: "How long does event approval take?",
      a: "Events are usually reviewed within 5–30 minutes. Enterprise plans receive instant approval.",
    },
    {
      q: "What types of events can I post?",
      a: "All types—concerts, church events, tours, corporate events, student events, charity activities, and more.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>🎯</span>
            Host Resources
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent mb-6">
            Host Success Center
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Master the art of event hosting with our comprehensive guide. From
            setup to success, we've got you covered.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Quick Stats */}
            <div className="md:col-span-4 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">95%</div>
                  <div className="text-sm text-slate-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">24/7</div>
                  <div className="text-sm text-slate-600">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">50K+</div>
                  <div className="text-sm text-slate-600">Events Hosted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">4.9★</div>
                  <div className="text-sm text-slate-600">Host Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Grid */}
          <div className="space-y-6">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-slate-200 transition-all duration-500 overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center text-left p-8 hover:bg-slate-50/50 transition-colors duration-300"
                  onClick={() => toggle(index)}
                >
                  <div className="flex items-start gap-6">
                    <div
                      className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        open === index
                          ? "bg-blue-500 text-white"
                          : "bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white"
                      }`}
                    >
                      <span className="text-lg font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2 pr-8">
                        {item.q}
                      </h3>
                      {open === index && (
                        <p className="text-slate-600 leading-relaxed text-left">
                          {item.a}
                        </p>
                      )}
                    </div>
                  </div>
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      open === index
                        ? "bg-blue-500 text-white rotate-180"
                        : "bg-slate-100 text-slate-600 group-hover:bg-blue-500 group-hover:text-white"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                  </div>
                </button>

                {open === index && (
                  <div className="px-8 pb-8">
                    <div className="pl-18 border-t border-slate-100 pt-6">
                      <div className="prose prose-slate max-w-none">
                        <p className="text-slate-600 leading-relaxed text-lg">
                          {item.a}
                        </p>
                        {/* Additional content based on FAQ type */}
                        {item.q.toLowerCase().includes("payment") && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-2xl">
                            <h4 className="font-semibold text-blue-800 mb-2">
                              Payment Timeline:
                            </h4>
                            <ul className="text-blue-700 space-y-1">
                              <li>
                                • Funds released 24 hours after event completion
                              </li>
                              <li>• Multiple payout methods supported</li>
                              <li>• Real-time revenue tracking available</li>
                            </ul>
                          </div>
                        )}

                        {item.q.toLowerCase().includes("promote") && (
                          <div className="mt-4 p-4 bg-green-50 rounded-2xl">
                            <h4 className="font-semibold text-green-800 mb-2">
                              Pro Tips:
                            </h4>
                            <ul className="text-green-700 space-y-1">
                              <li>
                                • Share on social media 2-3 weeks in advance
                              </li>
                              <li>• Use high-quality images and videos</li>
                              <li>• Leverage email marketing campaigns</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Host Guides</h3>
              <p className="text-blue-100 mb-4">
                Step-by-step tutorials for event success
              </p>
              <button className="text-white font-semibold hover:underline">
                Explore Guides →
              </button>
            </div>

            <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎬</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Video Tutorials</h3>
              <p className="text-purple-100 mb-4">
                Watch our best hosts in action
              </p>
              <button className="text-white font-semibold hover:underline">
                Watch Videos →
              </button>
            </div>

            <div className="bg-linear-to-br from-green-500 to-green-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-green-100 mb-4">
                Connect with other event hosts
              </p>
              <button className="text-white font-semibold hover:underline">
                Join Community →
              </button>
            </div>
          </div>

          {/* Enhanced Call to Action */}
          <div className="text-center mt-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-slate-200 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Ready to Create Unforgettable Events?
              </h2>
              <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">
                Join thousands of successful hosts who trust VibeLink for their
                events.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/add-event"
                  className="inline-flex items-center justify-center bg-linear-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105"
                >
                  <span>🚀 Start Hosting Now</span>
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center border border-slate-300 text-slate-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-slate-50 transition-all duration-300"
                >
                  <span>💬 Get Personalized Help</span>
                </a>
              </div>
              <p className="text-slate-500 text-sm mt-6">
                Average host earnings: <strong>KES 45,000</strong> per event
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
