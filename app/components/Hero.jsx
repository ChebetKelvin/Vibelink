// src/components/Hero.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  // Define the image source and alt text for better organization and accessibility
  const heroImage = {
    src: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1600&q=80",
    alt: "A vibrant crowd with their hands raised, enjoying a concert or festival.",
  };

  useEffect(() => {
    // 1. IMPROVEMENT: Use the native `loading="lazy"` on the image element
    // for general optimization, but keep the preloading for the Hero background
    // to ensure it loads fast for the initial viewport.
    const img = new Image();
    img.src = heroImage.src;
    img.onload = () => setLoaded(true);

    // Cleanup function (good practice for effects)
    return () => {
      img.onload = null;
    };
  }, []);

  return (
    <section
      className="relative h-[90vh] flex items-center justify-center overflow-hidden"
      aria-label="Event Discovery Hero Section" // Accessibility addition
    >
      {/* 2. IMPROVEMENT: Use an actual <img> tag for the background image
          This improves performance (browser can optimize image loading) and 
          accessibility (via the 'alt' attribute). */}
      <img
        src={heroImage.src}
        alt={heroImage.alt}
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          // Use background-attachment: fixed for the parallax effect
          backgroundAttachment: "fixed",
          // 3. IMPROVEMENT: Increase contrast by applying a darker filter
          filter: "brightness(0.5)",
        }}
        loading="eager" // Important for above-the-fold content
      />

      {/* Overlay - Adjusted opacity for better text contrast */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div
        className={`relative z-10 text-center text-white px-6 md:px-12 max-w-4xl transition-all duration-1000 transform ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* 4. DESIGN IMPROVEMENT: Refined Typography */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight">
          Experience Every <span className="text-[#b8932f]">Vibe</span> Near You
        </h1>
        <p className="text-xl md:text-2xl mb-10 font-light max-w-2xl mx-auto">
          All Your Plans in One Place. Discover What's Happening Now.
        </p>

        {/* 5. DESIGN IMPROVEMENT: Button Styling */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/events"
            className="
              bg-[#095075] hover:bg-[#07405c] text-white font-semibold 
              px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105
            "
            aria-label="Explore events now" // Accessibility addition
          >
            Explore Events
          </Link>
          <Link
            to="/add-event"
            className="
              border-2 border-[#b8932f] text-[#b8932f] font-semibold 
              hover:bg-[#b8932f] hover:text-white 
              px-8 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105
            "
            aria-label="Post your own event" 
          >
            Post Your Event
          </Link>
        </div>
      </div>
    </section>
  );
}
