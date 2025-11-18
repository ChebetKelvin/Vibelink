import { NavLink, Outlet } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLoaderData } from "react-router";
import { getEventStats } from "../models/events";

export async function loader() {
  const stats = await getEventStats();
  return { stats };
}

export default function AdminLayout() {
  const { stats } = useLoaderData();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div>
            <h1 className="text-3xl font-bold text-[#095075] mb-8">
              Dashboard Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Total Events" value={stats.total} color="blue" />
              <StatCard label="Approved" value={stats.approved} color="green" />
              <StatCard label="Pending" value={stats.pending} color="yellow" />
              <StatCard label="Rejected" value={stats.rejected} color="red" />
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-md ${colorMap[color]} font-semibold text-center`}
    >
      <h3 className="text-xl">{label}</h3>
      <p className="text-3xl mt-2">{value}</p>
    </div>
  );
}
