import React, { useState } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";

import { RevenueChart } from "../components/RevenueChart";
import { MetricCard } from "../components/MetricCard";
import { CategoryPieChart } from "../components/CategoryPieChart";
import { TopProductsChart } from "../components/TopProductsChart";

const AnalyticsWidget: React.FC = () => {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error("Simulated Analytics Crash!");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <div>
          <h2 style={{ margin: 0, color: "#262626" }}>Analytics Dashboard</h2>
          <p style={{ margin: "0.5rem 0 0", color: "#8c8c8c" }}>
            Overview of store performance and inventory metrics.
          </p>
        </div>
        <button
          onClick={() => setShouldCrash(true)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#ff4d4f",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: 500,
            transition: "all 0.3s",
          }}
        >
          Simulate Crash
        </button>
      </div>

      {/* Metric Cards */}
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <MetricCard
          title="Total Revenue"
          value="$128,430"
          trend="12.5%"
          trendDirection="up"
        />
        <MetricCard
          title="Active Users"
          value="8,234"
          trend="3.2%"
          trendDirection="up"
        />
        <MetricCard
          title="New Orders"
          value="1,240"
          trend="5.1%"
          trendDirection="down"
        />
        <MetricCard
          title="Avg. Order Value"
          value="$82.40"
          trend="0.8%"
          trendDirection="up"
        />
      </div>

      {/* Main Chart Section */}
      <div
        style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ margin: "0 0 1.5rem 0", color: "#262626" }}>
          Revenue vs Costs (YTD)
        </h3>
        <RevenueChart />
      </div>

      {/* Bottom Section: Pie & Top Products */}
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        {/* Category Distribution */}
        <div
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            minWidth: "300px",
          }}
        >
          <h3 style={{ margin: "0 0 1.5rem 0", color: "#262626" }}>
            Sales by Category
          </h3>
          <CategoryPieChart />
        </div>

        {/* Top Products */}
        <div
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            minWidth: "300px",
          }}
        >
          <h3 style={{ margin: "0 0 1.5rem 0", color: "#262626" }}>
            Top Selling Products
          </h3>
          <TopProductsChart />
        </div>
      </div>
    </div>
  );
};

const Analytics: React.FC = () => {
  return (
    <ErrorBoundary>
      <AnalyticsWidget />
    </ErrorBoundary>
  );
};

export default Analytics;
