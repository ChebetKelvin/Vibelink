import { useParams } from "react-router";
import {
  Calendar,
  MapPin,
  Tag,
  Ticket,
  Clock,
  Users,
  ArrowLeft,
  Share2,
  Heart,
  Star,
  Map,
  Phone,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { getEventById, getEventsByCategory } from "../models/events";
import { useState } from "react";

// Category color mapping
let getCategoryColor = (category) => {
  let colors = {
    "Concerts & Nightlife": "from-purple-500 to-pink-500",
    "Charity & Community": "from-green-500 to-teal-500",
    "Wellness & Fitness": "from-blue-500 to-cyan-500",
    "Education & Skills": "from-orange-500 to-red-500",
    "Student & Campus": "from-indigo-500 to-purple-500",
    "Adventure & Travel": "from-emerald-500 to-green-500",
    Sports: "from-red-500 to-orange-500",
    "Offers & Discounts": "from-yellow-500 to-amber-500",
  };
  return colors[category] || "from-gray-500 to-gray-700";
};

// Loader function to fetch event by _id
export async function loader({ params }) {
  let { id } = params;

  let event = await getEventById(id); // fetch the main event
  if (!event) throw new Response("Event Not Found", { status: 404 });

  // Fetch similar events from the DB
  let similarEvents = await getEventsByCategory(event.category, id);
  // make sure this function excludes the main event

  return {
    event: {
      ...event,
      _id: event._id.toString(),
    },
    similarEvents, // array of similar events
  };
}

export default function EventDetail({ loaderData }) {
  let { id } = useParams();
  let { event, similarEvents } = loaderData;
  let [liked, setLiked] = useState(false);
  let [copied, setCopied] = useState(false);

  let handleShare = async () => {
    let url = window.location.href;

    let shareData = {
      title: event.title,
      text: `Check out this event: ${event.title}`,
      url,
    };

    // ✔ Mobile native share (Android/iOS)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share cancelled");
      }
      return;
    }

    // ✔ Desktop: Copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-6"
          >
            😢
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Event Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The event you're looking for doesn't exist or may have been moved.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/events"
            className="inline-flex items-center gap-2 bg-linear-to-r from-[#095075] to-[#0a6b9a] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Events
          </motion.a>
        </div>
      </div>
    );
  }

  // Format dates and times
  let date = new Date(event.date);
  let formattedDate = date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  let formattedTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  let today = new Date();
  let daysUntilEvent = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
  let isHappeningSoon = daysUntilEvent <= 7;
  let isToday = daysUntilEvent === 0;

  let formatDuration = (minutes) => {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins > 0 ? `${mins}m` : ""}` : `${mins}m`;
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <motion.a
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          href="/events"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#095075] font-medium transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Events
        </motion.a>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Event Image with Overlay */}
          <div className="relative">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-96 md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

            {/* Image Overlay Content */}
            <div className="absolute bottom-6 left-8 right-8">
              <div className="flex flex-wrap gap-3 mb-4">
                <span
                  className={`px-4 py-2 bg-linear-to-r ${getCategoryColor(event.category)} backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30`}
                >
                  {event.category}
                </span>
                {event.isFree && (
                  <span className="px-4 py-2 bg-green-500/90 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    Free Event
                  </span>
                )}
                {isToday && (
                  <span className="px-4 py-2 bg-red-500/90 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    Happening Today!
                  </span>
                )}
                {isHappeningSoon && !isToday && (
                  <span className="px-4 py-2 bg-orange-500/90 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    {daysUntilEvent} days to go
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
                {event.title}
              </h1>

              <div className="flex items-center gap-4 text-white/90">
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {event.attendees || "100+"} attending
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {formatDuration(event.durationMinutes)}
                </span>
              </div>
            </div>

            {/* Action Buttons Overlay */}
            <div className="absolute top-6 right-6 flex gap-3">
              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all border border-white/30"
              >
                <Share2 className="w-5 h-5" />

                {/* Tooltip when copied */}
                {copied && (
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs bg-white text-[#095075] rounded shadow">
                    Link Copied!
                  </span>
                )}
              </motion.button>

              <motion.button
                onClick={() => setLiked(!liked)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 bg-white/20 backdrop-blur-sm rounded-xl transition-all border border-white/30
        ${liked ? "text-red-500" : "text-white"}`}
              >
                <Heart
                  className="w-5 h-5"
                  fill={liked ? "red" : "none"}
                  stroke={liked ? "red" : "currentColor"}
                />
              </motion.button>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-8 md:p-12">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Event Meta Info */}
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl"
                  >
                    <div className="p-3 bg-[#095075] rounded-xl">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Date & Time
                      </h3>
                      <p className="text-gray-700">{formattedDate}</p>
                      <p className="text-gray-600 text-sm">{formattedTime}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl"
                  >
                    <div className="p-3 bg-[#b8932f] rounded-xl">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Location
                      </h3>
                      <p className="text-gray-700">
                        {event.location?.name || "TBA"}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {event.location?.city || "Meru"}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl"
                  >
                    <div className="p-3 bg-[#095075] rounded-xl">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Duration
                      </h3>
                      <p className="text-gray-700">
                        {formatDuration(event.durationMinutes)}
                      </p>
                      <p className="text-gray-600 text-sm">Total event time</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl"
                  >
                    <div className="p-3 bg-[#b8932f] rounded-xl">
                      <Tag className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Organizer
                      </h3>
                      <p className="text-gray-700">{event.organizer?.name}</p>
                      {event.contact && (
                        <p className="text-gray-600 text-sm">{event.contact}</p>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="prose max-w-none mb-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    About This Event
                  </h2>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p className="text-lg">{event.description}</p>

                    {/* Event Highlights */}
                    <div className="mt-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                      <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Event Highlights
                      </h3>
                      <ul className="space-y-2 text-blue-800">
                        {event.category === "Concerts & Nightlife" && [
                          "Live performances by talented artists",
                          "Great atmosphere and music",
                          "Perfect for socializing and networking",
                        ]}
                        {event.category === "Charity & Community" && [
                          "Make a positive impact in the community",
                          "Meet like-minded individuals",
                          "Support meaningful causes",
                        ]}
                        {event.category === "Sports" && [
                          "Exciting competitive atmosphere",
                          "Professional organization",
                          "Great for sports enthusiasts",
                        ]}
                        {/* Add more category-specific highlights */}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Location Details */}
                {event.location && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gray-50 rounded-2xl p-6"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Map className="w-5 h-5" />
                      Location Details
                    </h3>
                    <div className="space-y-3">
                      <p className="text-gray-700 font-medium">
                        {event.location.name}
                      </p>
                      {event.location.city && (
                        <p className="text-gray-600">{event.location.city}</p>
                      )}
                      <button className="inline-flex items-center gap-2 text-[#095075] hover:text-[#b8932f] transition-colors font-medium">
                        <MapPin className="w-4 h-4" />
                        View on Map
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Ticket Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-8 bg-linear-to-b from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Get Your Tickets
                  </h3>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {event.isFree
                        ? "Free"
                        : event.feeStructure?.[0]?.price
                          ? `KES ${event.feeStructure[0].price}`
                          : "Price TBA"}
                    </div>
                    {!event.isFree && event.feeStructure?.length > 1 && (
                      <p className="text-gray-600 text-sm">
                        Starting from KES {event.feeStructure[0].price}
                      </p>
                    )}
                  </div>

                  {/* Ticket Options */}
                  {event.feeStructure && event.feeStructure.length > 0 && (
                    <div className="space-y-3 mb-6">
                      {event.feeStructure.map((fee, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-xl hover:border-[#095075] transition-colors"
                        >
                          <div>
                            <p className="font-semibold text-gray-900">
                              {fee.name}
                            </p>
                            {fee.type !== "Free" && fee.price && (
                              <p className="text-sm text-gray-600">
                                {fee.type}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">
                              {fee.type === "Free"
                                ? "Free"
                                : fee.price
                                  ? `KES ${fee.price}`
                                  : "Free"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-linear-to-r from-[#095075] to-[#0a6b9a] hover:from-[#b8932f] hover:to-[#d4a82e] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mb-4"
                  >
                    <Ticket className="w-5 h-5" />
                    {event.isFree ? "Register for Free" : "Get Tickets Now"}
                  </motion.button>

                  {/* Contact Info */}
                  {event.contact && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Contact Organizer
                      </h4>
                      <div className="space-y-2 text-sm">
                        {event.contact.includes("@") ? (
                          <a
                            href={`mailto:${event.contact}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-[#095075] transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            {event.contact}
                          </a>
                        ) : (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="w-4 h-4" />
                            {event.contact}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="mt-6 space-y-3 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Secure checkout
                    </p>
                    <p className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Instant confirmation
                    </p>
                    <p className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Mobile ticket available
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Similar Events Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Similar Events
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarEvents
              .filter(
                (e) => e.category === event.category && e._id !== event._id
              )
              .slice(0, 3)
              .map((similarEvent) => (
                <motion.div
                  key={similarEvent._id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                >
                  <img
                    src={similarEvent.imageUrl}
                    alt={similarEvent.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {similarEvent.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {new Date(similarEvent.date).toLocaleDateString()}
                    </p>
                    <a
                      href={`/events/${similarEvent._id}`}
                      className="text-[#095075] hover:text-[#b8932f] font-medium text-sm transition-colors"
                    >
                      View Details →
                    </a>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
