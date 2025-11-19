// src/components/Testimonials.jsx
import { Star } from "lucide-react"; // Icon for rating

let testimonials = [
  {
    quote:
      "VibeLink made planning our campus festival simple. Everything was handled seamlessly, from ticket sales to event promotion. Highly recommended for student organizers!",
    name: "Alex M.",
    title: "Student Event Organizer, MU",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&fit=crop", // Placeholder
    rating: 5,
  },
  {
    quote:
      "I've found so many unique local events I never knew existed! The food fair recommendation was spot on. It's my go-to platform for discovering what's happening near me.",
    name: "Sarah W.",
    title: "Local Explorer",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&fit=crop", // Placeholder
    rating: 5,
  },
  {
    quote:
      "Booking tickets for the corporate seminar was a breeze. The interface is clean, and the transaction was secure. A reliable platform for professional events.",
    name: "David K.",
    title: "Tech Professional",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&fit=crop", // Placeholder
    rating: 4,
  },
];

let accentColor = "#b8932f"; // Based on your 'Vibe' highlight

export default function Testimonials() {
  // Component for displaying the star rating
  let StarRating = ({ rating }) => (
    <div className="flex items-center mb-3">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 fill-current ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          style={{ color: i < rating ? accentColor : "#e5e7eb" }} // Use accent color for gold
          strokeWidth={0} // Fill star completely
        />
      ))}
    </div>
  );

  return (
    // Distinct background color (light gray) to separate from surrounding white sections
    <section className="py-24 bg-gray-50" aria-labelledby="testimonial-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            id="testimonial-heading"
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3"
          >
            Trusted by Event-Goers & Organizers
          </h2>
          <p className="text-lg text-gray-600">
            See why thousands are using VibeLink to discover and host events.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 transform transition duration-500 hover:shadow-2xl hover:scale-[1.02]"
            >
              <div className="relative">
                {/* Large quote mark background for visual appeal */}
                <span
                  className="absolute top-10 -left-2.5 text-5xl font-serif opacity-10"
                  style={{ color: accentColor }}
                >
                  &ldquo;
                </span>

                <StarRating rating={testimonial.rating} />

                <p className="text-gray-700 text-lg italic mb-6 relative z-10">
                  {testimonial.quote}
                </p>
              </div>

              {/* Reviewer Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-200"
                  loading="lazy"
                />
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
