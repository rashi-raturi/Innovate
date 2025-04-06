import React, { useState, useEffect, useRef } from "react";
import {
  FaChartLine,
  FaUtensils,
  FaShoppingBag,
  FaBrain,
  FaCheck,
  FaUserCircle,
  FaSignOutAlt,
  FaRobot,
  FaCheckCircle,
  FaCircle,
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarAlt,
  FaSearch,
  FaInfoCircle,
  FaChartArea,
  FaChartBar,
  FaChartPie,
  FaAngleUp,
  FaAngleDown,
} from "react-icons/fa";

const VendorDashboard = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiPredictions, setAiPredictions] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("1W");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [chartType, setChartType] = useState("area");
  const [showMoreMetrics, setShowMoreMetrics] = useState(false);
  const chartRef = useRef(null);
  const currentDateTime = "2025-04-05 23:21:47";
  const currentUser = "tanishyadav06012005";

  // Sample orders data
  const samplePendingOrders = [
    {
      id: 1,
      customer: "Amit Kumar",
      items: ["Chicken Biryani (2)", "Cold Coffee (1)"],
      total: "₹520",
      time: "2 min ago",
      table: "A12",
    },
    {
      id: 2,
      customer: "Priya Sharma",
      items: ["Paneer Tikka (1)", "Butter Naan (2)", "Mango Lassi (1)"],
      total: "₹380",
      time: "5 min ago",
      table: "B08",
    },
    {
      id: 3,
      customer: "Raj Singh",
      items: ["Masala Dosa (1)", "Filter Coffee (1)"],
      total: "₹150",
      time: "8 min ago",
      table: "C04",
    },
    {
      id: 4,
      customer: "Meera Patel",
      items: ["Veg Sandwich (2)", "French Fries (1)", "Soft Drink (2)"],
      total: "₹320",
      time: "10 min ago",
      table: "D15",
    },
  ];

  // Sample AI predictions
  const predictionItems = [
    {
      name: "Chicken Biryani",
      prediction: "35-40 plates",
      confidence: 92,
      previousDay: 32,
    },
    {
      name: "Paneer Tikka",
      prediction: "25-30 plates",
      confidence: 88,
      previousDay: 22,
    },
    {
      name: "Masala Dosa",
      prediction: "20-25 plates",
      confidence: 85,
      previousDay: 18,
    },
    {
      name: "Veg Sandwich",
      prediction: "30-35 plates",
      confidence: 90,
      previousDay: 28,
    },
    {
      name: "Chole Bhature",
      prediction: "15-20 plates",
      confidence: 82,
      previousDay: 14,
    },
  ];

  // Sample data for charts
  const stocksData = {
    "1D": [
      {
        time: "7:00",
        revenue: 2800,
        orders: 38,
        avgOrderValue: 73.7,
        profit: 980,
        peopleCount: 45,
        events: null,
        profitMargin: 35,
      },
      {
        time: "8:00",
        revenue: 4200,
        orders: 55,
        avgOrderValue: 76.4,
        profit: 1470,
        peopleCount: 64,
        events: null,
        profitMargin: 35,
      },
      {
        time: "9:00",
        revenue: 3600,
        orders: 45,
        avgOrderValue: 80.0,
        profit: 1296,
        peopleCount: 52,
        events: null,
        profitMargin: 36,
      },
      {
        time: "10:00",
        revenue: 2100,
        orders: 28,
        avgOrderValue: 75.0,
        profit: 735,
        peopleCount: 35,
        events: null,
        profitMargin: 35,
      },
      {
        time: "11:00",
        revenue: 3200,
        orders: 42,
        avgOrderValue: 76.2,
        profit: 1152,
        peopleCount: 48,
        events: null,
        profitMargin: 36,
      },
      {
        time: "12:00",
        revenue: 4900,
        orders: 65,
        avgOrderValue: 75.4,
        profit: 1813,
        peopleCount: 72,
        events: "Lunch Peak",
        profitMargin: 37,
      },
      {
        time: "13:00",
        revenue: 5200,
        orders: 72,
        avgOrderValue: 72.2,
        profit: 1976,
        peopleCount: 85,
        events: "Lunch Peak",
        profitMargin: 38,
      },
      {
        time: "14:00",
        revenue: 4800,
        orders: 63,
        avgOrderValue: 76.2,
        profit: 1776,
        peopleCount: 70,
        events: "Lunch Peak",
        profitMargin: 37,
      },
      {
        time: "15:00",
        revenue: 2600,
        orders: 35,
        avgOrderValue: 74.3,
        profit: 910,
        peopleCount: 40,
        events: null,
        profitMargin: 35,
      },
      {
        time: "16:00",
        revenue: 3400,
        orders: 48,
        avgOrderValue: 70.8,
        profit: 1190,
        peopleCount: 58,
        events: "Tea Time",
        profitMargin: 35,
      },
      {
        time: "17:00",
        revenue: 4100,
        orders: 58,
        avgOrderValue: 70.7,
        profit: 1476,
        peopleCount: 65,
        events: null,
        profitMargin: 36,
      },
      {
        time: "18:00",
        revenue: 5100,
        orders: 68,
        avgOrderValue: 75.0,
        profit: 1938,
        peopleCount: 75,
        events: "Dinner Peak",
        profitMargin: 38,
      },
      {
        time: "19:00",
        revenue: 4700,
        orders: 60,
        avgOrderValue: 78.3,
        profit: 1786,
        peopleCount: 68,
        events: "Dinner Peak",
        profitMargin: 38,
      },
      {
        time: "20:00",
        revenue: 2900,
        orders: 39,
        avgOrderValue: 74.4,
        profit: 1044,
        peopleCount: 45,
        events: null,
        profitMargin: 36,
      },
    ],
    "1W": [
      {
        time: "Mon",
        revenue: 28500,
        orders: 352,
        avgOrderValue: 81.0,
        profit: 9975,
        peopleCount: 380,
        events: null,
        profitMargin: 35,
      },
      {
        time: "Tue",
        revenue: 32100,
        orders: 412,
        avgOrderValue: 77.9,
        profit: 11556,
        peopleCount: 450,
        events: "Tech Club Meeting",
        profitMargin: 36,
      },
      {
        time: "Wed",
        revenue: 30800,
        orders: 380,
        avgOrderValue: 81.1,
        profit: 11088,
        peopleCount: 420,
        events: null,
        profitMargin: 36,
      },
      {
        time: "Thu",
        revenue: 27500,
        orders: 345,
        avgOrderValue: 79.7,
        profit: 9625,
        peopleCount: 370,
        events: null,
        profitMargin: 35,
      },
      {
        time: "Fri",
        revenue: 36200,
        orders: 455,
        avgOrderValue: 79.6,
        profit: 13032,
        peopleCount: 510,
        events: "Weekend Start",
        profitMargin: 36,
      },
      {
        time: "Sat",
        revenue: 42500,
        orders: 510,
        avgOrderValue: 83.3,
        profit: 15725,
        peopleCount: 580,
        events: "Cultural Fest",
        profitMargin: 37,
      },
      {
        time: "Sun",
        revenue: 35800,
        orders: 428,
        avgOrderValue: 83.6,
        profit: 12530,
        peopleCount: 480,
        events: null,
        profitMargin: 35,
      },
    ],
    "1M": [
      {
        time: "Week 1",
        revenue: 175000,
        orders: 2250,
        avgOrderValue: 77.8,
        profit: 61250,
        peopleCount: 2500,
        events: null,
        profitMargin: 35,
      },
      {
        time: "Week 2",
        revenue: 192000,
        orders: 2380,
        avgOrderValue: 80.7,
        profit: 69120,
        peopleCount: 2650,
        events: "Sports Week",
        profitMargin: 36,
      },
      {
        time: "Week 3",
        revenue: 183000,
        orders: 2320,
        avgOrderValue: 78.9,
        profit: 65880,
        peopleCount: 2570,
        events: "Exams Start",
        profitMargin: 36,
      },
      {
        time: "Week 4",
        revenue: 220000,
        orders: 2710,
        avgOrderValue: 81.2,
        profit: 81400,
        peopleCount: 3050,
        events: "Placement Week",
        profitMargin: 37,
      },
    ],
    "3M": [
      {
        time: "Jan",
        revenue: 720000,
        orders: 9120,
        avgOrderValue: 79.0,
        profit: 252000,
        peopleCount: 10200,
        events: "New Year",
        profitMargin: 35,
      },
      {
        time: "Feb",
        revenue: 685000,
        orders: 8750,
        avgOrderValue: 78.3,
        profit: 239750,
        peopleCount: 9800,
        events: "Valentine's Day",
        profitMargin: 35,
      },
      {
        time: "Mar",
        revenue: 795000,
        orders: 9880,
        avgOrderValue: 80.5,
        profit: 286200,
        peopleCount: 11250,
        events: "Finals Month",
        profitMargin: 36,
      },
    ],
  };

  // Define metrics for visualization
  const metrics = [
    {
      id: "revenue",
      name: "Revenue",
      color: "#FF7823",
      accessor: (d) => d.revenue,
      formatter: formatCurrency,
    },
    {
      id: "orders",
      name: "Orders",
      color: "#4F46E5",
      accessor: (d) => d.orders,
      formatter: (val) => val,
    },
    {
      id: "profit",
      name: "Profit",
      color: "#10B981",
      accessor: (d) => d.profit,
      formatter: formatCurrency,
    },
    {
      id: "avgOrderValue",
      name: "Avg. Order",
      color: "#8B5CF6",
      accessor: (d) => d.avgOrderValue,
      formatter: (val) => `₹${val}`,
    },
    {
      id: "peopleCount",
      name: "Visitors",
      color: "#F59E0B",
      accessor: (d) => d.peopleCount,
      formatter: (val) => val,
    },
    {
      id: "profitMargin",
      name: "Margin %",
      color: "#EC4899",
      accessor: (d) => d.profitMargin,
      formatter: (val) => `${val}%`,
    },
  ];

  // Start with first 3 metrics visible
  const [visibleMetrics, setVisibleMetrics] = useState([
    "revenue",
    "orders",
    "profit",
  ]);

  useEffect(() => {
    // Simulate loading orders data
    setPendingOrders(samplePendingOrders);
    setCompletedOrders(48);
    setTotalRevenue(18245);
  }, []);

  // Function to generate random movement in the chart for animation
  useEffect(() => {
    if (!chartRef.current) return;

    // Create gentle pulse animation effect
    const interval = setInterval(() => {
      if (chartRef.current && Math.random() > 0.7) {
        const pulseAnimation = chartRef.current.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(1.005)" },
            { transform: "scale(1)" },
          ],
          {
            duration: 1500,
            easing: "ease-in-out",
          }
        );

        pulseAnimation.onfinish = () => {
          if (chartRef.current) {
            chartRef.current.style.transform = "scale(1)";
          }
        };
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [chartType]);

  const generateAiPredictions = () => {
    setIsAiGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setAiPredictions(predictionItems);
      setIsAiGenerating(false);
    }, 1500);
  };

  const completeOrder = (orderId) => {
    setPendingOrders(pendingOrders.filter((order) => order.id !== orderId));
    setCompletedOrders(completedOrders + 1);
  };

  // Toggle a metric's visibility
  const toggleMetric = (metricId) => {
    setVisibleMetrics((prev) => {
      if (prev.includes(metricId)) {
        return prev.filter((id) => id !== metricId);
      } else {
        return [...prev, metricId];
      }
    });
  };

  // Get current chart data based on selected time range
  const currentChartData = stocksData[selectedTimeRange];

  // Calculate min and max values for each visible metric
  const metricBounds = {};
  visibleMetrics.forEach((metricId) => {
    const metric = metrics.find((m) => m.id === metricId);
    const values = currentChartData.map(metric.accessor);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min;

    metricBounds[metricId] = {
      min: Math.max(0, min - range * 0.1),
      max: max + range * 0.1,
      range: range * 1.2,
    };
  });

  // Calculate start and end values for display
  const metricChanges = {};
  visibleMetrics.forEach((metricId) => {
    const metric = metrics.find((m) => m.id === metricId);
    const startValue = metric.accessor(currentChartData[0]);
    const endValue = metric.accessor(
      currentChartData[currentChartData.length - 1]
    );
    const change = endValue - startValue;
    const changePercent = ((change / startValue) * 100).toFixed(2);

    metricChanges[metricId] = {
      start: startValue,
      end: endValue,
      change,
      changePercent,
      isPositive: change >= 0,
    };
  });

  // Format currency
  function formatCurrency(amount) {
    if (amount >= 1000000) {
      return `₹${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(2)}K`;
    } else {
      return `₹${amount}`;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-primary to-orange-600 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              VC
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Canteen Vendor Portal
              </h1>
              
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg flex items-center space-x-1">
              <FaUserCircle className="text-gray-500" />
              <span className="hidden md:inline">Account</span>
            </button>
            <button className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg flex items-center space-x-1">
              <FaSignOutAlt />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 cursor-pointer">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">Today's Revenue</p>
                <h3 className="text-3xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-600">
                  ₹{totalRevenue}
                </h3>
                <div className="text-green-500 text-sm flex items-center mt-1">
                  <FaAngleUp className="mr-1" /> 12% from yesterday
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary to-orange-600 p-3 rounded-lg shadow-md">
                <FaChartLine className="text-white text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 cursor-pointer">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Orders</p>
                <h3 className="text-3xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                  {pendingOrders.length}
                </h3>
                <div className="text-red-500 text-sm flex items-center mt-1">
                  <FaAngleDown className="mr-1" /> 5% from yesterday
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-lg shadow-md">
                <FaShoppingBag className="text-white text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 cursor-pointer">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">Completed Orders</p>
                <h3 className="text-3xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-600">
                  {completedOrders}
                </h3>
                <div className="text-green-500 text-sm flex items-center mt-1">
                  <FaAngleUp className="mr-1" /> 18% from yesterday
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg shadow-md">
                <FaCheckCircle className="text-white text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Apple Stocks-like Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  Interactive Analytics Dashboard
                  <button className="ml-2 text-gray-400 hover:text-gray-600">
                    <FaInfoCircle className="text-sm" />
                  </button>
                </h2>

                <div className="mt-1 flex items-center flex-wrap gap-2">
                  {visibleMetrics.map((metricId) => {
                    const metric = metrics.find((m) => m.id === metricId);
                    const change = metricChanges[metricId];

                    return (
                      <div key={metricId} className="mr-6">
                        <p
                          className="text-xs font-medium"
                          style={{ color: metric.color }}
                        >
                          {metric.name}
                        </p>
                        <span className="text-lg font-bold mr-2 text-gray-800">
                          {metric.formatter(change.end)}
                        </span>
                        <span
                          className={`text-xs font-semibold ${
                            change.isPositive
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {change.isPositive ? "+" : ""}
                          {change.changePercent}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex space-x-2">
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setSelectedTimeRange("1D")}
                    className={`px-3 py-1.5 text-sm ${
                      selectedTimeRange === "1D"
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FaCalendarDay className="inline-block mr-1 text-xs" />
                    Day
                  </button>
                  <button
                    onClick={() => setSelectedTimeRange("1W")}
                    className={`px-3 py-1.5 text-sm ${
                      selectedTimeRange === "1W"
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FaCalendarWeek className="inline-block mr-1 text-xs" />
                    Week
                  </button>
                  <button
                    onClick={() => setSelectedTimeRange("1M")}
                    className={`px-3 py-1.5 text-sm ${
                      selectedTimeRange === "1M"
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FaCalendarAlt className="inline-block mr-1 text-xs" />
                    Month
                  </button>
                  <button
                    onClick={() => setSelectedTimeRange("3M")}
                    className={`px-3 py-1.5 text-sm ${
                      selectedTimeRange === "3M"
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FaCalendarAlt className="inline-block mr-1 text-xs" />
                    3M
                  </button>
                </div>

                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setChartType("area")}
                    className={`px-3 py-1.5 text-sm ${
                      chartType === "area"
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    title="Area Chart"
                  >
                    <FaChartArea />
                  </button>
                  <button
                    onClick={() => setChartType("line")}
                    className={`px-3 py-1.5 text-sm ${
                      chartType === "line"
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    title="Line Chart"
                  >
                    <FaChartLine />
                  </button>
                  <button
                    onClick={() => setChartType("bar")}
                    className={`px-3 py-1.5 text-sm ${
                      chartType === "bar"
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    title="Bar Chart"
                  >
                    <FaChartBar />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {metrics.map((metric) => (
                <button
                  key={metric.id}
                  onClick={() => toggleMetric(metric.id)}
                  className={`px-3 py-1 text-xs rounded-full border ${
                    visibleMetrics.includes(metric.id)
                      ? "border-gray-700 bg-gray-800 text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-1.5"
                    style={{ backgroundColor: metric.color }}
                  ></span>
                  {metric.name}
                </button>
              ))}

              <button
                onClick={() => setShowMoreMetrics(!showMoreMetrics)}
                className="px-3 py-1 text-xs rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                {showMoreMetrics ? "Hide Details" : "Show Details"}
              </button>
            </div>
          </div>

          {/* Main Chart Section */}
          <div
            ref={chartRef}
            className={`h-80 relative transition-all duration-500 ${
              showMoreMetrics ? "h-96" : "h-80"
            }`}
          >
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-b border-gray-100 w-full"></div>
              ))}
            </div>

            {/* Chart Area */}
            <div className="absolute inset-x-14 inset-y-0">
              <svg className="w-full h-full overflow-visible">
                <defs>
                  {/* Create gradients for each metric */}
                  {visibleMetrics.map((metricId) => {
                    const metric = metrics.find((m) => m.id === metricId);
                    const change = metricChanges[metricId];
                    const gradientColor = change.isPositive
                      ? metric.color
                      : "#ef4444";

                    return (
                      <linearGradient
                        key={`${metricId}Gradient`}
                        id={`${metricId}Gradient`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor={`${gradientColor}80`} />
                        <stop offset="100%" stopColor={`${gradientColor}05`} />
                      </linearGradient>
                    );
                  })}
                </defs>

                {/* Render area for each metric if area chart */}
                {chartType === "area" &&
                  visibleMetrics.map((metricId) => {
                    const metric = metrics.find((m) => m.id === metricId);
                    const bounds = metricBounds[metricId];

                    const pathData = `
                    M ${0} ${
                      100 -
                      ((metric.accessor(currentChartData[0]) - bounds.min) /
                        bounds.range) *
                        100
                    }
                    ${currentChartData
                      .map((d, i) => {
                        const x = (i / (currentChartData.length - 1)) * 100;
                        const y =
                          100 -
                          ((metric.accessor(d) - bounds.min) / bounds.range) *
                            100;
                        return `L ${x} ${y}`;
                      })
                      .join(" ")}
                    L ${100} ${100}
                    L ${0} ${100}
                    Z
                  `;

                    return (
                      <path
                        key={`${metricId}Area`}
                        d={pathData}
                        fill={`url(#${metricId}Gradient)`}
                        opacity="0.5"
                        className="transition-all duration-500"
                      />
                    );
                  })}

                {/* Render lines for each metric */}
                {(chartType === "line" || chartType === "area") &&
                  visibleMetrics.map((metricId) => {
                    const metric = metrics.find((m) => m.id === metricId);
                    const bounds = metricBounds[metricId];

                    const pathData = `
                    M ${0} ${
                      100 -
                      ((metric.accessor(currentChartData[0]) - bounds.min) /
                        bounds.range) *
                        100
                    }
                    ${currentChartData
                      .map((d, i) => {
                        const x = (i / (currentChartData.length - 1)) * 100;
                        const y =
                          100 -
                          ((metric.accessor(d) - bounds.min) / bounds.range) *
                            100;
                        return `L ${x} ${y}`;
                      })
                      .join(" ")}
                  `;

                    return (
                      <path
                        key={`${metricId}Line`}
                        d={pathData}
                        stroke={metric.color}
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-500"
                      />
                    );
                  })}

                {/* Render bars for each metric if bar chart */}
                {chartType === "bar" &&
                  visibleMetrics.map((metricId) => {
                    const metric = metrics.find((m) => m.id === metricId);
                    const bounds = metricBounds[metricId];
                    const barWidth =
                      80 / (currentChartData.length * visibleMetrics.length);
                    const barGap =
                      20 / (currentChartData.length * visibleMetrics.length);
                    const metricIndex = visibleMetrics.indexOf(metricId);

                    return currentChartData.map((d, i) => {
                      const x = (i / (currentChartData.length - 1)) * 100;
                      const barHeight =
                        ((metric.accessor(d) - bounds.min) / bounds.range) *
                        100;
                      const offsetX =
                        (metricIndex - visibleMetrics.length / 2 + 0.5) *
                        (barWidth + barGap);

                      return (
                        <rect
                          key={`${metricId}Bar${i}`}
                          x={`${x + offsetX}%`}
                          y={`${100 - barHeight}%`}
                          width={`${barWidth}%`}
                          height={`${barHeight}%`}
                          rx="1"
                          fill={metric.color}
                          className="transition-all duration-500"
                        />
                      );
                    });
                  })}

                {/* Render data points for each metric */}
                {(chartType === "line" || chartType === "area") &&
                  visibleMetrics.map((metricId) => {
                    const metric = metrics.find((m) => m.id === metricId);
                    const bounds = metricBounds[metricId];

                    return currentChartData.map((d, i) => {
                      const x = (i / (currentChartData.length - 1)) * 100;
                      const y =
                        100 -
                        ((metric.accessor(d) - bounds.min) / bounds.range) *
                          100;
                      const hasEvent = d.events && metricId === "revenue";

                      return (
                        <g
                          key={`${metricId}Point${i}`}
                          className="transition-opacity duration-300"
                        >
                          {/* Event flag */}
                          {hasEvent && (
                            <>
                              <circle
                                cx={`${x}%`}
                                cy={`${y}%`}
                                r="6"
                                fill={metric.color}
                                stroke="white"
                                strokeWidth="2"
                                className="animate-pulse"
                              />
                              <line
                                x1={`${x}%`}
                                y1={`${y - 8}%`}
                                x2={`${x}%`}
                                y2="0%"
                                stroke={metric.color}
                                strokeWidth="1"
                                strokeDasharray="2 2"
                                opacity="0.4"
                              />
                            </>
                          )}

                          {/* Interactive points */}
                          <circle
                            cx={`${x}%`}
                            cy={`${y}%`}
                            r={hoveredIndex === i ? "5" : "4"}
                            fill={hoveredIndex === i ? metric.color : "white"}
                            stroke={metric.color}
                            strokeWidth="2"
                            className={`transition-all duration-200 ${
                              hoveredIndex === i || hoveredIndex === null
                                ? "opacity-100"
                                : "opacity-30"
                            }`}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{ cursor: "pointer" }}
                          />
                        </g>
                      );
                    });
                  })}

                {/* Focus line when hovering */}
                {hoveredIndex !== null && (
                  <line
                    x1={`${
                      (hoveredIndex / (currentChartData.length - 1)) * 100
                    }%`}
                    y1="0%"
                    x2={`${
                      (hoveredIndex / (currentChartData.length - 1)) * 100
                    }%`}
                    y2="100%"
                    stroke="#9CA3AF"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                )}
              </svg>

              {/* Tooltips */}
              {hoveredIndex !== null && (
                <div
                  className="absolute bg-white p-3 rounded-lg shadow-lg z-10 border border-gray-200 text-sm w-56"
                  style={{
                    left: `${
                      (hoveredIndex / (currentChartData.length - 1)) * 100
                    }%`,
                    top: "0%",
                    transform: "translate(-50%, -110%)",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-gray-900">
                      {currentChartData[hoveredIndex].time}
                    </div>
                    {currentChartData[hoveredIndex].events && (
                      <div className="px-2 py-0.5 bg-orange-100 text-orange-800 rounded text-xs">
                        {currentChartData[hoveredIndex].events}
                      </div>
                    )}
                  </div>

                  <div className="mt-2 space-y-1.5">
                    {visibleMetrics.map((metricId) => {
                      const metric = metrics.find((m) => m.id === metricId);
                      const value = metric.accessor(
                        currentChartData[hoveredIndex]
                      );

                      return (
                        <div
                          key={metricId}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center">
                            <div
                              className="w-2 h-2 rounded-full mr-1.5"
                              style={{ backgroundColor: metric.color }}
                            ></div>
                            <span className="text-gray-500">
                              {metric.name}:
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">
                            {metric.formatter(value)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Additional metrics when "Show More" is enabled */}
                  {showMoreMetrics && (
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">
                        Additional Insights:
                      </div>
                      {hoveredIndex > 0 && (
                        <div className="text-xs text-gray-700">
                          {(() => {
                            const currentRevenue = metrics
                              .find((m) => m.id === "revenue")
                              .accessor(currentChartData[hoveredIndex]);
                            const prevRevenue = metrics
                              .find((m) => m.id === "revenue")
                              .accessor(currentChartData[hoveredIndex - 1]);
                            const change = (
                              ((currentRevenue - prevRevenue) / prevRevenue) *
                              100
                            ).toFixed(1);
                            const direction =
                              currentRevenue >= prevRevenue ? "up" : "down";

                            return (
                              <span>
                                Revenue {direction}{" "}
                                <span
                                  className={
                                    direction === "up"
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }
                                >
                                  {Math.abs(change)}%
                                </span>{" "}
                                from previous period
                              </span>
                            );
                          })()}
                        </div>
                      )}

                      <div className="text-xs text-gray-700 mt-1">
                        {(() => {
                          const avgVal = metrics
                            .find((m) => m.id === "avgOrderValue")
                            .accessor(currentChartData[hoveredIndex]);
                          const avgAllTime = 78.5; // simulated average
                          return (
                            <span>
                              Average order value is{" "}
                              <span
                                className={
                                  avgVal > avgAllTime
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                {avgVal > avgAllTime ? "above" : "below"}{" "}
                                average
                              </span>{" "}
                              (₹{avgAllTime})
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-2 h-2 bg-white rotate-45 border-b border-r border-gray-200"></div>
                </div>
              )}
            </div>

            {/* Y-axis Labels */}
            <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500 py-2">
              {[0, 1, 2, 3, 4].map((i) => {
                const metric = metrics.find((m) => m.id === visibleMetrics[0]);
                const bounds = metricBounds[visibleMetrics[0]];
                const value = bounds.max - (i * bounds.range) / 4;

                return <div key={i}>{metric.formatter(value)}</div>;
              })}
            </div>

            {/* Secondary Y-axis Labels (for the second metric) */}
            {visibleMetrics.length > 1 && (
              <div className="absolute right-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500 py-2 text-right">
                {[0, 1, 2, 3, 4].map((i) => {
                  const metric = metrics.find(
                    (m) => m.id === visibleMetrics[1]
                  );
                  const bounds = metricBounds[visibleMetrics[1]];
                  const value = bounds.max - (i * bounds.range) / 4;

                  return <div key={i}>{metric.formatter(value)}</div>;
                })}
              </div>
            )}

            {/* X-axis Labels */}
            <div className="absolute left-14 right-14 bottom-0 h-6 flex justify-between text-xs text-gray-500">
              {currentChartData.map((d, i) => (
                <div
                  key={i}
                  className="text-center"
                  style={{ width: `${100 / currentChartData.length}%` }}
                >
                  {d.time}
                </div>
              ))}
            </div>
          </div>

          {/* Analysis Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
              <div className="text-sm font-medium text-gray-600 mb-1">
                Peak Revenue Hours
              </div>
              <div className="text-lg font-bold text-gray-900">
                {selectedTimeRange === "1D"
                  ? "12 PM - 2 PM, 6 PM - 7 PM"
                  : "Lunch & Dinner"}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Your highest revenue periods typically occur during lunch and
                dinner hours.
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
              <div className="text-sm font-medium text-gray-600 mb-1">
                Average Order Value
              </div>
              <div className="text-lg font-bold text-gray-900">
                ₹{selectedTimeRange === "1D" ? "75.10" : "80.20"}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {selectedTimeRange === "1D"
                  ? "2.5% higher than yesterday"
                  : "3.8% increase from last period"}
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
              <div className="text-sm font-medium text-gray-600 mb-1">
                Upcoming Events
              </div>
              <div className="text-lg font-bold text-gray-900">
                Cultural Festival (Tomorrow)
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Prepare for 25-30% increase in orders based on historical data.
              </div>
            </div>
          </div>
        </div>

        {/* Live Orders */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="mr-4 bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg shadow-md">
                <FaUtensils className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  Live Orders
                </h2>
                <p className="text-gray-600">
                  Currently pending orders that need to be prepared
                </p>
              </div>
            </div>

            <div className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm font-medium flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Live Updates
            </div>
          </div>

          {pendingOrders.length === 0 ? (
            <div className="bg-green-50 rounded-xl p-8 text-center">
              <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                All caught up!
              </h3>
              <p className="text-green-600">No pending orders at the moment.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-100">
              {pendingOrders.map((order, index) => (
                <div
                  key={order.id}
                  className={`p-4 ${
                    index !== pendingOrders.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  } hover:bg-gray-50 transition-colors`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold rounded-full py-1 px-3 mr-2">
                          #{order.id}
                        </span>
                        <h4 className="font-medium text-gray-800">
                          {order.customer}
                        </h4>
                        <span className="ml-2 text-xs text-gray-500">
                          {order.time}
                        </span>
                      </div>

                      <div className="flex items-start">
                        <div className="w-28 text-sm">
                          <span className="bg-blue-100 text-blue-800 py-0.5 px-2 rounded text-xs">
                            Table {order.table}
                          </span>
                        </div>

                        <ul className="flex-1 list-disc ml-4 text-sm text-gray-700">
                          {order.items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>

                        <div className="w-24 text-right">
                          <span className="font-medium text-gray-800">
                            {order.total}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-4">
                      <button
                        onClick={() => completeOrder(order.id)}
                        className="w-full md:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-4 rounded-lg shadow-sm hover:shadow transition-all"
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Prediction Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="mr-4 bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-lg shadow-md">
                <FaBrain className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  AI Preparation Predictions
                </h2>
                <p className="text-gray-600">
                  Tomorrow's smart preparation recommendations
                </p>
              </div>
            </div>

            <button
              onClick={generateAiPredictions}
              disabled={isAiGenerating || aiPredictions.length > 0}
              className={`px-4 py-2 rounded-lg text-white flex items-center space-x-2 transition-all ${
                isAiGenerating || aiPredictions.length > 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg"
              }`}
            >
              {isAiGenerating ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  <span>Analyzing Data...</span>
                </>
              ) : aiPredictions.length > 0 ? (
                <>
                  <FaCheck className="mr-2" />
                  <span>Predictions Generated</span>
                </>
              ) : (
                <>
                  <FaRobot className="mr-2" />
                  <span>Generate Predictions</span>
                </>
              )}
            </button>
          </div>

          {isAiGenerating ? (
            <div className="bg-indigo-50 rounded-xl p-8 flex flex-col items-center justify-center">
              <div className="relative w-20 h-20 mb-4">
                <div className="absolute inset-0 bg-indigo-200 rounded-full animate-ping opacity-75"></div>
                <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full w-20 h-20 flex items-center justify-center">
                  <FaBrain className="text-white text-3xl" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                AI is analyzing patterns...
              </h3>
              <p className="text-indigo-600 text-center max-w-md">
                Examining historical sales data, current inventory, today's
                orders, and seasonal trends to generate accurate predictions.
              </p>
            </div>
          ) : aiPredictions.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-gray-100">
              {aiPredictions.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 ${
                    index !== aiPredictions.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  } hover:bg-indigo-50/30 transition-colors`}
                >
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="w-64">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500 mr-2">
                          Yesterday: {item.previousDay}
                        </span>
                        <div className="flex items-center text-green-500 text-xs">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>
                            {Math.floor(
                              ((parseInt(item.prediction) - item.previousDay) /
                                item.previousDay) *
                                100
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 my-3 md:my-0">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-700 w-28">
                          AI Prediction:
                        </span>
                        <div className="flex-1">
                          <div className="relative pt-1">
                            <div className="w-full h-2 bg-gray-100 rounded-full">
                              <div
                                className={`h-2 rounded-full ${
                                  item.confidence >= 90
                                    ? "bg-gradient-to-r from-green-400 to-green-500"
                                    : item.confidence >= 80
                                    ? "bg-gradient-to-r from-green-300 to-green-400"
                                    : "bg-gradient-to-r from-yellow-300 to-yellow-400"
                                }`}
                                style={{ width: `${item.confidence}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <span className="ml-2 font-medium text-gray-800">
                          {item.prediction}
                        </span>
                      </div>

                      <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-700 w-28">
                          Confidence:
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            item.confidence >= 90
                              ? "text-green-600"
                              : item.confidence >= 80
                              ? "text-green-500"
                              : "text-yellow-600"
                          }`}
                        >
                          {item.confidence}%
                        </span>
                      </div>
                    </div>

                    <div className="w-40">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          className="w-20 px-2 py-1 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center"
                          defaultValue={parseInt(item.prediction)}
                          min="0"
                        />
                        <span className="text-gray-700">plates</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4 bg-indigo-50 flex justify-between items-center">
                <div className="text-sm text-indigo-800">
                  <span className="font-medium">AI Insight:</span> Tomorrow's
                  orders are predicted to increase by 15% due to the upcoming
                  campus event.
                </div>
                <button className="bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white py-2 px-4 rounded-lg shadow-sm hover:shadow transition-all text-sm">
                  Apply All Predictions
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-indigo-50 rounded-xl p-8 text-center">
              <FaRobot className="text-indigo-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                Let AI help you plan for tomorrow
              </h3>
              <p className="text-gray-700 mb-4 max-w-lg mx-auto">
                Our AI analyzes your historical sales data, current trends, and
                upcoming events to predict tomorrow's demand for each menu item.
              </p>
              <button
                onClick={generateAiPredictions}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Generate Predictions Now
              </button>
            </div>
          )}
        </div>

        {/* Footer with current date/time and user */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted):{" "}
            {currentDateTime}
          </p>
          <p>Current User's Login: {currentUser}</p>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
