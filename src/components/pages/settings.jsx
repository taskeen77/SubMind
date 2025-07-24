import { useState } from "react";
import { Switch } from "@headlessui/react";
import {
  Bell,
  Folder,
  DollarSign,
  Package,
  Trash2,
  Download,
  Settings as SettingsIcon
} from "lucide-react";

const SettingsPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [daysBefore, setDaysBefore] = useState(7);
  const [currency, setCurrency] = useState("₹");
  const [billingStartDay, setBillingStartDay] = useState("1st");
  const [categories, setCategories] = useState([
    "Entertainment",
    "Education",
    "Utilities",
    "Productivity"
  ]);
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const deleteCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const exportData = () => {
    alert("Exported data as CSV (mock)");
  };

  const resetData = () => {
    const confirmReset = confirm("Are you sure you want to reset all data?");
    if (confirmReset) {
      alert("Data reset (mock)");
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative top-16">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <SettingsIcon className="text-emerald-600 w-6 h-6" />
          Settings
        </h1>

        {/* Notifications */}
        <section className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Bell className="text-emerald-500 w-5 h-5" />
            Notifications
          </h2>
          <div className="flex justify-between items-center">
            <span>Enable Renewal Reminders</span>
            <Switch
              checked={notificationsEnabled}
              onChange={setNotificationsEnabled}
              className={`${
                notificationsEnabled ? "bg-emerald-600" : "bg-gray-400"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  notificationsEnabled ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          <div className="flex flex-col gap-2">
            <label>Days before renewal:</label>
            <input
              type="number"
              min={1}
              value={daysBefore}
              onChange={(e) => setDaysBefore(Number(e.target.value))}
              className="p-2 rounded bg-gray-100 dark:bg-slate-700 w-24"
            />
          </div>
        </section>

        {/* Billing Preferences */}
        <section className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <DollarSign className="text-yellow-500 w-5 h-5" />
            Billing Preferences
          </h2>
          <div className="flex flex-col gap-2">
            <label>Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="p-2 rounded bg-gray-100 dark:bg-slate-700 w-32"
            >
              <option value="$">$ - USD</option>
              <option value="€">€ - EUR</option>
              <option value="¥">¥ - JPY</option>
            </select>

            <label>Billing Cycle Start</label>
            <select
              value={billingStartDay}
              onChange={(e) => setBillingStartDay(e.target.value)}
              className="p-2 rounded bg-gray-100 dark:bg-slate-700 w-32"
            >
              <option value="1st">1st</option>
              <option value="15th">15th</option>
            </select>
          </div>
        </section>

        {/* Category Management */}
        <section className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Folder className="text-blue-500 w-5 h-5" />
            Category Management
          </h2>
          <ul className="space-y-1">
            {categories.map((cat, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-100 dark:bg-slate-700 p-2 rounded"
              >
                <span>{cat}</span>
                <button
                  onClick={() => deleteCategory(idx)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <input
              type="text"
              placeholder="New category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 p-2 rounded bg-gray-100 dark:bg-slate-700"
            />
            <button
              onClick={addCategory}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded cursor-pointer"
            >
              Add
            </button>
          </div>
        </section>

        {/* Data & Backup */}
        <section className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Package className="text-indigo-500 w-5 h-5" />
            Data & Backup
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={exportData}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
            >
              <Download size={16} />
              Export Data
            </button>
            <button
              onClick={resetData}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
            >
              <Trash2 size={16} />
              Reset All Data
            </button>
          </div>
        </section>
      </div>

      <footer className="pt-10 text-center text-sm bg-none text-gray-400 mt-7 flex justify-center items-center">
        &copy; {new Date().getFullYear()} Subscription Manager. Built with ❤️ using React.
      </footer>
    </>
  );
};

export default SettingsPage;
