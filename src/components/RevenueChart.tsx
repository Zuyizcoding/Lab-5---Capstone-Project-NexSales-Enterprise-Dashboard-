import React from "react";

const data = [
  { month: "Jan", revenue: 4000, cost: 2400 },
  { month: "Feb", revenue: 3000, cost: 1398 },
  { month: "Mar", revenue: 2000, cost: 9800 },
  { month: "Apr", revenue: 2780, cost: 3908 },
  { month: "May", revenue: 1890, cost: 4800 },
  { month: "Jun", revenue: 2390, cost: 3800 },
  { month: "Jul", revenue: 3490, cost: 4300 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

export const RevenueChart: React.FC = () => {
  const width = 800; // Increased width for better spacing
  const height = 400; // Increased height
  const padding = 60;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxValue = Math.max(...data.map((d) => Math.max(d.revenue, d.cost)));
  // Round up to nearest 1000 for nice axis
  const yAxisMax = Math.ceil(maxValue / 1000) * 1000;

  const barWidth = chartWidth / data.length / 3;

  // Generate Y-Axis ticks (5 ticks)
  const yTicks = 5;
  const yAxisTicks = Array.from({ length: yTicks + 1 }).map(
    (_, i) => (yAxisMax / yTicks) * i
  );

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <svg
        width={width}
        height={height}
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Grid Lines & Y-Axis Labels */}
        {yAxisTicks.map((tick) => {
          const y = height - padding - (tick / yAxisMax) * chartHeight;
          return (
            <g key={tick}>
              {/* Grid Line */}
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#f0f0f0"
                strokeWidth="1"
              />
              {/* Y-Axis Label */}
              <text
                x={padding - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="#888"
              >
                {formatCurrency(tick)}
              </text>
            </g>
          );
        })}

        {/* X-Axis Line */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#e0e0e0"
          strokeWidth="2"
        />

        {/* Bars */}
        {data.map((d, i) => {
          const x = padding + i * (chartWidth / data.length) + 30; // Adjusted spacing
          const revHeight = (d.revenue / yAxisMax) * chartHeight;
          const costHeight = (d.cost / yAxisMax) * chartHeight;

          return (
            <g key={d.month}>
              {/* Revenue Bar */}
              <rect
                x={x}
                y={height - padding - revHeight}
                width={barWidth}
                height={revHeight}
                fill="#1890ff"
                rx="4" // Rounded corners top
                ry="4"
              />
              {/* Cost Bar */}
              <rect
                x={x + barWidth + 4} // Gap between bars
                y={height - padding - costHeight}
                width={barWidth}
                height={costHeight}
                fill="#ff4d4f"
                rx="4"
                ry="4"
              />

              {/* Values on top */}
              <text
                x={x + barWidth / 2}
                y={height - padding - revHeight - 6}
                textAnchor="middle"
                fontSize="10"
                fill="#1890ff"
                fontWeight="500"
              >
                {d.revenue}
              </text>
              <text
                x={x + barWidth + 4 + barWidth / 2}
                y={height - padding - costHeight - 6}
                textAnchor="middle"
                fontSize="10"
                fill="#ff4d4f"
                fontWeight="500"
              >
                {d.cost}
              </text>

              {/* Month Label */}
              <text
                x={x + barWidth + 2}
                y={height - padding + 20}
                fontSize="12"
                textAnchor="middle"
                fill="#555"
                fontWeight="500"
              >
                {d.month}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${width / 2 - 60}, ${padding / 2})`}>
          <rect x="0" y="0" width="12" height="12" fill="#1890ff" rx="2" />
          <text x="18" y="11" fontSize="12" fill="#333" fontWeight="500">
            Revenue
          </text>
          <rect x="80" y="0" width="12" height="12" fill="#ff4d4f" rx="2" />
          <text x="98" y="11" fontSize="12" fill="#333" fontWeight="500">
            Costs
          </text>
        </g>
      </svg>
    </div>
  );
};
