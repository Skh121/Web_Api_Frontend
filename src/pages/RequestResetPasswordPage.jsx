import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useRequestResetPassword } from "../hooks/useForgotPassword";
import { FiArrowLeft } from "react-icons/fi";

// Reusable Input component for consistent styling
const Input = (props) => (
  <input
    {...props}
    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

export default function RequestResetPasswordPage() {
  const navigate = useNavigate();
  const { mutate: requestReset, isLoading } = useRequestResetPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      requestReset(values);
      // Optional: Navigate away or show a success message that an email has been sent.
    },
  });

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-white text-center">
            Forgot Password?
          </h1>
          <p className="text-gray-400 text-center text-sm mt-2 mb-6">
            No problem. Enter your email and we'll send you a reset link.
          </p>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="you@example.com"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 transition-colors"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        </div>
        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-sm text-blue-500 hover:underline flex items-center justify-center gap-2"
          >
            <FiArrowLeft />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
