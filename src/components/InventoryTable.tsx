import React, { useState, useMemo, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  selectAllProducts,
  productDeleted,
  productUpdated,
} from "../store/inventorySlice";
import { addToast } from "../store/uiSlice";
import { DataTable } from "./DataTable";
import { Modal } from "./Modal";
import { Product } from "../api/mockData";

export const InventoryTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const loading = useAppSelector((state) => state.inventory.loading);
  const [filter, setFilter] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Optimized filtering: useMemo
  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [products, filter]
  );

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(productDeleted(id));
      dispatch(
        addToast({ message: "Product deleted successfully", type: "success" })
      );
    },
    [dispatch]
  );

  const handleEdit = useCallback((product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleSave = () => {
    if (editingProduct) {
      dispatch(
        productUpdated({
          id: editingProduct.id,
          changes: editingProduct,
        })
      );
      dispatch(
        addToast({ message: "Product updated successfully", type: "success" })
      );
      setIsModalOpen(false);
      setEditingProduct(null);
    }
  };

  const rowKey = useCallback((item: any) => item.id, []);

  if (loading) {
    return <div>Loading inventory...</div>;
  }

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "white",
        color: "#333",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Filter products..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            border: "1px solid #d9d9d9",
            fontSize: "1rem",
            outline: "none",
            transition: "border-color 0.3s",
            backgroundColor: "white",
            color: "#333",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#1890ff")}
          onBlur={(e) => (e.target.style.borderColor = "#d9d9d9")}
        />
        <div
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#e6f7ff",
            color: "#1890ff",
            borderRadius: "8px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            border: "1px solid #91d5ff",
            whiteSpace: "nowrap",
          }}
        >
          Count: {filteredProducts.length}
        </div>
      </div>

      {/* Compound Component Usage */}
      <DataTable data={filteredProducts} rowKey={rowKey}>
        <DataTable.Column header="Name" field="name" />
        <DataTable.Column
          header="Price"
          render={(item: Product) => `$${item.price.toFixed(2)}`}
        />
        <DataTable.Column header="Qty" field="quantity" />
        <DataTable.Column header="Category" field="category" />
        <DataTable.Column
          header="Status"
          render={(item: Product) => (
            <span
              style={{
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                backgroundColor:
                  item.status === "In Stock"
                    ? "#e6f7ff"
                    : item.status === "Low Stock"
                    ? "#fffbe6"
                    : "#fff1f0",
                color:
                  item.status === "In Stock"
                    ? "#1890ff"
                    : item.status === "Low Stock"
                    ? "#faad14"
                    : "#f5222d",
                fontSize: "0.85rem",
              }}
            >
              {item.status}
            </span>
          )}
        />
        <DataTable.Column
          header="Actions"
          render={(item: Product) => (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => handleEdit(item)}
                style={{
                  padding: "0.25rem 0.5rem",
                  border: "1px solid #91d5ff",
                  backgroundColor: "#e6f7ff",
                  color: "#1890ff",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
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
            </div>
          )}
        />
      </DataTable>

      {/* Edit Modal */}
      {editingProduct && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          title="Edit Product"
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                Name
              </label>
              <input
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #d9d9d9",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                Price
              </label>
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #d9d9d9",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
