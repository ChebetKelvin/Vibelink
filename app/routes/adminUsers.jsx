import { useLoaderData, Form, Link } from "react-router";
import { getUsers, updateUserRole, deleteUser } from "../models/user";
import {
  Shield,
  User,
  Search,
  Filter,
  Eye,
  ArrowUp,
  ArrowDown,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Users as UsersIcon,
} from "lucide-react";
import { useState } from "react";

// --- Loader: fetch all users
export async function loader() {
  const users = await getUsers();

  const formattedUsers = users.map((user) => ({
    ...user,
    _id: user._id.toString(),
  }));

  return { users: formattedUsers };
}

// --- Action: handle promote/demote/delete
export async function action({ request }) {
  const formData = await request.formData();
  const _action = formData.get("_action");

  if (_action.startsWith("promote-")) {
    const id = _action.replace("promote-", "");
    await updateUserRole(id, "admin");
  }

  if (_action.startsWith("demote-")) {
    const id = _action.replace("demote-", "");
    await updateUserRole(id, "user");
  }

  if (_action.startsWith("delete-")) {
    const id = _action.replace("delete-", "");
    await deleteUser(id);
  }

  return null;
}

export default function Users() {
  const { users } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered users for search
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gradient helper
  const gradient = (from, to) => `bg-linear-to-r from-${from} to-${to}`;

  const handleDelete = (e, userName) => {
    if (!confirm(`Are you sure you want to delete ${userName}?`)) {
      e.preventDefault();
    }
  };

  return (
    <div className="p-6 md:p-8 bg-linear-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-linear-to-r from-[#095075] to-[#0d7ab8] bg-clip-text text-transparent mb-3">
          User Management
        </h1>
        <p className="text-gray-600 text-lg">
          Manage user roles, permissions, and access levels
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Users
              </p>
              <p className="text-2xl font-bold text-[#095075]">
                {users.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
              <UsersIcon size={24} className="text-[#095075]" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Administrators
              </p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter((u) => u.role === "admin").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-linear-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center">
              <Shield size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Regular Users
              </p>
              <p className="text-2xl font-bold text-amber-600">
                {users.filter((u) => u.role === "user").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-linear-to-br from-amber-50 to-amber-100 rounded-xl flex items-center justify-center">
              <User size={24} className="text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-linear-to-r from-[#095075] to-[#0d7ab8]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-xl font-semibold text-white">
                User Accounts
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                Manage all user accounts and permissions
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200 w-48"
                />
              </div>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl transition-all duration-200 border border-white/30 hover:border-white/40 flex items-center space-x-2">
                <Filter size={18} />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((u) => (
                <tr
                  key={u._id}
                  className="hover:bg-blue-50 transition-all duration-200 group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-linear-to-br from-[#095075] to-[#0d7ab8] rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                        {u.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-gray-900 group-hover:text-[#095075] transition-colors">
                          {u.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: {u._id.slice(-8)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900 font-medium">{u.email}</p>
                    <div className="text-xs text-green-600 flex items-center mt-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      Active
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                        u.role === "admin"
                          ? "bg-linear-to-r from-green-50 to-emerald-50 text-green-700 border-green-200 shadow-sm"
                          : "bg-linear-to-r from-amber-50 to-orange-50 text-amber-700 border-amber-200 shadow-sm"
                      }`}
                    >
                      {u.role === "admin" ? (
                        <>
                          <Shield size={14} className="mr-1.5" />
                          Administrator
                        </>
                      ) : (
                        <>
                          <User size={14} className="mr-1.5" />
                          Regular User
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900 font-medium">
                      {new Date(u.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(u.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <Form method="post" className="flex items-center space-x-2">
                      <Link
                        to={`/admin/users/${u._id}`}
                        className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all duration-200 border border-blue-100"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </Link>
                      {u.role === "user" ? (
                        <button
                          name="_action"
                          value={`promote-${u._id}`}
                          className="p-2.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl transition-all duration-200 border border-green-100"
                          title="Promote to Admin"
                        >
                          <ArrowUp size={18} />
                        </button>
                      ) : (
                        <button
                          name="_action"
                          value={`demote-${u._id}`}
                          className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-xl transition-all duration-200 border border-amber-100"
                          title="Demote to User"
                        >
                          <ArrowDown size={18} />
                        </button>
                      )}
                      <button
                        name="_action"
                        value={`delete-${u._id}`}
                        onClick={(e) => handleDelete(e, u.name)}
                        className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-200 border border-red-100"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </Form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Placeholder */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-[#095075]">
                {filteredUsers.length}
              </span>{" "}
              users
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition-all duration-200 hover:shadow-sm flex items-center space-x-2">
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>
              <button className="px-4 py-2 rounded-xl bg-linear-to-r from-[#095075] to-[#0d7ab8] text-white hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
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
