import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Component Imports
import LogNewTradeHeader from "./logManagement/LogNewTradeHeader";
import InputField from "./logManagement/InputField";
import SelectField from "./logManagement/SelectField";
import DatePickerField from "./logManagement/DatePickerField";
import TradeDirectionToggle from "./logManagement/TradeDirectionToggle";
import TagSelector from "./logManagement/TagSelector";
import TextAreaField from "./logManagement/TextAreaField";
import FileUpload from "./logManagement/FileUpload";
import ActionButtons from "./logManagement/ActionButtons";

// React Query Hook
import useLogManagement from "../../hooks/uselogManagement";

// Validation Schema
const tradeValidationSchema = Yup.object({
  symbol: Yup.string().required("Symbol is required"),
  assetClass: Yup.string().required("Asset class is required"),
  entryPrice: Yup.number()
    .positive("Must be a positive number")
    .required("Entry price is required"),
  positionSize: Yup.number()
    .positive("Must be a positive number")
    .required("Position size is required"),
  entryDate: Yup.date().required("Entry date is required"),
  notes: Yup.string().max(1000, "Notes must be 1000 characters or less"),
  chartScreenshot: Yup.mixed()
    .nullable()
    .test(
      "fileSize",
      "File too large, max 10MB",
      (value) => !value || (value && value.size <= 10 * 1024 * 1024)
    ),
});

const LogTradeForm = () => {
  const { mutate: createLog, isPending } = useLogManagement();
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
      tags: ["Technical"],
      chartScreenshot: null,
    },
    validationSchema: tradeValidationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        const value = values[key];
        if (value !== null && value !== "" && value !== undefined) {
          if (key === "tags") {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        }
      });
      createLog(formData);
    },
  });

  const handleRemoveImage = () => {
    formik.setFieldValue("chartScreenshot", null);
    setImagePreview(null);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 sm:p-8 mt-6">
      <LogNewTradeHeader />
      <form onSubmit={formik.handleSubmit} className="mt-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <InputField
            label="Symbol/Ticker"
            name="symbol"
            type="text"
            placeholder="e.g., AAPL, BTC/USD"
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
            error={formik.touched.positionSize && formik.errors.positionSize}
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
          placeholder="Describe your trade setup, reasoning, market conditions, emotions, and lessons learned..."
          value={formik.values.notes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.notes && formik.errors.notes}
        />

        <FileUpload
          label="Chart Screenshot (Optional)"
          name="chartScreenshot"
          imagePreview={imagePreview}
          onFileChange={(event) => {
            const file = event.currentTarget.files[0];
            if (file) {
              formik.setFieldValue("chartScreenshot", file);
              setImagePreview(URL.createObjectURL(file));
            } else {
              formik.setFieldValue("chartScreenshot", null);
              setImagePreview(null);
            }
          }}
          onRemove={handleRemoveImage}
          error={
            formik.touched.chartScreenshot && formik.errors.chartScreenshot
          }
        />

        <ActionButtons isSubmitting={isPending} />
      </form>
    </div>
  );
};

export default LogTradeForm;
