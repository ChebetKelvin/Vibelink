import { useState, useMemo } from "react";
import { Calendar, MapPin, Tag, Search, ChevronDown } from "lucide-react";
import { data, Link } from "react-router";
import { getEvents } from "../models/events";

// Define your brand colors
let primaryColor = "#095075";
let accentColor = "#b8932f";

// Helper to format date/time
let formatDateTime = (isoDate) => {
  let date = new Date(isoDate);
  // Separate day number and month abbreviation for the badge
  let dayNum = date.toLocaleDateString(undefined, { day: "numeric" });
  let monthAbbr = date.toLocaleDateString(undefined, { month: "short" });

  // Combine for the main date display
  let fullDatePart = `${monthAbbr} ${dayNum}`;

  let timePart = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return {
    date: fullDatePart,
    time: timePart,
    badgeDay: dayNum,
    badgeMonth: monthAbbr,
  };
};

// Helper to truncate description for summary view
let truncateDescription = (description, limit = 85) => {
  if (!description || description.length <= limit) return description;
  let truncated = description.substring(0, limit);
  // Ensure we don't cut off a word awkwardly
  truncated = truncated.substring(0, truncated.lastIndexOf(" "));
  return truncated;
};
export async function loader() {
  let results = await getEvents();

  let events = results
    .map((event) => ({
      ...event,
      _id: event._id.toString(),
    }))
    .filter((event) => event.status === "approved"); // Only approved

  console.log(events);

  return data({ events });
}

export default function EventsListingPage({ loaderData }) {
  let { events } = loaderData;
  let [searchTerm, setSearchTerm] = useState("");
  let [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories for filtering
  let allCategories = useMemo(() => {
    // Assuming eventsData is available
    let categories = new Set(events.map((event) => event.category));
    return ["All", ...Array.from(categories)].sort();
  }, []);

  // Filter events based on search term and category
  let filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 1. Category Filter
      if (selectedCategory !== "All" && event.category !== selectedCategory) {
        return false;
      }
      // 2. Search Term Filter (checks title, description, category, and location)
      let lowerCaseSearch = searchTerm.toLowerCase();
      let eventDescription = event.description || ""; // Handle missing description

      return (
        event.title.toLowerCase().includes(lowerCaseSearch) ||
        eventDescription.toLowerCase().includes(lowerCaseSearch) ||
        event.category.toLowerCase().includes(lowerCaseSearch) ||
        event.location.name.toLowerCase().includes(lowerCaseSearch)
      );
    });
  }, [searchTerm, selectedCategory]);

  // Function to get the primary fee/price string
  let getFeeString = (event) => {
    if (event.isFree) return "FREE ENTRY";
    // Check if feeStructure exists and has prices
    let prices =
      event.feeStructure?.filter((f) => f.price).map((f) => f.price) || [];

    if (prices.length > 0) {
      let minPrice = Math.min(...prices);
      return `Ksh ${minPrice.toLocaleString("en-US")}+`;
    }
    return "Ticketed";
  };

  // Function to generate a color for the date badge based on price
  let getDateColor = (event) => {
    if (event.isFree) return "bg-green-500 text-white";
    return `bg-[${accentColor}] text-gray-900`; // Gold accent
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Premium Header Section */}
        <div className="text-center mb-16">
          {/* Decorative Elements */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-4 h-0.5 bg-[#b8932f] mr-4"></div>
            <span className="text-sm font-semibold text-[#095075] uppercase tracking-widest">
              Curated Experiences
            </span>
            <div className="w-4 h-0.5 bg-[#b8932f] ml-4"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 relative">
            <span className="relative z-10">
              Discover All{" "}
              <span className="italic bg-linear-to-r from-[#b8932f] via-[#d4af37] to-[#f7e98e] bg-clip-text text-transparent drop-shadow-sm">
                Vibes
              </span>
            </span>
            {/* Underline Accent */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-linear-to-r from-[#095075] to-[#b8932f] rounded-full"></div>
          </h1>

          {/* Subtitle with Stats */}
          <div className="bg-linear-to-r from-[#095075]/5 to-[#b8932f]/5 p-6 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto mb-8">
            <p className="text-lg text-gray-700 font-medium">
              <span className="text-2xl font-bold text-[#095075]">
                {filteredEvents.length}
              </span>{" "}
              handpicked events across{" "}
              <span className="text-xl font-bold text-[#b8932f]">
                {allCategories.length - 1}
              </span>{" "}
              exclusive categories
            </p>
          </div>
        </div>

        {/* Premium Search & Filter Bar */}
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200 mb-16 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-linear-to-br from-[#095075]/2 to-[#b8932f]/2"></div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-[#b8932f]" />
              </div>
              <input
                type="text"
                placeholder="Search events, locations, artists, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 text-gray-700 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#b8932f]/30 focus:border-[#b8932f] focus:outline-none transition-all duration-300 bg-white/80 shadow-sm hover:border-gray-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative flex-1 lg:flex-none lg:w-72">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Tag className="w-4 h-4 text-[#b8932f]" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-12 py-4 text-gray-700 border-2 border-gray-200 rounded-xl bg-white/80 focus:ring-2 focus:ring-[#b8932f]/30 focus:border-[#b8932f] focus:outline-none transition-all duration-300 appearance-none shadow-sm hover:border-gray-300 cursor-pointer"
              >
                {allCategories.map((cat) => (
                  <option key={cat} value={cat} className="text-gray-700 py-2">
                    {cat === "All" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Quick Filter Chips (Optional) */}
            <div className="flex flex-wrap gap-2 lg:hidden">
              {allCategories.slice(0, 3).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-[#095075] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || selectedCategory !== "All") && (
            <div className="relative z-10 flex flex-wrap gap-2 mt-4">
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#b8932f]/10 text-[#b8932f] text-sm font-medium">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-2 hover:text-[#095075] transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#095075]/10 text-[#095075] text-sm font-medium">
                  Category: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="ml-2 hover:text-[#b8932f] transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {(searchTerm || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="text-sm text-gray-500 hover:text-[#095075] font-medium transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
          )}
        </div>
        {/* --- Events Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, i) => {
              let { date, time, badgeDay, badgeMonth } = formatDateTime(
                event.date
              );
              let cardDateColor = getDateColor(event);
              let truncatedDesc = truncateDescription(event.description);

              return (
                <Link
                  to={`/events/${event._id}`}
                  key={i}
                  className="relative rounded-xl overflow-hidden shadow-xl border border-gray-100 cursor-pointer group transform transition duration-300 hover:shadow-2xl hover:border-gray-200 hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={
                        event.imageUrl ||
                        "https://images.unsplash.com/photo-1505373877841-80ed08c02c65?q=80&w=800&fit=crop"
                      }
                      alt={event.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-[0.95]"
                      loading="lazy"
                    />
                  </div>
                  {/* Date Badge */}
                  <div
                    className={`absolute top-0 right-0 ${cardDateColor} font-bold p-2 text-center rounded-bl-xl shadow-md z-10`}
                  >
                    <span className="block text-xl leading-none">
                      {badgeDay}
                    </span>
                    <span className="block text-xs leading-none">
                      {badgeMonth.toUpperCase()}
                    </span>
                  </div>
                  {/* Event Info */}
                  <div className="p-5 flex flex-col justify-start h-full bg-white">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight group-hover:text-[#b8932f] transition-colors">
                      {event.title}
                    </h3>

                    {/* NEW: Free/Paid Tag */}
                    {event.isFree && (
                      <span className="w-fit mb-3 bg-green-500/10 text-green-700 text-xs font-semibold py-1 px-3 rounded-full uppercase">
                        FREE ENTRY
                      </span>
                    )}

                    {/* NEW: Description with Read More Link */}
                    {event.description && (
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                        {truncatedDesc}
                        {event.description.length > truncatedDesc.length && (
                          <span
                            className="text-[#095075] font-semibold hover:text-[#b8932f] ml-1 cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              /* Placeholder for navigation */ console.log(
                                "Read More clicked"
                              );
                            }}
                          >
                            ...Read More &rarr;
                          </span>
                        )}
                      </p>
                    )}

                    {/* Event Details with Icons */}
                    <div className="text-sm text-gray-600 space-y-1 mt-2 mb-4">
                      <p className="flex items-center">
                        <Calendar
                          className="w-4 h-4 mr-2 shrink-0"
                          style={{ color: primaryColor }}
                        />
                        <span className="font-medium text-gray-800">
                          {date}
                        </span>
                        <span className="ml-1">, {time}</span>
                      </p>
                      <p className="flex items-center">
                        <MapPin
                          className="w-4 h-4 mr-2 shrink-0"
                          style={{ color: primaryColor }}
                        />
                        {event.location.name}
                        {event.location.city &&
                          event.location.city !== event.location.name && (
                            <span className="ml-1 text-gray-500">
                              ({event.location.city})
                            </span>
                          )}
                      </p>
                      <p className="flex items-center">
                        <Tag
                          className="w-4 h-4 mr-2 shrink-0"
                          style={{ color: primaryColor }}
                        />
                        {event.category}
                      </p>
                    </div>

                    {/* Price Tag at Bottom */}
                    <div className="pt-3 border-t flex justify-between items-center mt-auto">
                      <span
                        className="text-lg font-extrabold"
                        style={{
                          color: event.isFree ? "#10B981" : primaryColor,
                        }}
                      >
                        {getFeeString(event)}
                      </span>
                      <span className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        View Details &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-xl text-gray-600">
                No events found matching your criteria. Try adjusting your
                search or filter!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
