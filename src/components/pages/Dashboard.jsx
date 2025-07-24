
import { useMemo, useEffect, useState } from "react";
import { useSubscriptionContext } from "../../context/SubscriptionContext";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

// Color palette
const COLORS = [
  "#34D399", "#3B82F6", "#FBBF24", "#F87171",
  "#A78BFA", "#10B981", "#F472B6"
];

// Hook to track screen size
const useIsSmallScreen = () => {
  const [isSmall, setIsSmall] = useState(window.innerWidth < 640);
  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isSmall;
};

// Vertical color legend
const CategoryLegend = ({ data }) => (
  <div className="flex flex-col gap-2 text-sm ml-0 sm:ml-4 mt-4 sm:mt-0">
    {data.map((entry, idx) => (
      <div key={idx} className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: COLORS[idx % COLORS.length] }}
        />
        <span>{entry.name}</span>
      </div>
    ))}
  </div>
);

// KPI Card component
const KPI = ({ title, value }) => (
  <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
    <span className="text-sm text-gray-500">{title}</span>
    <span className="text-xl font-semibold text-emerald-700">{value}</span>
  </div>
);

const Dashboard = () => {
  const { subscriptions } = useSubscriptionContext();
  const isSmall = useIsSmallScreen();
  const now = new Date();
  const currentYear = now.getFullYear();

  // Get price of subscription
  const getPrice = (sub) => {
    if (sub.price) return parseFloat(sub.price);
    if (Array.isArray(sub.details)) {
      return sub.details.reduce((sum, d) => sum + parseFloat(d.amount || 0), 0);
    }
    return 0;
  };

  const totalSpend = useMemo(
    () => subscriptions.reduce((acc, sub) => acc + getPrice(sub), 0).toFixed(2),
    [subscriptions]
  );

  const monthlyAverage = (totalSpend / 12).toFixed(2);

  const breakdownByFrequency = useMemo(() => {
    const monthly = {};
    const yearly = {};

    subscriptions.forEach((sub) => {
      const cat = sub.category || "Uncategorized";
      const amount = getPrice(sub);
      if (sub.frequency === "yearly") {
        yearly[cat] = (yearly[cat] || 0) + amount;
      } else {
        monthly[cat] = (monthly[cat] || 0) + amount;
      }
    });

    const convert = (obj) =>
      Object.entries(obj).map(([name, value]) => ({ name, value }));

    return {
      monthly: convert(monthly),
      yearly: convert(yearly),
    };
  }, [subscriptions]);

  const monthlyTrend = useMemo(() => {
    const totals = Array(12).fill(0);
    subscriptions.forEach((sub) => {
      const date = new Date(sub.startDate);
      if (date.getFullYear() === currentYear) {
        totals[date.getMonth()] += getPrice(sub);
      }
    });
    return totals.map((val, idx) => ({
      month: new Date(currentYear, idx).toLocaleString("default", { month: "short" }),
      value: parseFloat(val.toFixed(2)),
    }));
  }, [subscriptions]);

  const recentSubs = useMemo(() => {
    return [...subscriptions]
      .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
      .slice(0, 5);
  }, [subscriptions]);

  return (
    <>
      <div className="p-6 space-y-6 top-16 relative">
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>

        {/* KPI Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPI title="Total Spend" value={`$${totalSpend}`} />
          <KPI title="Active Subscriptions" value={subscriptions.length} />
          <KPI title="Monthly Avg" value={`$${monthlyAverage}`} />
          <KPI
            title="Categories"
            value={new Set(subscriptions.map((s) => s.category)).size}
          />
        </div>

        {/* Pie Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["monthly", "yearly"].map((key) => (
            <div key={key} className="bg-white rounded-2xl shadow p-4">
              <h3 className="text-lg font-medium mb-2 capitalize">
                {key} Spending by Category
              </h3>
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <div className="w-full sm:w-auto flex-1">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={breakdownByFrequency[key]}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={80}
                        innerRadius={40}
                        labelLine={false}
                        className="cursor-pointer"
                      >
                        {breakdownByFrequency[key].map((_, idx) => (
                          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name, props) => [`$${value}`, props.payload.name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <CategoryLegend data={breakdownByFrequency[key]} />
              </div>
            </div>
          ))}
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-lg font-medium mb-2">Monthly Spend Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyTrend}>
              <XAxis dataKey="month" />
              {!isSmall && <YAxis />}
              <Tooltip
                formatter={(value) => [`$${value.toFixed(2)}`, "Spend"]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#34D399"
                strokeWidth={2}
                className="cursor-pointer"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Subscriptions */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-lg font-medium mb-4">Latest Subscriptions</h3>
          {recentSubs.length === 0 ? (
            <p className="text-gray-500">No subscriptions added yet.</p>
          ) : (
            <ul className="divide-y">
              {recentSubs.map((sub) => (
                <li key={sub.id} className="py-2 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{sub.name}</div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(sub.startDate), "dd MMM yyyy")} • {sub.category}
                    </div>
                  </div>
                  <div className="font-semibold text-emerald-600">
                    ${getPrice(sub)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-10 text-center text-sm text-gray-400 mt-7">
        &copy; {new Date().getFullYear()} Subscription Manager. Built with ❤️ using React.
      </footer>
    </>
  );
};

export default Dashboard;
