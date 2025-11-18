// src/pages/Tools.jsx
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

export default function Tools() {
  const categories = [
    "Concerts & Nightlife",
    "Charity & Community",
    "Wellness & Fitness",
    "Education & Skills",
    "Student & Campus",
    "Adventure & Travel",
    "Offers & Discounts",
    "Sports",
  ];

  // Ticket Calculator state
  const [ticketPrice, setTicketPrice] = useState("");
  const [attendees, setAttendees] = useState("");
  const [expenses, setExpenses] = useState("");
  const [revenue, setRevenue] = useState(null);
  const [profit, setProfit] = useState(null);

  // Event Analyzer state
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [reachScore, setReachScore] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  // Chart data
  const [ticketData, setTicketData] = useState([]);
  const [eventHistory, setEventHistory] = useState([]);

  const calculateRevenue = () => {
    const price = parseFloat(ticketPrice);
    const num = parseInt(attendees);
    const exp = parseFloat(expenses) || 0;

    if (!isNaN(price) && !isNaN(num)) {
      const totalRevenue = price * num;
      const totalProfit = totalRevenue - exp;

      setRevenue(totalRevenue);
      setProfit(totalProfit);

      const newEvent = {
        name: `Event ${ticketData.length + 1}`,
        revenue: totalRevenue,
        profit: totalProfit,
        attendees: num,
        price: price,
        category: category || "Uncategorized",
      };

      setTicketData([...ticketData, newEvent]);
      setEventHistory([...eventHistory, newEvent]);
    } else {
      setRevenue("Invalid input");
      setProfit(null);
    }
  };

  const analyzeEvent = () => {
    const dur = parseInt(duration);
    const bud = parseFloat(budget) || 0;

    if (!dur || !category) {
      setReachScore("Fill all fields");
      setRecommendations([]);
      return;
    }

    let base = 50;
    let recs = [];

    // Duration factor
    if (dur > 180) base += 20;
    else if (dur > 90) base += 15;
    else base += 10;

    // Category factors
    if (category.includes("Concert")) {
      base += 25;
      recs.push("Promote on social media 2-3 weeks in advance");
      recs.push("Consider VIP packages for premium experience");
    } else if (category.includes("Charity")) {
      base += 15;
      recs.push("Leverage community partnerships");
      recs.push("Focus on emotional storytelling in marketing");
    } else if (category.includes("Wellness")) {
      base += 20;
      recs.push("Offer early-bird pricing");
      recs.push("Partner with local wellness influencers");
    } else {
      base += 18;
    }

    // Budget factor
    if (bud > 50000) base += 15;
    else if (bud > 20000) base += 10;
    else base += 5;

    setReachScore(Math.min(Math.round(base), 100));
    setRecommendations(recs);
  };

  const clearData = () => {
    setTicketData([]);
    setEventHistory([]);
    setRevenue(null);
    setProfit(null);
  };

  const categoryPerformance = categories
    .map((cat) => {
      const eventsInCategory = eventHistory.filter(
        (event) => event.category === cat
      );
      const avgRevenue =
        eventsInCategory.length > 0
          ? eventsInCategory.reduce((sum, event) => sum + event.revenue, 0) /
            eventsInCategory.length
          : 0;

      return {
        name: cat.split("&")[0].trim(),
        revenue: avgRevenue,
        count: eventsInCategory.length,
      };
    })
    .filter((item) => item.count > 0);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-linear-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent mb-4">
            Event Intelligence Suite
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Advanced tools to analyze, optimize, and maximize your event
            performance
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Ticket Calculator */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-slate-800">
                Revenue Optimizer
              </h2>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">₦</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Ticket Price (KES)
                </label>
                <input
                  type="number"
                  placeholder="Enter ticket price"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                  className="w-full text-gray-950 border  border-slate-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Expected Attendees
                </label>
                <input
                  type="number"
                  placeholder="Number of attendees"
                  value={attendees}
                  onChange={(e) => setAttendees(e.target.value)}
                  className="w-full text-gray-950 border border-slate-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Event Expenses (KES)
                </label>
                <input
                  type="number"
                  placeholder="Optional"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  className="w-full text-gray-950 border border-slate-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={calculateRevenue}
                className="flex-1 bg-linear-to-r from-blue-600 to-indigo-700 text-white font-semibold px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Calculate Revenue
              </button>
              <button
                onClick={clearData}
                className="px-6 py-3 border border-slate-300 text-slate-600 font-semibold rounded-2xl hover:bg-slate-50 transition-all duration-300"
              >
                Clear
              </button>
            </div>

            {(revenue !== null || profit !== null) && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-2xl p-4 text-center">
                  <p className="text-sm text-blue-600 font-medium">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-blue-700">
                    {typeof revenue === "number"
                      ? `KES ${revenue.toLocaleString()}`
                      : revenue}
                  </p>
                </div>
                <div
                  className={`rounded-2xl p-4 text-center ${
                    profit >= 0 ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <p className="text-sm font-medium">Net Profit</p>
                  <p
                    className={`text-2xl font-bold ${
                      profit >= 0 ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {typeof profit === "number"
                      ? `KES ${profit.toLocaleString()}`
                      : "N/A"}
                  </p>
                </div>
              </div>
            )}

            {/* Revenue Chart */}
            {ticketData.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Revenue Trend
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={ticketData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [
                        `KES ${value.toLocaleString()}`,
                        "Revenue",
                      ]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#10b981"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Event Analyzer */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-slate-800">
                  Event Intelligence
                </h2>
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">📊</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Event Duration (minutes)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full text-gray-950 border border-slate-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Event Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-gray-950 border border-slate-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Marketing Budget (KES)
                  </label>
                  <input
                    type="number"
                    placeholder="Optional"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full text-gray-950 border border-slate-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  />
                </div>
              </div>

              <button
                onClick={analyzeEvent}
                className="w-full bg-linear-to-r from-green-600 to-emerald-700 text-white font-semibold px-6 py-3 rounded-2xl hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Analyze Event Potential
              </button>

              {reachScore && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-800">
                      Reach Score
                    </h3>
                    <div className="text-2xl font-bold text-slate-700">
                      {reachScore}/100
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className="bg-linear-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${reachScore}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {recommendations.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    Recommendations
                  </h3>
                  <div className="space-y-2">
                    {recommendations.map((rec, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-blue-50 rounded-2xl"
                      >
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <p className="text-sm text-blue-800">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Category Performance */}
            {categoryPerformance.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  Category Performance
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryPerformance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="revenue"
                    >
                      {categoryPerformance.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [
                        `KES ${value.toLocaleString()}`,
                        "Avg Revenue",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
