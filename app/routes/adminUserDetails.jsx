import { useLoaderData, Form, Link } from "react-router";
import {
  ArrowLeft,
  Shield,
  User,
  Mail,
  Calendar,
  Trash2,
  ArrowUp,
  ArrowDown,
  Badge,
  IdCard,
} from "lucide-react";
import { getUserById } from "../models/user";

export async function loader({ params }) {
  let user = await getUserById(params.id);

  if (!user) {
    throw new Response("User not found", { status: 404 });
  }

  // Convert _id to string
  let userData = {
    ...user,
    _id: user._id.toString(),
  };

  return { user: userData };
}

export async function action({ request, params }) {
  let formData = await request.formData();
  let _action = formData.get("_action");

  if (_action === "promote") await updateUserRole(params.id, "admin");
  if (_action === "demote") await updateUserRole(params.id, "user");
  if (_action === "delete") await deleteUser(params.id);

  return null;
}

export default function UserDetail() {
  let { user } = useLoaderData();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 p-6 md:p-8">
      {/* Header Navigation */}
      <div className="mb-8">
        <Link
          to="/admin/user"
          className="inline-flex items-center text-[#095075] hover:text-[#0d7ab8] transition-colors duration-200 mb-4 group"
        >
          <ArrowLeft
            size={20}
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          />
          Back to Users
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-[#095075] to-[#0d7ab8] bg-clip-text text-transparent">
              User Profile
            </h1>
            <p className="text-gray-600 mt-2">
              Detailed user information and management
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <span
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                user.role === "admin"
                  ? "bg-linear-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200"
                  : "bg-linear-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200"
              }`}
            >
              {user.role === "admin" ? (
                <Shield size={16} className="mr-2" />
              ) : (
                <User size={16} className="mr-2" />
              )}
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Profile Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-linear-to-r from-[#095075] to-[#0d7ab8] px-6 py-8 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-blue-100 opacity-90">{user.email}</p>
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <IdCard size={20} className="mr-2 text-[#095075]" />
                    Personal Information
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <Badge size={18} className="text-[#095075] shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="font-semibold text-gray-900">
                          {user.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <Mail size={18} className="text-[#095075] shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="font-semibold text-gray-900">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <Calendar size={18} className="text-[#095075] shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(user.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(user.createdAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Shield size={20} className="mr-2 text-[#095075]" />
                    Account Information
                  </h3>

                  <div className="space-y-4">
                    <div className="p-4 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <p className="text-sm text-blue-700 font-medium">
                        User ID
                      </p>
                      <p className="text-blue-900 font-mono text-sm mt-1">
                        {user._id}
                      </p>
                    </div>

                    <div className="p-4 bg-linear-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                      <p className="text-sm text-green-700 font-medium">
                        Account Status
                      </p>
                      <p className="text-green-900 font-semibold mt-1 flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        Active
                      </p>
                    </div>

                    <div className="p-4 bg-linear-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                      <p className="text-sm text-purple-700 font-medium">
                        Last Activity
                      </p>
                      <p className="text-purple-900 font-semibold mt-1">
                        Recently Active
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              User Actions
            </h3>

            <Form method="post" className="space-y-3">
              {user.role === "user" ? (
                <button
                  name="_action"
                  value="promote"
                  className="w-full flex items-center justify-center space-x-2 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-3 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <ArrowUp size={18} />
                  <span>Promote to Admin</span>
                </button>
              ) : (
                <button
                  name="_action"
                  value="demote"
                  className="w-full flex items-center justify-center space-x-2 bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-4 py-3 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <ArrowDown size={18} />
                  <span>Demote to User</span>
                </button>
              )}

              <button
                name="_action"
                value="delete"
                className="w-full flex items-center justify-center space-x-2 bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-4 py-3 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Trash2 size={18} />
                <span>Delete Account</span>
              </button>
            </Form>
          </div>

          {/* Statistics Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Account Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Events Created</span>
                <span className="font-semibold text-[#095075]">12</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Approval Rate</span>
                <span className="font-semibold text-green-600">92%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Active Sessions</span>
                <span className="font-semibold text-blue-600">1</span>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
            <div className="flex items-start space-x-3">
              <Shield size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800">
                  Security Notice
                </h4>
                <p className="text-amber-700 text-sm mt-1">
                  Administrative actions will take effect immediately. Please
                  verify changes with the user when appropriate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
