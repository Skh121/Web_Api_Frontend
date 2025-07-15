import React from "react";
import { FiDownload } from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from "yup";
import DeleteConfirmationToast from "../../components/commons/DeleteConfirmationToast";
import { toast } from "react-toastify";
import {
  useChangePassword,
  useDeleteMyAccount,
  useExportMyData,
} from "../../hooks/useSecuritySettings";

// A reusable styled input component for this form
const Input = (props) => (
  <input
    {...props}
    className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
  />
);

const SecuritySettings = () => {
  const { mutate: updatePassword, isLoading: isUpdatingPassword } =
    useChangePassword();
  const { mutate: deleteAccount, isLoading: isDeletingAccount } =
    useDeleteMyAccount();
  const { mutate: exportData, isLoading: isExportingData } = useExportMyData();

  // 2. Define the validation schema using Yup
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your new password"),
  });

  // 3. Set up Formik
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Call the mutation from your hook
      updatePassword(values, {
        onSuccess: () => {
          resetForm(); // Clear form on success
        },
      });
    },
  });

  const handleDeleteAccount = () => {
    toast.warning(
      <DeleteConfirmationToast onConfirm={() => deleteAccount()} />,
      {
        position: "top-center",
        autoClose: false, // Don't auto-close, wait for user action
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const handleExportData = () => {
    exportData();
  };

  return (
    <div className="space-y-10">
      {/* Section 1: Security Settings (Password) */}
      <div className="border border-gray-700 p-6 rounded-xl">
        <h2 className="text-xl font-bold text-white">Security Settings</h2>
        <p className="text-gray-400 mb-6">
          Manage your account security and authentication.
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Current Password
            </label>
            <Input
              name="currentPassword"
              type="password"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.currentPassword &&
              formik.errors.currentPassword && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.currentPassword}
                </div>
              )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              New Password
            </label>
            <Input
              name="newPassword"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.newPassword}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Confirm New Password
            </label>
            <Input
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>
          <div>
            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="bg-white hover:bg-gray-200 text-gray-900 font-bold py-2 px-5 rounded-lg mt-2 disabled:opacity-50"
            >
              {isUpdatingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>

      {/* Section 2: Data & Privacy */}
      <div className="border border-gray-700 p-6 rounded-xl">
        <h2 className="text-xl font-bold text-white">Data & Privacy</h2>
        <p className="text-gray-400 mb-6">
          Export or permanently delete your account data.
        </p>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleExportData}
            disabled={isExportingData}
            className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded-md flex items-center space-x-2 disabled:opacity-50"
          >
            <FiDownload />
            <span>{isExportingData ? "Exporting..." : "Export My Data"}</span>
          </button>
          <button
            onClick={handleDeleteAccount}
            disabled={isDeletingAccount}
            className="bg-red-800 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-md disabled:opacity-50"
          >
            {isDeletingAccount ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
