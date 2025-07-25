import { useState, useEffect } from "react";
import Notification from "../../notification"; 

const SubscriptionForm = ({ onSubmit, initialData, isEditing }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    frequency: "monthly",
    category: "entertainment",
    startDate: "",
  });

  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price || !formData.startDate) {
      setError("Please fill in all required fields.");
      return;
    }

    const selectedDate = new Date(formData.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time part

    if (selectedDate > today) {
      setShowNotification(true);
      return;
    }

    setError("");
    onSubmit(formData);

    if (!isEditing) {
      setFormData({
        name: "",
        price: "",
        frequency: "monthly",
        category: "entertainment",
        startDate: "",
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 rounded-xl shadow-md mt-10">
      {showNotification && (
        <Notification
          type="error"
          message="Start date cannot be in the future. Form not submitted."
          onClose={() => setShowNotification(false)}
        />
      )}

      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {isEditing ? "Edit Subscription" : "Add Subscription"}
      </h2>

      {error && (
        <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const form = e.target.form;
            const index = Array.prototype.indexOf.call(form, e.target);
            form.elements[index + 1]?.focus();
            e.preventDefault();
          }
        }}
      >
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="cursor-pointer w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            placeholder="e.g. Netflix"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Price ($) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            className="cursor-pointer w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            placeholder="e.g. 499"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Billing Frequency *</label>
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="cursor-pointer w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            required
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="cursor-pointer w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            required
          >
            <option value="entertainment">Entertainment</option>
            <option value="education">Education</option>
            <option value="utilities">Utilities</option>
            <option value="productivity">Productivity</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Start Date *</label>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="cursor-pointer w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            required
            max={new Date().toISOString().split("T")[0]} // This disables future dates
          />

        </div>

        <button
          type="submit"
          className="cursor-pointer w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-md transition duration-200"
        >
          {isEditing ? "Update Subscription" : "Save Subscription"}
        </button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
