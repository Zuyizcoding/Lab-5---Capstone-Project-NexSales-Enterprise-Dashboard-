import React from "react";

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  trendDirection,
}) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        flex: 1,
        minWidth: "200px",
      }}
    >
      <div
        style={{
          color: "#8c8c8c",
          fontSize: "0.875rem",
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#262626",
          marginBottom: "0.5rem",
        }}
      >
        {value}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "0.875rem",
        }}
      >
        <span
          style={{
            color: trendDirection === "up" ? "#52c41a" : "#f5222d",
            marginRight: "0.5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          {trendDirection === "up" ? "↑" : "↓"} {trend}
        </span>
        <span style={{ color: "#8c8c8c" }}>vs last month</span>
      </div>
    </div>
  );
};
