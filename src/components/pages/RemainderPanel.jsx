import { useState } from "react";
import { useSubscriptionContext } from "../../context/SubscriptionContext";
import { format, addMonths, addYears, isAfter, isBefore, parseISO } from "date-fns";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const getNextRenewalDate = (sub, today) => {
  const start = parseISO(sub.startDate);
  if (isAfter(start, today)) return null; 

  let next = new Date(start);

  while (isBefore(next, today)) {
    next =
      sub.frequency === "monthly"
        ? addMonths(next, 1)
        : addYears(next, 1);
  }
  return next;
};

const ReminderPanel = () => {
  const { subscriptions, setSubscriptions } = useSubscriptionContext();
  const [range, setRange] = useState(7);

  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + range);

const filtered = subscriptions.filter((sub) => {
  const start = parseISO(sub.startDate);
  if (isAfter(start, today)) return false;

  // Calculate the current period end date
  let end = new Date(start);
  while (isBefore(end, today)) {
    end = sub.frequency === "monthly" ? addMonths(end, 1) : addYears(end, 1);
  }

  const diffInDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  return diffInDays > 0 && diffInDays <= range;
});

  const markAsCancelled = (id) => {
    const updated = subscriptions.filter((s) => s.id !== id);
    setSubscriptions(updated);
  };

  const exportCSV = () => {
    const rows = filtered.map((s) => `${s.name},${s.price},${s.frequency}`);
    const blob = new Blob(["Name,Price,Frequency\n" + rows.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "renewals.csv");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Upcoming Renewals", 14, 14);
    doc.autoTable({
      head: [["Name", "Price", "Frequency"]],
      body: filtered.map((s) => [s.name, `₹${s.price}`, s.frequency]),
    });
    doc.save("renewals.pdf");
  };

  return (
    <div className="relative top-16 p-4 w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-xl shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-300">Upcoming Renewals</h2>
        <div className="flex gap-2 items-center">
          <select
            className="border rounded px-2 py-1 dark:bg-slate-800 dark:text-white"
            onChange={(e) => setRange(Number(e.target.value))}
            value={range}
          >
            <option value={7}>Next 7 days</option>
            <option value={14}>Next 14 days</option>
            <option value={30}>Next 30 days</option>
          </select>
          <button onClick={exportCSV} className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700">
            Export CSV
          </button>
          <button onClick={exportPDF} className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700">
            Export PDF
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No subscriptions due within selected range.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((sub) => {
            const renewalDate = getNextRenewalDate(sub, today);
            return (
              <div
                key={sub.id}
                className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              >
                <div>
                  <h3 className="text-lg font-semibold text-emerald-700 dark:text-white">{sub.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Renewal: {format(renewalDate, "MMMM do, yyyy")}
                  </p>
                  <p className="text-sm text-gray-800 dark:text-white">
                    ${sub.price}
                  </p>
                </div>
              </div>
              
            );
          })}
        </div>
      )}

      <div className="mt-6 border-t pt-4 dark:border-slate-700">
        <p className="text-gray-500 dark:text-gray-300 text-sm">
          🔗 Coming Soon: Sync with Google Calendar & email reminders
        </p>
        <button
          className="mt-2 px-4 py-1 bg-gray-300 dark:bg-slate-700 text-gray-600 dark:text-white rounded cursor-not-allowed"
          disabled
        >
          Connect Google Calendar
        </button>
      </div>
    </div>
    
  );
};

export default ReminderPanel;
