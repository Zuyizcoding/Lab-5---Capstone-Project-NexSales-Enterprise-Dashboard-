import React from "react";

const data = [
  { name: "Wireless Headphones", sold: 1200 },
  { name: "Smart Watch Series 5", sold: 980 },
  { name: "Ergonomic Office Chair", sold: 850 },
  { name: "Mechanical Keyboard", sold: 640 },
  { name: "27-inch 4K Monitor", sold: 430 },
];

export const TopProductsChart: React.FC = () => {
  const maxSold = Math.max(...data.map((d) => d.sold));
  const fullWidth = "100%";

  return (
    <div style={{ padding: "0.5rem" }}>
      {data.map((product, index) => {
        const percentage = (product.sold / maxSold) * 100;
        return (
          <div key={product.name} style={{ marginBottom: "1.2rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.4rem",
                fontSize: "0.875rem",
                color: "#555",
                fontWeight: 500,
              }}
            >
              <span>
                {index + 1}. {product.name}
              </span>
              <span style={{ color: "#1890ff", fontWeight: 600 }}>
                {product.sold} units
              </span>
            </div>
            <div
              style={{
                width: fullWidth,
                height: "8px",
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${percentage}%`,
                  height: "100%",
                  backgroundColor: "#1890ff",
                  borderRadius: "4px",
                  transition: "width 0.5s ease-in-out",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
