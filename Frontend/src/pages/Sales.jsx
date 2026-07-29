
import { useEffect, useState, useMemo } from "react";
import useAuthStore from "../store/useAuthStore";
import { TrendingUp, ShoppingBag, Calendar } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { VITE_API_URL } from "../config/api";
const Sales = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();

  useEffect(() => {
    const getSales = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${VITE_API_URL}/api/transaction/sales`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        console.log("Sales response:", result);
        setTransactions(result.sales || []);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    getSales();
  }, []);

  // ---- Analytics (computed from existing transactions state, no fetch logic changed) ----
  const analytics = useMemo(() => {
    const totalRevenue = transactions.reduce(
      (sum, t) => sum + (t.amount || 0),
      0
    );
    const totalSales = transactions.length;
    const avgSale = totalSales > 0 ? totalRevenue / totalSales : 0;

    const now = new Date();
    const thisMonthSales = transactions.filter((t) => {
      const d = new Date(t.createdAt);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    }).length;

    // Group revenue by date for the trend chart
    const revenueByDate = {};
    transactions.forEach((t) => {
      const dateKey = new Date(t.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      revenueByDate[dateKey] = (revenueByDate[dateKey] || 0) + (t.amount || 0);
    });

    const chartData = Object.entries(revenueByDate)
      .map(([date, revenue]) => ({ date, revenue }))
      .slice(-14); // last 14 data points

    return { totalRevenue, totalSales, avgSale, thisMonthSales, chartData };
  }, [transactions]);

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">My Sales</h1>
        <span className="text-slate-500">{transactions.length} Sales</span>
      </div>

      {/* ---- Analytics Dashboard ---- */}
      {!loading && transactions.length > 0 && (
        <div className="mb-8 space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl shadow-md p-5">
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                ₹
                Total Revenue
              </div>
              <p className="text-2xl font-bold text-emerald-600">
                 ₹{analytics.totalRevenue.toFixed(2)}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-5">
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                <ShoppingBag size={16} />
                Total Sales
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {analytics.totalSales}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-5">
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                <TrendingUp size={16} />
                Avg. Sale Value
              </div>
              <p className="text-2xl font-bold text-indigo-600">
                 ₹{analytics.avgSale.toFixed(2)}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-5">
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                <Calendar size={16} />
                This Month
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {analytics.thisMonthSales}
              </p>
            </div>
          </div>

          {/* Revenue trend chart */}
          {analytics.chartData.length > 1 && (
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="text-sm font-semibold text-slate-600 mb-4">
                Revenue Trend
              </h3>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={analytics.chartData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#94a3b8" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
                  <Tooltip
                    formatter={(value) => [` ₹${value.toFixed(2)}`, "Revenue"]}
                    contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg font-medium text-gray-500">
            Loading your sales...
          </p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="h-64 rounded-2xl border-2 border-dashed border-gray-300 bg-white flex items-center justify-center">
          <p className="text-gray-400 text-lg">No Sales Yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={
                  transaction.photo?.imageUrl?.startsWith("http")
                    ? transaction.photo.imageUrl
                    : `${VITE_API_URL}${transaction.photo?.imageUrl}`
                }
                alt={transaction.photo?.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  {transaction.photo?.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                  {transaction.photo?.description}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Sold to</span>
                    <span className="text-sm font-medium text-slate-800">
                      {transaction.buyer?.name||"N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                 <span className="text-sm text-slate-500">Buyer Email</span>
                    <span className="text-sm font-medium text-slate-800">
                      {transaction.buyer?.email||"N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Date</span>
                    <span className="text-sm font-medium text-slate-800">
                         {new Date(transaction.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-slate-500">Amount</span>
                    <span className="text-lg font-bold text-emerald-600">
                       ₹{transaction .amount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sales;
