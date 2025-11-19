import { useLoaderData, Form, useNavigate } from "react-router";
import {
  ArrowLeft,
  Filter,
  Search,
  Calendar,
  Tag,
  CheckCircle,
  XCircle,
  Trash2,
  MoreVertical,
  Eye,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  FileText,
} from "lucide-react";
import {
  getEvents,
  getEventsCount,
  updateEvent,
  deleteEvent,
} from "../models/events";

export async function action({ request }) {
  let formData = await request.formData();
  let actionValue = formData.get("_action");

  if (!actionValue) return null;

  let [action, id] = actionValue.split("-");

  switch (action) {
    case "approve":
      await updateEvent(id, { status: "approved" });
      break;
    case "reject":
      await updateEvent(id, { status: "rejected" });
      break;
    case "delete":
      await deleteEvent(id);
      break;
    default:
      break;
  }

  return null;
}

export async function loader({ request }) {
  let url = new URL(request.url);
  let page = parseInt(url.searchParams.get("page")) || 1;
  let pageSize = 10;

  let [events, total] = await Promise.all([
    getEvents({ page, pageSize }),
    getEventsCount(),
  ]);

  let eventsData = events.map((e) => ({
    ...e,
    _id: e._id.toString(),
  }));

  let totalPages = Math.ceil(total / pageSize);

  return { events: eventsData, page, totalPages };
}

export default function ManageEvents() {
  let { events, page, totalPages } = useLoaderData();
  let navigate = useNavigate();

  // Calculate stats for the header
  let stats = {
    total: events.length,
    approved: events.filter((e) => e.status === "approved").length,
    pending: events.filter((e) => e.status === "pending").length,
    rejected: events.filter((e) => e.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 p-6 md:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-[#095075] hover:text-[#0d7ab8] transition-all duration-200 mb-4 group"
            >
              <ArrowLeft
                size={20}
                className="mr-2 group-hover:-translate-x-1 transition-transform"
              />
              Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold bg-linear-to-r from-[#095075] to-[#0d7ab8] bg-clip-text text-transparent">
              Event Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and moderate all event submissions
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search events..."
                className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#095075]/20 focus:border-[#095075] transition-all duration-200 w-64"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-200 bg-white">
              <Filter size={20} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Events
                </p>
                <p className="text-2xl font-bold text-[#095075]">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <FileText size={24} className="text-[#095075]" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.approved}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <CheckCircle size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-amber-600">
                  {stats.pending}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <TrendingUp size={24} className="text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.rejected}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <XCircle size={24} className="text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-linear-to-r from-[#095075] to-[#0d7ab8]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Events</h2>
              <p className="text-blue-100 text-sm">
                Manage event approvals and modifications
              </p>
            </div>
            <div className="text-white text-sm">
              Showing {events.length} events
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Event Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event) => (
                <tr
                  key={event._id}
                  onClick={(e) => {
                    if (
                      e.target.tagName === "BUTTON" ||
                      e.target.closest("button")
                    )
                      return;
                    navigate(`/admin/events/${event._id}`);
                  }}
                  className="hover:bg-linear-to-r hover:from-blue-50/50 hover:to-transparent transition-all duration-200 group cursor-pointer"
                >
                  {/* Event Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-linear-to-br from-[#095075] to-[#0d7ab8] rounded-xl flex items-center justify-center text-white font-semibold shadow-sm">
                        <FileText size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-gray-900 group-hover:text-[#095075] transition-colors">
                          {event.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          ID: {event._id.slice(-8)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">
                      <Tag size={12} className="mr-1.5" />
                      {event.category}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-400" />
                      <div>
                        <p className="text-gray-900 font-medium">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(event.date).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                        event.status === "approved"
                          ? "bg-linear-to-r from-green-50 to-emerald-50 text-green-700 border-green-200 shadow-sm"
                          : event.status === "pending"
                            ? "bg-linear-to-r from-amber-50 to-orange-50 text-amber-700 border-amber-200 shadow-sm"
                            : "bg-linear-to-r from-red-50 to-rose-50 text-red-700 border-red-200 shadow-sm"
                      }`}
                    >
                      {event.status === "approved" && (
                        <CheckCircle size={12} className="mr-1.5" />
                      )}
                      {event.status === "pending" && (
                        <TrendingUp size={12} className="mr-1.5" />
                      )}
                      {event.status === "rejected" && (
                        <XCircle size={12} className="mr-1.5" />
                      )}
                      {event.status.charAt(0).toUpperCase() +
                        event.status.slice(1)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Form
                        method="post"
                        className="flex items-center space-x-2"
                      >
                        <button
                          onClick={(e) => e.stopPropagation()}
                          name="_action"
                          value={`approve-${event._id}`}
                          className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl transition-all duration-200 hover:shadow-sm border border-green-100 group/approve"
                          title="Approve Event"
                        >
                          <CheckCircle
                            size={18}
                            className="group-hover/approve:scale-110 transition-transform"
                          />
                        </button>

                        <button
                          onClick={(e) => e.stopPropagation()}
                          name="_action"
                          value={`reject-${event._id}`}
                          className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-xl transition-all duration-200 hover:shadow-sm border border-amber-100 group/reject"
                          title="Reject Event"
                        >
                          <XCircle
                            size={18}
                            className="group-hover/reject:scale-110 transition-transform"
                          />
                        </button>

                        <button
                          onClick={(e) => e.stopPropagation()}
                          name="_action"
                          value={`delete-${event._id}`}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-200 hover:shadow-sm border border-red-100 group/delete"
                          title="Delete Event"
                        >
                          <Trash2
                            size={18}
                            className="group-hover/delete:scale-110 transition-transform"
                          />
                        </button>
                      </Form>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/events/${event._id}`);
                        }}
                        className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all duration-200 hover:shadow-sm border border-blue-100 group/view"
                        title="View Details"
                      >
                        <Eye
                          size={18}
                          className="group-hover/view:scale-110 transition-transform"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
            <p className="text-sm text-gray-600">
              Page <span className="font-semibold text-[#095075]">{page}</span>{" "}
              of{" "}
              <span className="font-semibold text-[#095075]">{totalPages}</span>
            </p>
            <div className="flex items-center space-x-2">
              <button
                disabled={page <= 1}
                onClick={() => navigate(`?page=${page - 1}`)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-all duration-200 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <button
                disabled={page >= totalPages}
                onClick={() => navigate(`?page=${page + 1}`)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-linear-to-r from-[#095075] to-[#0d7ab8] text-white hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
