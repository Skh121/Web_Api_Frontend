import React from "react";
import { FiDownload, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  useGetSubscriptionStatus,
  useGetPaymentHistory,
} from "../../hooks/useBillingSettings";

const BillingSettings = () => {
  const navigate = useNavigate();

  const { data: subscription, isLoading: isLoadingStatus } =
    useGetSubscriptionStatus();
  const { data: paymentHistory, isLoading: isLoadingHistory } =
    useGetPaymentHistory();

  const handleDownloadInvoice = (paymentItem) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Invoice", 14, 22);
    doc.setFontSize(10);
    doc.text("TradeVerse Inc.", 14, 30);
    doc.text(`Invoice #: ${paymentItem._id}`, 14, 45);
    doc.text(
      `Invoice Date: ${format(new Date(paymentItem.createdAt), "PP")}`,
      14,
      50
    );

    autoTable(doc, {
      startY: 60,
      head: [["Description", "Amount"]],
      body: [
        [
          `${subscription?.plan || "Plan"} Subscription`,
          `$${paymentItem.amount.toFixed(2)}`,
        ],
      ],
      foot: [["Total", `$${paymentItem.amount.toFixed(2)}`]],
      theme: "striped",
    });

    doc.save(`invoice-${paymentItem._id.slice(-6)}.pdf`);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-white">Billing & Subscription</h2>
      <p className="text-gray-400 mb-6">
        Manage your subscription and billing information.
      </p>

      <div className="space-y-6">
        <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg border border-gray-700">
          {isLoadingStatus ? (
            <p className="text-gray-400">Loading plan details...</p>
          ) : subscription ? (
            <div>
              <div className="flex items-center space-x-3">
                <h3 className="font-semibold text-white">
                  {subscription.plan} Plan
                </h3>
                <span className="bg-yellow-400/20 text-yellow-300 text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                  <FiStar size={12} />
                  <span>Current Plan</span>
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                ${subscription.price}/
                {subscription.billingCycle === "monthly" ? "mo" : "yr"} • Renews
                on {format(new Date(subscription.endDate), "PP")}
              </p>
            </div>
          ) : (
            <p className="text-gray-400">No Active Subscription</p>
          )}
          <button
            onClick={() => navigate("/payment")}
            className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded-md"
          >
            Change Plan
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Billing History
          </h3>
          <div className="space-y-3">
            {isLoadingHistory ? (
              <p className="text-gray-400 text-sm">
                Loading payment history...
              </p>
            ) : paymentHistory && paymentHistory.length > 0 ? (
              paymentHistory.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-gray-800 p-4 rounded-lg border border-gray-700"
                >
                  <div>
                    <p className="font-medium text-white">
                      {subscription?.plan || "Plan"} Purchase
                    </p>
                    <p className="text-sm text-gray-400">
                      {format(new Date(item.createdAt), "PP")}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="font-mono text-white">
                      ${item.amount.toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleDownloadInvoice(item)}
                      className="text-gray-400 hover:text-white"
                      title="Download Invoice"
                    >
                      <FiDownload size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No payment history found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
