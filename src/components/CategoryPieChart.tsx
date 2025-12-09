import React from "react";

const data = [
  { name: "Electronics", value: 400, color: "#1890ff" },
  { name: "Clothing", value: 300, color: "#2fc25b" },
  { name: "Home", value: 300, color: "#facc14" },
  { name: "Sports", value: 200, color: "#f04864" },
];

export const CategoryPieChart: React.FC = () => {
  const total = data.reduce((acc, cur) => acc + cur.value, 0);
  let cumulativeValue = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <svg
        viewBox="-1 -1 2 2"
        style={{
          transform: "rotate(-90deg)",
          width: "220px",
          height: "220px",
          overflow: "visible",
        }}
      >
        {data.map((slice) => {
          const startPercent = cumulativeValue / total;
          const endPercent = (cumulativeValue + slice.value) / total;
          cumulativeValue += slice.value;

          const [startX, startY] = getCoordinatesForPercent(startPercent);
          const [endX, endY] = getCoordinatesForPercent(endPercent);

          const largeArcFlag = slice.value / total > 0.5 ? 1 : 0;

          const pathData = [
            `M 0 0`,
            `L ${startX} ${startY}`,
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            `Z`,
          ].join(" ");

          // Calculate label position (centroid)
          const midPercent = (startPercent + endPercent) / 2;
          const labelRadius = 0.7; // Place label at 70% of radius
          const [labelX, labelY] = getCoordinatesForPercent(midPercent);

          const percentage = Math.round((slice.value / total) * 100);

          return (
            <g key={slice.name}>
              <path
                d={pathData}
                fill={slice.color}
                stroke="white"
                strokeWidth="0.02"
              />
              {percentage > 5 && ( // Only show label if slice is big enough
                <text
                  x={labelX * labelRadius}
                  y={labelY * labelRadius}
                  fill="white"
                  fontSize="0.12"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    transform: "rotate(90deg)",
                    transformOrigin: `${labelX * labelRadius}px ${
                      labelY * labelRadius
                    }px`,
                  }}
                >
                  {percentage}%
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        {data.map((item) => (
          <div
            key={item.name}
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.875rem",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: item.color,
                marginRight: "0.5rem",
                borderRadius: "50%",
              }}
            />
            <span style={{ color: "#555" }}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
