// src/routes/home.jsx
import Hero from "../components/Hero";
import Category from "../components/Category";
import Testimonials from "../components/Testimonials";
import { useLoaderData } from "react-router";
import { Calendar, MapPin, Tag } from "lucide-react";
import { getEvents } from "../models/events";

export function meta() {
  return [
    { title: "VibeLink | Discover & Share Events Near You" },
    {
      name: "description",
      content:
        "Find and promote local events, concerts, campus activities, tours, and more. VibeLink connects you to the heartbeat of your community.",
    },
  ];
}

// ✅ SERVER-SIDE LOADER
export async function loader() {
  let results = await getEvents();

  let events = results.map((event) => ({
    ...event,
    _id: event._id.toString(),
  }));

  return { events };
}

export default function Home() {
  // ✅ Access data from loader
  let { events } = useLoaderData();

  let formatDateTime = (isoDate) => {
    let date = new Date(isoDate);
    let datePart = date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    });
    let timePart = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { date: datePart, time: timePart };
  };

  // ✅ Filter only upcoming events (next 8)
  let now = new Date();
  let upcomingEvents = events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 8);

  return (
    <main>
      <Hero />
      <Category />

      <section className="py-24 bg-white" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              id="featured-heading"
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3"
            >
              🔥 Top Upcoming Events
            </h2>
            <p className="text-lg text-gray-600">
              Don’t miss out! Check out the most anticipated vibes happening
              soon.
            </p>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {upcomingEvents.map((event) => {
              let { date, time } = formatDateTime(event.date);
              let dateParts = date.split(" ");
              let badgeDay = dateParts[0];
              let badgeMonth = dateParts[1]?.toUpperCase() || "";

              return (
                <a
                  key={event._id}
                  href={`/events/${event._id}`}
                  className="relative rounded-xl overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer group transform transition duration-500 hover:-translate-y-1 hover:scale-[1.01] bg-white border border-gray-100"
                >
                  {/* Image */}
                  <div className="h-44 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Date Badge */}
                  <div className="absolute top-0 right-0 bg-[#095075] text-white font-bold p-2 text-center rounded-bl-xl shadow-md">
                    <span className="block text-xl leading-none">
                      {badgeDay}
                    </span>
                    <span className="block text-xs leading-none">
                      {badgeMonth}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="p-5 flex flex-col justify-start h-full">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">
                      {event.title}
                    </h3>

                    <div className="text-sm text-gray-600 space-y-1 mt-2 mb-4">
                      <p className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-[#095075]" />
                        <span className="font-medium text-gray-800">
                          {date}
                        </span>
                        <span className="ml-1">{time}</span>
                      </p>
                      <p className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-[#095075]" />
                        {event.location?.name || event.location || "TBA"}
                      </p>
                      <p className="flex items-center">
                        <Tag className="w-4 h-4 mr-2 text-[#095075]" />
                        {event.category}
                      </p>
                    </div>

                    {/* View Button */}
                    <a
                      href={`/events/${event._id}`}
                      className="w-full bg-[#095075] hover:bg-[#b8932f] text-white font-semibold px-4 py-2 text-base rounded-lg transition-colors shadow-md mt-auto text-center block"
                    >
                      View Details
                    </a>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Discover All Events Button */}
          <div className="text-center mt-16">
            <a
              href="/events"
              className="border-2 border-[#095075] text-[#095075] hover:bg-[#095075] hover:text-white font-semibold px-10 py-3 text-lg rounded-full transition-colors inline-flex items-center"
            >
              Discover All Events
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </section>

      <Testimonials />
    </main>
  );
}
