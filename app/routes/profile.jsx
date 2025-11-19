// src/pages/Profile.jsx
import { useState } from "react";
import { Form, useLoaderData, redirect, Link } from "react-router";
import { getSession } from "../.server/session";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit3,
  Save,
  X,
  Shield,
  Bell,
  Globe,
  Lock,
  CheckCircle,
  Ticket,
  Settings,
  LogOut,
  Clock,
  Globe as GlobeIcon,
} from "lucide-react";
import {
  getEventsByOrganizer,
  getUserEventStats,
  getUserFavoriteCategories,
} from "../models/events";

// In src/pages/Profile.jsx loader
export async function loader({ request }) {
  let cookieHeader = request.headers.get("Cookie");
  let session = await getSession(cookieHeader);
  let user = session?.get("user");

  if (!user) {
    return redirect("/login");
  }

  try {
    let [events, eventStats, favoriteCategories] = await Promise.all([
      getEventsByOrganizer(user.email),
      getUserEventStats(user.email),
      getUserFavoriteCategories(user.email),
    ]);

    // Handle events without createdAt field
    let eventsWithDates = events.map((event) => ({
      ...event,
      createdAt: event.createdAt || event.date || new Date().toISOString(),
    }));

    let memberSince = user.createdAt || new Date().toISOString();

    return {
      user,
      events: eventsWithDates,
      eventStats,
      favoriteCategories,
      memberSince,
    };
  } catch (error) {
    console.error("Error loading profile data:", error);
    return {
      user,
      events: [],
      eventStats: {
        eventsCreated: 0,
        eventsAttended: 0,
        approvedEvents: 0,
        pendingEvents: 0,
        rejectedEvents: 0,
      },
      favoriteCategories: ["No data available"],
      memberSince: user.createdAt || new Date().toISOString(),
    };
  }
}
export async function action({ request }) {
  let formData = await request.formData();
  let cookieHeader = request.headers.get("Cookie");
  let session = await getSession(cookieHeader);

  // Handle profile updates here
  let updates = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };

  // Update session with new user data
  session.set("user", { ...session.get("user"), ...updates });

  return redirect("/profile");
}

export default function Profile() {
  let { user, events, eventStats, favoriteCategories, memberSince } =
    useLoaderData();
  let [isEditing, setIsEditing] = useState(false);
  let [activeTab, setActiveTab] = useState("profile");

  // Use dynamic stats
  let userStats = {
    eventsCreated: eventStats.eventsCreated,
    eventsAttended: eventStats.eventsAttended, // You can implement attendance tracking
    approvedEvents: eventStats.approvedEvents,
    pendingEvents: eventStats.pendingEvents,
    favoriteCategories:
      favoriteCategories.length > 0
        ? favoriteCategories
        : ["No categories yet"],
    memberSince: memberSince,
  };

  // Use actual user events
  let recentEvents = events.slice(0, 5).map((event) => ({
    id: event._id,
    title: event.title,
    date: event.date,
    status: event.status,
    imageUrl:
      event.imageUrl ||
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  }));

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-linear-to-r from-[#095075] to-[#0d7ab8] bg-clip-text text-transparent mb-4">
            Your Profile
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your account settings, view your event history, and customize
            your VibeLink experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-linear-to-br from-[#095075] to-[#0d7ab8] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.name}
                </h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>

              <nav className="space-y-2">
                {[
                  { id: "profile", label: "Profile", icon: User },
                  { id: "events", label: "My Events", icon: Ticket },
                  { id: "preferences", label: "Preferences", icon: Settings },
                  { id: "security", label: "Security", icon: Shield },
                  { id: "notifications", label: "Notifications", icon: Bell },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-linear-to-r from-[#095075] to-[#0d7ab8] text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#095075]"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link
                  to={"/logout"}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Sign Out</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-8">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-linear-to-r from-[#095075] to-[#0d7ab8] p-6 text-white">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">
                          Personal Information
                        </h2>
                        <p className="text-blue-100 mt-1">
                          Manage your personal details and contact information
                        </p>
                      </div>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="mt-4 sm:mt-0 flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-200"
                      >
                        {isEditing ? (
                          <>
                            <X size={18} />
                            <span>Cancel</span>
                          </>
                        ) : (
                          <>
                            <Edit3 size={18} />
                            <span>Edit Profile</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <Form method="post" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-800 font-semibold mb-3">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            defaultValue={user.name}
                            disabled={!isEditing}
                            className="w-full border text-gray-600 border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-[#b8932f]/20 focus:border-[#b8932f] outline-none transition-all bg-gray-50"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-800 font-semibold mb-3">
                            Email Address
                          </label>
                          <div className="flex items-center space-x-3">
                            <Mail size={20} className="text-gray-400" />
                            <input
                              type="email"
                              name="email"
                              defaultValue={user.email}
                              disabled={!isEditing}
                              className="w-full border text-gray-600 border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-[#b8932f]/20 focus:border-[#b8932f] outline-none transition-all bg-gray-50"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-800 font-semibold mb-3">
                            Phone Number
                          </label>
                          <div className="flex items-center space-x-3">
                            <Phone size={20} className="text-gray-400" />
                            <input
                              type="tel"
                              name="phone"
                              defaultValue={user.phone || "+254 700 000 000"}
                              disabled={!isEditing}
                              className="w-full border text-gray-600 border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-[#b8932f]/20 focus:border-[#b8932f] outline-none transition-all bg-gray-50"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-800 font-semibold mb-3">
                            Member Since
                          </label>
                          <div className="flex items-center space-x-3">
                            <Calendar size={20} className="text-gray-400" />
                            <input
                              type="text"
                              value={new Date(
                                userStats.memberSince
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                              disabled
                              className="w-full border text-gray-600 border-gray-200 rounded-2xl px-4 py-3 bg-gray-50"
                            />
                          </div>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-200"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-[#095075] to-[#0d7ab8] text-white rounded-2xl hover:shadow-lg transition-all duration-200"
                          >
                            <Save size={18} />
                            <span>Save Changes</span>
                          </button>
                        </div>
                      )}
                    </Form>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                    <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Ticket size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {userStats.eventsCreated}
                    </h3>
                    <p className="text-gray-600">Total Events</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {userStats.approvedEvents}
                    </h3>
                    <p className="text-gray-600">Approved</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                    <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Clock size={32} className="text-amber-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {userStats.pendingEvents}
                    </h3>
                    <p className="text-gray-600">Pending</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                    <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Globe size={32} className="text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {userStats.favoriteCategories[0]}
                    </h3>
                    <p className="text-gray-600">Top Category</p>
                  </div>
                </div>

                {/* Favorite Categories */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Favorite Categories
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {userStats.favoriteCategories.map((category, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* My Events Tab */}
            {activeTab === "events" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    My Events
                  </h2>

                  <div className="space-y-4">
                    {recentEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center space-x-4 p-4 border border-gray-200 rounded-2xl hover:border-[#095075] transition-all duration-200"
                      >
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            event.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {event.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Preferences
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Email Preferences
                    </h3>
                    <div className="space-y-3">
                      {[
                        "Event recommendations",
                        "Promotional offers",
                        "Event reminders",
                        "Newsletter",
                      ].map((pref) => (
                        <label
                          key={pref}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 text-[#095075] rounded"
                          />
                          <span className="text-gray-700">{pref}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Security
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Change Password
                    </h3>
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-[#095075] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-[#095075] focus:border-transparent"
                        />
                      </div>
                      <button className="flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-[#095075] to-[#0d7ab8] text-white rounded-2xl hover:shadow-lg transition-all duration-200">
                        <Lock size={18} />
                        <span>Update Password</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Notification Settings
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Push Notifications
                    </h3>
                    <div className="space-y-3">
                      {[
                        "Event reminders",
                        "New events in your area",
                        "Event status updates",
                        "Promotional offers",
                      ].map((notif) => (
                        <label
                          key={notif}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 text-[#095075] rounded"
                          />
                          <span className="text-gray-700">{notif}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
