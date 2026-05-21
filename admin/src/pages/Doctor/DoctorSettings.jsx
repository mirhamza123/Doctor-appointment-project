import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorSettings = () => {
  const { dtoken, backendUrl } = useContext(DoctorContext);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Handle email change submission
  const handleChangeEmail = async (e) => {
    e.preventDefault();

    if (!newEmail.trim()) {
      toast.error("Please enter a new email address");
      return;
    }

    setLoadingEmail(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/change-email`,
        { newEmail },
        {
          headers: {
            dtoken: dtoken,
          },
        },
      );

      if (data.success) {
        toast.success(data.message || "Email updated successfully!");
        setNewEmail("");
      } else {
        toast.error(data.message || "Failed to update email");
      }
    } catch (error) {
      console.log("Error changing email:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Error updating email",
      );
    } finally {
      setLoadingEmail(false);
    }
  };

  // Handle password change submission
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword.trim() || !newPassword.trim()) {
      toast.error("Please enter both current and new password");
      return;
    }

    if (currentPassword === newPassword) {
      toast.error("New password must be different from current password");
      return;
    }

    setLoadingPassword(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/change-password`,
        { currentPassword, newPassword },
        {
          headers: {
            dtoken: dtoken,
          },
        },
      );

      if (data.success) {
        toast.success(data.message || "Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        toast.error(data.message || "Failed to update password");
      }
    } catch (error) {
      console.log("Error changing password:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Error updating password",
      );
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="w-full m-5">
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Account Security</h1>
          <p className="text-gray-500 mt-1">
            Manage your email and password securely
          </p>
        </div>

        {/* Change Email Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-md shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 rounded-full p-3">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Change Email
              </h2>
              <p className="text-sm text-gray-500">
                Update your login email address
              </p>
            </div>
          </div>

          <form onSubmit={handleChangeEmail} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Email Address
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter your new email"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loadingEmail}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loadingEmail ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Updating...
                </>
              ) : (
                "Update Email"
              )}
            </button>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-md shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Change Password
              </h2>
              <p className="text-sm text-gray-500">Keep your account secure</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loadingPassword}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loadingPassword ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Changing...
                </>
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        </div>

        {/* Security Tips Section */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-2xl">
          <div className="flex gap-3">
            <svg
              className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">
                Security Tips
              </h3>
              <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
                <li>
                  Use a strong, unique password with numbers and special
                  characters
                </li>
                <li>Never share your password with anyone</li>
                <li>Update your password regularly for better security</li>
                <li>Verify your new email address before confirming changes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSettings;
