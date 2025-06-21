import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import * as Yup from "yup";
import { useFormik } from "formik";
import useCheckout from "../../hooks/useCheckout";

const CheckoutForm = ({ plan, isYearly }) => {
  const { user } = useContext(AuthContext);
  const { mutate, isPending } = useCheckout();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    cardholderName: Yup.string()
      .max(50, "Name is too long")
      .required("Cardholder name is required"),
    cardNumber: Yup.string()
      .matches(/^[0-9]{16}$/, "Card number must be 16 digits")
      .required("Card number is required"),
    expiryDate: Yup.string()
      .required("Expiry date is required")
      .test("is-not-expired", "Card has expired", function (value) {
        if (!value) return false;
        const [year, month] = value.split("-");
        const expiryYear = parseInt(year, 10);
        const expiryMonth = parseInt(month, 10);
        const firstInvalidDay = new Date(expiryYear, expiryMonth, 1);
        return new Date() < firstInvalidDay;
      }),
    cvc: Yup.string()
      .matches(/^[0-9]{3,4}$/, "CVC must be 3 or 4 digits")
      .required("CVC is required"),
    country: Yup.string().required("Country is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: user?.email || "",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      country: "Nepal",
    },
    validationSchema,
    onSubmit: (values) => {
      const checkoutData = {
        plan,
        isYearly,
        paymentDetails: values,
      };
      mutate(checkoutData);
    },
    enableReinitialize: true,
  });

  return (
    <div className="w-full lg:w-3/5 bg-white p-8">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
            className={`w-full p-3 bg-gray-100 border rounded-lg ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-200"
            }`}
            readOnly
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.email}
            </div>
          )}
        </div>
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-2">
            Payment method
          </legend>
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="card"
                name="paymentMethod"
                value="card"
                defaultChecked
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label
                htmlFor="card"
                className="ml-3 block text-sm font-medium text-gray-800"
              >
                Card
              </label>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <input
                  type="number"
                  placeholder="Card Number"
                  {...formik.getFieldProps("cardNumber")}
                  className={`w-full p-3 border rounded-lg ${
                    formik.touched.cardNumber && formik.errors.cardNumber
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched.cardNumber && formik.errors.cardNumber && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.cardNumber}
                  </div>
                )}
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="month"
                    id="expiryDate"
                    {...formik.getFieldProps("expiryDate")}
                    className={`w-full p-3 border rounded-lg ${
                      formik.touched.expiryDate && formik.errors.expiryDate
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.touched.expiryDate && formik.errors.expiryDate && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.expiryDate}
                    </div>
                  )}
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CVC
                  </label>
                  <input
                    type="number"
                    id="cvc"
                    placeholder="CVC"
                    {...formik.getFieldProps("cvc")}
                    className={`w-full p-3 border rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                      formik.touched.cvc && formik.errors.cvc
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.touched.cvc && formik.errors.cvc && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.cvc}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  {...formik.getFieldProps("cardholderName")}
                  className={`w-full p-3 border rounded-lg ${
                    formik.touched.cardholderName &&
                    formik.errors.cardholderName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched.cardholderName &&
                  formik.errors.cardholderName && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.cardholderName}
                    </div>
                  )}
              </div>
              <div>
                <select
                  {...formik.getFieldProps("country")}
                  className={`w-full p-3 border rounded-lg bg-white ${
                    formik.touched.country && formik.errors.country
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="Nepal">Nepal</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                </select>
                {formik.touched.country && formik.errors.country && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.country}
                  </div>
                )}
              </div>
            </div>
          </div>
        </fieldset>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#6A5ACD] text-white font-bold py-4 rounded-lg mt-8 hover:bg-[#5a4caf] transition-colors disabled:bg-gray-400"
        >
          {isPending ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
