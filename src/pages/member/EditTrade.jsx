import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

// Import all hooks and components
import { useGetTradeById, useUpdateTrade } from "../../hooks/uselogManagement";
import InputField from "../../components/admin/Log Management/InputField";
import SelectField from "../../components/admin/Log Management/SelectField";
import DatePickerField from "../../components/admin/Log Management/DatePickerField";
import TradeDirectionToggle from "../../components/admin/Log Management/TradeDirectionToggle";
import TagSelector from "../../components/admin/Log Management/TagSelector";
import TextAreaField from "../../components/admin/Log Management/TextAreaField";
import FileUpload from "../../components/admin/Log Management/FileUpload";
import ActionButtons from "../../components/admin/Log Management/ActionButtons";

const tradeValidationSchema = Yup.object({
  symbol: Yup.string().required("Symbol is required"),
  assetClass: Yup.string().required("Asset class is required"),
  entryPrice: Yup.number()
    .positive("Must be positive")
    .required("Entry price is required"),
  positionSize: Yup.number()
    .positive("Must be positive")
    .required("Position size is required"),
  entryDate: Yup.date().required("Entry date is required"),
});

const EditTrade = () => {
  const { id: tradeId } = useParams();
  const {
    data: trade,
    isLoading: isFetching,
    isError,
    error,
  } = useGetTradeById(tradeId);
  const { mutate: updateTrade, isPending: isUpdating } = useUpdateTrade();
  const [imagePreview, setImagePreview] = useState(null);

  const tradeSetupTags = [
    "Breakout",
    "Reversal",
    "Pullback",
    "News",
    "Earnings",
    "Technical",
    "Fundamental",
  ];

  const formik = useFormik({
    initialValues: {
      symbol: "",
      assetClass: "",
      tradeDirection: "long",
      positionSize: "",
      entryPrice: "",
      exitPrice: "",
      entryDate: "",
      exitDate: "",
      stopLoss: "",
      takeProfit: "",
      fees: "",
      notes: "",
      tags: [],
      chartScreenshot: null,
      chartScreenshotUrl: "",
    },
    validationSchema: tradeValidationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        const value = values[key];
        if (value !== null && value !== undefined) {
          if (key === "tags") {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        }
      });
      updateTrade({ tradeId, formData });
    },
  });

  useEffect(() => {
    if (trade) {
      const fields = Object.keys(formik.initialValues);
      fields.forEach((field) => {
        let value = trade[field];
        if ((field === "entryDate" || field === "exitDate") && value) {
          value = new Date(value).toISOString().split("T")[0];
        }
        formik.setFieldValue(field, value || (field === "tags" ? [] : ""));
      });
      if (trade.chartScreenshotUrl) {
        setImagePreview(trade.chartScreenshotUrl);
      }
    }
  }, [trade, formik.setFieldValue]);

  if (isFetching) {
    return (
      <div className="p-8 text-center text-white">Loading trade details...</div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-400">Error: {error.message}</div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="mx-auto">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Edit Trade</h1>
          <p className="text-gray-400 mb-6">
            Update the details for your trade: {trade?.symbol}
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-8">
            {/* --- ALL FORM FIELDS ARE NOW RESTORED --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InputField
                label="Symbol/Ticker"
                name="symbol"
                type="text"
                value={formik.values.symbol}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.symbol && formik.errors.symbol}
              />
              <InputField
                label="Entry Price"
                name="entryPrice"
                type="number"
                value={formik.values.entryPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.entryPrice && formik.errors.entryPrice}
              />
              <SelectField
                label="Asset Class"
                name="assetClass"
                value={formik.values.assetClass}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.assetClass && formik.errors.assetClass}
              >
                <option value="">Select asset class</option>
                <option value="stocks">Stocks</option>
                <option value="crypto">Cryptocurrency</option>
                <option value="forex">Forex</option>
                <option value="commodities">Commodities</option>
              </SelectField>
              <InputField
                label="Exit Price (Optional)"
                name="exitPrice"
                type="number"
                value={formik.values.exitPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.exitPrice && formik.errors.exitPrice}
              />
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Trade Direction
                </label>
                <TradeDirectionToggle
                  direction={formik.values.tradeDirection}
                  setDirection={(dir) =>
                    formik.setFieldValue("tradeDirection", dir)
                  }
                />
              </div>
              <DatePickerField
                label="Entry Date"
                name="entryDate"
                value={formik.values.entryDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.entryDate && formik.errors.entryDate}
              />
              <InputField
                label="Position Size"
                name="positionSize"
                type="number"
                value={formik.values.positionSize}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.positionSize && formik.errors.positionSize
                }
              />
              <DatePickerField
                label="Exit Date (Optional)"
                name="exitDate"
                value={formik.values.exitDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.exitDate && formik.errors.exitDate}
              />
              <InputField
                label="Stop Loss (Optional)"
                name="stopLoss"
                type="number"
                value={formik.values.stopLoss}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.stopLoss && formik.errors.stopLoss}
              />
              <InputField
                label="Take Profit (Optional)"
                name="takeProfit"
                type="number"
                value={formik.values.takeProfit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.takeProfit && formik.errors.takeProfit}
              />
              <InputField
                label="Fees/Commission (Optional)"
                name="fees"
                type="number"
                value={formik.values.fees}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fees && formik.errors.fees}
              />
            </div>

            <TagSelector
              tags={tradeSetupTags}
              selectedTags={formik.values.tags}
              onTagClick={(tag) => {
                const newTags = formik.values.tags.includes(tag)
                  ? formik.values.tags.filter((t) => t !== tag)
                  : [...formik.values.tags, tag];
                formik.setFieldValue("tags", newTags);
              }}
            />

            <TextAreaField
              label="Trade Notes & Analysis"
              name="notes"
              value={formik.values.notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.notes && formik.errors.notes}
            />

            <FileUpload
              label="Update Chart Screenshot"
              name="chartScreenshot"
              imagePreview={imagePreview}
              onFileChange={(event) => {
                const file = event.currentTarget.files[0];
                if (file) {
                  formik.setFieldValue("chartScreenshot", file);
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              onRemove={() => {
                formik.setFieldValue("chartScreenshot", null);
                formik.setFieldValue("chartScreenshotUrl", "");
                setImagePreview(null);
              }}
              error={
                formik.touched.chartScreenshot && formik.errors.chartScreenshot
              }
            />
            <ActionButtons isSubmitting={isUpdating} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTrade;
