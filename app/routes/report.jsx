import { useLoaderData } from "react-router";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  getEventStats,
  getEvents,
  getEventsByCategory,
} from "../models/events";

export async function loader() {
  let eventStats = await getEventStats();
  let users = await getEvents();
  let totalUsers = users.length;

  let categories = [
    "Concerts & Nightlife",
    "Charity & Community",
    "Wellness & Fitness",
    "Education & Skills",
    "Student & Campus",
    "Adventure & Travel",
    "Offers & Discounts",
    "Sports",
  ];
  let eventsByCategory = {};
  for (let cat of categories) {
    let events = await getEventsByCategory(cat);
    eventsByCategory[cat] = events.length;
  }

  // Recent events (last 5)
  let recentEvents = await getEventsByCategory(null); // get all
  recentEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    eventStats,
    totalUsers,
    eventsByCategory,
    recentEvents: recentEvents.slice(0, 5),
  };
}

export default function Reports() {
  let { eventStats, totalUsers, eventsByCategory, recentEvents } =
    useLoaderData();

  let colors = {
    approved: "#41a539",
    pending: "#fbbf24",
    rejected: "#ef4444",
  };
  let pieData = [
    { name: "Approved", value: eventStats.approved },
    { name: "Pending", value: eventStats.pending },
    { name: "Rejected", value: eventStats.rejected },
  ];

  let barData = Object.entries(eventsByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="p-6 md:p-12 bg-linear-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3 bg-linear-to-r from-[#095075] to-[#0d7ab8] bg-clip-text text-transparent">
          Reports & Analytics
        </h1>
        <p className="text-gray-600 text-lg">
          Comprehensive overview of your event performance and metrics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        {[
          {
            label: "Total Events",
            value: eventStats.total,
            color: "text-[#095075]",
            bg: "from-[#095075] to-[#0d7ab8]",
          },
          {
            label: "Approved",
            value: eventStats.approved,
            color: "text-green-600",
            bg: "from-green-500 to-emerald-600",
          },
          {
            label: "Pending",
            value: eventStats.pending,
            color: "text-amber-600",
            bg: "from-amber-500 to-orange-500",
          },
          {
            label: "Rejected",
            value: eventStats.rejected,
            color: "text-red-600",
            bg: "from-red-500 to-rose-600",
          },
          {
            label: "Total Users",
            value: totalUsers,
            color: "text-[#095075]",
            bg: "from-purple-500 to-indigo-600",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="flex flex-col items-center text-center">
              <span className="text-gray-500 text-sm font-medium mb-2">
                {card.label}
              </span>
              <div className={`text-3xl font-bold ${card.color} mb-3`}>
                {card.value}
              </div>
              <div
                className={`w-12 h-1 rounded-full bg-linear-to-r ${card.bg}`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-xl text-gray-800">
              Event Status Distribution
            </h2>
            <div className="w-3 h-3 rounded-full bg-[#095075]"></div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                innerRadius={60}
                paddingAngle={2}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {pieData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={colors[entry.name.toLowerCase()]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [value, "Events"]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-xl text-gray-800">
              Events by Category
            </h2>
            <div className="w-3 h-3 rounded-full bg-[#095075]"></div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
              />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              >
                {barData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#gradient-${index})`}
                  />
                ))}
              </Bar>
              <defs>
                {barData.map((_, index) => (
                  <linearGradient
                    key={index}
                    id={`gradient-${index}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#095075" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#0d7ab8" stopOpacity={0.9} />
                  </linearGradient>
                ))}
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Events Table */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        <div className="px-8 py-6 border-b border-gray-100">
          <h2 className="font-semibold text-xl text-gray-800">Recent Events</h2>
          <p className="text-gray-600 text-sm mt-1">
            Latest event submissions and their status
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-linear-to-r from-[#095075] to-[#0d7ab8] text-white">
              <tr>
                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">
                  Title
                </th>
                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">
                  Category
                </th>
                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">
                  Date
                </th>
                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentEvents.map((event, index) => (
                <tr
                  key={event._id}
                  className="hover:bg-gray-50 transition-colors duration-200 group cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900 group-hover:text-[#095075]">
                    {event.title}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {event.category}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : event.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {event.status.charAt(0).toUpperCase() +
                        event.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
