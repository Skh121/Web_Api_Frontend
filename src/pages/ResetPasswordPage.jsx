import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPassword } from "../hooks/useForgotPassword";

// Reusable Input component
const Input = (props) => (
  <input
    {...props}
    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { mutate: resetPassword, isLoading } = useResetPassword();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values) => {
      // The mutate function from your hook will handle success/error and navigation
      resetPassword({ data: values, token });
    },
  });

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-white text-center">
            Create a New Password
          </h2>
          <p className="text-gray-400 text-center text-sm mt-2 mb-6">
            Your new password must be different from previous passwords.
          </p>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                New Password
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Confirm Password
              </label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 transition-colors"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
