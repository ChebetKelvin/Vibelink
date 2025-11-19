import { useLoaderData, Form } from "react-router";
import { getEventById, updateEvent, deleteEvent } from "../models/events";
import {
  Calendar,
  MapPin,
  Clock,
  Tag,
  Star,
  Map,
  Ticket,
  Mail,
  Phone,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Trash2,
  Shield,
  Users,
  TrendingUp,
} from "lucide-react";

export async function loader({ params }) {
  const event = await getEventById(params.id);
  if (!event) {
    throw new Response("Event not found", { status: 404 });
  }

  return { event };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const action = formData.get("_action");

  console.log("Action received:", { action, eventId: params.id });

  if (!action) {
    throw new Response("Action required", { status: 400 });
  }

  if (!params.id) {
    throw new Response("Event ID required", { status: 400 });
  }

  try {
    switch (action) {
      case "approve":
        await updateEvent(params.id, { status: "approved" });
        break;
      case "reject":
        await updateEvent(params.id, { status: "rejected" });
        break;
      case "delete":
        await deleteEvent(params.id);
        break;
      default:
        throw new Response("Invalid action", { status: 400 });
    }
  } catch (error) {
    console.error("Action error:", error);
    throw new Response("Failed to process action", { status: 500 });
  }

  return null;
}

export default function EventDetails() {
  const { event } = useLoaderData();

  // Format dates and times
  const date = new Date(event.date);
  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const today = new Date();
  const daysUntilEvent = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
  const isHappeningSoon = daysUntilEvent <= 7;
  const isToday = daysUntilEvent === 0;

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins > 0 ? `${mins}m` : ""}` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 p-6 md:p-8">
      {/* Header Navigation */}
      <div className="mb-6">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center text-[#095075] hover:text-[#0d7ab8] transition-all duration-200 group mb-4"
        >
          <ArrowLeft
            size={20}
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          />
          Back to Events
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-[#095075] to-[#0d7ab8] bg-clip-text text-transparent">
              Event Details
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and review event information
            </p>
          </div>

          {/* Status Badge */}
          <div className="mt-4 sm:mt-0">
            <span
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                event.status === "approved"
                  ? "bg-linear-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200"
                  : event.status === "pending"
                    ? "bg-linear-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200"
                    : "bg-linear-to-r from-red-50 to-rose-50 text-red-700 border border-red-200"
              }`}
            >
              {event.status === "approved" && (
                <CheckCircle size={16} className="mr-2" />
              )}
              {event.status === "pending" && (
                <TrendingUp size={16} className="mr-2" />
              )}
              {event.status === "rejected" && (
                <XCircle size={16} className="mr-2" />
              )}
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Event Header Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="relative">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-8 text-white">
                <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    <Tag size={14} className="mr-1" />
                    {event.category}
                  </span>
                  {isToday && (
                    <span className="inline-flex items-center px-3 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-sm">
                      <Calendar size={14} className="mr-1" />
                      Happening Today
                    </span>
                  )}
                  {isHappeningSoon && !isToday && (
                    <span className="inline-flex items-center px-3 py-1 bg-amber-500/90 backdrop-blur-sm rounded-full text-sm">
                      <Clock size={14} className="mr-1" />
                      In {daysUntilEvent} days
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <Shield size={18} className="mr-2 text-[#095075]" />
                    Admin Actions
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage event status and permissions
                  </p>
                </div>
                // In your form buttons - convert _id to string
                <Form
                  method="post"
                  className="flex items-center space-x-3 mt-4 sm:mt-0"
                >
                  {event.status === "pending" && (
                    <button
                      onClick={(e) => e.stopPropagation()}
                      name="_action"
                      value="approve"
                      className="flex items-center space-x-2 px-4 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl transition-all duration-200 hover:shadow-sm border border-green-200 group/approve"
                    >
                      <CheckCircle
                        size={18}
                        className="group-hover/approve:scale-110 transition-transform"
                      />
                      <span>Approve</span>
                    </button>
                  )}

                  {event.status !== "rejected" && (
                    <button
                      onClick={(e) => e.stopPropagation()}
                      name="_action"
                      value="reject"
                      className="flex items-center space-x-2 px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl transition-all duration-200 hover:shadow-sm border border-amber-200 group/reject"
                    >
                      <XCircle
                        size={18}
                        className="group-hover/reject:scale-110 transition-transform"
                      />
                      <span>Reject</span>
                    </button>
                  )}

                  <button
                    onClick={(e) => e.stopPropagation()}
                    name="_action"
                    value="delete"
                    className="flex items-center space-x-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-all duration-200 hover:shadow-sm border border-red-200 group/delete"
                  >
                    <Trash2
                      size={18}
                      className="group-hover/delete:scale-110 transition-transform"
                    />
                    <span>Delete</span>
                  </button>
                </Form>
              </div>
            </div>

            {/* Event Meta Info */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
                  <div className="w-12 h-12 bg-linear-to-br from-[#095075] to-[#0d7ab8] rounded-xl flex items-center justify-center flshrink-0">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Date & Time
                    </h3>
                    <p className="text-gray-700">{formattedDate}</p>
                    <p className="text-gray-600 text-sm">{formattedTime}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
                  <div className="w-12 h-12 bg-linear-to-br from-[#b8932f] to-[#d4a82e] rounded-xl flex items-center justify-center shrink-0">
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
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
                  <div className="w-12 h-12 bg-linear-to-br from-[#095075] to-[#0d7ab8] rounded-xl flex items-center justify-center shrink-0">
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
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
                  <div className="w-12 h-12 bg-linear-to-br from-[#b8932f] to-[#d4a82e] rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-white" />
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
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              About This Event
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p className="text-lg">{event.description}</p>

              {/* Event Highlights */}
              <div className="mt-6 p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Event Highlights
                </h3>
                <ul className="space-y-2 text-blue-800">
                  {event.category === "Concerts & Nightlife" &&
                    [
                      "Live performances by talented artists",
                      "Great atmosphere and music",
                      "Perfect for socializing and networking",
                    ].map((highlight, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  {event.category === "Charity & Community" &&
                    [
                      "Make a positive impact in the community",
                      "Meet like-minded individuals",
                      "Support meaningful causes",
                    ].map((highlight, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  {event.category === "Sports" &&
                    [
                      "Exciting competitive atmosphere",
                      "Professional organization",
                      "Great for sports enthusiasts",
                    ].map((highlight, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Location Details */}
          {event.location && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Map className="w-5 h-5" />
                Location Details
              </h3>
              <div className="space-y-3">
                <p className="text-gray-700 font-medium text-lg">
                  {event.location.name}
                </p>
                {event.location.city && (
                  <p className="text-gray-600">{event.location.city}</p>
                )}
                {event.location.address && (
                  <p className="text-gray-600 text-sm">
                    {event.location.address}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ticket Info Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Ticket className="w-5 h-5" />
              Ticket Information
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
                    className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#095075] transition-all duration-200"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{fee.name}</p>
                      {fee.type !== "Free" && fee.price && (
                        <p className="text-sm text-gray-600">{fee.type}</p>
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

            {/* Additional Info */}
            <div className="space-y-3 text-sm text-gray-600 border-t border-gray-200 pt-4">
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

          {/* Contact Info */}
          {event.contact && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Organizer
              </h4>
              <div className="space-y-3">
                {event.contact.includes("@") ? (
                  <a
                    href={`mailto:${event.contact}`}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-gray-600 hover:text-[#095075] hover:bg-blue-50 transition-all duration-200"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{event.contact}</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{event.contact}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Event Stats */}
          <div className="bg-linear-to-br from-[#095075] to-[#0d7ab8] rounded-2xl p-6 text-white">
            <h4 className="font-semibold mb-4">Event Statistics</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Views</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Registrations</span>
                <span className="font-semibold">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Approval Rate</span>
                <span className="font-semibold">95%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
