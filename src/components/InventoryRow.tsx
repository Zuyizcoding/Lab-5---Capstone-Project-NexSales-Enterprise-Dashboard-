import React from "react";
import { Product } from "../api/mockData";

interface InventoryRowProps {
  product: Product;
  onDelete: (id: string) => void;
}

// Optimized implementation: React.memo prevents re-renders if props didn't change
export const InventoryRow: React.FC<InventoryRowProps> = React.memo(
  ({ product, onDelete }) => {
    return (
      <tr style={{ borderBottom: "1px solid #eee" }}>
        <td style={{ padding: "0.75rem" }}>{product.name}</td>
        <td style={{ padding: "0.75rem" }}>${product.price.toFixed(2)}</td>
        <td style={{ padding: "0.75rem" }}>{product.quantity}</td>
        <td style={{ padding: "0.75rem" }}>{product.category}</td>
        <td style={{ padding: "0.75rem" }}>
          <span
            style={{
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
              backgroundColor:
                product.status === "In Stock"
                  ? "#e6f7ff"
                  : product.status === "Low Stock"
                  ? "#fffbe6"
                  : "#fff1f0",
              color:
                product.status === "In Stock"
                  ? "#1890ff"
                  : product.status === "Low Stock"
                  ? "#faad14"
                  : "#f5222d",
              fontSize: "0.85rem",
            }}
          >
            {product.status}
          </span>
        </td>
        <td style={{ padding: "0.75rem" }}>
          <button
            onClick={() => onDelete(product.id)}
            style={{
              padding: "0.25rem 0.5rem",
              border: "1px solid #ffa39e",
              backgroundColor: "#fff1f0",
              color: "#f5222d",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
);
