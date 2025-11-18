// src/loaders/categoryLoader.js
import { getEventsByCategory } from "../models/events";
import { Link, useLoaderData } from "react-router";

// Define your categories
const categories = [
  "Concerts & Nightlife",
  "Charity & Community",
  "Wellness & Fitness",
  "Education & Skills",
  "Student & Campus",
  "Adventure & Travel",
  "Offers & Discounts",
  "Sports",
];

// Slug → Category mapping
const slugToCategory = Object.fromEntries(
  categories.map((cat) => [
    cat.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-"),
    cat,
  ])
);

export async function loader({ params }) {
  const { category: slug } = params;
  const categoryName = slugToCategory[slug];

  if (!categoryName) return { events: [] };

  try {
    const eventsFromDb = await getEventsByCategory(categoryName);

    // Filter only approved events
    const approvedEvents = eventsFromDb.filter(
      (event) => event.status === "approved"
    );

    // Convert ObjectId to string
    const events = approvedEvents.map((event) => ({
      ...event,
      _id: event._id.toString(),
    }));

    return { events, categoryName };
  } catch (error) {
    console.error("Error fetching events:", error);
    return { events: [], categoryName };
  }
}

export default function CategoryPage() {
  const { events, categoryName } = useLoaderData();

  if (!categoryName)
    return <p className="p-6 text-center">Invalid category.</p>;
  if (!events.length)
    return (
      <p className="p-6 text-center">No events found for {categoryName}.</p>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-[#095075] to-[#b8932f] bg-clip-text text-transparent">
            {categoryName}
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-[#095075] to-[#b8932f] mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover exceptional experiences and curated events
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Link
              key={event._id}
              to={`/events/${event._id}`}
              className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100 hover:border-[#095075]/20 block cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
                    style={{
                      backgroundColor: event.isFree ? "#b8932f" : "#095075",
                      color: "white",
                    }}
                  >
                    {event.isFree ? "FREE" : "PREMIUM"}
                  </span>
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6 bg-white">
                <h2 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-[#095075] transition-colors duration-300 line-clamp-2">
                  {event.title}
                </h2>

                {event.location?.name && (
                  <div className="flex items-center mb-3">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      style={{ color: "#b8932f" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-gray-600 text-sm font-medium">
                      {event.location.name}
                      {event.location.city && `, ${event.location.city}`}
                    </p>
                  </div>
                )}

                <div className="flex items-center mb-3">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={{ color: "#b8932f" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-gray-600 text-sm font-medium">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-3">
                  {event.description || "No description available."}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <p className="font-bold text-lg" style={{ color: "#095075" }}>
                    {event.isFree
                      ? "Free Entry"
                      : event.feeStructure?.[0]?.price
                        ? `From KES ${event.feeStructure[0].price}`
                        : "Price TBA"}
                  </p>
                  <div
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 group-hover:scale-105 shadow-md group-hover:shadow-lg text-white"
                    style={{ backgroundColor: "#b8932f" }}
                  >
                    View Details
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
