import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useLoginUserTan from "../../hooks/useLoginUserTan";

const LoginForm = () => {
  const { mutate, error, isPending, isError, isSuccess } = useLoginUserTan();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>

        <div className="text-right text-sm">
          <Link
            to={"/request-reset-password"}
            className="text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-600 text-center">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
