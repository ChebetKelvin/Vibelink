import { NavLink, Outlet } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLoaderData } from "react-router";
import { getEventStats } from "../models/events";

export async function loader() {
  let stats = await getEventStats();
  return { stats };
}

export default function AdminLayout() {
  let { stats } = useLoaderData();
  let [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      {/* Sidebar (mobile + desktop) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#095075] text-white flex flex-col transform transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:flex`}
      >
        <div className="px-6 py-8 text-2xl font-bold border-b border-white/20 flex items-center justify-between lg:block">
          <span>VibeLink Admin</span>
          {/* Close button (mobile only) */}
          <button
            className="lg:hidden text-white mt-4 pt-4"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-3">
          <NavLink
            to="/admin/events"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-[#b8932f] text-black font-semibold"
                  : "hover:bg-white/10"
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            Manage Events
          </NavLink>
          <NavLink
            to="/admin/user"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-[#b8932f] text-black font-semibold"
                  : "hover:bg-white/10"
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            Manage users
          </NavLink>

          <NavLink
            to="/admin/reports"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-[#b8932f] text-black font-semibold"
                  : "hover:bg-white/10"
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            Reports & Analytics
          </NavLink>
        </nav>

        <div className="p-4 border-t border-white/20 text-sm text-center">
          © {new Date().getFullYear()} VibeLink
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar (mobile only) */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#095075] text-white shadow-md">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <span className="font-semibold">Admin Dashboard</span>
          <div className="w-6" /> {/* Spacer for symmetry */}
        </header>

        {/* Main Page */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto bg-gray-50/50">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Dashboard Overview
                </h1>
                <p className="text-gray-600 text-lg">
                  Welcome back! Here's what's happening with your events today.
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="flex items-center space-x-3 bg-white rounded-xl shadow-sm px-4 py-3 border border-gray-200">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Live
                  </span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <StatCard
                label="Total Events"
                value={stats.total}
                color="blue"
                icon="📊"
                trend={{ value: 12, isPositive: true }}
                description="All time events"
              />
              <StatCard
                label="Approved"
                value={stats.approved}
                color="green"
                icon="✅"
                trend={{ value: 8, isPositive: true }}
                description="Active events"
              />
              <StatCard
                label="Pending Review"
                value={stats.pending}
                color="yellow"
                icon="⏳"
                trend={{ value: 3, isPositive: false }}
                description="Awaiting approval"
              />
              <StatCard
                label="Rejected"
                value={stats.rejected}
                color="red"
                icon="❌"
                trend={{ value: 2, isPositive: false }}
                description="Requires attention"
              />
            </div>
          </div>

          {/* Quick Actions & Metrics */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Recent Activity */}
            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Activity
                </h2>
                <button className="text-sm text-[#095075] font-medium hover:text-[#07405c] transition-colors">
                  View All →
                </button>
              </div>
              <div className="space-y-4">
                <ActivityItem
                  type="event_created"
                  title="New event submitted"
                  description="Music Festival 2024"
                  time="2 hours ago"
                  user="John Doe"
                />
                <ActivityItem
                  type="event_approved"
                  title="Event approved"
                  description="Tech Conference"
                  time="5 hours ago"
                  user="You"
                />
                <ActivityItem
                  type="event_rejected"
                  title="Event requires changes"
                  description="Art Exhibition"
                  time="1 day ago"
                  user="Sarah Wilson"
                />
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Performance
              </h2>
              <div className="space-y-6">
                <MetricItem
                  label="Approval Rate"
                  value="84%"
                  progress={84}
                  color="green"
                />
                <MetricItem
                  label="Response Time"
                  value="2.4h"
                  progress={75}
                  color="blue"
                />
                <MetricItem
                  label="User Satisfaction"
                  value="4.8/5"
                  progress={96}
                  color="purple"
                />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

// Enhanced StatCard Component
function StatCard({ label, value, color, icon, trend, description }) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    yellow: "from-yellow-500 to-yellow-600",
    red: "from-red-500 to-red-600",
  };

  const trendColors = {
    positive: "text-green-600 bg-green-50",
    negative: "text-red-600 bg-red-50",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl bg-linear-to-br ${colorClasses[color]} flex items-center justify-center text-white text-lg`}
        >
          {icon}
        </div>
        {trend && (
          <div
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${trend.isPositive ? trendColors.positive : trendColors.negative}`}
          >
            {trend.isPositive ? "↑" : "↓"} {trend.value}%
          </div>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-3xl font-bold text-gray-900">
          {value?.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

// Activity Item Component
function ActivityItem({ type, title, description, time, user }) {
  const typeIcons = {
    event_created: "📝",
    event_approved: "✅",
    event_rejected: "❌",
  };

  const typeColors = {
    event_created: "bg-blue-100 text-blue-600",
    event_approved: "bg-green-100 text-green-600",
    event_rejected: "bg-red-100 text-red-600",
  };

  return (
    <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeColors[type]} text-lg`}
      >
        {typeIcons[type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <p className="text-xs text-gray-500 mt-1">By {user}</p>
      </div>
    </div>
  );
}

// Metric Item Component
function MetricItem({ label, value, progress, color }) {
  const colorClasses = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-lg font-bold text-gray-900">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${colorClasses[color]} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
