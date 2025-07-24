import { useState, useMemo, useEffect } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { useSubscriptionContext } from "../../context/SubscriptionContext";
import { format } from "date-fns";

const Analytics = () => {
  const { subscriptions } = useSubscriptionContext();
  const [active, setActive] = useState("chart");
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPrice = (sub) => {
    if (sub.price) return parseFloat(sub.price);
    if (Array.isArray(sub.details)) {
      return sub.details.reduce((sum, d) => sum + parseFloat(d.amount || 0), 0);
    }
    return 0;
  };

  const monthlyTotals = useMemo(() => {
    const totals = Array(12).fill(0);
    subscriptions.forEach((sub) => {
      if (!sub.startDate || isNaN(new Date(sub.startDate))) return;
      const start = new Date(sub.startDate);
      const price = getPrice(sub);
      if (start.getFullYear() === currentYear) {
        totals[start.getMonth()] += price;
      }
    });
    return totals;
  }, [subscriptions]);

  const chartData = monthlyTotals.map((total, index) => ({
    month: new Date(currentYear, index).toLocaleString("default", {
      month: "short",
    }),
    total: parseFloat(total.toFixed(2)),
  }));

  const upcoming = useMemo(() => {
    return subscriptions
      .map((sub) => {
        if (!sub.startDate || isNaN(new Date(sub.startDate))) return null;
        const start = new Date(sub.startDate);
        const price = getPrice(sub);
        let nextBilling = new Date(start);
        while (nextBilling <= now) {
          if (sub.frequency === "monthly") {
            nextBilling.setMonth(nextBilling.getMonth() + 1);
          } else if (sub.frequency === "yearly") {
            nextBilling.setFullYear(nextBilling.getFullYear() + 1);
          } else {
            return null;
          }
        }
        const nextMonth = (currentMonth + 1) % 12;
        const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        const isUpcoming =
          (sub.frequency === "monthly" &&
            nextBilling.getMonth() === nextMonth &&
            nextBilling.getFullYear() === nextMonthYear) ||
          (sub.frequency === "yearly" && nextBilling.getFullYear() === currentYear + 1);
        if (!isUpcoming) return null;
        return {
          ...sub,
          nextBillingDate: nextBilling,
        };
      })
      .filter(Boolean);
  }, [subscriptions]);

  return (
    <><div className="p-6 relative top-16 overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4">Analytics</h2>

      <div className="flex flex-wrap gap-3 mb-6">
        {['chart', 'table', 'next'].map((type) => (
          <button
            key={type}
            onClick={() => setActive(type)}
            className={`px-4 py-2 rounded transition ${active === type ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-700'} hover:bg-emerald-600 hover:text-white cursor-pointer`}
          >
            {type === 'chart' ? 'Bar Chart' : type === 'table' ? 'Subscriptions Table' : 'Upcoming Billing'}
          </button>
        ))}
      </div>

      {active === "chart" && (
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-lg font-medium mb-2">Spending Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" />
              {!isSmallScreen && <YAxis />}
              <Tooltip formatter={(value) => [`$${value}`, "Total"]} />
              <Bar dataKey="total" fill="#059669" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* {active === "table" && (
      <div className="mt-6">
        <div className="w-full overflow-x-auto sm:overflow-visible">
          <table className="min-w-[600px] w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-emerald-100 text-emerald-800">
                <th className="py-2 px-4 whitespace-nowrap">Name</th>
                <th className="py-2 px-4 whitespace-nowrap">Price</th>
                <th className="py-2 px-4 whitespace-nowrap">Frequency</th>
                <th className="py-2 px-4 whitespace-nowrap">Start Date</th>
                <th className="py-2 px-4 whitespace-nowrap">Category</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="border-t hover:bg-emerald-50">
                  <td className="py-2 px-4 whitespace-nowrap">{sub.name}</td>
                  <td className="py-2 px-4 whitespace-nowrap">${getPrice(sub)}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{sub.frequency}</td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    {sub.startDate ? format(new Date(sub.startDate), "dd MMM yyyy") : "-"}
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">{sub.category}</td>
                </tr>
              ))}
              <tr className="border-t font-semibold bg-emerald-100 text-emerald-900">
                <td className="py-2 px-4">Total</td>
                <td className="py-2 px-4">
                  ${subscriptions.reduce((acc, sub) => acc + getPrice(sub), 0).toFixed(2)}
                </td>
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )} */}

      {active === "table" && (
        <div className="mt-6">
          {/* This prevents full-screen horizontal scroll */}
          <div className="w-full overflow-x-hidden">
            {/* This enables horizontal scroll ONLY on the table */}
            <div className="overflow-x-auto">
              <table className="min-w-[700px] w-full text-left border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-emerald-100 text-emerald-800">
                    <th className="py-2 px-4 whitespace-nowrap">Name</th>
                    <th className="py-2 px-4 whitespace-nowrap">Price</th>
                    <th className="py-2 px-4 whitespace-nowrap">Frequency</th>
                    <th className="py-2 px-4 whitespace-nowrap">Start Date</th>
                    <th className="py-2 px-4 whitespace-nowrap">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="border-t hover:bg-emerald-50">
                      <td className="py-2 px-4 whitespace-nowrap">{sub.name}</td>
                      <td className="py-2 px-4 whitespace-nowrap">${getPrice(sub)}</td>
                      <td className="py-2 px-4 whitespace-nowrap">{sub.frequency}</td>
                      <td className="py-2 px-4 whitespace-nowrap">
                        {sub.startDate
                          ? format(new Date(sub.startDate), "dd MMM yyyy")
                          : "-"}
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap">{sub.category}</td>
                    </tr>
                  ))}

                  <tr className="border-t font-semibold bg-emerald-100 text-emerald-900">
                    <td className="py-2 px-4">Total</td>
                    <td className="py-2 px-4">
                      $
                      {subscriptions
                        .reduce((acc, sub) => acc + getPrice(sub), 0)
                        .toFixed(2)}
                    </td>
                    <td colSpan="3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {active === "next" && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Upcoming Renewals</h3>
          {upcoming.length === 0 ? (
            <p>No upcoming renewals in next cycle.</p>
          ) : (
            <ul className="space-y-2">
              {upcoming.map((sub) => (
                <li
                  key={sub.id}
                  className="border p-3 rounded bg-emerald-50 shadow-sm"
                >
                  <strong>{sub.name}</strong> – ${getPrice(sub)} / {sub.frequency}
                  <br />
                  Next Billing: {format(new Date(sub.nextBillingDate), "dd MMM yyyy")}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div><footer className="pt-10 text-center text-sm bg-none text-gray-400 mt-7 flex justify-center items-center">
        &copy; {new Date().getFullYear()} Subscription Manager. Built with ❤️ using React.
      </footer></>
  );
};

export default Analytics;
