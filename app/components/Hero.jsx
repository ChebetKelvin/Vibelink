export default function Hero() {
  let heroImage = {
    src: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1600&q=70",
    alt: "A vibrant crowd with their hands raised, enjoying a concert or festival.",
  };

  return (
    <section
      className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black"
      aria-label="Event Discovery Hero Section"
    >
      <img
        src={heroImage.src}
        alt={heroImage.alt}
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          backgroundAttachment: "fixed",
          filter: "brightness(0.5)",
        }}
        loading="eager"
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-center text-white px-6 md:px-12 max-w-4xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight">
          Experience Every <span className="text-[#b8932f]">Vibe</span> Near You
        </h1>
        <p className="text-xl md:text-2xl mb-10 font-light max-w-2xl mx-auto">
          All Your Plans in One Place. Discover What's Happening Now.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/events"
            className="
              bg-[#095075] hover:bg-[#07405c] text-white font-semibold 
              px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105
            "
            aria-label="Explore events now"
          >
            Explore Events
          </a>
          <a
            href="/add-event"
            className="
              border-2 border-[#b8932f] text-[#b8932f] font-semibold 
              hover:bg-[#b8932f] hover:text-white 
              px-8 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105
            "
            aria-label="Post your own event"
          >
            Post Your Event
          </a>
        </div>
      </div>
    </section>
  );
}
